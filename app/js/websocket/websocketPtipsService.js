(function () {

    'use strict';

    angular.module('sampleWebsocketApp.services')
        .service('websocketPtipsService', function($q, zipUtil) {

            var tripSummaryListener = $q.defer();
            var vehicleListener = $q.defer();
            var stompClient;

            this.connect = function(authToken) {
                console.log("connecting to ptips websocket...");
                var url = 'http://localhost:10080/ptips-web-services/ws?token=' + authToken;
                var socket = new SockJS(url);
                stompClient = Stomp.over(socket);
                stompClient.debug = null;
                stompClient.connect(getHeader(), function () {
                    subscribeToTripSummaryChannel(authToken);
                    subscribeToVehicleChannel(authToken);
                });
            };

            this.disconnect = function() {
                console.log("disconnecting ptips websocket...");
                stompClient.disconnect();
            };

            this.getTripSummaryMessage = function() {
                return tripSummaryListener.promise;
            };

            this.getVehicleMessage = function() {
                return vehicleListener.promise;
            };

            var subscribeToTripSummaryChannel = function(authToken) {
                stompClient.send("/app/tripSummary/subscribe/40287,8896,12534,33553,33556,3913,9578,8266,13434,10291,42558,9212,17740,9215,20052,40413,34456,8284,3936,8999,11954,9999,30061,23537,38743", getHeader(authToken), {});
                stompClient.subscribe("/user/at_ptips_sysadmin01/cc3b958e-4818-4351-8a39-0315eb8f43ab/trips", handleTripSummaryMessage, getHeader(authToken));
            };

            var handleTripSummaryMessage = function(tripSummaryMessage) {
                tripSummaryListener.notify(JSON.parse(tripSummaryMessage.body));
            };

            var subscribeToVehicleChannel = function(authToken) {
                var filterData = {
                    organisationIds:[40287,8896,12534,33553,33556,3913,9578,8266,13434,10291,42558,9212,17740,9215,20052,40413,34456,8284,3936,8999,11954,9999,30061,23537,38743]
                };
                stompClient.send("/app/apply-global-filter", getHeader(authToken), JSON.stringify(filterData));
                stompClient.subscribe("/user/at_ptips_sysadmin01/cc3b958e-4818-4351-8a39-0315eb8f43ab/vehicle", handleVehicleMessage, getHeader(authToken));
            };

            var handleVehicleMessage = function(vehicleMessage) {
                var bodyJSON = JSON.parse(vehicleMessage.body);
                var unzippedData = "";
                if (bodyJSON.zipped) {
                     unzippedData = zipUtil.unzip(bodyJSON.zipped);
                } else {
                    unzippedData = bodyJSON;
                }
                vehicleListener.notify(unzippedData);
            };

            var getHeader = function(authToken) {
                return {
                    token: authToken,
                    userName: "at_ptips_sysadmin01",
                    appId: "root-window-1496966908867",
                    clientId: "cc3b958e-4818-4351-8a39-0315eb8f43ab"
                };
            };

        });

}());
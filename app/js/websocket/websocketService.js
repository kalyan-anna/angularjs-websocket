(function () {

    'use strict';

    angular.module('sampleWebsocketApp.services')
        .service('websocketService', function($q) {

            var vehicleListener = $q.defer();
            var tripListener = $q.defer();
            var stompClient;

            this.connect = function() {
                console.log("connecting websocket...");
                var socket = new SockJS('http://localhost:9898/ptips/ws');
                stompClient = Stomp.over(socket);
                stompClient.connect({}, function () {
                    subscribeToVehicleChannel();
                    subscribeToTripChannel();
                });
            };

            this.disconnect = function() {
                console.log("disconnecting websocket...");
                stompClient.disconnect();
            };

            this.getVehicleMessage = function() {
                return vehicleListener.promise;
            };

            this.getTripMessage = function() {
                return tripListener.promise;
            };

            var subscribeToVehicleChannel = function() {
                stompClient.subscribe("/channel/vehicle", function(vehicleData) {
                    vehicleListener.notify(vehicleData.body);
                });
            };

            var subscribeToTripChannel = function() {
                stompClient.subscribe("/channel/trip", function(tripData) {
                    tripListener.notify(tripData.body);
                });
            };
        });

}());
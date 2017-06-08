(function () {

    'use strict';

    angular.module('sampleWebsocketApp.services')
        .service('websocketService', function($q) {

            var vehicleListener = $q.defer();
            var stompClient;

            this.connect = function() {
                console.log("connecting websocket...");
                var socket = new SockJS('http://localhost:9898/ptips/ws');
                stompClient = Stomp.over(socket);
                stompClient.connect({}, function () {
                    subscribeToVehicleChannel();
                });
            };

            this.disconnect = function() {
                console.log("disconnecting websocket...");
                stompClient.disconnect();
            };

            this.getVehicleMessage = function() {
                return vehicleListener.promise;
            };

            var subscribeToVehicleChannel = function() {
                stompClient.subscribe("/channel/vehicle", function(vehicleData) {
                    vehicleListener.notify(vehicleData.body);
                });
                // var count = 0;
                // setInterval(function() {
                //     var vehicleId = '9944' + count++;
                //     var vehicledata = {
                //         vehicleId: vehicleId,
                //         serviceDesc: vehicleId + ' service'
                //     };
                //     vehicleListener.notify(vehicledata);
                // }, 2000);
            };
        });

}());
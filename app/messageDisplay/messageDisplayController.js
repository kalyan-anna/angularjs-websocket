(function () {

    'use strict';

    angular.module('sampleWebsocketApp.controllers')
        .controller('MessageDisplayController', function(websocketService) {
            var vm = this;

            vm.connected = false;

            vm.connect = function() {
                vm.connected = true;
                websocketService.connect();
            };

            vm.disconnect = function() {
                vm.connected = false;
                websocketService.disconnect();
            };

            websocketService.getVehicleMessage().then(null, null, function(vehicles) {
                vm.vehicleContent = vehicles;
                vm.vehicleUpdatedTime = new Date();
            });
        });
}());
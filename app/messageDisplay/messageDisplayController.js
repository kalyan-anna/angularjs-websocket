(function () {

    'use strict';

    angular.module('sampleWebsocketApp.controllers')
        .controller('MessageDisplayController', function(websocketService) {
            var vm = this;

            vm.connected = false;
            vm.tripUpdateCounts = [];
            vm.vehicleUpdateCounts = [];

            vm.connect = function() {
                vm.connected = true;
                websocketService.connect();
                clear();
            };

            var clear = function() {
                vm.tripUpdateCounts = [];
                vm.vehicleUpdateCounts = [];
                vm.tripSummaryUpdatedTime = null;
                vm.vehicleUpdatedTime = null;
            };


            vm.disconnect = function() {
                vm.connected = false;
                websocketService.disconnect();
            };

            websocketService.getVehicleMessage().then(null, null, function(vehicles) {
                vm.vehicleUpdateCounts.push(vehicles.length);
                vm.vehicleUpdatedTime = new Date();
            });

            websocketService.getTripMessage().then(null, null, function(trips) {
                vm.tripUpdateCounts.push(trips.length);
                vm.tripUpdatedTime = new Date();
            });
        });
}());
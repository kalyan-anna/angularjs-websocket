(function () {

    'use strict';

    angular.module('sampleWebsocketApp.controllers')
        .controller('PTIPSMessageDisplayController', function(websocketPtipsService) {
            var vm = this;

            vm.connected = false;
            vm.tripUpdateCounts = [];
            vm.vehicleUpdateCounts = [];
            vm.authToken = "MTQ5NjAzODcyMTk4NDoyMDg4MDNiODg0ZGMxYTc2NGU5ZDkyNGZiNjgyZGEwMGRkNGRiZTVhZDFmN2ViZjBlYTk0MDQ3NzU4MjZkNWNjMmVlNDFiZWFlZjk2Y2FhZWZlMDM4NmQwOWI1ZjVhOGM4ZGQ5YjYxZDAwM2M1OTUyMmQ0YTlkNTFlMzYxOTFmZjhhN2Y5NThlZDI1NWIwMmQyODhmYTE2MzFhNTk2ODljMTcyMzUyZTJjMzg3M2UzZmU5OWI1NWI4MWJjYTFhMjY1MTg5NWJjZWNiMzE4OTE5MjkxYTgxZjk1Y2NkNDk1MGQzOGI5MTJmNWE0NjkyYmFiMzk3Y2EzNTA0MWJmZDFiZmM1MzdjMzViMjZjYTUwOWZlOWU4NDZlYjcyYjk1MzQ5MWIwZDYxZWI4NzRlYWQ5MjRiYWE1NTMyZTJmMWY2MmU2NzBhYzE5ZjVjMTg2YWJjNjIwNTYwZTY4ZmU5Yjg3MjVmZDQyZDRlNGE3Yzk5MDlmMjU0ZmRhMDcxY2UzNzA0NDg1NzhhZGIyN2VjMzViYWQyYzNmMGY2MWJlNTFiOTgyNWI5N2U5NzgxY2MxZGU0YWZjNTBjMjgzMjM3M2QyNTU4YWY2ZmU5Yzg4ZTU3YTU0MDUwNzkxMGNjNTE5NzY1N2U0NzMyNTY4ZTYyNWEzZWY4M2RmZjQyZWU3NTBmYzplZGZmMDVlYS0xOTc1LTQyZmEtOWUxMi0wOGJiN2VhNjY0ZjI6ODY0MDA6UFRJUFMtV0VCLUFXU0RFVjA0OjcxMjc2NGY4YTljM2ExZjQwMmM4NDJhYjc0YTI2NzNmMzZjODZkMmExNGYxOTExNTA3YWNhOTVlZjc5MDM1YmVhNGM5MjMzMmMxYzI0ZjZhOWJkNjg4MWI0NjJmNWM5MTkzOGE3MjRkMzBhYTJlZjk5NjVlN2M3MjM0YzA4NDIy";

            vm.connect = function() {
                clear();
                vm.connected = true;
                websocketPtipsService.connect(vm.authToken);
            };

            var clear = function() {
                vm.tripUpdateCounts = [];
                vm.vehicleUpdateCounts = [];
                vm.tripSummaryUpdatedTime = null;
                vm.vehicleUpdatedTime = null;
            };

            vm.disconnect = function() {
                vm.connected = false;
                websocketPtipsService.disconnect();
            };

            websocketPtipsService.getTripSummaryMessage().then(null, null, function(tripSummaryData) {
                console.log("firstUpdate:" + tripSummaryData.firstUpdate);
                if(tripSummaryData.updates) {
                    vm.tripUpdateCounts.push(tripSummaryData.updates.length);
                }
                vm.tripSummaryUpdatedTime = new Date();
            });

            websocketPtipsService.getVehicleMessage().then(null, null, function(vehicleData) {
                vm.vehicleUpdateCounts.push(vehicleData.length);
                vm.vehicleUpdatedTime = new Date();
            });
        });
}());
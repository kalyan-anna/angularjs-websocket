angular.module('sampleWebsocketApp')

    .controller('MessageDisplayController', function() {
        var vm = this;

        vm.connected = false;

        vm.connect = function() {
            vm.connected = true;
        };

        vm.disconnect = function() {
            vm.connected = false;
        };
    });
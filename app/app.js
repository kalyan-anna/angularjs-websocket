(function () {

    'use strict';

    angular.module('sampleWebsocketApp', [
        'sampleWebsocketApp.controllers',
        'sampleWebsocketApp.services'
    ]);

    angular.module('sampleWebsocketApp.controllers', ['sampleWebsocketApp.services']);
    angular.module('sampleWebsocketApp.services', ['sampleWebsocketApp.utils']);
    angular.module('sampleWebsocketApp.utils', []);

}());
(function(){
    'use strict';

    function toByteArray(binaryData) {
        var length = binaryData.length;
        var bytes = new Uint8Array( length );
        for (var i = 0; i < length; i++)        {
            bytes[i] = binaryData.charCodeAt(i);
        }
        return bytes;
    }

    var CHUNK_SIZE = 0x8000;

    function toChunks(unzippedBytes) {
        var chunks = [];
        for (var j = 0; j < unzippedBytes.length; j+=CHUNK_SIZE) {
            var thisChunk = unzippedBytes.subarray(j, j + CHUNK_SIZE);
            thisChunk = Array.prototype.slice.call(thisChunk);
            chunks.push(String.fromCharCode.apply(null, thisChunk));
        }
        return chunks;
    }

    function unzip(base64Encoded) {
        if(!base64Encoded) {
            return base64Encoded;
        }
        var binaryData = atob(base64Encoded);
        var zippedByes = toByteArray(binaryData);
        var unzippedBytes = pako.inflate(zippedByes);
        var chunks = toChunks(unzippedBytes);
        var unzippedString = chunks.join('');
        return unzippedString;
    }

    angular.module('sampleWebsocketApp.utils')
        .service('zipUtil', function () {
            this.unzip = unzip;
        });

})();
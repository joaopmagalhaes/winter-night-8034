/*global define*/
'use strict';

define([], function () {
    return {
        API_KEY: 'q9k2mh6i7wxofogt73wr69eihx41ft7',

        sendAuthentication: function(xhr) {
            xhr.setRequestHeader('Client-ID', 'q9k2mh6i7wxofogt73wr69eihx41ft7');
        },
    };
});
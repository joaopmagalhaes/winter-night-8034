/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'Store'
        }
    },
    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
        underscore: '../node_modules/underscore/underscore',
        backbone: '../node_modules/backbone/backbone',
        backboneLocalstorage: '../node_modules/backbone.localstorage/backbone.localStorage',
        text: '../node_modules/requirejs-text/text'
    }
});

require([
    'backbone',
    'routers/router'
], function (Backbone, Router) {
    // Initialize routing and start Backbone.history()
    new Router();

    Backbone.history.start();
});
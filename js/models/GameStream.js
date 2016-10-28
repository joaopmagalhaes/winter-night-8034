/*global define*/
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var GameStream = Backbone.Model.extend({
        // defaults: {
        //     game: '',
        // },
    });

    return GameStream;
});
/*global define */
define([
    'underscore',
    'backbone',
    'backboneLocalstorage',
    'models/GameStream',
], function (_, Backbone, Store, GameStream) {
    'use strict';

    var StreamsCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: GameStream,

        url: 'https://api.twitch.tv/kraken/search/streams',

        parse: function(response) {
            return response.streams;
        },
    });

    return new StreamsCollection();
});
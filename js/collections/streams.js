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

        url: 'https://api.twitch.tv/kraken/search/streams?limit=6',

        parse: function(response) {
            if (response.streams.length) {
                this.url = response._links.next;
            }

            return response.streams;
        },

        resetUrl: function() {
            this.url = 'https://api.twitch.tv/kraken/search/streams?limit=6';
        },
    });

    return new StreamsCollection();
});
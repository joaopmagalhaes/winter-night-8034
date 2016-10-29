/*global define*/
define([
    'jquery',
    'backbone',
    'collections/streams',
    'common'
], function ($, Backbone, Streams, Common) {
    'use strict';

    var StreamsRouter = Backbone.Router.extend({
        routes: {
            '':           'home',
            'stream/:id': 'stream',
        },

        initialize: function() {
            // Add prototype functions to clean up after changing views
            Backbone.View.prototype.close = function() {
                this.remove();
                this.unbind();
                if (this.onClose) {
                    this.onClose();
                }
            };

            Backbone.View.showView = function(view) {
                if (this.currentView) {
                    this.currentView.close();
                }

                $("#content").html(view.render().el);
                this.currentView = view;

                return view;
            };
        },

        home: function () {
            require(['views/search'], function (SearchView) {
                Backbone.View.showView(new SearchView);
            });
        },

        stream: function (id) {
            require(['views/stream'], function (StreamView) {
                Backbone.View.showView(new StreamView({ id: id }));
            });
        },
    });

    return StreamsRouter;
});
/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/streams',
    'views/searchItem',
    'text!templates/search.html',
    'common'
], function ($, _, Backbone, Streams, searchItemView, searchTemplate, Common) {
    'use strict';

    var SearchView = Backbone.View.extend({
        className: 'container-fluid',

        template: _.template(searchTemplate),

        events: {
            'click button': 'search',
            // 'keydown input': 'search',
        },

        initialize: function () {
            Streams.on("change reset add remove search sort", this.renderItems.bind(this));
        },

        render: function () {
            $(this.el).html(this.template());

            this.$input = this.$('input[name="search"]');
            this.$results = this.$('#results');

            return this;
        },

        renderItems: function() {
            this.$results.empty();
            _.each(Streams.models, function(model) {
                var view = new searchItemView({ item: model });
                this.$results.append(view.el);
            }, this);
        },

        search: function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
            }

            Streams.fetch({
                reset: true,
                beforeSend: Common.sendAuthentication,
                dataType: 'json',
                data: {
                    q: this.$input.val(),
                },
            });
        },
    });

    return SearchView;
});
/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/streams',
    'views/searchItem',
    'text!templates/search.html',
    'common',
], function ($, _, Backbone, Streams, searchItemView, searchTemplate, Common) {
    'use strict';

    var SearchView = Backbone.View.extend({
        className: 'search-container',

        template: _.template(searchTemplate),

        events: {
            'keydown input': 'search',
        },

        initialize: function () {
            Streams.on("reset", this.renderItems.bind(this));
            Streams.on("add", this.renderItem.bind(this));

            $(window).scroll(this.infinite.bind(this));
        },

        render: function () {
            $(this.el).html(this.template());

            this.$input = this.$('input[name="search"]');
            this.$items = this.$('.search-items');
            this.$loading = this.$('.loading');
            this.$noResults = this.$('#no-resuls');

            return this;
        },

        renderItems: function() {
            this.$loading.hide();

            if (Streams.models.length) {
                this.$noResults.hide();

                _.each(Streams.models, function(model) {
                    this.renderItem(model);
                }, this);
            } else {
                this.$noResults.show();
            }

        },

        renderItem: function(model) {
            var view = new searchItemView({ item: model });
            this.$items.append(view.el);
        },

        infinite: function(event) {
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                this.$loading.show();
                this.fetch(false);
            }
        },

        search: function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                this.$items.empty();
                this.$loading.show();
                this.fetch(true);
            }
        },

        fetch: function(reset) {
            Streams.fetch({
                reset: reset,
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
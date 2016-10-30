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

        // View 'construtor'
        initialize: function () {
            Streams.on("reset", this.renderItems.bind(this));
            Streams.on("add", this.renderItem.bind(this));

            $(window).scroll(this.infinite.bind(this));
        },

        // Render the template
        render: function () {
            $(this.el).html(this.template());

            // Get template elements for future DOM handling
            this.$input = this.$('input[name="search"]');
            this.$items = this.$('.search-items');
            this.$loading = this.$('.loading');
            this.$noResults = this.$('#no-results');

            Streams.resetUrl();

            return this;
        },

        // Render items on collection reset
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

        // Render individual item
        renderItem: function(model) {
            var view = new searchItemView({ item: model });
            this.$items.append(view.el);
        },

        // Scroll callback listener for infinite scroll
        infinite: function(event) {
            if(this.$input.val().length
                && $(window).scrollTop() + $(window).height() == $(document).height()
            ) {
                this.$loading.show();
                this.fetch(false);
            }
        },

        // Search stream
        search: function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();

                if (this.$input.val().length) {
                    this.$items.empty();
                    this.$noResults.hide();
                    this.$loading.show();
                    this.fetch(true);
                }
            }
        },

        // Collection data fetch
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
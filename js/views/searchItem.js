define([
    'views/stream',
    'text!templates/searchItem.html',
], function(streamView, searchItemTemplate) {
    var SearchItemView = Backbone.View.extend({
        className: 'search-item',

        template: _.template(searchItemTemplate),

        events: {
            'click .thumb': 'viewStream',
            'click .streamer': 'viewStream',
        },

        // View 'construtor'
        initialize: function(params) {
            this.item = params.item;
            this.render();
        },

        // Render the template
        render: function() {
            $(this.el).html(this.template({
                item: this.item,
            }));

            return this;
        },

        viewStream: function(event) {
            event.preventDefault();
            event.stopPropagation();
            Backbone.View.showView(new streamView({stream: this.item}));
        },
    });

    return SearchItemView;
});
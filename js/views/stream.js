define([
    'collections/streams',
    'views/search',
    'text!templates/stream.html',
], function(Streams, searchView, streamTemplate) {
    var StreamView = Backbone.View.extend({
        el: '#twitchapp',

        template: _.template(streamTemplate),

        events: {
            'click .back': 'back',
        },

        // View 'construtor'
        initialize: function(params) {
            this.stream = params.stream;
            this.render();
        },

        // Render the template
        render: function() {
            $(this.el).html(this.template({
                stream: this.stream,
            }));

            return this;
        },

        back: function() {
            Backbone.View.showView(new searchView);
        },
    });

    return StreamView;
});
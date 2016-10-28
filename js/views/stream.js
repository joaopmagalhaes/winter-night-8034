define([
    'text!templates/stream.html',
], function(streamTemplate) {
    var StreamView = Backbone.View.extend({
        template: _.template(streamTemplate),

        events: {
            'click .thumb': 'viewStream',
        },

        // View 'construtor'
        initialize: function(params) {
            this.stream = params.stream;
            this.render();
        },

        // Render the template
        render: function() {
            console.log(this.stream);
            $(this.el).html(this.template({
                stream: this.stream,
            }));

            return this;
        },

        viewStream: function() {
            Backbone.View.showView(new streamView({stream: this.stream}));
        },
    });

    return StreamView;
});
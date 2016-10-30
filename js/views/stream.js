define([
    'collections/streams',
    'text!templates/stream.html',
    'common',
    'alertify'
], function(Streams, streamTemplate, Common, alertify) {
    var StreamView = Backbone.View.extend({
        className: 'stream-container',

        template: _.template(streamTemplate),

        events: {
            'click .back': 'back',
        },

        // View 'construtor'
        initialize: function(params) {
            if (params.id && Streams) {
                this.stream = Streams.get(params.id);

                if (this.stream) {
                    this.render();
                    this.initPoller();
                } else {
                    alertify.error('Unable to get stream');
                    Backbone.history.history.back();
                }
            } else {
                alertify.error('Sorry, there was an error while trying to get your stream');
                Backbone.history.history.back();
            }
        },

        // Render the template
        render: function() {
            $(this.el).html(this.template({
                stream: this.stream,
            }));

            this.$viewers = this.$('.viewers');

            return this;
        },

        // Go back to search
        back: function() {
            Backbone.history.history.back();
        },

        // Init a poller to fetch stream viewers every 5 seconds
        initPoller: function() {
            this.poller = setInterval(this.getStream.bind(this), 5000);
        },

        // Fetch the stream
        getStream: function() {
            var self = this;

            Backbone.ajax({
                url: 'https://api.twitch.tv/kraken/streams/' + this.stream.get('channel').name,
                headers: {
                    'Client-ID': Common.API_KEY,
                },
                dataType: 'json',
                success: function(response) {
                    if (response && response.stream && response.stream.viewers) {
                        self.$viewers.text(response.stream.viewers);
                    }
                }
            });
        },
    });

    return StreamView;
});
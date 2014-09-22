var deLaAlex;
(function (deLaAlex) {
    var Index = (function () {
        function Index() {
            var _this = this;
            this.githubEvents = ko.observableArray([]);
            $.getJSON("https://api.github.com/repos/alexdresko/De-la-Alex/events").done(function (data) {
                $.each(data, function (i1, v1) {
                    if (v1.type == "PushEvent") {
                        _this.addEvent("Push", v1.actor.login, v1.type, v1.payload.commits[0].message, v1.created_at);
                    }
                });
            });
        }
        Index.prototype.addEvent = function (title, author, type, subject, date) {
            this.githubEvents.push({ "title": title, "author": author, "type": type, "subject": subject, "date": date });
        };
        return Index;
    })();
    deLaAlex.Index = Index;
})(deLaAlex || (deLaAlex = {}));

$(function () {
    var data = new deLaAlex.Index();

    pager.extendWithPage(data);

    ko.applyBindings(data);

    pager.start();
});
//# sourceMappingURL=index.js.map

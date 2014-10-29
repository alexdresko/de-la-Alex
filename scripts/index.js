var deLaAlex;
(function (deLaAlex) {
    var Index = (function () {
        function Index() {
            var _this = this;
            this.githubEvents = ko.observableArray([]);
            $.getJSON("https://api.github.com/repos/alexdresko/De-la-Alex/events").done(function (data) {
                var count = 0;
                $.each(data, function (i1, v1) {
                    if (v1.type == "PushEvent") {
                        $.each(v1.payload.commits, function (i2, v2) {
                            _this.addEvent("Push", v1.actor.login, v1.type, v2.message, v1.created_at, v2.url);
                        });
                    }

                    if (v1.type == "IssuesEvent") {
                        _this.addEvent("Issue " + v1.payload.action, v1.actor.login, v1.type, v1.payload.issue.title, v1.created_at, v1.payload.issue.url);
                    }

                    count++;

                    if (count == 8) {
                        return false;
                    }
                });
            });
        }
        Index.prototype.addEvent = function (title, author, type, subject, date, url) {
            this.githubEvents.push({ "title": title, "author": author, "type": type, "subject": subject, "date": date, "url": url.replace('/api.', '/').replace('/repos', '') });
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

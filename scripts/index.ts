/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/knockout/knockout.d.ts" />

module deLaAlex  {
    export class Index {
        constructor() {
            $.getJSON("https://api.github.com/repos/alexdresko/De-la-Alex/events")
                .done((data) => {
                    var count = 0;
                    $.each(data, (i1, v1) => {
                        if (v1.type == "PushEvent") {
                            $.each(v1.payload.commits, (i2, v2) => {
                                this.addEvent("Push", v1.actor.login, v1.type, v2.message, v1.created_at, v2.url)
                            })
                            
                        }
                        
                        if (v1.type == "IssuesEvent") {
                            this.addEvent("Issue " + v1.payload.action, v1.actor.login, v1.type, v1.payload.issue.title, v1.created_at, v1.payload.issue.url);
                        }
                        
                        count++;
                        
                        if (count == 8) {
                            return false;
                        }
                        
                    })
                })
        }
        
        githubEvents = ko.observableArray([]);
        
        addEvent(title: string, author: string, type: string, subject: string, date: Date, url: string) {
            this.githubEvents.push({ "title": title, "author": author, "type": type, "subject": subject, "date": date, "url": url.replace('/api.', '/').replace('/repos', '')});
        }
    }
}

$(function() {
    var data = new deLaAlex.Index();

    
    // extend your view-model with pager.js specific data
    pager.extendWithPage(data);
    // apply the view-model using KnockoutJS as normal
    ko.applyBindings(data);
    // start pager.js
    pager.start();

})


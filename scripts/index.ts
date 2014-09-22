/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/knockout/knockout.d.ts" />
/// <reference path="../typings/knockout/knockout.d.ts" />

module deLaAlex  {
    export class Index {
        constructor() {
            $.getJSON("https://api.github.com/repos/alexdresko/De-la-Alex/events")
                .done((data) => {
                    $.each(data, (i1, v1) => {
                        if (v1.type == "PushEvent") {
                            this.addEvent("Push", v1.actor.login, v1.type, v1.payload.commits[0].message, v1.created_at)
                        }
                        
                        
                    })
                })
        }
        
        githubEvents = ko.observableArray([]);
        
        addEvent(title: string, author: string, type: string, subject: string, date: Date) {
            this.githubEvents.push({ "title": title, "author": author, "type": type, "subject": subject, "date": date});
        }
    }
}

$(function() {
    var data = new deLaAlex.Index();
    // extend your view-model with pager.js specific data
    (<any>pager).extendWithPage(data);
    // apply the view-model using KnockoutJS as normal
    ko.applyBindings(data);
    // start pager.js
    (<any>pager).start();

})


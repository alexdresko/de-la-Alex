/// <reference path="../typings/jquery/jquery.d.ts" />

module deLaAlex  {
    export class Something {
        constructor() {
            console.log("you da man");
        }
    }
}

$(() => {
    $.getJSON("https://api.github.com/repos/alexdresko/De-la-Alex/events")
        .done(function(data) {
           alert('another'); 
        });
})
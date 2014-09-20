$(function() {
    $.getJSON("https://api.github.com/repos/alexdresko/De-la-Alex/events")
        .done(function(data) {
           alert('done'); 
        });
})
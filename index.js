$(document).ready(function(){
    //Select an element
    $('#set-calculate').click(function(e){
        //Stop a full page sumbit to the server
        e.preventDefault();

        var url = 'https://set-theory-web.herokuapp.com/api/settheory';
        // $.getJSON(url, function(data){
        //     console.log(data);
        //     //$('#set-result').append('<p>' + data[message] + '</p>');
        // });
        var text = $('#exampleFormControlTextarea1').val();
        var sets = text.split('\n');

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: url,
            data: JSON.stringify(sets),
            dataType: 'json',
            success: function(data){
                $('#set-result').empty();
                data.forEach(function(e){
                    var html = e.set + " " + e.outcome;
                    $('#set-result').append(html);
                });
            },
            error: function(e){
                console.log(e);
            }
        });
    });
});
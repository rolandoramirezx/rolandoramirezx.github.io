$(document).ready(function(){
    $(".alert").alert();
    $('.alert').hide();

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
                $('#set-result').removeClass('invisible');
                $('#set-result > tbody')
                    .empty();
                data.forEach(function(e, index){
                    var html = '<tr>' +
                        '<th scope="row">' + index + '</th>' +
                        '<td>' + e.set + '</td>' +
                        '<td>' + e.outcome + '</td>' +
                        '</tr>';
                    $('#set-result > tbody').append(html);
                });
            },
            error: function(e){
                $('#errorMsg').text(e.responseJSON.message);
                $(".alert").addClass('show').show();
            }
        });
    });
});
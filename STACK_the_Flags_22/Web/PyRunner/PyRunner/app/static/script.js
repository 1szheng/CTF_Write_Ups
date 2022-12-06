$('#template').change(function() {
    var template = $(this).val();
    $.ajax({
        url: '/template/' + template,
        type: 'GET',
        success: function(response) {
            console.log(response)
            $('#code').val(response['contents']);
            $('#arguments').empty();
            for (var i = 0; i < response['arguments'].length; i++) {
                var argument = response['arguments'][i];
                var input = '<input type="text" name="' + argument + '" placeholder="' + argument + '">';
                $('#arguments').append(input);
            }
        }
    });
})

$("#save-template").click(function() {
    var tArguments = {};
    $('#arguments input').each(function() {
        tArguments[$(this).attr('name')] = $(this).val();
    });
    var data = {
        'template': $('#template').val(),
        'arguments': tArguments
    };
    $.ajax({
        url: '/save-template',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function(response) {
            var url = response['url'];
            $('#download-template').attr('href', url);
            $('#download-template').show();
        }
    });
});

$("#run-template").click(function() {
    // send arguments as json object
    var tArguments = {};
    $('#arguments input').each(function() {
        tArguments[$(this).attr('name')] = $(this).val();
    });
    var data = {
        'template': $('#template').val(),
        'arguments': tArguments
    };
    $.ajax({
        url: '/run-template',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function(response) {
            console.log(response);
            console.log(response['output']);
            $('#output-text').text(response['output']);
        }
    });
});
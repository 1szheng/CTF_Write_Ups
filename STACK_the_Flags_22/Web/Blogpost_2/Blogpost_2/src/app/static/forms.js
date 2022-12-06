
const url = window.location.href

function inputCheck(name) {
    var i = $('input[name="' + name + '"]');
    console.log(i.val())
    if (i.val() == '') {
        i.removeClass('filled')
    } else {
        i.addClass('filled')
    }
}

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

/*
$("input").each(function() {
    $(this).keyup(function() {

               var input = $(this);

               if( input.val() == "" ) {
                 input.removeClass('filled');
               } else {
                    input.addClass('filled');
               }
           });
});
*/

$('.form-submit.register').click(function(e){
    e.preventDefault();

    var formData = JSON.stringify(getFormData($(".register-form")));

    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        dataType: "json",
        contentType : "application/json"
    }).done(function(response){
        console.log(response)
        if (response.message == "Success"){
            window.location.href = "/login";
        }
        else {
            console.log(response.message);
        }
    });
});

$('.form-submit.login').click(function(e){
    e.preventDefault();

    var formData = JSON.stringify(getFormData($(".login-form")));

    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        dataType: "json",
        contentType : "application/json"
    }).done(function(response){
        if (response.message == "Success"){
            window.location.href = "/blog";
        }
        else {
            console.log(response.message);
        }
    });
});

$('.form-submit.create').click(function(e){
    e.preventDefault();

    var formData = JSON.stringify(getFormData($(".post-form")));

    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        dataType: "json",
        contentType : "application/json"
    }).done(function(response){
        if (response.message == "Success"){
            window.location.href = "/blog";
        }
        else {
            console.log(response.message);
        }
    });
});

$('#proxy-file').bind('change', function() { 
    var fileName = ''; 
    fileName = $(this).prop('files')[0].name;
    $(this).parent().find('span').text(fileName);
})

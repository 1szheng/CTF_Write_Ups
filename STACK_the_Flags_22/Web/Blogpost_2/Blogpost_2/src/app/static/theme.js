function toDark() {
    var r = document.querySelector(':root');
    r.style.setProperty('--color', '#121212');
    r.style.setProperty('--color-dark', '#000000');
    r.style.setProperty('--color-light', '#191919');
    r.style.setProperty('--text-color', '#fefefe');
    r.style.setProperty('--box-shadow', '0px 0px 10px rgba(255, 255, 255, 0.2)');
}

if ($('body').hasClass('dark')) {
    toDark();
}

$('.theme-selector').click(function() {
    $.ajax({
        type: "GET",
        url: window.location.origin + "/theme",
    }).done(function(response){
        if (response.message == "light"){
            $('body').removeClass('dark');
            var r = document.querySelector(':root');
            r.style.setProperty('--color', '#f5f5f5');
            r.style.setProperty('--color-dark', '#000000');
            r.style.setProperty('--color-light', '#191919');
            r.style.setProperty('--text-color', '#090808');
            r.style.setProperty('--box-shadow', '0px 0px 10px rgba(0, 0, 0, 0.2)');
        }
        else if (response.message == "dark"){
            $('body').addClass('dark');
            toDark();
        } else {
            console.log(response.message);
        }
    });
});


//move this to a different function that just looks at the username as a parameter
//everytime there is a potential modify of the username, call that function after that w/ new username



$('.unhide-add-trips').on('click', function () {
    $('#js-trip-list-form').toggleClass('hidden');
    $('.saved-trips').toggleClass('hidden');
});

$('.unhide-saved-trips').on('click', function () {
    $('#js-trip-list-form').toggleClass('hidden');
    $('.saved-trips').toggleClass('hidden');
});

$('.initial-save-btn').on('click', function () {
    $('.initial').addClass('hidden');
    $('.choice').removeClass('hidden');
});

$('.new-user-btn').on('click', function () {
    $('.new-user').removeClass('hidden');
    $('.choice').addClass('hidden');
});

$('.returning-user-btn').on('click', function () {
    $('.returning-user').removeClass('hidden');
    $('.choice').addClass('hidden');
});
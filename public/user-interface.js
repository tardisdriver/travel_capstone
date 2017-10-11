$('.user-btn').on('click', function () {
    $('#logged-in').removeClass('hidden');
    $('#login').addClass('hidden');
    $('#logged-in-user').text(`Welcome, ${getUser()}!`);
});

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
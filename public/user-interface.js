$('.user-btn').on('click', function () {
    $('#logged-in').removeClass('hidden');
    $('#login').addClass('hidden');
    $('#logged-in-user').text(`Welcome, ${username}!`);
});

$('.unhide-add-trips').on('click', function () {
    $('#js-trip-list-form').toggleClass('hidden');
    $('.saved-trips').toggleClass('hidden');
});

$('.unhide-saved-trips').on('click', function () {
    $('#js-trip-list-form').toggleClass('hidden');
    $('.saved-trips').toggleClass('hidden');
});
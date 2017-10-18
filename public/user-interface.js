/* global $ */

$('.unhide-add-trips').on('click', () => {
  $('#js-trip-list-form').removeClass('hidden');
  $('.saved-trips').addClass('hidden');
  $('.unhide-add-trips').css('text-decoration', 'underline');
  $('.unhide-saved-trips').css('text-decoration', 'none');
});

$('.unhide-saved-trips').on('click', () => {
  $('#js-trip-list-form').addClass('hidden');
  $('.saved-trips').removeClass('hidden');
  $('.unhide-saved-trips').css('text-decoration', 'underline');
  $('.unhide-add-trips').css('text-decoration', 'none');
});

$('.initial-save-btn').on('click', () => {
  $('.initial').addClass('hidden');
  $('.choice').removeClass('hidden');
});

$('.new-user-btn').on('click', () => {
  $('.new-user').removeClass('hidden');
  $('.choice').addClass('hidden');
});

$('.returning-user-btn').on('click', () => {
  $('.returning-user').removeClass('hidden');
  $('.choice').addClass('hidden');
});

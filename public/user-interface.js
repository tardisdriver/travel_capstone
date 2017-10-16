/* global $ */

$('.unhide-add-trips').on('click', () => {
  $('#js-trip-list-form').toggleClass('hidden');
  $('.saved-trips').toggleClass('hidden');
});

$('.unhide-saved-trips').on('click', () => {
  $('#js-trip-list-form').toggleClass('hidden');
  $('.saved-trips').toggleClass('hidden');
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

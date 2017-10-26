/* global $ */

$('#js-add-trip').on('click', () => {
  $('#js-trip-list-form').removeClass('hidden');
  $('.saved-trips').addClass('hidden');
  $('#js-add-trip').addClass('selected');
  $('#js-saved-trips').addClass('inactive').removeClass('selected');
});

$('#js-saved-trips').on('click', () => {
  $('#js-trip-list-form').addClass('hidden');
  $('#js-saved-trips').addClass('selected');
  $('.saved-trips').removeClass('hidden').addClass('selected');
  $('#js-add-trip').addClass('inactive').removeClass('selected');
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

$('#js-trip-list-form').on('submit', () => {
  $('#success').removeClass('hidden');
  $('#success').delay(1000).fadeOut(1200, function () {
    $('#success').addClass('hidden');
  });
});


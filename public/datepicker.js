function datePicker() {
    const date_input = $('input[name="date"]');
    const container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    const options = {
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    };
    date_input.datepicker(options);
}



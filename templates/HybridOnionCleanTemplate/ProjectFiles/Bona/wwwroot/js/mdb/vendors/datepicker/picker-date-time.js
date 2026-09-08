jQuery(($) => {

    $.fn.dateTimePicker = function (delimiter = ', ') {

        const $this = $(this)[0];
        const parent = $(this).parent();
        let result = $(`.picker-opener[data-open='${$this.dataset.open}']`, parent);
        const $timePicker = $(`.timepicker[data-open='${$this.dataset.open}']`, parent);
        const $datePicker = $(`.${$this.dataset.open}`, parent);

        $datePicker.pickadate({
            onClose: function () {

                const input = $timePicker.pickatime({
                    afterHide: () => {
                        $timePicker.trigger("change");
                    }
                });
                const picker = input.pickatime('picker');
                picker.data('clockpicker').show();
            },
            format: 'dd/mm/yyyy',
            formatSubmit: 'dd/mm/yyyy',
        });

        $datePicker.on('change', () => {
            let timeValue = $timePicker.val();
            let dateValue = $datePicker.val();
            result[0].value = `${dateValue}${timeValue !== '' && dateValue !== '' ? delimiter : ''}${timeValue}`;
            $(this).focus();
          
        });

        $timePicker.on('change', () => {
            let timeValue = $timePicker.val();
            let dateValue = $datePicker.val();
            result[0].value = `${dateValue}${timeValue !== '' && dateValue !== '' ? delimiter : ''}${timeValue}`;
              $(this).focus();
        });

    };

});

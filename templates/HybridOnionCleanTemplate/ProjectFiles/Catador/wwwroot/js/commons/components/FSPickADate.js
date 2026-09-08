var FSPickADate = function () {

    $.fn.dateTimePicker = function (delimiter = ', ') {
        for (let element of $(this)) {
            const $this = $(element)[0];

            let result = $(`.picker-opener[data-open='${$this.dataset.open}']`);
            const $timePicker = $(`.timepicker[data-open='${$this.dataset.open}']`);
            const $datePicker = $(`#${$this.dataset.open}`);

            $datePicker.pickadate({
                monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                showMonthsShort: false,
                showWeekdaysFull: false,
                today: 'Hoy',
                clear: 'Limpiar',
                close: 'Cerrar',
                labelMonthNext: 'Próximo mes',
                labelMonthPrev: 'Mes anterior',
                labelMonthSelect: 'Seleccione el mes',
                labelYearSelect: 'Seleccione el año',
                //selectMonths: true,
                //selectYears: true,
                format: 'dd-mm-yyyy',
                formatSubmit: 'dd-mm-yyyy',
                editable: false,
                onClose: function () {
                    const input = $timePicker.pickatime({
                        format: 'h:i A',
                        twelvehour: true,
                        donetext: "Guardar",
                        cleartext: "Limpiar",
                        afterHide: () => {
                            $timePicker.trigger("change");
                        }
                    });
                    const picker = input.pickatime('picker');
                    picker.data('clockpicker').show();
                }
            });

            $datePicker.on('change', () => {
                let timeValue = $timePicker.val();
                let dateValue = $datePicker.val();
                result[0].value = `${dateValue}${timeValue !== '' && dateValue !== '' ? delimiter : ''}${timeValue}`;

            });

            $timePicker.on('change', () => {
                let timeValue = $timePicker.val();
                let dateValue = $datePicker.val();
                result[0].value = `${dateValue}${timeValue !== '' && dateValue !== '' ? delimiter : ''}${timeValue}`;
                $(this).focus();
            });
        }


        $('.picker-opener').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const elementOpenData = event.target.dataset.open;
            const $input = $(`#${elementOpenData}`).pickadate();
            const picker = $input.pickadate('picker');

            picker.open();
        });
      

    };

  
    // Private functions
    var initializeDatePickers = function () {
        //debugger
        if ($('.fs-pickadate').length > 0) {
            $('.fs-pickadate').pickadate({
                monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                showMonthsShort: false,
                showWeekdaysFull: false,
                today: 'Hoy',
                clear: 'Limpiar',
                close: 'Cerrar',
                labelMonthNext: 'Próximo mes',
                labelMonthPrev: 'Mes anterior',
                labelMonthSelect: 'Seleccione el mes',
                labelYearSelect: 'Seleccione el año',
                //selectMonths: true,
                //selectYears: true,
                format: 'dd-mm-yyyy',
                formatSubmit: 'dd-mm-yyyy',
                editable: true,
                onClose: function (context) {
                    this.$node.focus()
                }
            });
        }
        if ($('.fs-pickadatetime').length > 0) {
            $('.fs-pickadatetime').dateTimePicker();
        }
        if ($('.fs-pickatime').length > 0) {
            $('.fs-pickatime').pickatime({
                //format: 'h:i A',
                twelvehour: true,
                donetext: "Guardar",
                cleartext: "Limpiar",
                afterHide: function (context) {
                    //debugger
                    //$('.fs-pickatime').focus();
                },
            });
        }

    }


 

    return {
        // public functions
        init: function () {
            initializeDatePickers();
        },
        getInstance: (selector) => {
            let element;
            if (selector.nodeType === Node.ELEMENT_NODE)
                element = selector;
            else
                element = (selector && `.${selector},#${selector}`) ?? '.datepicker';
            return $(element);
        },


    };
}();

jQuery(document).ready(function () {
    FSPickADate.init();
});
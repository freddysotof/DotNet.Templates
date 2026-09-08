// Class definition

var FSBootstrapAutoComplete = function () {

    // Private functions
    var initialize = function () {

        $('.mdb-autocomplete').mdbAutocomplete();
    }

    return {
        // public functions
        init: function () {
            initialize();
        },
        getInstance: (selector) => {
            let element;
            if (selector.nodeType === Node.ELEMENT_NODE)
                element = selector;
            else
                element = (selector && `.${selector},#${selector}`) ?? 'selectpicker';
            return $(element);
        },
        addData: (selector, data, dataColor = 'black', inputFocus = '2px solid green', inputBlur = '1px solid #ced4da', inputFocusShadow ='0 1px 0 0 #4285f4',inputBlurShadow='') => {
            const element = FSBootstrapAutoComplete.getInstance(selector);
            $(element).siblings('.mdb-autocomplete-wrap').remove();
            $(element).mdbAutocomplete({
                data,
                dataColor,
                inputFocus,
                inputFocusShadow,
                inputBlur,
                inputBlurShadow
            })
        },
        clear: (selector) => {
            const element = FSBootstrapAutoComplete.getInstance(selector);
            $(element).mdbAutocomplete().clear();
        }


    };
}();

jQuery(document).ready(function () {
    FSBootstrapAutoComplete.init();
});
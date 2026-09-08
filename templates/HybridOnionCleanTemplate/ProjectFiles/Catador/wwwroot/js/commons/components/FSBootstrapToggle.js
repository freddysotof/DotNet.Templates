// Class definition

var FSBootstrapToggle = function () {

    return {
        // public functions
        getInstance: (selector) => {
            let element;
            if (selector.nodeType === Node.ELEMENT_NODE)
                element = selector;
            else
                element = (selector && `.${selector},#${selector}`);
            return element;
        },
        triggerClick: (element, callback) => {
            if (element.nodeType === Node.ELEMENT_NODE)
                $(element).trigger('click');
            else
                element && $(`.${element},#${element}`).trigger('click');
            if (callback)
                callback()
        },
        getBitValue: (element) => {
            if (element.nodeType === Node.ELEMENT_NODE)
                return $(element).prop('checked');
            else
                return element && $(`.${element},#${element}`).prop('checked');
        },
        getValue: (element) =>  (FSBootstrapToggle.getBitValue(element) & 1),
        setValue: (element,value) => {
            if (element.nodeType === Node.ELEMENT_NODE)
                 $(element).prop('checked', true == value);
            else
                return element && $(`.${element},#${element}`).prop('checked', true == value);
        },
        toggle: (element) => {
            if (element.nodeType === Node.ELEMENT_NODE) {
                const value = FSBootstrapToggle.getValue(element)
                $(element).prop('checked', !value);
                element.value = !value & 1;
            }
            else {
                if (element) {
                    const value = FSBootstrapToggle.getValue($(`.${element},#${element}`)[0]);
                    $(`.${element},#${element}`).prop('checked', !value);
                    $(`.${element},#${element}`).val(!value & 1)
                }
                
            }
        },
         
        setChecked: (element, callback) => {
            if (element.nodeType === Node.ELEMENT_NODE) {
                $(element).prop('checked', true);
                element.value = 1;
            } else {
                element && $(`.${element},#${element}`).prop('checked', true);
                element && $(`.${element},#${element}`).val(1);
            }
              
            if (callback)
                callback()
        },
        setUnChecked: (element, callback) => {
            if (element.nodeType === Node.ELEMENT_NODE) {
                $(element).prop('checked', false);
                element.value = 1;
            }
            else {
                element && $(`.${element},#${element}`).prop('checked', false);
                element && $(`.${element},#${element}`).val(0);
            }
         
            if (callback)
                callback()
        },
        disable: (selector) => {
            const element = FSBootstrapToggle.getInstance(selector);
            $(element).prop('disabled', true);
        },
        enable: (selector) => {
            const element = FSBootstrapToggle.getInstance(selector);
            $(element).prop('disabled', null);
        },
        onClick: (selector, callback) => {
            let element;
            if (selector.nodeType === Node.ELEMENT_NODE) {
                element = selector;
            }
            else {
                element = $(`.${selector},#${selector}`)
            }
            element.addEventListener('click', callback);
        }

    };
}();

jQuery(document).ready(function () {
    //FSBootstrapSelect.init();
});
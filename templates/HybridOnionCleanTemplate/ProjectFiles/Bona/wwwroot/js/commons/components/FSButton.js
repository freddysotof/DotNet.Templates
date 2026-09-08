// Class definition

var FSButton = function () {

    // Private functions
    var initialize = function () {

    }
    const loadingButtonEvent = (title, spinnerColor,event) => {
        let element = event.currentTarget ?? event.target;
        setLoadingHtml(element, title, spinnerColor);
    }
    const setLoadingHtml = (element,title, spinnerColor) => 
        $(element).html(`<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>${title ?? ''}`).attr('disabled', true);

    const removeLoadingHtml = (element, title) =>
        $(element).html(title).attr('disabled', null);
    return {
        // public functions
        init: function () {
            initialize();
        },
        getInstance: (selector) => {
            let element;
            if (selector.nodeType === Node.ELEMENT_NODE)
                element = $(selector);
            else
                element = $(selector && `.${selector},#${selector}`);
            if (element.length>0)
                return $(element)[0];
        },
        addEvent: (selector, listener='click', callback) => {
            let element = FSButton.getInstance(selector);
            element.addEventListener(listener, callback);
        },
        removeEvent: (selector,listener='click', callback) => {
            let element = FSButton.getInstance(selector);
            element.removeEventListener(listener, callback);
        },

        addLoadingOnClick: (selector,title,spinnerColor) => {
            let element = FSButton.getInstance(selector);
            element.addEventListener('click', loadingButtonEvent.bind(null,title,spinnerColor));
        },
        deleteLoadingOnClick: (selector) => {
            let element = FSButton.getInstance(selector);
            element.removeEventListener("click", loadingButtonEvent);
        },
        setLoadingButton: (selector,title,spinnerColor) => {
            let element = FSButton.getInstance(selector);
            setLoadingHtml(element, title, spinnerColor);
        },
        setDefault: (selector, title) => {
            let element = FSButton.getInstance(selector);
            removeLoadingHtml(element, title);
        }


    };
}();

jQuery(document).ready(function () {
    FSButton.init();
});
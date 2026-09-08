// Class definition

var FSBootstrapToolTip = function () {

    // Private functions
    var initialize = function () {
        $('[data-toggle="tooltip"]').tooltip({
            //trigger: 'hover'
        })  
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
                element = (selector && `.${selector},#${selector}`);
            return $(`${element}[data-toggle="tooltip"]`)[0];
        },
        changeTitle: (selectorName, value) => {
            const element = FSBootstrapToolTip.getInstance(selectorName);
            $(element).data('originalTitle', value);
            $(element).data('mdbOriginalTitle', value);
        }
   
    };
}();

jQuery(document).ready(function () {
    FSBootstrapToolTip.init();
});
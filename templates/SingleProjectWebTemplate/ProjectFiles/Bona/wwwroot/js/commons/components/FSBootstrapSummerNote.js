// Class definition

var FSBootstrapSummerNote = function () {

    // Private functions
    var initialize = function () {
        $('.summernote').summernote();
    }

    return {
        // public functions
        init: function () {
            initialize();
        },
        getValue: (selector,isText=true)=> {
            if (selector.nodeType === Node.ELEMENT_NODE)
                element = selector;
            else
                element = `.${selector},#${selector}`;
            if (isText)
                return $(element).summernote('code').replace(/<\/?[^>]+(>|$)/g, "");
            else
                return $(element).summernote('code');
        },
        setValue: (selector,value) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                element = selector;
            else
                element = `.${selector},#${selector}`;
            return $(element).summernote('code',value);
        }
   
    };
}();

jQuery(document).ready(function () {
    FSBootstrapSummerNote.init();
});
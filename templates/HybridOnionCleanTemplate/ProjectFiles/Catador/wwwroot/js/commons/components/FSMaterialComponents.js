// Class definition

var FSMaterialComponents = function () {
    var initialize = function () {
        $('.fs-treeview').mdbTreeview();
    }

    return {
        // public functions
        init: function () {
            initialize();
        }
    };
}();
jQuery(document).ready(function () {
    FSMaterialComponents.init();
});
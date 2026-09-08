


var FSBootstrapTab = function () {

    // Private functions
    //var initialize = function () {
    //    // minimum setup
    //    $('.fs-selectpicker').selectpicker();
    //}

    return {
        // public functions
        //init: function () {
        //    initialize();
        //},
        changeTabName: (selector, name) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                $(selector).html(name);
            else {
                $(`.${selector},#${selector}`).html(name)
            }
        },
        show: (selector,hideOtherTabs=false,scrollIntoView=true) => {
            let element
            if (selector.nodeType === Node.ELEMENT_NODE)
                element = selector;
            else 
                element = `.${selector},#${selector}`
            if (hideOtherTabs) {
                const siblingsTab = $(element).parent().siblings().find('[role="tab"]')
                for (let sibling of siblingsTab) {
                    const ref = $(sibling).attr('href');
                    $(ref).removeClass('active show');
                }
               
            }

            $(element).show()
            $(element).tab('show')
            const ref = $(element).attr('href');
            $(ref).addClass('active show');
            if (scrollIntoView) {
                setTimeout(() => {
                    if (selector.nodeType === Node.ELEMENT_NODE)
                        selector.scrollIntoView();
                    else
                        document.getElementById(selector).scrollIntoView();
                    //window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 400)
            }
           
         
        },
        click: (selector) => {
            let element
            if (selector.nodeType === Node.ELEMENT_NODE)
                element = selector;
            else
                element = `.${selector},#${selector}`
            $(element).click()
        },
        hasNextTab: (selector) => {
            if (selector.nodeType === Node.ELEMENT_NODE) 
                return $('[role="tab"].active', selector).parent().next().find('[role="tab"]').length != 0;
            
            else
                return $('[role="tab"].active', `.${selector},#${selector}`).parent().next().find('[role="tab"]').length != 0;
        },
        showNextTab: (selector,scrollIntoView) => {
            let tab;
            if (selector.nodeType === Node.ELEMENT_NODE) {
                tab = $('[role="tab"].active', selector).parent().next().find('[role="tab"]')[0];
            }
            else {
                tab = $('[role="tab"].active', `.${selector},#${selector}`).parent().next().find('[role="tab"]')[0];
            }
            if (tab)
                FSBootstrapTab.show(tab, true, scrollIntoView);
        },
        hasPreviousTab: (selector) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                return $(selector).parent().prev().find('[role="tab"]').length != 0;
            else
                return $('[role="tab"].active', `.${selector},#${selector}`).parent().prev().find('[role="tab"]').length != 0;
        },
        showPreviousTab: (selector, scrollIntoView) => {
            let tab;
            if (selector.nodeType === Node.ELEMENT_NODE) {
                tab = $('[role="tab"].active', selector).parent().prev().find('[role="tab"]')[0];
            }
            else {
                tab = $('[role="tab"].active', `.${selector},#${selector}`).parent().prev().find('[role="tab"]')[0];
            }
            if (tab)
                FSBootstrapTab.show(tab, true, scrollIntoView);
        },
        hide: (selector) => {
            if (selector.nodeType === Node.ELEMENT_NODE) {
                $(selector).hide()
            }
            else {
                $(`.${selector},#${selector}`).hide()
            }
        },
        //hide: (selector) => {
        //    if (selector.nodeType === Node.ELEMENT_NODE) {
        //        $(selector).addClass('d-none')
        //    }
        //    else {
        //        $(`.${selector},#${selector}`).addClass('d-none')
        //    }
        //},
        onShow: (selector, callback) => {
            if (selector.nodeType === Node.ELEMENT_NODE) {
                $(selector).on('show.bs.tab', function (event) {
                    callback();
                });
            }
            else {
                $(`.${selector},#${selector}`).on('show.bs.tab', function (event) {
                    callback();
                });
            }
            return true;
        },
        onShown: (selector, callback) => {
            if (selector.nodeType === Node.ELEMENT_NODE) {
                $(selector).on('shown.bs.tab', function (event) {
                    callback();
                });
            }
            else {
                $(`.${selector},#${selector}`).on('shown.bs.tab', function (event) {
                    callback();
                });
            }
            return true;
        },
        onHide: (selector, callback) => {
            if (selector.nodeType === Node.ELEMENT_NODE) {
                $(selector).on('hide.bs.tab', function (event) {
                    callback(event);
                }); 
            }
            else {
                $(`.${selector},#${selector}`).on('hide.bs.tab', function (event) {
                    callback(event);
                }); 
            }
            return true;
        },
        onHidden: (selector, callback) => {
            if (selector.nodeType === Node.ELEMENT_NODE) {
                $(selector).on('hidden.bs.tab', function (event) {
                    callback(event);
                });
            }
            else {
                $(`.${selector},#${selector}`).on('hidden.bs.tab', function (event) {
                    callback(event);
                });
            }
            return true;
        }

    };
}();

jQuery(document).ready(function () {
    //FSBootstrapSelect.init();
});
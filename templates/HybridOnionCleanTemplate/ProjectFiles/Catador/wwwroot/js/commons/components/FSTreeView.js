// Class definition

var FSTreeView = function () {

    // Private functions
    var initialize = function () {
        (function ($) {
            let $allPanels = $('.nested').hide();
            let $elements = $('.mdb-treeview-animated-element');

            $('.closed').click(function (event) {
                event.stopPropagation();
                $this = $(this);
                $target = $this.siblings('.nested');
                $pointer = $this.children('.fa-angle-right');

                $this.toggleClass('open')
                $pointer.toggleClass('down');

                !$target.hasClass('active') ? $target.addClass('active').slideDown() :
                    $target.removeClass('active').slideUp();

                return false;
            });

            $elements.click(function () {
                $this = $(this);
                $this.hasClass('opened') ? ($this.removeClass('opened')) : ($elements.removeClass('opened'), $this.addClass('opened'));
            })
        })(jQuery);
    }

    return {
        // public functions
        init: function () {
            initialize();
        },
        buildTreeView: (id, title, width = null,classes,html,sortable=false) =>
            `<div class="flex-grow-1 mdb-treeview-animated ${width??''} border ${classes}">
            <h6 class="pt-3 pl-3">${title}</h6>
            <div class="row pt-3 pl-3">
                ${html ?? ''}
            </div>
            <hr>
            <ul  id="${id}" name="${id}" class="${sortable ? "fs-sortable" : ''} mdb-treeview-animated-list mb-3" id="${id}-list" name="${id}-list">
            </ul>
        </div>`,
        appendTreeView: (parentSelector,id,title,width,classes,html) => {
            let parent;
            if (parentSelector.nodeType === Node.ELEMENT_NODE)
                parent = parentSelector;
            else
                parent = `.${parentSelector},#${parentSelector}`;

            return $(FSTreeView.buildTreeView(id, title, width, classes, html)).appendTo(parent)[0];
        },
        appendSortableTreeView: (parentSelector, id, title, width, classes, html) => {
            let parent;
            if (parentSelector.nodeType === Node.ELEMENT_NODE)
                parent = parentSelector;
            else
                parent = `.${parentSelector},#${parentSelector}`;

            return $(FSTreeView.buildTreeView(id, title, width, classes, html,true)).appendTo(parent)[0];
        },
        buildTreeViewNestedElement: (id, title, classes) =>
            `
            <li class="mdb-treeview-animated-items ">
                <a class="mdb-treeview-dropdown closed ${classes ?? ''}">
                    <i class="fas fa-angle-right"></i>
                    <span id="${id}-span" name="${id}-span">${title}</span>
                </a>
                <ul class="nested"  id="${id}" name="${id}">
                    <li id="${id}-list" name="${id}-nested-list">
                    </li>
                </ul>
            </li>    
            `,
        appendTreeViewNestedElement: (parentSelector, id, title,classes,opened) => {
            let parent;
            if (parentSelector.nodeType === Node.ELEMENT_NODE)
                parent = parentSelector;
            else
                parent = `.${parentSelector},#${parentSelector}`;

            const element = $(FSTreeView.buildTreeViewNestedElement(id, title, classes)).appendTo(parent)[0];
            let toggleElement = element.getElementsByClassName('closed')[0];
            let nestedElement = element.getElementsByClassName('nested')[0];
            if (!opened) {
                nestedElement.style.display = "none";
            } else {
                nestedElement.style.display = "";
            }
            toggleElement.addEventListener('click', (event) => {
                $this = $(event.currentTarget ?? event.target);
                $target = $this.siblings('.nested');
                $pointer = $this.children('.fa-angle-right');

                $this.toggleClass('open')
                $pointer.toggleClass('down');

                !$target.hasClass('active') ? $target.addClass('active').slideDown() :
                    $target.removeClass('active').slideUp();

                return false;
            })
            return element;

        },
        buildTreeViewElement: (id, title, icon, iconClass, iconToolTip,html,opened=false) =>
            `
                <li id="${id}" name="${id}" class="mdb-treeview-animated-element d-flex ${opened ? 'opened':''} ">
                    ${title ? `<span id="${id}-span" name="${id}-span" class="w-100">${title ?? ''}</span>`:''}
                      ${(icon && `<i id="${id}-icon" name="${id}-icon" 
                        class="${iconClass} fs-margin-l-5  fs-margin-t-5" 
                        data-toggle="tooltip" data-placement="bottom"
                        data-original-title="${iconToolTip}" title="${iconToolTip}" aria-hidden="true"></i>`) || ''
            }
                      ${html ? html:''}
                </li>
            `,
        appendTreeViewElement: (parentSelector, id, title, icon, iconClass ='fa fa-times mdb-treeview-animated-element-remove',iconToolTip,iconCallback,html,opened) => {
            let parent;
            if (parentSelector.nodeType === Node.ELEMENT_NODE)
                parent = parentSelector;
            else
                parent = `.${parentSelector},#${parentSelector}`;
            let parentElement = $(parent)[0];
            if (parentElement.classList.contains('mdb-treeview-animated-items')) {
                parentElement = $('.nested', parentElement)[0];
            }
            const element = $(FSTreeView.buildTreeViewElement(id, title, icon, iconClass, iconToolTip, html, opened)).appendTo(parentElement)[0];
            element.addEventListener('click', (event) => {
                $this = $(event.currentTarget ?? event.target);
                $elements = $this.parent().find('.mdb-treeview-animated-element');
                let exists = $elements.filter($this[0]);
                
                if (exists.length > 0)
                    $this.hasClass('opened') ? ($this.removeClass('opened')) : ($elements.removeClass('opened'), $this.addClass('opened'));
                    //($elements.removeClass('opened'), $this.addClass('opened'));
                    //
            });

            if (icon) {
                let iconElement = $('i', element)[0];
                iconElement.addEventListener('click', iconCallback);
            }
            return element;
        },
        appendSortableTreeViewElement: (parentSelector, id, title, icon, iconClass = 'fa fa-times mdb-treeview-animated-element-remove', iconToolTip, iconCallback, html) => {
            let parent;
            if (parentSelector.nodeType === Node.ELEMENT_NODE)
                parent = parentSelector;
            else
                parent = `.${parentSelector},#${parentSelector}`;

            const element = $(FSTreeView.buildTreeViewElement(id, title, icon, iconClass, iconToolTip, html,true)).appendTo(parent)[0];
            element.addEventListener('click', (event) => {
                $this = $(event.currentTarget ?? event.target);
                $elements = $('.mdb-treeview-animated-element');
                $this.hasClass('opened') ? ($this.removeClass('opened')) : ($elements.removeClass('opened'), $this.addClass('opened'));
            });

            if (icon) {
                let iconElement = $('i', element)[0];
                iconElement.addEventListener('click', iconCallback);
            }
            return element;
        },

    };
  
}();

jQuery(document).ready(function () {
    //FSTreeView.init();
});
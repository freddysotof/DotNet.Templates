// Class definition

var FSBootstrapSelect = function () {

    // Private functions
    var initialize = function () {
        // minimum setup
        $('.fs-selectpicker').selectpicker({
            noneSelectedText: 'SELECCIONE',
            noneResultsText: 'No hay opciones que coincidan con {0}',
            //nSelectedText: 'Seleccionado',
            language: 'ES',

        });
    }

    const mapToOption = (obj) => {
        return `<option value="${obj.value}" 
                ${(obj.subText && `data-subtext="${obj.subText}"`)??''}>
                    ${obj.text}
            </option>`
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
            return element;
        },
        setTitle: (selector, value) => {
            let element;
            if (selector.nodeType === Node.ELEMENT_NODE)
                element = selector;
            else
                element = (selector && `.${selector},#${selector}`) ?? 'selectpicker';

            $(element).selectpicker({ title: value });
            FSBootstrapSelect.render(selector);
        },
        setValue: (selector, value) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                $(selector).selectpicker('val', value);
            else {
                const element = selector ?? 'selectpicker';
                $(`.${element},#${element}`).selectpicker('val', value);
            }
            
        },
        getValue: (selector) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                return $(selector).selectpicker('val');
            else {
                const element = selector ?? 'selectpicker';
                return $(`.${element},#${element}`).selectpicker('val');
            }
        },
        onChange: (selector, callback) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                $(selector).on('changed.bs.select', (event) => callback && callback(event))
            else {
                const element = selector ?? 'selectpicker';
                $(`.${element},#${element}`)
                    .on('changed.bs.select', (event) => callback && callback(event))
            }
        },
        onHidden: (selector, callback) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                $(selector).on('hide.bs.select', (event) => callback && callback(event))
            else {
                const element = selector ?? 'selectpicker';
                $(`.${element},#${element}`)
                    .on('hide.bs.select', (event) => callback && callback(event))
            }
        },
        add: (selector, data,emptyValue=false) => {
            let mappedData;
            if (Array.isArray(data)) {
                mappedData = data.map(mapToOption)
            }
            else
                mappedData = mapToOption(data)
            if (selector.nodeType === Node.ELEMENT_NODE) {
                emptyValue && $(selector).append(mapToOption({ value: "", text: "SELECCIONE" }));
                if (mappedData && mappedData.length > 0)
                    for (let value of mappedData)
                        $(selector).append(value);
                else if (typeof mappedData == 'object')
                    $(selector).append(mappedData);
                FSBootstrapSelect.refresh(selector);
            }
            else {
                const element = selector ?? 'selectpicker';
                emptyValue && $(`.${element},#${element}`).append(mapToOption({ value: "", text: "SELECCIONE" }));
                if (mappedData && mappedData.length > 0)
                    for (let value of mappedData)
                        $(`.${element},#${element}`).append(value);
                else if (typeof mappedData == 'object')
                    $(`.${element},#${element}`).append(mappedData);
                FSBootstrapSelect.refresh(element);
          
            }
        
        },
        render: (selector) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                $(selector).selectpicker('render');
            else {
                const element = selector ?? 'selectpicker';
                $(`.${element},#${element}`).selectpicker('render');
            }
        },
        refresh: (selector) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                $(selector).selectpicker('refresh');
            else {
                const element = selector ?? 'selectpicker';
                $(`.${element},#${element}`).selectpicker('refresh');
            }
        },
        empty: (selector) => {
            if (selector.nodeType === Node.ELEMENT_NODE) {
                $('option', selector).remove();
                FSBootstrapSelect.refresh(selector);
            }
            else {
                const element = selector ?? 'selectpicker';
                $('option',`.${element},#${element}`).remove()
                FSBootstrapSelect.refresh(selector);
            }
        },
        setStyle: (selector, classes) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                $(selector).addClass(classes).selectpicker('setStyle');
            else {
                const element = selector ?? 'selectpicker';
                $(`.${element},#${element}`).addClass(classes).selectpicker('setStyle');
            }
        },
        replaceButtonClass: (selector, classes) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                $(selector).selectpicker('setStyle', classes);
            else {
                const element = selector ?? 'selectpicker';
                $(`.${element},#${element}`).selectpicker('setStyle', classes);
            }
        },
        addButtonClass: (selector, classes) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                $(selector).selectpicker('setStyle', classes, 'add');
            else {
                const element = selector ?? 'selectpicker';
                $(`.${element},#${element}`).selectpicker('setStyle', classes, 'add');
            }
            FSBootstrapSelect.refresh(selector);
        },
        removeButtonClass: (selector, classes) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                $(selector).selectpicker('setStyle', classes, 'remove');
            else {
                const element = selector ?? 'selectpicker';
                $(`.${element},#${element}`).selectpicker('setStyle', classes, 'remove');
            }

        },
        addContainerClass: (selector, classes) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                $(selector).addClass(classes).selectpicker('setStyle');
            else {
                const element = selector ?? 'selectpicker';
                $(`.${element},#${element}`).addClass(classes).selectpicker('setStyle');
            }
            FSBootstrapSelect.refresh(selector);
        },
        removeContainerClass: (selector, classes) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                $(selector).removeClass(classes).selectpicker('setStyle');
            else {
                const element = selector ?? 'selectpicker';
                $(`.${element},#${element}`).removeClass(classes).selectpicker('setStyle');
            }
            FSBootstrapSelect.refresh(selector);
        },
        trigger: (selector, event) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                $(selector).trigger(event)
            else {
                const element = selector ?? 'selectpicker';
                $(`.${element},#${element}`).trigger(event)
            }
        },
        disable: (selector) => {
            const element = FSBootstrapSelect.getInstance(selector);
            $(element).prop('disabled', true);
            $(element).selectpicker('refresh');
        },
        enable: (selector) => {
            const element = FSBootstrapSelect.getInstance(selector);
            $(element).prop('disabled', false);
            $(element).selectpicker('refresh');
        },
        validateSelect: (selector) => {
            const element = FSBootstrapSelect.getInstance(selector);
            const value = FSBootstrapSelect.getValue(element);
            if (value && value != '')
                return true
            return false;
        }
    };
}();

jQuery(document).ready(function () {
    FSBootstrapSelect.init();
});

const getMaxScrollLimit = () =>
    Math.max(document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight); 

const scrollToElement = (selector) => {
    if (typeof (selector) != 'undefined' && selector) {
        let element = getElementInstance(selector);
        element.scrollIntoView();
    } else {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}

const showFloatingGoBackButton = () => {
    let btnGoBackElement = getElementInstance('btn-back-to-previous-tab');
    btnGoBackElement.classList.remove('d-none');
}

const hideFloatingGoBackButton = () => {
    let btnGoBackElement = getElementInstance('btn-back-to-previous-tab');
    btnGoBackElement.classList.add('d-none');
}

const isNullOrEmpty = (variable) => (typeof (variable) == 'undefined' || variable == null || variable === '')
const isArrayNullOrEmpty = (variable) => (typeof (variable) == 'undefined' || variable == null || variable.length==0)

const initializeScrollToTopFloatingButtons= (selectorName='btn-back-to-top') => {
    //Get the button
    let scrollToTopButtonContainer = document.getElementById(selectorName);
    if (scrollToTopButtonContainer != null) {
        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = function () {
            scrollFunction();
            //scrollContinueStep();
        };

        function scrollFunction() {
            if (
                document.body.scrollTop > 50 ||
                document.documentElement.scrollTop > 50
            ) {
                scrollToTopButtonContainer.style.display = "flex";
            } else {
                scrollToTopButtonContainer.style.display = "none";
            }
        }
    }
 

}


const initializeHorizontalFloatingButton = () => {
    //Get the button
    let scrollToTopButtonContainer = document.getElementById("btn-floating-horizontal-container");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction();
        //scrollContinueStep();
    };

    function scrollFunction() {
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            scrollToTopButtonContainer.style.display = "block";
        } else {
            scrollToTopButtonContainer.style.display = "none";
        }
    }

}

getValueFromResponsiveTable = (event,valueIndex) => {
    //let tableElement = $(event.currentTarget).parents('tr.child').prev('.parent').parents('table.table')[0];
    let tableElement = $(event.currentTarget).parents('tr').parents('table.table')[0];
/*    let parentRow = $(event.currentTarget).parents('tr.child').prev('.parent');*/
    let parentRow = $(event.currentTarget).parents('tr')[0];
    if (parentRow.classList.contains('.child'))
        parentRow = $(parentRow).prev('.parent');
    const rowData = getDataTableValue(tableElement, parentRow, 0);
    return rowData[valueIndex];
}

getParentRowFromResponsiveTable = (event) => $(event.currentTarget).parents('tr.child').prev('.parent')[0];

getTableNameFromResponsiveTable = (event) => {
    let tableElement = $(event.currentTarget).parents('tr.child').prev('.parent').parents('table.table');
    return tableElement[0].id;
}

drawDataTable= (datatableId) => {
    const element = getElementInstance(datatableId);
    const table = $(element).dataTable().api();
    
    table.responsive.rebuild();
    table.responsive.recalc();
    return table.draw(true);
}

setDataTableSelectFilter = (selectorName, value, isDisabled = false) => {
    FSBootstrapSelect.setValue(selectorName, value)
    FSBootstrapSelect.trigger(selectorName, 'change')
    if (isDisabled)
        FSBootstrapSelect.addClass(selectorName, 'disabled');
    else
        FSBootstrapSelect.removeClass(selectorName, 'disabled');
}

getDataTableValue = (datatableId, row, cellIndex) => {
    const element = getElementInstance(datatableId);
    const table = $(element).dataTable().api();
    if (row && cellIndex)
        return table.cell(row, cellIndex).data();
    else if (row)
        return table.row(row).data();
    else
        return table.data().toArray();
}

getDataTableRowIndex = (datatableId, row, columnIndex,value) => {
    const element = getElementInstance(datatableId);
    const table = $(element).dataTable().api();
    if (columnIndex && row)
        return table.row(row).index();
    else if (!columnIndex && row)
        return table.column(columnIndex).row(row).index();
    else {
        const cells = table.cells(null, columnIndex).toArray()[0];
        let cell;
        if (cells)
            cell = cells.find((key) => {
                if (table.cell(key.row, key.column).data() == value)
                    return key;
            })
        return cell?.row;
    }
}


getDataTableNode = (datatableId, row, columnIndex) => {
    const element = getElementInstance(datatableId);
    const table = $(element).dataTable().api();
    if (!isNullOrEmpty(columnIndex) && !isNullOrEmpty(row))
        return table.cell({ column: columnIndex, row: row }).node();
    else if (isNullOrEmpty(columnIndex) && !isNullOrEmpty(row))
        return table.row(row).node();
    else if (isNullOrEmpty(row) && isNullOrEmpty(columnIndex))
        return table.rows().nodes().toArray();
}

validateDataTableColumnValueExists = (datatableId, columnIndex, value) =>
    getDataTableRowIndex(datatableId, null, columnIndex , value) >= 0;

validateDataTableRowExists = (datatableId, row, columnIndex, value) => {
    const index = getDataTableRowIndex(datatableId, row, columnIndex, value);
    return typeof (index) != 'undefined' ;
}

setDataTableValue = (datatableId, row,columnIndex,data) => {
    //const element = (datatableId && `#${datatableId}`) ?? '.fs-table';
    const element = getElementInstance(datatableId);
    const table = $(element).dataTable().api();
    if ((row != null && row >= 0) && (columnIndex != null && columnIndex>=0)) {
        table.cell({ row: row, column: columnIndex }).data(data).draw();
    }
    else if (row != null && row>=0)
        data && table.row(row).data(data).draw();
    else 
        data && table.row.add(data).draw();
       
}

removeDataTableRow = (datatableId, row) => {
    //const element = (datatableId && `#${datatableId}`) ?? '.fs-table';
    const element = getElementInstance(datatableId);
    const table = $(element).dataTable().api();
    if (row)
      table.row(row).remove().draw();
}

clearDataTable = (datatableId) => {
    //const element = (datatableId && `#${datatableId}`) ?? '.fs-table';
    const element = getElementInstance(datatableId);
    const table = $(element).dataTable().api();
    table.clear().draw();
}

const clearTableHeader = (datatableId) => {
    const element = getElementInstance(datatableId);
    $('thead>tr', element).empty();
}

const addTableHeaders = (datatableId, rows = []) => {
    const element = getElementInstance(datatableId);
    for (let row of rows)
        $('thead>tr', element).append(`<th>${row}</th>`);
}





const mapObjectToRow = (obj)=>
    `<tr>${Object.keys(obj).map((key) => `<td>${obj[key]}</td>`).join('')}</tr>`;


const mapToTableRow = (array) => (array && array.map(mapObjectToRow).join('')) ?? '';

const buildMethod = (methodName, params) => {

    var method = (methodName && methodName.replace(/\s*\(.*?\)\s*/g, '')) ?? "";
    return method && `${method}(event${params ? `,${params}` : ''})`
}

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

Array.prototype.remove = function (index, item) {
    this.splice(index, 1);
};


//Array.prototype.sortByProperty = function (property) {
//    this.sort((val1, val2) => (val1[property] - val2[property]));
//    return this;
//};

//Array.prototype.sortByProperty = function (property) {
//    this.sort((val1, val2) => (val1[property] === null) - (val2[property] === null) || +(val1[property] > val2[property]) || -(val1[property] < val2[property]));
//    return this;
//};

Array.prototype.sortByProperty = function (property) {
    this.sort((val1, val2) => {
        if (isNullOrEmpty(val1[property])) {
            return -1;
        }

        if (isNullOrEmpty(val2[property])) {
            return 1;
        }

        if (val1[property] === val2[property]) {
            return 0;
        }

        return val1[property] < val2[property] ? -1 : 1;
    })
    return this;
};


//Array.prototype.sortDescendingByProperty = function (property) {
//    this.sort((val1, val2) => (val2[property] - val1[property]));
//    return this;
//};


//Array.prototype.sortDescendingByProperty = function (property) {
//    this.sort((val1, val2) => (val1[property] === null) - (val2[property] === null) || -(val1[property] > val2[property]) || +(val1[property] < val2[property]));
//    return this;
//};

Array.prototype.sortDescendingByProperty = function (property) {
    this.sort((val1, val2) => {
        if (isNullOrEmpty(val1[property])) {
            return 1;
        }

        if (isNullOrEmpty(val2[property])) {
            return -1;
        }

        if (val1[property] === val2[property]) {
            return 0;
        }

        return val1[property] < val2[property] ? 1 : -1;
    });
    return this;
};

Array.prototype.groupBy= function( key) {
    return this.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
    return this;
};

Array.prototype.unique = function (key) {
    if (isNullOrEmpty(key))
        return [...new Set(this)]
}



//Array.prototype.sortDescending = function (index, item) {
//    this.sort((val1, val2) => (val2.menuOrder - val1.menuOrder));
//};




const findObjectByProperty = (propertyName, value) =>
    (obj) => obj[propertyName] == value

//[{property:'name',value:'name'}]
const findObjectByProperties = (params = []) =>
    (obj) => {
        let counter = 0;
 
        for (let param of params) {
            let hasParams = obj[param.property] == param.value
            if (hasParams)
                counter++;
        }
        if (counter == params.length)
            return true;
    }


const deletePropertyFromObject = (propertyName) =>
    (obj) => {
        delete obj[propertyName]
        return obj;
    }

const addPropertyToObject = (propertyName) =>
    (obj) => {
        obj[propertyName] = null;
        return obj;
    }

const deepCopy = (array) => JSON.parse(JSON.stringify(array))

//const mapArrayWithParams = (array, params = []) => {
//    const newArray = array.map(key => {
//        const newObject = {};
//        Object.keys(key).map(val => {
//            Object.keys(params).map(p => {
//                if (val == params[p])
//                    newObject[val] = key[val];
//            })
//        })
//        return newObject
//    })
//    return newArray;
//}
const removeProps =  (obj,properties = []) =>{
    for (let prop of properties)
        delete obj[prop];
    return obj;
};


const mapWithParams = (params = []) => 
    (obj) => {
        var newObject = {};
        for (let p of params) {
            newObject[p] = obj[p];
        }
        return newObject;
    }



const removeProperties = (params = []) =>
    (obj) => {
        var newObject = obj;
        for (let p of params) {
            delete newObject[p]
        }
        return newObject;
    }

const addProperties = (params = []) =>
    (obj) => {
        var newObject = obj;
        for (let p of params) {
            newObject[p] = null;
        }
        return newObject;
    }


const columnOptionObject = (identifier, value, state) => {
    return {
        Identifier: identifier,
        Title: value,
        State: state
    }
}

const mapToTableColumnOption = (identifier, title, state) =>
    (obj) => {
        const option = columnOptionObject(identifier, title, state)
        Object.keys(option).map((key) => {
            const value = option[key];
            const propertyName = Object.keys(obj).find((val) => val == value);
            if (propertyName)
                return option[key] = obj[propertyName];
        })
        return option;
    }

const selectObject = (value, label, subText = null) => {
    return {
        value: value,
        text: label,
        subText: subText
    }
}

const mapToOptionHtml = (obj) =>
    `<option value="${obj.value}" 
       ${(obj.subText && `data-subtext="${obj.subText}"`) ?? ''}>
            ${obj.text}
    </option>`


const mapToSelect = (value,text,subText) =>
    (obj) => {
        const select = selectObject(value, text, subText)
        Object.keys(select).map((key) => {
            const value = select[key];
            const propertyName = Object.keys(obj).find((val) => val == value);
            if (propertyName)
                return select[key] = obj[propertyName]; 
        })
        return select;
    }



const convertArrayToObject = (properties = []) =>
    (array) => {
        const newObject = {};
        array.forEach((value, key) => {
            newObject[properties[key]] = value;
        })
        return newObject;
    }


const convertObjectToArray = (obj) => (obj && Object.values(obj)) ?? null;


//const mapToSelectArray = (array, value, text, subText) => {
//    const mappedArray = mapArrayWithParams(array, [value, text,subText]);
//    const obj = selectObject(value, text,subText)
//    const newArray = mappedArray.map(key => {
//        const newObject = {};
//        Object.keys(key).map(val => {
//            Object.keys(obj).map(p => {
//                if (val == obj[p])
//                    newObject[p] = key[val];
//            })
//        })
//        return newObject
//    })
//    return newArray;
//}


//const convertToArrayOld = (arrayOfObjects) => {
//    const newArray = arrayOfObjects.map((object) => {
//        const array = [];
//        Object.keys(object).map((key) => {
//            if (!Array.isArray(object[key]))
//                array.push(object[key])
//        })
//        return array;
//    })
//    return newArray;
//}

const convertToArray = (arrayOfObjects) => {
    return arrayOfObjects.map((object) => {
        return Object.values(object)
    })
}


const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const isDigitValue = (val) => val >>> 0 === parseFloat(val);

const convertToDigit = (val) => {
    let result = isDigitValue(val);
    if (result)
        return parseFloat(val);
    else
        return val;
}



const createDomFilter = (onChangeElement, filterElementClassName, className, parentSelector) => {
    $(onChangeElement).on('change', (event) => {
        let element = event.currentTarget ?? event.target;
        let isArray = false;
        let parentElement = getElementInstance(parentSelector);
        let filterElements = null;
        if (isNullOrEmpty(parentSelector))
            filterElements = document.querySelectorAll(filterElementClassName);
        else
            filterElements = parentElement.querySelectorAll(filterElementClassName)
        let filters;

        if (element.nodeName == 'SELECT' && element.classList.contains('select2')) {
            filters = $(onChangeElement).val();
            if (Array.isArray(filters))
                isArray = true;
        } else {
            filters = element.value;
        }
        if (isArray) {
            for (let filter of filters) {
                if (!isNullOrEmpty(filter) && filter != '*') {
                    for (let i = 0; i < filterElements.length; i++) {
                        let body = filterElements[i].querySelector(className);
                        if (body.innerText.indexOf(filter) > -1) {
                            filterElements[i].classList.remove("d-none")
                        } else {
                            filterElements[i].classList.add("d-none")
                        }
                    }
                } else if (!isNullOrEmpty(filter) && filter == '*') {
                    for (let i = 0; i < filterElements.length; i++) {
                        filterElements[i].classList.remove("d-none")
                    }
                }
            }
        } else {
            if (!isNullOrEmpty(filters) && filters != '*') {
                for (let i = 0; i < filterElements.length; i++) {
                    let body = filterElements[i].querySelector(className);
                    if (body.innerText.indexOf(filters) > -1) {
                        filterElements[i].classList.remove("d-none")
                    } else {
                        filterElements[i].classList.add("d-none")
                    }
                }
            } else if (!isNullOrEmpty(filters) && filters == '*') {
                for (let i = 0; i < filterElements.length; i++) {
                    filterElements[i].classList.remove("d-none")
                }
            }
        }



    })
}

const getDataFromDom = (arrayOfElements, capitalLetter=false) => {
    const newObject = {};
    for (let element of arrayOfElements) {
        if (!isNullOrEmpty(element)) {
            let value;
            if (element.nodeName == 'SELECT' && !element.classList.contains('select2'))
                value = FSBootstrapSelect.getValue(element);
            else if (element.nodeName == 'SELECT' && element.classList.contains('select2'))
                value = $(element).val();
            else if (element.nodeName == 'TEXTAREA' && element.classList.contains('summernote'))
                value = FSBootstrapSummerNote.getValue(element);
            else if (element.nodeName == 'TEXTAREA')
                value = element.value;
            else if (element.nodeName == 'INPUT' && element.type == 'checkbox' && element.classList.contains('fs-toggle'))
                value = FSBootstrapToggle.getBitValue(element);
            else if (element.nodeName == 'INPUT' && element.type == 'checkbox')
                value = element.checked;
            else if (element.nodeName == 'INPUT' && element.classList.contains('fs-pickadate'))
                value = formatDate(element.value)
            else if (element.nodeName == 'INPUT' && element.classList.contains('fs-pickatime'))
                value = formatTime(element.value);
            else if (element.nodeName == 'INPUT' && element.classList.contains('fs-pickadatetime'))
                value = formatDatetime(element.value)
            else if (element.nodeName == 'INPUT' && element.classList.contains('phone-mask'))
                value = FSMaskInput.getValueUnMasked(element)
            else if (element.nodeName == 'INPUT' && element.classList.contains('money-mask'))
                value = FSMaskInput.getValueUnMasked(element)
            else if (element.nodeName == 'INPUT')
                value = element.value;
            else if (element.nodeName == 'SPAN')
                value = element.innerHTML;
            if (typeof (value) != 'undefined') {
                value = convertToDigit(value);
                let isDigit = isDigitValue(value);
                if (value == '' && !isDigit && value !== false)
                    value = null;
                if (capitalLetter)
                    newObject[capitalize(element.name)] = value;
                else
                    newObject[element.name] = value;
            }
        }
       
    }
    return newObject;
}

const buildFormFileDotNet = (model, inputFileName) => {
    const files = FSDropzone.getAcceptedFiles(inputFileName);
    data = objectToFormData(model, null, inputFileName);
    if (files.length == 1)
        data.append(inputFileName, files[0]);
    else
        return null;
    return data;
}

const objectToFormData = (obj, formData, namespace) => {
    let fd = formData || new FormData();
    let formKey;
    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {

            if (namespace) {
                formKey = namespace + '[' + property + ']';
            } else {
                formKey = property;
            }

            // if the property is an object, but not a File,
            // use recursivity.
            if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {

                objectToFormData(obj[property], fd, formKey);

            } else {
                // if it's a string or a File object
                fd.append(formKey, obj[property]);
            }

        }
    }

    return fd;
};

getInputFormData = (container,capitalLetter=false) => {
    let elements;
    if (container.nodeType === Node.ELEMENT_NODE)
        elements = $('.input-form', container);
    else
        elements = $('.input-form', `#${container},.${container}`).not('.dropdown');
    return getDataFromDom(elements, capitalLetter);
}

const cleanDomElements = (arrayOfElements) => {
  
    for (let element of arrayOfElements) {
        if (!(element && element.nodeType))
            element = $(`#${element},.${element}`)[0];
        if (element.nodeName == 'SELECT' && element.classList.contains('fs-selectpicker'))
            value = FSBootstrapSelect.setValue(element, null);
        else if (element.nodeName == 'SELECT' && element.classList.contains('select2'))
            $(element).val('').trigger('change') 
        else if (element.nodeName == 'SELECT')
            element.value = '';
        else if (element.nodeName == 'TEXTAREA' && element.classList.contains('summernote'))
            value = FSBootstrapSummerNote.setValue(element, null);
        else if (element.nodeName == 'TEXTAREA')
            element.value = null;
        else if (element.nodeName == 'INPUT' && element.type == 'checkbox' && element.classList.contains('fs-toggle'))
            FSBootstrapToggle.setUnChecked(element);
        else if (element.nodeName == 'INPUT' && element.type == 'checkbox')
            element.checked = false;
        else if (element.nodeName == 'INPUT')
            element.value = null;
        else if (element.nodeName == 'SPAN')
            element.innerHTML = null;

        if (element.nodeName == 'SELECT')
            $(element).next().removeClass(inputInvalidClass);
        removeClass(element, invalidClass)
      
        //if (typeof (value) != 'undefined')
        //if (element.nodeType === Node.ELEMENT_NODE)
        //    element.value = '';
        //else
        //    $(`#${element},.${element}`).val('');
    }
}

const getDomain = (email) => email.split("@").pop();

getInputFromDomElements = (selectorName) => {
    const element = $(`#${selectorName},.${selectorName}`);
    return $('.input-form',element)
}

const setDisplay = (selectorName, prop) => 
    $(getElementInstance(selectorName)).css({ display: prop })

const setTitle = (selectorName, value) => {
    const elements = $(`.${selectorName},#${selectorName}`);
    for (let element of elements)
        element.title = value;
}

const setHtml = (selectorName, value) => {
    const element = getElementInstance(selectorName);
    $(element).html(value)
}
const getHtml = (selectorName) => {
    const element = getElementInstance(selectorName);
    return $(element).html()
}

const setValue = (selectorName, value) => $(getElementInstance(selectorName)).val(value ?? '')

const getValue = (selectorName, parentElement) => {
    let element;
    if (isNullOrEmpty(parentElement))
        element = getElementInstance(selectorName);
    else
        element = getElementInstance(selectorName, parentElement);
    if (!isNullOrEmpty(element)) {
        if (typeof (element.value) != 'undefined' && !isNullOrEmpty(element.value))
            return $(element).val()
        else if (!isNullOrEmpty(element.attributes["value"]))
            return element.attributes["value"].value
        else
            return $(element).html();
    } else
        return null;

}

const removeClass = (selector, className) => {
    const element = getElementInstance(selector);
    if (className)
        $(element).removeClass(className);
}

const addClass = (selector, className) => {
    const element = getElementInstance(selector);
    if (className)
        $(element).addClass(className);
}

const replaceClass = (selector, className) => {
    const element = getElementInstance(selector);
    if (className, oldclassName, newClassName)
        $(element).removeClass(oldclassName).addClass(newClassName);
}


const removeAllClasses = (selectorName) => selectorName && $(`.${selectorName},#${selectorName}`).removeAllClasses();

const setReadonly = (selectorName, val = true) => selectorName && $(`.${selectorName},#${selectorName}`).prop('readonly', val);

const setFocus = (selectorName) => selectorName && $(`.${selectorName},#${selectorName}`).focus()

const emptyElement = (selectorName) => $(getElementInstance(selectorName)).empty()

const setModelInDom = (obj, parentSelector) => {
    let parentElement;
    if (parentSelector.nodeType === Node.ELEMENT_NODE)
        parentElement = parentSelector;
    else
        parentElement = `.${parentSelector},#${parentSelector}`;
    if (obj) {
        Object.keys(obj).map((key) => {
            if (!Array.isArray(obj[key])) {
                const isSelectElement = $(`select#${key}`, parentElement);
                const isSummerNote = $(`#${key}.summernote`, parentElement);
                const isMaterialToggle = $(`#${key}.fs-toggle`, parentElement);
                if (isSelectElement.length > 0)
                    FSBootstrapSelect.setValue(key, obj[key]);
                else if (isSummerNote.length > 0)
                    FSBootstrapSummerNote.setValue(key, obj[key]);
                else if (isMaterialToggle.length > 0)
                    FSBootstrapToggle.setValue(key, obj[key]);
                else {
                    const selector = $(`#${key}`, parentElement).not('select,dropdown');
                    if (selector.length > 0) {
                        let element = $(selector)[0];
                        if (element.nodeName == 'TEXTAREA')
                            element.value = obj[key];
                        else if (element.nodeName == 'SPAN')
                            element.innerHTML = obj[key];
                        else
                            element.value = obj[key];
                    }
                    //$(`#${key}`, parentElement).not('select,dropdown,textarea')

                }

            }

        })
        FSMaterialInput.init()
    }
  
}
const getParentElements = (element, parentSelector) => {
    element = getElementInstance(element);
    if (typeof (parentSelector) != 'undefined' && parentSelector != null) {
        let parentElement = getElementInstance(parentSelector);
        return $(element).parents(`.${parentSelector},#${parentSelector},${parentSelector}`)
    }
       
    else
        return [element.parentElement];
}

const getElements = (selector,parentSelector) => {
    let element;
    if (selector.nodeType === Node.ELEMENT_NODE)
        element = selector;
    else
        element = `.${selector},#${selector},${selector}`;
    let parentElement;
    if (parentSelector) {
    
        if (parentSelector.nodeType === Node.ELEMENT_NODE)
            parentElement = parentSelector;
        else
            parentElement = `.${parentSelector},#${parentSelector},${parentSelector}`;
    }
        return $(element, parentElement);
}

const appendElement = (parentSelector, element) => {
    let parent = getElementInstance(parentSelector);
  

    return $(element).appendTo(parent);
}

// priemra posicion columna, segunda posicion fila
const getTableActionPosition = (tableActionName) =>
    tableActionName.split('-')[3].split('').map(iNum => parseInt(iNum, 10));;

const getElementInstance = (selector,parentSelector) => {
    let element;
    if (selector) {
        if (selector.nodeType === Node.ELEMENT_NODE) {
            if (typeof (parentSelector) != 'undefined' && parentSelector != null && parentSelector.nodeType === Node.ELEMENT_NODE)
                element = $(selector, parentSelector);
            else if (typeof (parentSelector) != 'undefined' && parentSelector != null)
                element = $(selector, `.${parentSelector},#${parentSelector},${parentSelector}`);
            else
                element = $(selector);
        }

        else {
            if (typeof (parentSelector) != 'undefined' && parentSelector != null && parentSelector.nodeType === Node.ELEMENT_NODE)
                element = $(`.${selector},#${selector},${selector}`, parentSelector);
            else if (typeof (parentSelector) != 'undefined' && parentSelector != null)
                element = $(`.${selector},#${selector},${selector}`, `.${parentSelector},#${parentSelector},${parentSelector}`);
            else
                element = $(`.${selector},#${selector},${selector}`);
        }
          
        if (element.length > 0)
            return $(element)[0];
    }
    return null;
}

//const getElementInstance = (selector) => {
//    let element;
//    if (selector) {
//        if (selector.nodeType === Node.ELEMENT_NODE)
//            element = $(selector);
//        else
//            element = $(`.${selector},#${selector}`);
//        if (element.length > 0)
//            return $(element)[0];
//    }
//    return null;
//}

const invalidClass = 'is-invalid'
const inputInvalidClass = 'input-invalid'

const compareStrings = (value1, value2) => {
    if (value1.trim() && value2.trim()) {
        return value1.trim() == value2.trim();
    }
    return false;
}



const validateForm = async (parentSelector) => {
    let parentElement = null;
    if (parentSelector)
        parentElement = getElementInstance(parentSelector);
    var result = true;
    //$('#ddlTipoTransaccion').find(':selected').val()
    $('.required>select', parentElement ?? null).not('.select2').each(function () {
        let selectResult = FSBootstrapSelect.validateSelect(this);
        if (selectResult)
            $(this).next().removeClass(inputInvalidClass);
        else {
            $(this).next().addClass(inputInvalidClass);
            result = false;
        }
    })

    $('.select2.required', parentElement ?? null).each(function () {
        let val = $(this).find(':selected').val()
        if (typeof (val) != 'undefined' && val!='')
            $(this).next().removeClass(inputInvalidClass);
        else {
            $(this).next().addClass(inputInvalidClass);
            result = false;
        }
    })

    $('.input-form.required', parentElement ?? null).not('select').not('.dropdown').each(function () {
        if (this.value == '' || !this.value.trim()) {
            result = false;
            $(this).addClass(invalidClass);
        }
        else
            $(this).removeClass(invalidClass);
    });
    $('.input-form.required', parentElement ?? null).not('select').not('.dropdown').on('change', function () {
        $(this).removeClass(invalidClass);
    })
    $('.input-form.required>select', parentElement ?? null).not('.select2').on('change', function () {
        $(this).next().removeClass(inputInvalidClass);
    })
    $('.input-form.required>.select2', parentElement ?? null).on('change', function () {
        $(this).next().removeClass(inputInvalidClass);
    })
    if (!result)
        swalToast('Campos requeridos faltantes', SwalIcon.WARNING, 2000);
    return result;
}


const  formatCurrency = (num) =>{
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num)) num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + '' + num + '.' + cents);
}

const formatDate = (date,divider='-',order=[2,1,0]) => {
    if (date) {
        const arrDate = date.split(divider);
        let dateStr = '';
        if (arrDate.length == 3) {
            for (let i = 0; i < order.length; i++) {
                if (i + 1 == order.length)
                    dateStr += `${arrDate[order[i]]}`
                else
                    dateStr += `${arrDate[order[i]]}-`
            }
             
        }
        return dateStr;
            //return `${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`;
    }
    return null;
}




const formatTime = (time, format = 'hh:mmA', outputFormat ="HH:mm") => {
    if (time) {
        const newTime = (moment(time, format)._d);
        return moment(newTime).format(outputFormat);
    }
    return null;
}

const formatTimeAsJson= (time, format = 'hh:mmA', outputFormat = "HH:mm") => {
    if (time) {
        const newTime = (moment(time, format)._d);
        return moment(newTime).toJSON();
    }
    return null;
}

const getTime = (timeStr, format = 'hh:mmA') => {
    if (timeStr) {
        const newTime = (moment(timeStr, format)._d);
        return newTime;
    }
    return null;
}

const getTimeAsJson = (timeStr, format = 'hh:mmA') => {
    if (timeStr) {
        const newTime = (moment(timeStr, format)._d);
        return newTime.toJSON();
    }
    return null;
}

const formatDatetime = (date, format = 'DD-MM-yyyy, hh:mmA') => {
    if (date) {
        const newDate = (moment(date, format)._d);
        return moment(newDate).format()
    }
    return null;
}

const formatDatetimeAsJson = (date, format = 'DD-MM-yyyy, hh:mmA') => {
    if (date) {
        const newDate = (moment(date, format)._d);
        return moment(newDate).toJSON();
    }
    return null;
}



const getDateTime = (dateStr, format = 'DD-MM-yyyy, hh:mmA') => {
    if (dateStr) {
        const newDate = (moment(dateStr, format)._d);
        return newDate;
    }
    return null;
}

const getDateTimeAsJson = (dateStr, format = 'DD-MM-yyyy, hh:mmA') => {
    if (dateStr) {
        const newDate = (moment(dateStr, format)._d);
        return newDate.toJSON();
    }
    return null;
}
 
const differenceBetweenDates = (startDate,endDate) => {
    let difference = endDate.getTime() - startDate.getTime(); // This will give difference in milliseconds
    return Math.round(difference / 60000);
}

Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
}

const removeInputTextFormat = (val) => val.replaceAll('-', '').replaceAll('_', '');
const convertTextToInt = (val) => parseInt(val);

const redirectTo = (url, isNewTarget = false) => {
    if (isNewTarget)
        window.open(url, "_blank");
    else
        window.location.href = url
};

const buildUrl = (baseUrl, url) => `${baseUrl}${url}`; 


const formatResponse = (result) => {
    if (typeof (result.isSuccessStatusCode) != 'undefined' && !typeof (result.isSuccessStatusCode))
        throw ({ isSuccessStatusCode, errors, statusCode } = result)
    else {
    
        if (typeof (result.messages) != 'undefined') {
            const { messages, data: resultData, dataCount: count } = result
            let data;
            if (count == 1)
                data = [...resultData].shift();
            else
                data = resultData
            const [message] = messages;
            return { message, data }
        } else if (typeof (result.Messages) != 'undefined') {
            const { Messages: messages, Data: resultData, DataCount: count } = result
            let data;
            if (count == 1)
                data = [...resultData].shift();
            else
                data = resultData
            const [message] = messages;
            return { message, data }
        } else
            return result;
      
    }
}

const formatErrors = (result) => {
    if (typeof (result.isSuccessStatusCode) != 'undefined' && !typeof (result.isSuccessStatusCode))
        throw ({ isSuccessStatusCode, errors, statusCode } = result)
    else {

        if (typeof (result.errors) != 'undefined') {
            let errors;
            const { errors: data, dataCount: count } = result
            //if (errors.length == 1)
            //    errors = [...data].shift();
            //else
                errors = data;
            return errors
        } else if (typeof (result.Errors) != 'undefined') {
            let errors;
            const { Errors: data } = result
            //if (data.length == 1)
            //    errors = [...data].shift();
            //else
                errors = data;
            return  errors 
        } else
            return result;

    }
}

const isJson = (value) => {
    try {
        let result = JSON.parse(value);
        return true;
    } catch (e) {
        return false;
    }
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

const RouteType = {
    QueryString: 1,
    RouteValue: 2
}


const createUrl = (controllerName, actionName, routeValue, routeType = RouteType.QueryString) => {
    if (routeValue != null && routeType == RouteType.QueryString)
        return `${appPathBase != null && appPathBase.length > 1 ? `${appPathBase}` : ''}/${controllerName}${actionName ? `/${actionName}` : ''}?${objectToQueryString(routeValue)}`;
    else if (routeValue != null && routeType == RouteType.RouteValue)
        return `${appPathBase != null && appPathBase.length > 1 ? `${appPathBase}` : ''}/${controllerName}${actionName ? `/${actionName}` : ''}/${objectToRouteValue(routeValue)}`;
    else
        return `${appPathBase != null && appPathBase.length > 1 ? `${appPathBase}` : ''}/${controllerName}${actionName ? `/${actionName}` : ''}`;
}

const validateSelect = (element) =>KTBootstrapSelect.validate(element)

const blockPage = (message = "Espere mientras se cargan los datos",color = '#F7F8FA', state = KTBlockUI.state.success, type = null, size = KTBlockUI.size.large) => KTBlockUI.Block(color, state, message, type, size);

const blockElement = (selector, message = null,color = '#F7F8FA', state = KTBlockUI.state.success, type = null, size = KTBlockUI.size.large)  => KTBlockUI.Block(color, state, message, type, size, selector);

const unBlockPage = () => KTBlockUI.Unblock();
const unBlockElement = (selector) => KTBlockUI.Unblock(selector);
const openNewTab = (isExternalModule = false, moduleName, url, isAppActive, isPositionBefore, appName, positionInTab) =>
{
    if (window.top != window) {
        const menuUrl = `${moduleName}/${url}`;
        window.top.openNewTab(menuUrl, isAppActive, isPositionBefore, appName, positionInTab);
    }
    else {
        switch (isExternalModule) {
            case true:
                const externalUrl = `${window.location.origin}/modulos/${moduleName}/${url}`;
                window.open(externalUrl, "_blank");
                break;
            default:
                const internalUrl = `${window.location.origin}/${url}`;
                window.open(internalUrl, "_blank");
                break;
        }
    }
}


const swalToastError = (errors) => {
    if (errors && errors.length > 0) {
        const { statusError, message, description} = [...errors].shift();
        if (!isNullOrEmpty(statusError)) {
            swalToast(message, SwalIcon.ERROR);
        } else {
            const { Message, StatusError } = [...errors].shift();
            if (!isNullOrEmpty(StatusError)) {
                swalToast(StatusError, SwalIcon.ERROR);
            }
        }
       
    }

}
const swalToastMessage = (messages) => {
    if (messages && messages.length > 0) {
        const { message, statusMessage } = [...messages].shift();
        swalToast(statusMessage, SwalIcon.SUCCESS);
    }
}


const playAudio = (audioId, times, ended) =>{
    if (times <= 0) {
        return;
    }
    let played = 0;
    let audio = document.getElementById(audioId);
    audio.addEventListener("ended", () =>{
        played++;
        if (played < times) {
            audio.play();
        } else if (ended) {
            ended();
        }
    });
    audio.play();
}

//export default {
//    getDataFromDom,
//    validateForm,
//    formatCurrency,
//    formatDate,
//    removeInputTextFormat,
//    convertTextToInt,
//    redirectTo,
//    buildUrl,
//    validateSelect,
//    blockPage,
//    blockElement,
//    unBlockPage,
//    unBlockElement,
//    openNewTab
//}
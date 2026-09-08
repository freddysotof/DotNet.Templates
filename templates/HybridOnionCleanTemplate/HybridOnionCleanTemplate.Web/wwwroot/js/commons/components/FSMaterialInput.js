// Class definition

var FSMaterialInput = function () {

    // Private functions
    //var initialize = function () {
    //    // minimum setup
    //    $('.form-outline').selectpicker();
    //}

    var initialize = function () {
        document.querySelectorAll('.form-outline').forEach((formOutline) => {
            //FSBootstrapSelect.init();
            new mdb.Input(formOutline).init();
            $('[data-toggle="tooltip"]').tooltip()
        });
        FSBootstrapAutoComplete.init();
        FSPickADate.init();
        //FSBootstrapStepper.init();
        //FSPinCodeInput.init();
    }

    return {
        // public functions
        init: function () {
            initialize();
        },
        buildMaterialButton: (id, label, title, className, iconClassName,marginTop) =>
            `<button type="button"  data-original-title="${title ?? ''}"  
               data-toggle="tooltip" data-placement="bottom" 
                style="margin-top:${marginTop}px" class="btn ${className}" id="${id}">
                ${iconClassName && `<i class="${iconClassName}"></i>`} 
                ${label ?? ''}
            </button>`,
        buildMaterialIconButton: (id, label, title, className, marginTop, iconClassName, callback) =>
            `<button ${(callback && `onclick="function callback(event){${callback ?? ''}(event)};callback(event)"`) ?? ''}  
                type="button" title="${title ?? ''}" data-original-title="${title ?? ''}"  
               data-toggle="tooltip" data-placement="bottom"  style="margin-top:${marginTop}px" 
                class="btn btn-icon btn-icon-md btn-sm ${className}" id="${id}">
                    <i class="${iconClassName}"></i>${label ?? ''}
            </button>`,
        buildMaterialIcon: (id, title, className, marginTop) =>
            `<i id="${id}" data-original-title="${title ?? ''}"  
               data-toggle="tooltip" data-placement="bottom"
                style="margin-top:${marginTop}px"  class="${className}"></i>`,
        buildMaterialInputOutline: (id, label, required, inputForm = true, readonly = false/*, classNames ='fs-margin-t-25'*/, value = '',maxLength=null) =>  
            `
                <div class="form-outline">
                    <input type="text" class="form-control   ${(inputForm && 'input-form') ?? ''} ${(required && 'required') ?? ''}" 
                       ${(readonly && 'readonly') ?? ''}  name="${id ?? ''}" id="${id ?? ''}" value="${value ?? ''}" ${maxLength && `maxlength="${maxLength}"`}/>
                    <label class="form-label" for="${id ?? ''}">${label ?? ''}</label>
                </div>
            `,
        buildMaterialInputNumberOutline: (id, label, required, inputForm = true, readonly = false/*, classNames = 'fs-margin-t-25'*/, value = '') =>
            `
                <div class="form-outline">
                    <input type="number" class="form-control ${id ?? ''} ${(inputForm && 'input-form') ?? ''} ${(required && 'required') ?? ''}" 
                       ${(readonly && 'readonly') ?? ''}  name="${id ?? ''}" id="${id ?? ''}" value="${value ?? ''}"/>
                    <label class="form-label" for="${id ?? ''}">${label ?? ''}</label>
                </div>
            `,
        buildMaterialAutoIncrementOutline: (id, label, required, inputForm = true, readonly = false,min=0,max=null,step=1/*, classNames = 'fs-margin-t-25'*/, value = 0) =>
            `
                <div class="def-number-input number-input safari_only">
                    <button onclick="event.stopPropagation();this.parentNode.querySelector('input[type=number]').stepDown()" class="minus"></button>
                    <input onClick="event.stopPropagation();" class="form-control ${id ?? ''} ${(inputForm && 'input-form') ?? ''}"  type="number" 
                        ${(required && 'required') ?? ''}" min="${min}" step="${step}" ${max ? `max="${max}"` : ''} 
                        ${(readonly && 'readonly') ?? ''}  name="${id ?? ''}" id="${id ?? ''}" 
                        value="${value ?? ''}" />
                    <button onclick="event.stopPropagation();this.parentNode.querySelector('input[type=number]').stepUp()" class="plus"></button>
                </div>
            `,
        buildMaterialDateTimeOutline: (id, label, required, inputForm = true, readonly = false/*, classNames = 'fs-margin-t-25'*/, value = '') =>
            `
                <div class="form-outline ">
                    <input type="text" data-open="datetime-picker-${id}" class="form-control date-time picker-opener fs-pickadatetime ${(inputForm && 'input-form') ?? ''} ${(required && 'required') ?? ''}" 
                       ${(readonly && 'readonly') ?? ''}  name="${id ?? ''}" id="${id ?? ''}" value="${value ?? ''}"/>
                        <input placeholder="Fecha selecionada" type="text" id="datetime-picker-${id}"  class="time-date-ghost">
                        <input placeholder="Hora seleccionada"  data-open="datetime-picker-${id}" type="text" class="timepicker time-date-ghost">
                    <label class="form-label" for="${id ?? ''}">${label ?? ''}</label>
                </div>
            `,
        buildMaterialDateOutline: (id, label, required, inputForm = true, readonly = false/*, classNames = 'fs-margin-t-25'*/, value = '') =>
            `
                <div class="form-outline ">
                    <input type="text" class="form-control fs-pickadate ${(inputForm && 'input-form') ?? ''} ${(required && 'required') ?? ''}" 
                       ${(readonly && 'readonly') ?? ''}  name="${id ?? ''}" id="${id ?? ''}" value="${value ?? ''}"/>
                         <label class="form-label" for="${id ?? ''}">${label ?? ''}</label>
                </div>
            `,
        buildMaterialTimeOutline: (id, label, required, inputForm = true, readonly = false/*, classNames = 'fs-margin-t-25'*/, value = '') =>
            `
                <div class="form-outline ">
                    <input type="text" class="form-control fs-pickatime ${(inputForm && 'input-form') ?? ''} ${(required && 'required') ?? ''}" 
                       ${(readonly && 'readonly') ?? ''}  name="${id ?? ''}" id="${id ?? ''}" value="${value ?? ''}"/>
                         <label class="form-label" for="${id ?? ''}">${label ?? ''}</label>
                </div>
            `,
        buildSummerNote: (id, label, required, inputForm = true, readonly = false/*, classNames = 'fs-margin-t-25'*/, value = '') =>
            `
                <label class="form-label font-weight-bol" for="${id ?? ''}">${label ?? ''}</label>
                    <textarea type="text" class="summernote form-contr ${(inputForm && 'input-form') ?? ''} ${(required && 'required') ?? ''}" 
                      ${(readonly && 'readonly') ?? ''}  name="${id ?? ''}" id="${id ?? ''}">${value ?? ''}</textarea>
            `,
        buildMaterialTextAreaOutline: (id, label, required, inputForm = true, readonly = false/*, classNames = 'fs-margin-t-25'*/, value = '', maxLength = null) =>
            `
                <div class="form-outline">
                    <textarea type="text" class="form-control ${(inputForm && 'input-form') ?? ''} ${(required && 'required') ?? ''}"  ${maxLength && `maxlength="${maxLength}"`}
                      ${(readonly && 'readonly') ?? ''}  name="${id ?? ''}" id="${id ?? ''}">${value ?? ''}</textarea>
                    <label class="form-label" for="${id ?? ''}">${label ?? ''}</label>
                </div>
            `,
        buildMaterialBootstrapSelect: (id, label, required = false, liveSearch = true, disabled = false, inputForm = true, readonly = false,dropupAuto= true,width='100%',headerTitle='', data = null, value='') => {
            const mapToOption = (obj) => {
                
                return `<option value="${obj.value}" ${obj.value == value ? 'selected':''}>${obj.text}</option>`
            }
            const title = 'SELECCIONE'
            const html = 
                `   <label class="control-label font-weight-bold">${label ?? ''} ${required ?'<span class="text-danger font-weight-bold">*</span>' : ''}</label>
                    <div class="form-group">
                        <select  title="${title}"  
                            class="form-control fs-selectpicker ${(inputForm && 'input-form') ?? ''} ${(required && 'required') ?? ''} ${(!dropupAuto && 'dropup') ?? ''}"
                            ${(liveSearch && 'data-live-search="true"') ?? ''} id="${id ?? ''}" name="${id ?? ''}" value="${value ?? ''}"
                            ${(disabled && 'disabled') ?? ''} ${(readonly && 'readonly') ?? ''}  
                            ${(!dropupAuto && 'data-dropup-auto="false"') ?? ''}
                            data-width="${width}" data-header="${headerTitle}"  >
                             <option value="" selected>${title}</option>
                            ${(data && data.map(mapToOption)) ?? ''}
                        </select>
                    </div>`
            return html;
        },
        buildMaterialBootstrapMultiSelect: (id, label, required = false, liveSearch = true, disabled = false, inputForm = true, readonly = false, width = '100%', headerTitle = '', count = 2, data = null, value = '') => {
            const mapToOption = (obj) => {
                return `<option value="${obj.value}" 
                            ${obj.subText && `data-subtext="${obj.subText}"`}>
                                ${obj.text}
                        </option>`
            }
            const title = 'SELECCIONE'
            const html =
                `   <label class="control-label">${label ?? ''} ${required ? '<span class="text-danger font-weight-bold">*</span>' : ''}</label>
                    <select title="${title}" multiple data-selected-text-format="count > ${count}"
                        data-actions-box="true"  data-select-all-text="Todos" 
                        data-deselect-all-text="Ninguno"
                        class="form-control fs-selectpicker ${(inputForm && 'input-form') ?? ''} ${(required && 'required') ??''}"
                        ${(liveSearch && 'data-live-search="true"') ?? ''} id="${id ?? ''}" value="${value ?? ''}"
                        ${(disabled && 'disabled') ?? ''} ${(readonly && 'readonly') ?? ''}
                        data-width="${width}" data-header="${headerTitle}">
                         <option value="" disabled>${title}</option>
                         ${(data && data.map(mapToOption)) ?? ''}
                    </select>`
            return html;
        },
        buildMaterialToggle: (id, label, checked, inputForm = true, readonly = false,classes,callback) => 
            `<div class="form-check form-switch ${classes?? ''}">
                    <input class="form-check-input fs-toggle ${(inputForm && 'input-form') ?? ''}" type="checkbox"
                    id="${id ?? ''}" name="${id ?? ''}" ${(checked && "checked='true'") ?? ''}" />
                     <label class="form-check-label" for="${id ?? ''}">${label ?? ''}</label>
            </div>`,
        buildMaterialCheckbox: (id, label, checked, inputForm = true, readonly = false, classes, callback) =>
            `<div class="form-check ${classes ?? ''}">
                    <input class="form-check-input fs-checkbox ${(inputForm && 'input-form') ?? ''}" type="checkbox"
                    id="${id ?? ''}" name="${id ?? ''}" ${(checked && "checked='true'") ?? ''}" />
                     <label class="form-check-label" for="${id ?? ''}">${label ?? ''}</label>
            </div>`,
        buildMaterialAutoComplete: (id, label, required = false, disabled = false, inputForm = false, readOnly=false,value='') => {
            //return `<div id="basic" class="form-outline">
            //      <input type="search" id="${id}" name="${id}"  class="form-controldb-autocomplete 
            //       ${(inputForm && 'input-form') ?? ''} ${(required && 'required') ?? ''}"
            //        ${(disabled && 'disabled') ?? ''} ${(readOnly && 'readonly') ?? ''}
            //        sdsdvalue="${value ?? ''}" />
            //      <label class="form-label" for="${id}">${label}</label>
            //    </div>`
            return `<div class="form-outline">
                <input type="search" id="${id}" name="${id}" class="form-control mdb-autocomplete 
                    ${(inputForm && 'input-form') ?? ''} ${(required && 'required') ?? ''}"
                    ${(disabled && 'disabled') ?? ''} ${(readOnly && 'readonly') ?? ''}
                    value="${value ?? ''}" />
                <button class="mdb-autocomplete-clear">
                    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="https://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                </button>
                <label for="${id}" class="form-label active">${label}</label>
            </div>`
        },
        buildScheduleTemplate: (id, dayNo, dayOfWeek, toggleLabel, disabled, readonly, timepickerVisible = false, values = {}) => {
            return `<div class="d-flex w-100 justify-content-around align-items-center schedule" id="schedule-${dayNo}" data-id="${id}" data-day="${dayNo}">
                        <h5 style="min-width:5em">${dayOfWeek}</h5>
                        <div class="form-check form-switch ">
                            <input class="form-check-input fs-toggle input-form" type="checkbox"
                                   id="schedule-${dayNo}-isopen" name="schedule-${dayNo}-isopen" />
                            <label class="form-check-label" for="schedule-${dayNo}-isopen">Abierto</label>
                        </div>
                        <div class="form-outline ${timepickerVisible ? 'fs-fadeIn' : 'fs-fadeOut'}" >
                            <input type="text" class="form-control fs-pickatime" value="${(values && values.openHour) ?? ''}" 
                                   name="schedule-${dayNo}-openHour" id="schedule-${dayNo}-openHour" />
                            <label class="form-label" for="schedule-${dayNo}-openHour">Apertura</label>
                        </div>
                        <div class="form-outline ${timepickerVisible ? 'fs-fadeIn' : 'fs-fadeOut'}">
                            <input type="text" class="form-control fs-pickatime"  value="${(values && values.closeHour) ?? ''}"
                                   name="schedule-${dayNo}-closeHour" id="schedule-${dayNo}-closeHour" />
                            <label class="form-label" for="schedule-${dayNo}-closeHour">Cierre</label>
                        </div>
                    </div>
                    <hr/>
                    `
        },
        appendScheduleTemplate: (parentSelector, id, dayNo, dayOfWeek, toggleLabel, disabled, readonly, values = {},timepickerVisible=false, onToggle) => {
            const html = FSMaterialInput.buildScheduleTemplate(id, dayNo, dayOfWeek, toggleLabel, disabled, readonly,timepickerVisible,values);
            const element = appendElement(parentSelector, html);
            const toggle = $('.fs-toggle', element)[0];
            if (timepickerVisible)
                FSBootstrapToggle.setChecked(toggle);
            FSBootstrapToggle.onClick(toggle, onToggle);
        },
        buildChip: (dataId,id, classes, html, isClosable, isEditable) =>
            `
                <div class="chip ${classes}" id="${id}" data-id="${dataId}">
                    <div id="chip-${id}">${html}</div>
                    ${isEditable ? '<i class="edit fas fa-pen"></i>' : ''}
                    ${isClosable ? '<i class="close fas fa-times"></i>' : ''}
                    
                </div>
            `,
        appendChip: (parentSelector,dataId, id, classes, html, isClosable, isEditable, onClose, onEdit) => {
            const chipHtml = FSMaterialInput.buildChip(dataId,id, classes, html, isClosable, isEditable);
            const element = appendElement(parentSelector, chipHtml);
            if (isEditable) {
                const editIcon = $('.edit', element)[0];
                editIcon.addEventListener('click', onEdit);
            }
            if (isClosable) {
                const closeIcon = $('.close', element)[0];
                closeIcon.addEventListener('click', onClose);
            }
            return element;
        },
        renderDropzone:(id,label,required)=> 
        `    
        <label class="form-label font-weight-bold" for="${id}">${label}</label>
        <div id="${id}" name="${id}" class="dropzone">
            <div class="fallback">
                <input name="file" type="file" class="${(required && 'required') ?? ''}" />
            </div>
        </div>`
        
    };
}();
jQuery(document).ready(function () {
    FSMaterialInput.init();
});
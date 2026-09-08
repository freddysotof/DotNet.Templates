////import * as common from './Common.js';

const ModalDialogClasses = {
    SCROLLABLE :1,
    LARGE :2,
    XTRALARGE :4,
    SMALL: 8
    }

    // Si se quiere agregar mas clases en modal dialgos ya sea scrollable o el tamaño
    // en el parametro de classes se agregan las clases del enum con bitwise operator
    // Ej: ModalDialogClasses.scrollable | ModalDialogClasses.large

const createModal = (title, classes, html, toggle = false, static = false, closable = true) => {
    $('.close', "#modalComponent").removeClass('modal-not-closable');
    const modalComponentDialog = $('#modalComponent > .modal-dialog');
    $(modalComponentDialog).removeClass();
    $(modalComponentDialog).addClass('modal-dialog');
    if (classes & ModalDialogClasses.SCROLLABLE)
        $(modalComponentDialog).addClass('modal-dialog-scrollable');
    if (classes & ModalDialogClasses.LARGE)
        $(modalComponentDialog).addClass('modal-lg');
    if (classes & ModalDialogClasses.XTRALARGE)
        $(modalComponentDialog).addClass('modal-xl');
    if (classes & ModalDialogClasses.SMALL)
        $(modalComponentDialog).addClass('modal-sm');

    $('#modalComponentHeader > h5').html(title);
    $('#modalComponentBody').empty().append(html);
    $('#modalComponentFooter>#btnModalCancel').css({ 'visibility': 'visible', display: 'block' })
        .removeClass().addClass('btn btn-outline-danger');
    $('#modalComponentFooter>#btnModalAction').css({'visibility':'hidden'})
        .removeClass().addClass('btn btn-brand btn-hover-brand');
    $('#modalComponentFooter>#btnModalClean').css({ visibility: 'hidden' })
        .removeClass().addClass('btn btn-outline-accent');
    if (static) 
        $("#modalComponent").modal({
            show:false,
            backdrop: 'static',
            keyboard: false
        });
    else{
        $("#modalComponent").removeData('backdrop').removeData('keyboard')
        //$("#modalComponent").removeAttr('data-backdrop')
        //$("#modalComponent").removeAttr('data-keyboard')
    }
        
    if (!closable)
        $('.close', "#modalComponent").addClass('modal-not-closable');
    if(toggle)
        toggleModal()

}

$('#modalComponent').on('hidden.bs.modal', function (e) {
    $("#modalComponent").modal('dispose');
})

const setModalButtonVisible = () => $('#modalComponentFooter > button').css("visibility", "visible")

const hideModalButtons = (selectorException = '#btnModalClose') => $('#modalComponentFooter > button').not(selectorException).css("visibility", "hidden")

const editModalButton = (selectorName, title, actionName, classNames, visibility = true, css = null) => {
    const selector = $(`#${selectorName}`);
    if (title)
        selector.html(title);
    if(actionName)
        selector.attr("onclick", `${actionName}`);
    if (classNames)
        selector.removeClass().addClass('btn').addClass(classNames)
   if (visibility)
       selector.css('visibility', 'visible')
    else
       selector.css('visibility', 'hidden')
    if (css)
        selector.css(css);
}

const createModalButton = (id, title, actionName, classNames, visibility = true) => {
    $('#modalComponentFooter').append(`
        <button
            type="button"
            onclick="${actionName}"
            class="btn ${classNames}"
            style="visibility:${visibility?"visible":"hidden"}"
            id="${id}">
            ${title}
        </button>`);
};

const toggleModal = () => {
    const modal = $("#modalComponent");
    const static = $(modal).attr('data-backdrop');
    if (typeof(static) != 'undefined')
        $(modal).modal({
        show:true,
        backdrop: 'static',
        keyboard: false
        });
    else
        $(modal).modal({
            show:true,
            backdrop: 'false',
            keyboard: true
            });

        $(modal).modal('toggle')
};

const getFormDataModal = (capitalLetter=false) =>
{
    const elements = $('#modalComponentBody .input-form').not('.dropdown');
    // Function de Common.js
    const object = getDataFromDom(elements, capitalLetter);
    return object;
}

const cleanModalForm = () => cleanDomElements($('#modalComponentBody .input-form'))

//export default {
//    ModalDialogClasses,
//    createModal,
//    setModalButtonVisible,
//    hideModalButtons,
//    hideModalButtons,
//    editModalButton,
//    createModalButton,
//    toggleModal,
//    getModalObject
//}
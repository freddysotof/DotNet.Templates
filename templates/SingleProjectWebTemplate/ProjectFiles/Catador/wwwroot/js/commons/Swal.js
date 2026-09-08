const SwalType = {
    INFO: "info",
    ERROR: "error",
    WARNING: "warning",
    SUCCESS: "success"
};

const swalAlert = (title, message, type, btnConfirm='Aceptar')=> {
    const response = swal({
        title: title,
        text: message,
        type: type,
        confirmButtonText: btnConfirm
    }).then(function(result) {
        return true;
    });
    return response;
}

const swalConfirm = (title, message, type, btnConfirm ='Confirmar',btnCancel="Cancelar" )=> {
    const response = swal({
        title: title,
        text: message,
        type: type,
        showCancelButton: true,
        cancelButtonText: btnCancel,
        confirmButtonText: btnConfirm
    }).then(function(result) {
        if (result.value) {
            return true;
        } else {
            return false;
        }
    });
    return response;
}

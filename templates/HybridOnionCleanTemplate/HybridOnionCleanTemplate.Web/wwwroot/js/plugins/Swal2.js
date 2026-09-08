const SwalIcon = {
    INFO: "info",
    ERROR: "error",
    WARNING: "warning",
    QUESTION: "question",
    SUCCESS: "success"
};

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})

const swalAlert = (title, message, icon, btnConfirm = 'Aceptar') => {
    const response = swalWithBootstrapButtons.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonText: btnConfirm
    }).then(function (result) {
        return true;
    });
    return response;
}

const swalConfirm = (title, message, icon, btnConfirm = 'Aceptar',) => {
    const response = swalWithBootstrapButtons.fire({
        title: title,
        text: message,
        icon: icon,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: btnConfirm
    }).then(function (result) {
        if (result.value) {
            return true;
        } else {
            return false;
        }
    });
    return response;
}


// TOAST


const swalToast = (title, icon = SwalIcon.SUCCESS, timer = 2000) => 
    title && Toast.fire({
        icon,
        title,
        timer
    })

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',

    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

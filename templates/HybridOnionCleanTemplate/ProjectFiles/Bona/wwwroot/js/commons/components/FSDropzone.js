// Class definition

var FSDropzone = function () {
    const dropzonePreviewTemplate =
        `<div class="dz-preview dz-file-preview">
<div class="dz-image">
    <img data-dz-thumbnail />
</div>
  <div class="dz-details">
    <div class="dz-size" data-dz-size></div>
    <div class="dz-filename"><span data-dz-name></span></div>
  </div>
  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
  <div class="dz-success-mark"><span>✔</span></div>
  <div class="dz-error-mark"><span>✘</span></div>
  <div class="dz-error-message"><span data-dz-errormessage></span></div>
  <div class="text-danger font-weight-bold" data-dz-remove style="cursor:pointer">
    <span class="dz-remove">Remover <i class="fa fa-trash"></i></span>
  </div>
<div class="text-primary font-weight-bold" data-dz-download style="cursor:pointer">
    <span class="dz-download">Descargar<i class="fa fa-eye"></i></span>
  </div>
</div>`
    const dropzonePreviewTemplateWithoutProgress =
        `<div class="dz-preview dz-file-preview">
<div class="dz-image">
    <img data-dz-thumbnail />
</div>
  <div class="dz-details">
    <div class="dz-filename"><span data-dz-name></span></div>
    <div class="dz-size" data-dz-size></div>

  </div>
  <div class="dz-success-mark text-success"><i class="fas fa-check fa-2x"></i></div>
  <div class="dz-error-mark text-danger "><i class="fa fa-window-close fa-2x"></i></div>
  <div class="dz-error-message"><span data-dz-errormessage></span></div>
<div class="text-primary font-weight-bold" data-dz-download style="cursor:pointer">
    <span class="dz-download">Descargar<i class="icon-success fa fa-download"></i></span>
  </div>
  <div class="text-danger font-weight-bold" data-dz-remove style="cursor:pointer">
    <span class="dz-remove">Remover <i class="icon-red fa fa-trash"></i></span>

  </div>

</div>`
    const dictRemoveFileConfirmation = '¿Está seguro que desea eliminar este archivo?'
//   <i class="fa fa-ban" data-dz-remove><i/>
    // Private functions
    var initialize = function (selector, paramName = "file", url = "/home/index", size = 1, multiple = true, maxFiles = 1, acceptedFiles ="image/*",removedFileCallback,addedFileCallback,successCallback,completeCallback) {
        let element;

        if (selector) {

            if (selector.nodeType === Node.ELEMENT_NODE)
                element = selector;
            else
                element = `.${selector},#${selector}`;
            if (element) {

                Dropzone.confirm = async (question, accepted, rejected) => {
                    const result = await swalConfirm('Eliminar archivo', question, SwalIcon.WARNING);
                    if (result)
                        accepted()
                    else
                        rejected && rejected();
                    // Ask the question, and call accepted() or rejected() accordingly.
                    // CAREFUL: rejected might not be defined. Do nothing in that case.
                };
                const drp = new Dropzone($(element)[0], {
                    url: url,
                    autoProcessQueue: false,
                    addRemoveLinks: false,
                    uploadMultiple: multiple,
                    paramName: paramName, // The name that will be used to transfer the file
                    maxFilesize: size, // MB
                    thumbnailWidth: 125,
                    thumbnailHeight: 125,
                    maxFiles: maxFiles ?? null,
                    acceptedFiles: acceptedFiles,
                    init: function () {
                        this.on("addedfile", function (file) {
                        
                            if (!multiple) {
                                if (this.files[1] != null) {
                                    this.removeFile(this.files[0]);
                                }
                            }
                            if (addedFileCallback)
                                addedFileCallback(file);
                            else
                                return true;
                        });
                        this.on("removedfile", function (file) {
                            if (removedFileCallback)
                                removedFileCallback(file);
                            else
                                return true;
                        });
                        this.on("success", function (file) {
                            if (successCallback)
                                successCallback(file);
                            else
                                return true;
                        });
                        this.on("complete", function (file) {
                            if (completeCallback)
                                completeCallback(file);
                            else
                                return true;
                        });
                    },
                    accept: function (file, done) {
                         done();
                    },
                    dictDefaultMessage: "Arrastra los archivos aquí para subirlos",
                    dictFallbackMessage: "El navegador no soporta la opción de arrastrar y soltar archivos de carga.",
                    dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
                    dictFileTooBig: "El archivo es demasiado grande ({{filesize}}MiB). Tamaño maximo de archivo: {{maxFilesize}}MiB.",
                    dictInvalidFileType: "No se aceptan archivos de este tipo.",
                    dictResponseError: "El servidor retornó una respuesta con un código {{statusCode}}.",
                    dictCancelUpload: "Cancelar carga",
                    dictCancelUploadConfirmation: "Está seguro que desea cancelar esta carga?",
                    dictRemoveFileConfirmation: dictRemoveFileConfirmation,
                    dictRemoveFile: "Remover archivo",
                    dictDownloadFile: "Descargar archivo",
                    dictMaxFilesExceeded: "No se permiten cargar mas archivos.",
                    previewTemplate: dropzonePreviewTemplateWithoutProgress
                });
                //element = $(element)[0];
                //Dropzone.options.element = {
                   
                //};
            }


        }
    }
    return {
        // public functions
        init: (selector, paramName = "file", url, size, multiple, maxFiles, acceptedFiles, removedFileCallback, addedFileCallback, successCallback, completeCallback) => {
            initialize(selector, paramName = "file", url, size, multiple, maxFiles,acceptedFiles, removedFileCallback, addedFileCallback, successCallback, completeCallback);
        },
        getInstance: (selector) => {
            if (selector.nodeType === Node.ELEMENT_NODE)
                element = selector;
            else
                element = `.${selector},#${selector}`;
            return Dropzone.forElement(element)
        },
        addRemoveFileCallback: (selector, callback, question = "Está seguro que desea eliminar este archivo de manera permanente?") => {
            let dropZone = FSDropzone.getInstance(selector);
            if (dropZone) {
                dropZone.options.dictRemoveFileConfirmation = question;
                dropZone.on("removedfile", function (file) {
                    if (callback)
                        callback(file);
                    else
                        return true;
                });
            }     
        },
        setDefaultRemoveFileCallbak: (selector) => {
            let dropZone = FSDropzone.getInstance(selector);
            if (dropZone) {
                dropZone.options.dictRemoveFileConfirmation = dictRemoveFileConfirmation;
                dropZone.element.dropzone._callbacks.removedfile.length = 1;
            }
        },
        getFiles: (selector) => {
            let dropZone = FSDropzone.getInstance(selector);
            if (dropZone)
                return dropZone.files;
        },
        getAcceptedFiles: (selector) => {
            let dropZone = FSDropzone.getInstance(selector);
            if (dropZone)
                return dropZone.getAcceptedFiles()
        },
        getRejectedFiles: (selector) => {
            let dropZone = FSDropzone.getInstance(selector);
            if (dropZone)
                return dropZone.getRejectedFiles()
        },
        getQueuedFiles: (selector) => {
            let dropZone = FSDropzone.getInstance(selector);
            if (dropZone)
                return dropZone.getQueuedFiles()
        },
        getUploadingFiles: (selector) => {
            let dropZone = FSDropzone.getInstance(selector);
            if (dropZone)
                return dropZone.getUploadingFiles()
        },
        addFile: (selector,id,fileName,fileExtension,fileUrl,size=125) => {
            let dropZone = FSDropzone.getInstance(selector);
            if (dropZone) {
                let file = {
                    name: fileName,
                    type: fileExtension,
                    id: id,
                    url: fileUrl
                }
                dropZone.emit("addedfile", file);
                dropZone.emit("thumbnail", file, fileUrl);
                dropZone.emit("success", file);
                dropZone.emit("complete", file);
                dropZone.files.push(file);
                $('[data-dz-thumbnail]').css('height', size);
                $('[data-dz-thumbnail]').css('width', size);
                $('[data-dz-thumbnail]').css('object-fit', 'cover');
      
                //dropZone.options.addedfile.call(dropZone, file);
                //dropZone.options.thumbnail.call(dropZone, file, fileUrl);
                //file.previewElement.classList.add('dz-success');
                //file.previewElement.classList.add('dz-complete');
            }
        },
        cleanDropzone: (selector) => {
            let dropZone = FSDropzone.getInstance(selector)
            if (dropZone) {
                for (let file of dropZone.files) {
                    file.previewElement.remove();
                    dropZone.files = dropZone.files.filter((key) => key != file);
                }
                $('.dz-preview', dropZone.element).remove();
            }
                
        },
        destroy: (selector) => {
            let dropZone = FSDropzone.getInstance(selector)
            if (dropZone) {
                cleanDropzone(selector);
                dropZone.destroy();
            }
        },
        disable: (selector) => {
            let dropZone = FSDropzone.getInstance(selector);
            if (dropZone)
                dropZone.disable();
            let deleteBtnElement = $(`div[data-dz-remove=""]`, dropZone.element);
            $(deleteBtnElement).addClass('disabled');
        },
        enable: (selector) => {
            let dropZone = FSDropzone.getInstance(selector);
            if (dropZone)
                dropZone.enable();
            let deleteBtnElement = $(`div[data-dz-remove=""]`, dropZone.element);
            $(deleteBtnElement).removeClass('disabled');
        }
    }
}();

jQuery(document).ready(function () {
    Dropzone.autoDiscover = false;
    FSDropzone.init();
});
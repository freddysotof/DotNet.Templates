// Class definition

var FSBootstrapStepper = function () {

    // Private functions
    var initialize = function (selector,options = {
        linear: false,
        animation: true,
        selectors: {
            steps: '.step',
            trigger: '.step-trigger',
            stepper: '.bs-stepper'
        }
    }) {
        if (typeof (selector) == 'undefined' || !selector) {
            document.querySelectorAll('.bs-stepper').forEach((element, index, array) => {
                let stepperEl = new Stepper(element, options);
                element.addEventListener('show.bs-stepper', FSBootstrapStepper.refreshStepperButtons);
            })
        } else {
            
            let element = FSBootstrapStepper.getInstance(selector); 
            let stepperEl = new Stepper(element, options);
            element.addEventListener('show.bs-stepper', FSBootstrapStepper.refreshStepperButtons);
        }
        //document.addEventListener('DOMContentLoaded', function () {
      
        //let initializeSteppers = new Stepper(document.querySelectorAll('.bs-stepper'), options)
        //})
    }

    return {
        // public functions
        init: function (element,options) {
            initialize(element,options);
        },
        getInstance: (selector) => {
            let element;
            if (selector.nodeType === Node.ELEMENT_NODE)
                element = selector;
            else
                element = (selector && `.${selector},#${selector}`) ?? '.bs-stepper';
            return $(element).length > 0 ? $(element)[0]: null;
        },
        buttonNext: (buttonEvent) => {
            let buttonElement = buttonEvent.currentTarget ?? buttonEvent.target;
            let stepperElement = $(buttonElement).parents(".bs-stepper");
            if (stepperElement.length == 1)
                stepperElement[0].bsStepper.next();
        },
        buttonPrevious: (buttonEvent) => {
            let buttonElement = buttonEvent.currentTarget ?? buttonEvent.target;
            let stepperElement = $(buttonElement).parents(".bs-stepper");
            if (stepperElement.length == 1)
                stepperElement[0].bsStepper.previous();
        },
        previous: (selector) => {
            let element = FSBootstrapStepper.getInstance(selector);
           
            element.bsStepper.previous();
            //console.log(newEvent);
            //FSBootstrapStepper.refreshStepperButtons(event.currentTarget, stepperElement.bsStepper._currentIndex);
            //let previousStep = event.detail.from;

                //stepperElement[0].bsStepper.next();
        },
        next: (selector) => {
            let element = FSBootstrapStepper.getInstance(selector);
            element.bsStepper.next();
        },
        refreshStepperButtons: (stepperEvent) => {
            let stepperElement = stepperEvent.currentTarget ?? stepperEvent.target;
            let totalSteps = stepperElement.bsStepper._steps.length;
            let isFinalStep = stepperEvent.detail.indexStep + 1 == totalSteps;
            let previousButtonElement = $('.bs-stepper-previous-button', stepperElement);
            let nextButtonElement = $('.bs-stepper-next-button', stepperElement);
            if (stepperEvent.detail.indexStep == 0) {
                if (previousButtonElement.length == 1) {
                    previousButtonElement[0].setAttribute('disabled', '');
                }
                if (nextButtonElement.length == 1) {
                    nextButtonElement[0].removeAttribute('disabled');
                }

            } else if (stepperEvent.detail.indexStep > 0 && !isFinalStep) {
                if (previousButtonElement.length == 1) {
                    previousButtonElement[0].removeAttribute('disabled');
                }

                if (nextButtonElement.length == 1) {
                    nextButtonElement[0].removeAttribute('disabled');
                }

            } else if (isFinalStep) {
                if (nextButtonElement.length == 1) {
                    nextButtonElement[0].setAttribute('disabled', '');
                }
                if (previousButtonElement.length == 1) {
                    previousButtonElement[0].removeAttribute('disabled');
                }
            }

        },
        discardNextStep: (stepEvent) => {
            stepEvent.detail.to = stepEvent.detail.from;
            stepEvent.detail.from = stepEvent.detail.indexStep;
            stepEvent.detail.indexStep = stepEvent.detail.to;
            FSBootstrapStepper.refreshStepperButtons(stepEvent);
        },
        //refreshStepperButtons: (stepperElement,indexStep) => {
        //    let totalSteps = stepperElement.bsStepper._steps.length;
        //    let isFinalStep = indexStep + 1 == totalSteps;
        //    let previousButtonElement = $('.bs-stepper-previous-button', stepperElement);
        //    let nextButtonElement = $('.bs-stepper-next-button', stepperElement);
        //    if (indexStep == 0) {
        //        if (previousButtonElement.length == 1) {
        //            previousButtonElement[0].setAttribute('disabled', '');
        //        }
        //        if (nextButtonElement.length == 1) {
        //            nextButtonElement[0].removeAttribute('disabled');
        //        }

        //    } else if (indexStep > 0 && !isFinalStep) {
        //        if (previousButtonElement.length == 1) {
        //            previousButtonElement[0].removeAttribute('disabled');
        //        }

        //        if (nextButtonElement.length == 1) {
        //            nextButtonElement[0].removeAttribute('disabled');
        //        }

        //    } else if (isFinalStep) {
        //        if (nextButtonElement.length == 1) {
        //            nextButtonElement[0].setAttribute('disabled', '');
        //        }
        //        if (previousButtonElement.length == 1) {
        //            previousButtonElement[0].removeAttribute('disabled');
        //        }
        //    }

        //},
        onShow: (selector, callback) => {
            let element = FSBootstrapStepper.getInstance(selector);
            //element.removeEventListener('show.bs-stepper', FSBootstrapStepper.refreshStepperButtons);
            element.addEventListener('show.bs-stepper', callback);
        },

    };
}();

//jQuery(document).ready(function () {
//    FSBootstrapStepper.init();
//});
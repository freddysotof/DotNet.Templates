// Class definition

var FSPinCodeInput= function () {
    //new PincodeInput('.pin-chofer', {
    //    count: 4,
    //    secure: true,
    //    previewDuration: 200,
    //    onInput: (value) => {
    //        if (value === "4444")
    //            console.log("bien")
    //    }
    //})
   
    // Private functions
    var initialize = function (options = {
        count: 4,
        secure: true,
        previewDuration: 200,
        onInput: (value) => {
            //console.log(value)
        }

    }) {
        //document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.pincode-input-container').forEach((element, index, array) => {
            element.innerHTML = '';
            new PincodeInput(`.${Object.values(element.classList).join('.')}`, options);
     
        })
        //let initializeSteppers = new Stepper(document.querySelectorAll('.bs-stepper'), options)
        //})
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
                element = (selector && `.${selector},#${selector}`) ?? '.pincode-input-container';
            return $(element).length > 0 ? $(element)[0] : null;
        },
        onInput: (selector, func) => {
            let element = FSPinCodeInput.getInstance(selector);
            element.children.forEach((childElement, index, array) => {
                let value = FSPinCodeInput.sumAll(selector);
                if(element)
                    childElement.removeEventListener("input", func);
                childElement.addEventListener("input", (event) => {
                    
                    let value = FSPinCodeInput.sumAll(selector);
                    if (value.length < 4) {
                        FSPinCodeInput.reset(event.currentTarget??event.target);
                    }
                        
                    func(event, value);
                }, true);
            });
        },
        sumAll: (selector) => {
            let element = FSPinCodeInput.getInstance(selector);
            let val = "";
            element.children.forEach((element, index, array) => {
                val += element.value;
            });
            return val;
        },
        setCorrect: (selector) => {
            let element = FSPinCodeInput.getInstance(selector);
            let parentElement = element.parentElement;
            parentElement.classList.add("correct");
            parentElement.classList.remove("incorrect");
        },
        setIncorrect: (selector) => {
            let element = FSPinCodeInput.getInstance(selector);
            let parentElement = element.parentElement;
            parentElement.classList.add("incorrect");
            parentElement.classList.remove("correct");
            $(parentElement).effect('shake');
        },
        reset: (selector) => {
            let element = FSPinCodeInput.getInstance(selector);
            let parentElement = element.parentElement;
            parentElement.classList.remove("incorrect");
            parentElement.classList.remove("correct");
            element.classList.remove("incorrect");
            element.classList.remove("correct");
            for (let childInput of element.children)
                childInput.value = '';
        },
        //validatePin: (event, value,compareValue) => {
        //    if (value == compareValue) {
        //        FSPinCodeInput.setCorrect(event.currentTarget);
        //        return true;
        //    } else if (value.length == 4) {
        //        FSPinCodeInput.setIncorrect(event.currentTarget);
        //        return false;
        //    }
        //}
    }
}();

//jQuery(document).ready(function () {
//    FSBootstrapStepper.init();
//});
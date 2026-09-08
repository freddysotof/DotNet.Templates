// Class definition

var FSMaskInput = function () {

    // Private functions
    var initialize = function () {
        FSMaskInput.maskMoneyInput();
        FSMaskInput.maskPhoneInput();
        FSMaskInput.maskDominicanIdInput();
        FSMaskInput.maskDominicanTaxNumberInput();
    }
    const buildMoneyOpts = (lastOutput,unit = 'RD$', decimalPrecision = 2, thousandSeparator = ',', decimalSeparator = '.', suffixUnit = '', zeroCents = true) => {
        return {
            // Decimal precision -> "90"
            precision: decimalPrecision,
            // Decimal separator -> ",90"
            separator: decimalSeparator,
            // Number delimiter -> "12.345.678"
            delimiter: thousandSeparator,
            // Money unit -> "R$ 12.345.678,90"
            unit: unit,
            // Money unit -> "12.345.678,90 R$"
            suffixUnit: suffixUnit,
            // Force type only number instead decimal,
            // masking decimals with ",00"
            // Zero cents -> "R$ 1.234.567.890,00"
            zeroCents: zeroCents,
            lastOutput: lastOutput
        }
    }

    const maskMoney = (element, unit, decimalPrecision, thousandSeparator, decimalSeparator, suffixUnit,zeroCents) => {
        VMasker(element).maskMoney(
            buildMoneyOpts(unit, decimalPrecision, thousandSeparator, decimalSeparator, suffixUnit, zeroCents));
    }
    const phoneMaskFormat = '(999) 999-9999';
    const dominicanIdMaskFormat = '999-9999999-9';
    const dominicanTaxNumberMaskFormat = '999-99999-9';
    const inputHandler=(mask, max,placeHolder, event) =>{
        var c = event.target;
        var v = c.value.replace(/\D/g, '');
        var m = c.value.length > max ? 1 : 0;
        VMasker(c).unMask();
        VMasker(c).maskPattern(mask);
        if (placeHolder)
            c.value = VMasker.toPattern(v, { pattern: mask, placeholder: placeHolder });
        else
            c.value = VMasker.toPattern(v, mask);

    }
    const inputMoneyHandler = (event) => {
        var c = event.target;
        var v = c.value.replace(/[^0-9.]/g, '');

        let splittedValue = v.split('.');
        if (v!=null && v!=''&& splittedValue.length==1)
            v = `${v}.00`;
        //else
        //    v = `${splittedValue[0]}.${parseInt(splittedValue[1])}`
        //var v = c.value.replace(/\D/g, '');
        VMasker(c).unMask();
        c.value = v;
    }

    const blurMoneyHandler = (event) => {
        var c = event.target;
        //var v = c.value.replace(/\D/g, '');
        var v = c.value.replace(/[^0-9.]/g, '');
        let splittedValue = v.split('.');
        if (v != null && v != '' && splittedValue.length == 1)
            v = `${v}.00`;
        //else
        //    v = `${splittedValue[0]}.${parseInt(splittedValue[1])}`
      
        VMasker(c).unMask();
        c.value = v;
        const opts = buildMoneyOpts(v);
        VMasker(c).maskMoney({
            // Decimal precision -> "90"
            precision: 2,
            // Decimal separator -> ",90"
            separator: '.',
            // Number delimiter -> "12.345.678"
            delimiter: ',',
            // Money unit -> "R$ 12.345.678,90"
            unit: 'RD$',
            // Money unit -> "12.345.678,90 R$"
            //suffixUnit: null,
            // Force type only number instead decimal,
            // masking decimals with ",00"
            // Zero cents -> "R$ 1.234.567.890,00"
            //zeroCents: false,
            lastOutput: v
        });
       

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
                element = (selector && `.${selector},#${selector}`);
            return $(element);
        },
        maskMoneyInput: () => {
            const elements = document.querySelectorAll('.money-mask');
            for (let element of elements) {
                maskMoney(element);
                element.addEventListener('focus', inputMoneyHandler.bind(undefined), false);
                //element.addEventListener('input', inputMoneyHandler.bind(undefined), false);
                element.addEventListener('blur', blurMoneyHandler.bind(undefined), false);
            }
        },
        maskPhoneInput: () => {
            const elements = document.querySelectorAll('.phone-mask');
            for (let element of elements) {
                VMasker(element).maskPattern(phoneMaskFormat);
                element.addEventListener('input', inputHandler.bind(undefined, phoneMaskFormat ,10,null), false);
            }
        },
        maskDominicanIdInput: () => {
            const elements = document.querySelectorAll('.domi-id-mask');
            for (let element of elements) {
                VMasker(element).maskPattern(dominicanIdMaskFormat);
                element.addEventListener('input', inputHandler.bind(undefined, dominicanIdMaskFormat, 11,null), false);
            }
        },
        maskDominicanTaxNumberInput: () => {
            const elements = document.querySelectorAll('.domi-tax-mask');
            for (let element of elements) {
                VMasker(element).maskPattern(dominicanTaxNumberMaskFormat);
                element.addEventListener('input', inputHandler.bind(undefined, dominicanTaxNumberMaskFormat, 9,null), false);
            }
        },
        maskInputToPattern: (selector, pattern, max, placeHolder = 'x') => {
            let elements = FSMaskInput.getInstance(selector);
            //const elements = document.querySelectorAll(selector);
            for (let element of elements) {
                VMasker(element).maskPattern(pattern);
                element.addEventListener('input', inputHandler.bind(undefined, pattern, max, placeHolder), false);
            }

        },
        maskValueToPattern: (value,pattern,placeHolder='x')=>VMasker.toPattern(value, {pattern: pattern, placeholder: placeHolder}),
        maskValueToMoney: (value) => VMasker.toMoney(value, {
            // Decimal precision -> "90"
            precision: 2,
            // Decimal separator -> ",90"
            separator: '.',
            // Number delimiter -> "12.345.678"
            delimiter: ',',
            // Money unit -> "R$ 12.345.678,90"
            unit: 'RD$',
            // Money unit -> "12.345.678,90 R$"
            //suffixUnit: null,
            // Force type only number instead decimal,
            // masking decimals with ",00"
            // Zero cents -> "R$ 1.234.567.890,00"
            //zeroCents: false,
        }),
        unMask: (selector)=>{
            let element = FSMaskInput.getInstance(selector);
            if (Array.isArray(element)) {
                for (let el of element) {
                    VMasker(el).unMask();
                }

            }
            else {
                let el = element[0];
                VMasker(el).unMask();
                let clone = el.cloneNode(true);
                let parentElement = $(el).parent()[0];
                parentElement.removeChild(el)
                parentElement.prepend(clone)
            }
              
        },
        getValueUnMasked: (selector) => {
            //let element
            //if (selector.nodeType === Node.ELEMENT_NODE)
            //    element = selector;
            //else
            //    element = document.querySelector(selector);
            let element = FSMaskInput.getInstance(selector)[0];
            let value = element.value;

            if (value != null && element.classList.contains('money-mask'))
                return element.value.replace(/[^0-9.]/g, '');
            else if (value != 'null')
                return element.value.replace(/\D/g, '');
            else
                return "";
        }
    };
}();

jQuery(document).ready(function () {
    FSMaskInput.init();
});
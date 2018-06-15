( function() {

    var root = typeof self == 'object' && self.self === self && self ||
    typeof global == 'object' && global.global === global && global ||
    this ||
    {};

    //--Creating the library "namespace"
    var sham = {};
    

    //****************************************************** */
    //--Validate object
    sham.validate = {

        isNumber : function(acceptNegative, value) {
            if(acceptNegative) {
                return (/^\-?([\d]?)+$/g.exec(value))? true : false;
            } else {
                return (/^\d+$/g.exec(value))? true : false;
            }
         }
    
    };

    //****************************************************** */
    //--Format object
    sham.format = {

        toNumber: function(value) {

            //--If negative number
            let isNegative = (value.indexOf('-') === 0);
        
            //--Removing dots
            let cleanedValue = value.replace(/\./g, '');
            //--Removing negative symbol
            cleanedValue = cleanedValue.replace(/-/g, '');

            let valueLength = cleanedValue.length;
            let formatedValue = '';
            let returnValue = value;

            //--Only format if is grater than 100 ( > 3 decimal places)
            if(valueLength > 3) {
                let thousandMultiplier = parseInt((valueLength-1)/3);

                for(let decimalPlaces = 1; decimalPlaces <= thousandMultiplier; decimalPlaces++) {
                    formatedValue = '.' + cleanedValue.substring(cleanedValue.length-(decimalPlaces * 3), cleanedValue.length-(decimalPlaces * 3) + 3 ) + formatedValue;
                }
                
                formatedValue = ((isNegative)? '-': '') + cleanedValue.substring(0, valueLength -(thousandMultiplier*3) ) + formatedValue;
                returnValue = formatedValue;
            }

            return returnValue;
        }

    };

    //****************************************************** */
    //--Form object
    sham.form = {

        hasEvent : function() {
            return (event)? true: false;
        },

        hasTarget : function() {
            
            if(event) {
                if(event.target) {
                    return true;
                }
            }

            return false;

        },

        input: {

            acceptType : function(fn, arrExceptions) {
                //--Validating if has event/target
                if(!sham.form.hasTarget) {
                    return;
                }
                
                //--Getting current inputText value, keyCode of input and converting it to Char value
                let currentValue = event.target.value;
                let keyCode = event.charCode || event.keyCode || event.which;
                let newValue = currentValue + String.fromCharCode(keyCode);

                //--Removing exceptions
                if(arrExceptions) {
                    for (let i = 0; i< arrExceptions.length;i++) {
                        newValue = newValue.replace(new RegExp(`\\${arrExceptions[i]}`, 'g'), '');
                    }
                }
    
                //--Calling the validate function
                event.returnValue = fn(newValue);
            },
            
           
            acceptNumber : function (acceptNegative) {
                //--Default Values
                acceptNegative = acceptNegative || false;

                this.acceptType(sham.validate.isNumber.bind(this, acceptNegative), ['.']);
            },
  
            formatType: function(fn) {
                //--Validating if has event/target
                if(!sham.form.hasTarget) {
                    return;
                }
                
                event.target.value = fn(event.target.value);

            },            

            formatNumber: function() {
                this.formatType(sham.format.toNumber);
            },

            lockLength: function (value) {
                return value.length > this.maxLength;
            }
        }
    };    
    
    //--Creating the library in global object
    root.sham = sham;

}());





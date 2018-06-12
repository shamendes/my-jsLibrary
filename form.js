myLibrary.form = {
    input: {
        acceptType : function(keyCode, valueType) {
            
            let accept = true;

          
            switch(valueType) {
                case 'number' :
                    accept = !((keyCode >= 58 && keyCode <= 126) || (keyCode >= 33 && keyCode <= 47  ) || keyCode === 180 || keyCode === 231 || keyCode === 199 || keyCode === 168)  ;
                    break;
                case 'numberNegative':
                    accept = keyCode === 45;
                    accept = accept || this.acceptType(keyCode, 'number');
                    break;
                case 'alpha' :
                    accept = !(this.acceptType(keyCode, 'number'));
                    break;
                case 'alphaNoSpecialChars':
                    accept = accept = ((keyCode >= 97 && keyCode <= 122) || (keyCode >= 65 && keyCode <= 90  ) || keyCode === 180 || keyCode === 126 || keyCode === 39 || keyCode === 231 || keyCode === 199 || keyCode === 96 );
                    break;
            }

            return accept;
        },       
        
        acceptNumbers : function(acceptNegatives) {            
            
            let isValid = false;
            let keyCode = this.getKeyCode(parent.event);
            
            if(acceptNegatives) {
                isValid = this.acceptType(keyCode, 'numberNegative');
            } else {
                isValid = this.acceptType(keyCode, 'number');
            }

            parent.event.returnValue = isValid;

        },          
        
        acceptChars : function(acceptSpecialChars) {            

            let isValid = false;
            let keyCode = this.getKeyCode(parent.event);
            
            if(acceptSpecialChars) {
                isValid = this.acceptType(keyCode, 'alpha');
            } else {
                isValid = this.acceptType(keyCode, 'alphaNoSpecialChars');
            }

            parent.event.returnValue = isValid;
        },
        
        getKeyCode: function(inputEvent) {
            let keyCode = 0;

            if( inputEvent) {
                keyCode = inputEvent.charCode || inputEvent.keyCode || inputEvent.which;
            }

            return keyCode;
        },

        format: function(inputElement) {
            parent.event.returnValue = false;
            if(inputElement.value.length === 3) {
                inputElement.value = '.' + inputElement.value ;
            } 
        }

    }
}
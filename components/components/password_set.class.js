password_set = {
	
	name : 'password',
	config : function(obj){

		this.structure = {
                            design : 'style',
                            element : __lib__.factories.HTML.make('input'),
                            configure : {
				type : 'password',
                                value : obj.value || '',
                                placeholder : obj.placeholder || 'password'
                            }
		};
	
		this.design = {
			style : {
				position : 'relative',
				cssFloat : 'left',
				width : '100%',
				height : 'auto',
				padding : '2%',
				borderRadius : '5px',
                                background : 'white'
			}
		};
                
		this.methods = {
                    
                    onkeyup : function(){
                        
                        var encrypted = CryptoJS.AES.encrypt(this.value,this.value);
                        this.set('encrypted',encrypted.toString());
                        
                    },
                    
                    onchange : function(){
                        
                        var new_value = new Array(this.value.length + 1).join('*');
                        this.value = new_value;
                        
                    }
                    
		};
                
                this.events = {
                    
		};

		return this;

	}

};

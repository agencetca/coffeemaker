password = {
	
	name : 'password',
	config : function(obj){

		this.structure = {
                            design : 'style',
                            element : 'input',
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
				padding : '5px',
				borderRadius : '5px',
                                background : 'white'
			}
		};
                
		this.methods = {
                    
                    onkeyup : function(){
                        
                        this.set('unsecure',this.value);
                        
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

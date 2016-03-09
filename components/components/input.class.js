input = {
	
	name : 'input',
	config : function(obj){

		this.structure = {
                            design : 'style',
                            element : document.createElement('input'),
                            configure : {
                                type : obj.type  || 'text',
                                value : obj.value || 'POUET',
                                placeholder : obj.placeholder || ''
                            }
		};
	
		this.design = {
			style : {
				position : 'relative',
				cssFloat : 'left',
				width : '100%',
                                minWidth: '100px',
				height : 'auto',
				padding : '5px',
				borderRadius : '5px',
                                borderColor : '#333',
                                background : 'white',
                                margin : '1px'
			}
		};
		this.methods = {
                    onkeyup : function(){
                        this.set('value',this.value);
                    }
		};

		return this;

	}

};

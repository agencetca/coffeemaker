form = {
	
	name : 'form',
	config : function(obj){
            
                this.structure = {

                        design : 'form',
                        element : document.createElement('form')

		};
	
		this.design = {
                    
			form : {
				position : 'relative',
				cssFloat : 'left',
				width : 'auto',
				height : 'auto',
				margin : 0,
				padding : 0
			}
                    
		};

		return this;

	}

}

header = {
	
	name : 'header',
	config : function() {
	
		 this.structure = {
			
		 	design : 'header',
			element : document.createElement('header')
		
		};
	
		this.design = {
			header : {
				position : 'relative',
                                cssFloat : 'left',
                                width : '98%',
                                height : '15%',
                                marginLeft : '1%',
                                marginRight : '1%',
                                marginTop : '3px',
                                marginBottom : '30px',
                                backgroundColor : 'transparent',
                                zIndex : '999'
			}
		};

		return this;

	}

}

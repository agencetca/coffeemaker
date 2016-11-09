section = {
	
	name : 'section',
	config : function() {

		 this.structure = {
			
		 	design : 'section',
			element : document.createElement('section')
		
		};
	
		 this.design = {
			section : {
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

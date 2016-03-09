nav = {
	
	name : 'nav',
	config : function() {

		this.structure = {
			
		 	design : 'nav',
			element : document.createElement('nav')
		
		};
	
		this.design = {
			nav : {
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

main = {
	
	name : 'main',
	config : function() {

		 this.structure = {
			
		 	design : 'main',
			element : document.createElement('main')
		
		};
	
		this.design = {
			main : {
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

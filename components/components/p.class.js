p = {
	
	name : 'p',
	config : function(){

		 this.structure = {
			
		 	design : 'p',
			element : document.createElement('p')
		
		};
	
		this.design = {
			p : {
				position : 'relative',
				cssFloat : 'left',
				width : '100%',
				height : 'auto',
				margin : 0,
				padding : 0,
                                
                                overflow : 'hidden',
                                //'-o-text-overflow' : 'ellipsis',
                                textOverflow : 'ellipsis',
			}
		};

		return this;

	}

}

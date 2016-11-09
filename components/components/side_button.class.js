side_button = {
	
	name : 'side_button',
	config : function(obj) {

		 this.structure = {
			
		 	design : 'button',
			element : 'button'
		
		};
	
		this.design = {
			button : {
				position : 'relative',
                                cssFloat : obj.side || 'left',
				width : '90%',
                                borderLeft : function(){
                                    if(obj.side === 'left'){
                                        return '0 solid transparent';
                                    }
                                },
                                borderRight : function(){
                                    if(obj.side === 'right'){
                                        return '0 solid transparent';
                                    }
                                },
				'height*' : function(that){
                                    var w = window.getComputedStyle(that, null)['width'];
                                    if(obj.size === 'long'){
                                        return parseInt(w) * 1.5 +'px';
                                    }else if(!obj.size || obj.size === 'normal'){
                                        return w;
                                    }
                                    
                                },
                                background : 'blue',
			}
		};
                
                this.methods = {
                   
                    
                };
                
		this.events = {
                    
		};

		return this;

	}

}

frame = {

	name : 'frame',
	config : function(obj) {

		 this.structure = {
			
		 	design : 'frame',
			element : function(){
                            if(!obj.position || obj.position === 'top'){
                                return 'nav';
                            }else if(obj.position === 'bottom'){
                                return 'footer';
                            }
                        }
		
		};
	
		this.design = {
			frame : {
                                position : 'fixed',
                                top : function(){
                                    if(!obj.position || obj.position === 'top'){
                                        return 0;
                                    }else{
                                        return '';
                                    }
                                },
                                left : 0,
                                width : '100%',
                                height : '40px',
                                backgroundColor : 'black',
                                zIndex : '9999'
			}
		};
                
                this.methods = {
                    
                    offset : '40px',
                    
                    onload : function(that){
                        var parent = that.parentNode;
                        if(!obj.position || obj.position === 'top'){
                            parent.style.paddingTop = that.get('offset');
                        }else if(obj.position === 'bottom'){
                            parent.style.paddingBottom = that.get('offset');
                        }
                        
                    }
                    
                };

		return this;

	}

}

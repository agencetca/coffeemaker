sideline = {
	
	name : 'sideline',
	config : function(obj) {

		 this.structure = {
			
		 	design : 'line',
			element : 'nav'
		
		};
	
		this.design = {
			line : {
				position : 'relative',
                                cssFloat : obj.side || 'left',
                                top : 0,
                                left : function(){
                                    if(obj.side === 'left' || obj.side !== 'right'){
                                        return 0;
                                    }
                                },
                                right : function(){
                                    if(obj.side === 'right'){
                                        return 0;
                                    }
                                },
				width : '7%',
                                height : '100%'
			}
		};
                
                this.methods = {
                    
                    position : 'relative',
                    
                    onload : function(that){
                        
                        function getPosition(element) {
                                var xPosition = 0;
                                var yPosition = 0;

                                    while(element) {
                                        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
                                        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
                                        element = element.offsetParent;
                                    }
                                return { x: xPosition, y: yPosition };
                        }
                        
                        
                        
                        var clone = that.cloneNode();
                        clone.style.position = 'fixed';
                        clone.style.top = obj.offset || '10%';
                        
                        __lib__.singleton.Events.listen('body::scroll',function(e){

                            var position = getPosition(that).y;
                            
                            if(position <= 70){
                                
                                if(that.get('position') === 'relative'){
                                    
                                    while (that.hasChildNodes()) {
                                        clone.appendChild(that.removeChild(that.firstChild))
                                    };
                                    that.set('position','fixed');
                                    that.style.visibility = 'hidden';
                                    document.body.appendChild(clone);
                                    
                                };
                                
                            }else{
                                if(that.get('position') === 'fixed'){
                                    
                                    while (clone.hasChildNodes()) {
                                        that.appendChild(clone.removeChild(clone.firstChild))
                                    };
                                    that.set('position','relative');
                                    that.style.visibility = 'visible';
                                    document.body.removeChild(clone);
                                };
                                
                            }
                            
                            
                        });
                        
                    }
                    
                };
                
		this.events = {
                    
		};

		return this;

	}

}

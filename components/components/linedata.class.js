linedata = {
	
	name : 'linedata',
	config : function(obj){

		this.structure = {
                    
                            design : 'style',
                            element : 'container'

		};
	
		this.design = {
			style : {
				'width*' : function(that){
                                    var parent = that.parentNode;
                                    var childs = parent.childNodes.length;
                                    return (100-(childs*2))/childs+'%';
                                },
                                height:'100%',
                                margin:'0 1% 0 1%',
                                background : 'orange'
			}
		};
                
                this.methods = {
                    
                    onclick : function(){
         
                        this._unique();
                        
                    },
                    
                    _unique : function(){
                        
                        var a = this.parentNode.childNodes;
                        
                        for(var i in a){
                            if(a.hasOwnProperty(i)){
                                if(a[i] !== this && a[i]._pull){
                                    a[i]._pull();
                                }
                            }
                        }
                        
                    }
                
                };
                
                this.events = {
                    
                };

		return this;

	}

}

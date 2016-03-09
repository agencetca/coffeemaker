role = {
	
	name : 'role',
        
	config : function(obj){
            
            
                this.structure = {
                    design : 'role',
                    element : 'div',
                    
                    
                    journalist : {
                        
                        design : 'journalist',
                        element : 'rolebutton',
                        methods : 'buttons',
                        events : 'io'
                    },
                    communicator : {
                        design : 'communicator',
                        element : 'rolebutton',
                        methods : 'buttons',
                        events : 'io'
                    },
                    leader : {
                        design : 'leader',
                        element :'rolebutton',
                        methods : 'buttons',
                        events : 'io'
                    }
		};
	
		this.design = {

                    role : {
                        width : '100%',
                        height : '100px'
                    },
                    journalist : {
                        background : 'green',
                        color : 'white',
                        fontWeight : 'bold'
                    },
                    communicator : {
                        background : 'orange',
                        color : 'white',
                        fontWeight : 'bold'
                    },
                    leader : {
                        background : 'blue',
                        color : 'white',
                        fontWeight : 'bold',
                        
                    }

		};
                
                this.methods = {
                    
                    buttons : {
                        
                        _giveName : function(){
                            var name = this.path;
                            this.set('name',name.replace(/.*\/(.*)$/,'$1'));
                        },
                        _onload : function(that){

                                that._giveName();
                                
                        },
                        
                        
                        
                    },
                    
                    onload : function(that) {
                        
                        
                       __lib__.singleton.Events.listen('*role/*::push',function(e){
                           
                           
                           var element = e.detail.element;
                           
                            if(element.get('state') === 'on'){
                                var name = element.get('name');
                                that.set('value',name);
                            }
                           
                           
                       });

                    }
		};
                
                this.events = {
                    io : {
                        push : {}
                    }
                };

		return this;

	}

}

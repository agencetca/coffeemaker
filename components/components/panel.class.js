panel = {
	
	name : 'panel',
	config : function(obj){
                
		this.structure = {
                    id : true,
                    design : 'panel',
                    element : 'div',
                    methods : 'plow',
                    close_area : {
                        id : true,
                        design : 'close_area',
                        element : 'div',
                        control : ['panel_'+obj.side,'logo'],
                        methods : 'close_area'
                    },
                    button1 : {
                        id : true,
                        element : 'rolebutton',
                    },
                    button2 : {
                        id : true,
                        element : 'rolebutton',
                    },
                    
		};
	
		this.design = {
                    panel:{
                        position : 'fixed',
                        top : 0,
                        left : function(){
                            if(obj.side === 'left'){
                                return 0;
                            }
                        },
                        right : function(){
                            if(obj.side === 'right'){
                                return 0;
                            }
                        },
                        height : '100%',
                        width : '250px',
                        background : 'black',
                        zIndex : '9999',
                    },
                    close_area : {
                        width : '100%',
                        height : '100px',
                        background : 'red'
                    }
		};
                
                this.methods = {
                    
                        opened : 'no',
                        side : obj.side,
                        lock : 'no',
                        
                        _switch : function(){
                            if(this.get('opened') === 'no'){
                                this.open();
                            }else{
                                this.close();
                            }
                        },
                        
                        _animate : function(options){
                            
                            $.when( $(this).animate(options, 300) ).done(function() {
                                this.set('lock','no');
                            }.bind(this));
                            
                        },
                        
                        
                        close : function(){
                            
                            var offset = parseInt(this.style.width)+'px';
                            var options = {};
                            options[this.get('side')] = '-'+offset;
                            this._animate(options);
                            this.set('opened','no');
                            
                        },
                        
                        open : function(){
                            
                            var offset = 0;
                            var options = {};
                            options[this.get('side')] = offset;
                            this._animate(options);
                            this.set('opened','yes');
                            
                        },
                        
                        onload : function(that){
                            
                            if(that.get('opened') === 'yes'){
                                that.open();
                            }else{
                                that.close();
                            }
                        },
                        
                        close_area : {
                            onclick : function(slave){
                                if(slave[0].get('lock') === 'no'){
                                    slave[0].set('lock','yes');
                                    slave[0].close();
                                    if(obj.side === 'left'){
                                        slave[1]._show();
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

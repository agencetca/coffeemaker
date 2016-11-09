submit = {
	
	name : 'submit',
	config : function(obj){
            
                this.structure = {
                        design : 'style',
                        element : 'input',
                        configure : {
                            type : 'submit',
                            value : obj.text || 'submit'
                        }
		};
	
		this.design = {
			style : {
				position : 'relative',
				cssFloat : 'left',
				width : 'auto',
                                minWidth: '30px',
				height : 'auto',
				background : '#F5F5F5',
				padding : '5%',
				borderRadius : '5px',
				cursor : 'pointer'
			}
		};
                
                this.methods = {
                    
                    state : 'on',
                    min_opacity : '0.2',
                    max_opacity : '1',
                    
                    _activate : function(){
                        if(this.get('state') === 'on'){
                            var opa = this.get('max_opacity');
                            this.style.opacity = opa;
                        }
                    },
                    
                    _deactivate : function(){
                        if(this.get('state') === 'off'){
                            var opa = this.get('min_opacity');
                            this.style.opacity = opa;
                        }
                    },
                    
                    onclick : function(e){
                            e.preventDefault();
                            if(this.get('state') === 'off'){
                                e.stopPropagation();
                            }
                    },
                    
                    _switch : function(){
                        if(this.get('state') === 'off'){
                                this._deactivate();
                            }else{
                                this._activate();
                            }
                    },
                    
                    _onload : function(that){
                            that._switch();
                    },
                    
                    transmit : function(action,data,callback){
                        
                        if(data.password){
                            data.password = ''+CryptoJS.AES.encrypt("innov24", data.password)+'';
                        }
                        
                        __lib__.singleton.Transmission.post(action,data,callback);
                    }
                    
		};
                
                this.events = {
                   
                    
		};

		return this;

	}

}

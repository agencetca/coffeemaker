Coffeemaker.core.toolchain.make = function(thing) {
		
	    var utils = Coffeemaker.core.utilities;
	    var toolchain = Coffeemaker.core.toolchain;
	    var monitor = Coffeemaker.core.monitor;
	    var repo = Coffeemaker.components;
		
		//TODO
		//var loop = load('loop');
		
		if ( utils.check.isHTML(thing) ) { 
		
		    return thing;
		
		} else if ( utils.check.isString(thing) ) {
		        if( ! thing.match(/^system::/) && utils.check.objectSize(repo[thing]) !== 0) {
		        	thing = toolchain.compile(repo[thing])[0];
		        }else{
		            if( utils.check.objectSize(repo[thing]) !== 0 ){ 
                        monitor.log.exception('make.js','Make use a system '+thing+' because it could not find one in the component repo');
                    }
		            thing =  document.createElement(thing.replace(/^system::/,''));
		        }
		} else if ( utils.check.isFunction(thing) ) {
		        thing = thing();
		        if ( utils.check.isNotHTML(thing) ) { 
		            thing = null;
		        }
		
		} else if ( utils.check.isNotHTML(thing) && utils.check.isObject(thing.structure) ) {
		
		    thing = thing.structure;
		    base  = [];
		
		     var loop = function(o,callback,recursive) {
		         if(!o) return;
		         for(var i in o) {
		             if(o.hasOwnProperty(i)) {
		                 if(callback) {
		                     callback(i,o[i],o);
		                 };
		                 //if(typeof o[i] === 'object' && ! utils.check.isArray(o[i])) {
		                 if(utils.check.isObject(o[i])) {
		                     if(recursive === true){
		                         loop(o[i],callback,true);
		                     };
		                 };
		             };
		         };
		     };
		
		    loop(thing,function(k,v,b) {
		                
		                //if(typeof v === 'object' && v.element) {
		                if(utils.check.isObject(v) && utils.check.doesExist(v.element)) {
		                    
		                   //v.name = base.element.path+'/'+k;
		                   v.element = this.make(v.element);
		                   //v.element.path = v.name;
		                   //record(v.element);
		                   
		                   var parse = function(v,ref){
		                     loop(v,function(x,y){
		                         //if(typeof y === 'object' && y.element) {
		                         if(utils.check.isObject(y) && utils.check.doesExist(y.element)) {
		                             
		                             //y.name = v.name+'/'+x;
		                             y.element = this.make(y.element);
		                             //y.element = document.createElement('div');
		                             //y.element.path = y.name;
		                             //record(y.element);
		                             
		                             //configure(y);
		                             
		                             v.element.appendChild(y.element);
		                             //if(ref) ref.appendChild(y.element);
		                             parse(y);
		                             
		                         };
		                     }.bind(this));
		                    }.bind(this);
		                    
		                    //configure(v);
		                    //base.appendChild(v.element);
		                    base.push(v.element);
		                    parse(v);
		                };
		                
		            }.bind(this));
		
		    thing = base;
		
		}

        return thing;
	
	}

Coffeemaker.core.capacities.toolchain.make = function(thing) {
		
	    var load = Coffeemaker.core.capacities.load;
		var check = load('check');
		var unix = load('unix');
		var compile = load('compile');
        var log = load('log');             
		var repo = load('components');
		
		//TODO
		//var loop = load('loop');
		
		if ( check.isHTML(thing) ) { 
		
		    console.log("make already obj!")
		    return thing;
		
		} else if ( check.isString(thing) ) {
		        console.log("make string");
		        if( ! thing.match(/^system::/) && check.objectSize(repo[thing]) !== 0) {
		        	thing = compile(repo[thing])[0];
		        }else{
		            if( check.objectSize(repo[thing]) !== 0 ){ 
                        log.exception('make.js','Make use a system '+thing+' because it could not find one in the component repo');
                    }
		            thing =  document.createElement(thing.replace(/^system::/,''));
		        }
		} else if ( check.isFunction(thing) ) {
		        console.log("make func!")
		        thing = thing();
		        if ( check.isNotHTML(thing) ) { 
		            thing = null;
		        }
		
		} else if ( check.isNotHTML(thing) && check.isObject(thing.structure) ) {
		
		    thing = thing.structure;
		    console.log("make obj!")
		    base  = [];
		
		     var loop = function(o,callback,recursive) {
		         if(!o) return;
		         for(var i in o) {
		             if(o.hasOwnProperty(i)) {
		                 if(callback) {
		                     callback(i,o[i],o);
		                 };
		                 //if(typeof o[i] === 'object' && ! check.isArray(o[i])) {
		                 if(check.isObject(o[i])) {
		                     if(recursive === true){
		                         loop(o[i],callback,true);
		                     };
		                 };
		             };
		         };
		     };
		
		    loop(thing,function(k,v,b) {
		                
		                //if(typeof v === 'object' && v.element) {
		                if(check.isObject(v) && check.doesExist(v.element)) {
		                    
		                   //v.name = base.element.path+'/'+k;
		                   v.element = this.make(v.element);
		                   //v.element.path = v.name;
		                   //record(v.element);
		                   
		                   var parse = function(v,ref){
		                     loop(v,function(x,y){
		                         //if(typeof y === 'object' && y.element) {
		                         if(check.isObject(y) && check.doesExist(y.element)) {
		                             
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

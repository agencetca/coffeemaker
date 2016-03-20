Coffeemaker.core.toolchain.compile = function(o,opt){
	
	    //needed repositories
	    var utils = Coffeemaker.core.utilities;
	    var toolchain = Coffeemaker.core.toolchain;
	    var thing;
	    
	    //if ( ! utils.check.isString(o)) {
        //    o = utils.analyze.engine('Coffeemaker/components/'+o);
	    //}

	    //if ( ! utils.check.isObject(o.structure)) {
	    //	return;
	    //}

		if (utils.check.isJSON(o)) {
			o = JSON.parse(o);
		}
		
		//Object copy
	    //TODO : Hacked but MUST be optimized
	    var f = function (i) {
		this.structure = (function() { 
		    FLAG=0;
		    utils.loop.object.simple(i,function(x,y){
		        if(! utils.check.isObject(y)){
		            FLAG=1;
		        }
		    });
		    if (FLAG === 0) { return { a : JSON.parse(JSON.stringify(o.structure || {})) } }
		    else{ return JSON.parse(JSON.stringify(o.structure  || {}))}
		}());

		this.design = JSON.parse(JSON.stringify(o.design || {}))
		this.logic = JSON.parse(JSON.stringify(o.logic || {}))
        
		return this;
	    } 

	    o = new f(o)
	    //configure
	    toolchain.configure(o);

	    //make
	    var thing = toolchain.make(o)

	    //inject
	    if (opt) {
	    	var args = Array.prototype.slice.call(arguments);
	    	args.shift();
	    	args.unshift(thing);
	    	toolchain.inject.apply('',args)
	    }

	    return thing;

}

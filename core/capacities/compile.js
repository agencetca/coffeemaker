Coffeemaker.core.capacities.compile = function(o,opt){
	
	    //needed repositories
	    var load = Coffeemaker.core.capacities.load;
	    var check = load('check');
	    var loop = load('loop');
	    var analyze = load('analyze');
	    var toolchain = load('toolchain');
	    var thing;
	    
	    //if ( ! check.isString(o)) {
        //    o = analyze.engine('Coffeemaker/components/'+o);
	    //}

	    //if ( ! check.isObject(o.structure)) {
	    //	return;
	    //}

		if (check.isJSON(o)) {
			o = JSON.parse(o);
		}
		
		//Object copy
	    //TODO : Hacked but MUST be optimized
	    var f = function (i) {
		this.structure = (function() { 
		    FLAG=0;
		    loop.object.simple(i,function(x,y){
		        if(! check.isObject(y)){
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

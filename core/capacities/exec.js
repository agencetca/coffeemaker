Coffeemaker.core.capacities.exec = function() {
	    
	    this.subprocess = function (o,timeout) {

	   	setTimeout(function(){
	   	
			   loop.array(o, function(a,b,c) {
		
					if (check.isObject(b) && check.isFunction(b.payload)) {
			
						var RETURN;
				
						try {
					
                            logs.task.start(b.name);
							RETURN = b.payload.apply('',b.args);
					
						} catch(e) {
				
							if (check.isFunction(b.error)) b.error();
                            logs.task.error(b.name);
                            console.log(e);
				
						} finally {


						 	if (check.isObject(b.callback) 
						 	&& check.isFunction(b.callback.payload)) {
						 		if ( ! check.isArray(b.callback.args)) {
                                    b.callback.args = [];
						 		}
						 		b.callback.args.push(RETURN);
						 		ex(b.callback);
							}
                            
                            logs.task.success(b.name);
						}
				
			
					}
		
		
				});
			
			}, timeout);
		
		}


		var load = Coffeemaker.core.capacities.load;
	    var loop = load('loop');
	    var check = load('check');
	    var logs = load('log');
	    var ex = load('exec');
	    
	    var timeout = 0;
        var counter = 0;
	    var total = 0;
        var n;
        var p;



	    try {

	    loop.array(arguments, function(a,b,c) {
	    	if (check.isObject(b)) {
	    		loop.object.simple(b, function(t,e,v){
	    			if (t === 'timeout') {
                        timeout=e;
                        timeout.args = b.args || null;
                    }
                    if (t === 'name') logs.task.queued(e);
	    		});
	    	}
	    });

		}catch(e) {} finally {
			//if (!timeout) timeout = 4000;
            //timeout = 4000;
            if (check.isFunction(timeout)) timeout = timeout.apply('',timeout.args);
	    	this.subprocess(arguments,timeout);

	    }
}

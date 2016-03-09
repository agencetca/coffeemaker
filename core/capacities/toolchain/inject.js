Coffeemaker.core.capacities.toolchain.inject = function(item,target,opt,delay){

	    var load = Coffeemaker.core.capacities.load;
	    loop = load('loop');
	    check = load('check');
	    var html;

        var append = function(target,html,opt,delay) {

            if ( ! delay) delay = 0;

            setTimeout(function() {
	    	    if (opt === 'overwrite') {
                    target.innerHTML = '';
	    	    }
	            target.appendChild(html);
            },delay);
        }
	
	    if (check.isHTML(target)) {
	    
	        if (check.isArray(item)) {
	            loop.array(item, function(a,b) {
	                if(check.isHTML(b)) {
	                    html = b;
                        append(target,html,opt,delay);
	                }
	            }); 
	        } else if (check.isObject(item)) {
	            loop.object.simple(item,function(a,b){
	                if(check.isHTML(b)) {
	                    html = b;
                        append(target,html,opt,delay);
	                }
	            });
	        } else if (check.isHTML(item)) {
	            html = item;
                append(target,html,opt,delay);
	        }
	    }
	
	    return html;
	
	}

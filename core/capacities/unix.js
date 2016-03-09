Coffeemaker.core.capacities.unix = {
	
	grep : function(str,context) {
        
        var load = Coffeemaker.core.capacities.load;
        var check = load('check');

		if(check.isString(str)){

		    if(check.isString(context)){
			    return context.match(str);
		    }
		}
	}
}

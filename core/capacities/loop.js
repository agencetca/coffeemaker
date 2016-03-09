Coffeemaker.core.capacities.loop = {

    //var load = __platform__.lib.load;
    //var check = load('check');

	init : function(){
		console.log('Loop!!');
	},
	
    array : function (arr,callback) {
        var v = arr.length;
        for (var i = 0; i < v; i++) {
           callback(i,arr[i]);
        }
    },

	object : {
	
		simple : function(o,callback) {
		    for(var i in o) {
				if(o.hasOwnProperty(i)) {
					if(callback) {
						callback(i,o[i],o);
					};
				};
		    };
		},

		recursive : function(o,callback) {
		
            var load = Coffeemaker.core.capacities.load;
            var check = load('check');
    
			for(var i in o) {
				if(o.hasOwnProperty(i)) {
					if(callback) {
					    if(callback) {
						    callback(i,o[i],o);
                        }
					};

					if(check.isObject(o[i])) {
							this.recursive(o[i],callback);
					};
				};
			};
			
		},

    }

}

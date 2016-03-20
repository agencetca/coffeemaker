Coffeemaker.core.utilities.loop = {

    array : function (arr, callback) {

        var load = Coffeemaker.core.load;
        load.invoke('core/utilities', function(utils) {

            var v = arr.length;

            if(v === 0) {
                callback(arr,false,false,endLoop);
            }

            for (var i = 0; i < v; i++) {
                utils.check.isEqual(i,v-1,function(endLoop) {
                    callback(i,arr[i],arr,endLoop);
                });
            }

        });
        
    },

    forG : function (a, b, callback, next) {
        
        var load = Coffeemaker.core.load;
        load.invoke('core/utilities', function(utils) {

            for (i=a;i<b;i++) {
                callback(i);
                if ( i === b-1 ) {
                    next();
                }
            }

        });

    },

    forL : function (a, b, callback, next) {
        
        var load = Coffeemaker.core.load;
        load.invoke('core/utilities', function(utils) {

            for (i=a;i>b;i--) {
                callback(i);
                if ( i === b+1 ) {
                    next();
                }
            }

        });

    },

    forLoE : function (a, b, callback, next) {
        
        var load = Coffeemaker.core.load;
        load.invoke('core/utilities', function (utils) {

            for (i=a;i>=b;i--) {
                callback(i);
                if ( i === b ) {
                    next();
                }
            }

        });

    },

	object : {
	
        simple : function(o, callback) {

            var load = Coffeemaker.core.load;
            load.invoke('core/utilities', function(utils) {

                utils.check.objectSize(o, function(size) {
                    
                    var counter = 1;

                    if(size === 0) {
                        callback(o,false,false,true);
                    } else {
                        for(var i in o) {
                            if(o.hasOwnProperty(i)) {
                                if(callback) {
                                    utils.check.isEqual(counter++,size,function(endLoop) {
                                        callback(i,o[i],o,endLoop);
                                    });
                                };
                            };
                        };
                    };
                    
                });
            });
		},

		recursive : function(o, callback) { //cant work because object size is not being well calculated
            alert('broken recursive loop function');
            return;
		
            var load = Coffeemaker.core.load;
            load.invoke('core/utilities', function(utils) {

                utils.check.objectSizeDeep(o, function(size) {

                    var counter = 1;

                    if(size === 0) {
                        callback(o,false,false,true);
                    }

                    for(var i in o) {
                        if(o.hasOwnProperty(i)) {
                            if(callback) {
                                if(callback) {
                                    utils.check.isEqual(counter++,size,function(endLoop) {
                                        callback(i,o[i],o,endLoop);
                                    });
                                }
                            };

                            if(utils.check.isObject(o[i])) {
                                this.recursive(o[i],callback);
                            };
                        };
                    };

                });

            });
			
		},

    }

}

Coffeemaker.core.utilities.array = {

    slice : function(array, a, b, next) {
    
        var load = Coffeemaker.core.load;

        load.invoke('core/utilities', function(utils) {
            
            utils.check.isArray(array, function(isArray) {
                
                utils.check.isNotEqual(isArray, false, function(isNotFalse) {

                    utils.check.isNumeric(a, function(isNumA) {
                        
                        utils.check.isNumeric(a, function(isNumB) {

                            if (isNotFalse === true) {
                                if (isNumA === true && isNumB === true) {
                                    next(Array.prototype.slice.call(array, a, b));
                                } else if (isNumA === true) {
                                    next(Array.prototype.slice.call(array, a));
                                } else {
                                    next(Array.prototype.slice.call(array));
                                }
                            } else {
                                next(isArray);
                            }

                        });    
                        
                    });    

                    
                })
                
            })
            
        });

    },

    copy : function(array, next) {

        var load = Coffeemaker.core.load;

        load.invoke('core/utilities', function(utils) {

            var result = [];

            utils.loop.array(array, function(a,b,c,endLoop) {

                result[a] = JSON.parse(JSON.stringify(b)); //synchrone!
                if (endLoop === true) {
                    next(result);
                }

            });
        })
        
    },

    ensure : function(thing, next) {

        var load = Coffeemaker.core.load;

        load.invoke('core/utilities', function(utils) {
            
            utils.check.doesExist(thing, function(answer) {
                
                if ( answer === false ) {
                    thing = []
                }

                utils.check.isArray(thing, function(answer) {

                    var result;
                    if ( answer === false ) {
                        result = [ thing ];
                    } else {
                        result = thing;
                    }

                    next(result);
                    
                })
                
            })
            
        });
        
    },

    get : function (array, key, next) {

        var load = Coffeemaker.core.load;

        load.invoke('core/utilities', function(utils) {
            
            utils.check.isArray(array, function(isArray) {
                
                utils.check.isNotEqual(isArray, false, function(isNotFalse) {


                    if(isNotFalse === true) {
                    
                        utils.check.isNumeric(key, function(isNum) {
                            
                            if (isNum === true) {

                                next(array[key]);

                            } else {

                                switch (key) {

                                    case 'first':
                                        next(array[0]);
                                        break;

                                    case 'last':
                                        next(array[array.length-1]);
                                        break;

                                    default:
                                        break;
                                }

                            }
                            
                        });


                    } else {

                        next(isArray);

                    }

                });
                
            });

            
        });
        
    },

    insert : function(arr, index, item, next) { //untested

        arr.splice(index, 0, item);
        next(arr);

    },

    merge : function(a, b, next) { //untested

        var load = Coffeemaker.core.load;

        load.invoke('core/utilities', function(utils) {
            
            var result;

            this.copy(arguments, function(args) {

                var master = args.shift();
                result = args.shift();

                utils.loop.array(master, function(x,y,z, endLoop) {

                    utils.check.inArray(x, args, function(prohibed) {

                        if ( ! prohibed ) {
                            if (master[x]) result[x] = y;
                        }

                        if (endLoop === true) {
                            next(result);
                        }

                    });

                });

            });
            
            
        });
        
    },

    del : function(array,key, next) { //untested

        var load = Coffeemaker.core.load;

        load.invoke('core/utilities', function(utils) {

            var index = array.indexOf(key);
            if (index > -1) {
                array.splice(index, 1);
                next(true);
            } else {
                next(false);
            }

        });

    }

}

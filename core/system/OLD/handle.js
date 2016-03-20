Coffeemaker.core.system.handle = {
    
    memory : new function() {
        
        return {};

    },

    make : function(repo,array,method) {
        
        alert('popopo');
        this.args(repo,array, function(item,repo) {
            
            this.loop(item,method);
            
        }.bind(this));

        return Coffeemaker.core.system.handle.memory;
        
    },
    
    payload : function(type, payload, cbk) {

        var utils = Coffeemaker.core.utilities;
        var fault = Coffeemaker.core.fault;
        var load = Coffeemaker.core.load;
        var result;

        if ( utils.check.isString( payload ) ) {
            result = load.invoke(type+'/'+payload);
            if ( utils.check.isFalse(payload) ) {
                fault.error.typeError('Invalid entry','The '+type+' builder asks for a function or '+type+' name at first argument');
            }
        } else {
            fault.error.typeError('Invalid entry','The '+type+' builder asks for a function or '+type+' name at first argument');
        }

        if (utils.check.isFunction(cbk)) cbk(result)
        return result;

    },

    callback : function(callback, type, cbk) {

        setTimeout(function() {

        var utils = Coffeemaker.core.utilities;
        var fault = Coffeemaker.core.fault;
        var result;

        if ( ! utils.check.isFunction(callback) ) {
            fault.error.typeError('Invalid entry','The '+type+' builder asks for a callback as last argument');
        }
        
        result = callback;


        if (utils.check.isFunction(cbk)) {
            
            cbk(result)

        }

        }, 1000);
        


        //return result;

    },

    decide : function(object) {

        var utils = Coffeemaker.core.utilities;

        if (utils.check.isArray(object)) object = object[0];
        var IF = object['IF'];
        var wtf = function() {
            setTimeout(function() {console.log("j'attends, voilà")},8000);
        }

        //return [ [], [], [], [] ];
        return [];

    },

    loop : function(item,attr) {

        var utils = Coffeemaker.core.utilities;
        var fault = Coffeemaker.core.fault;
        var system = Coffeemaker.core.system;
        var load = Coffeemaker.core.load;

        var payload;
        var method;
        var previous;
        var instruction;

        utils.loop.array(item.payload,function(i,n) {

            if ( utils.check.isObject( n ) || utils.check.isObject( n[0] ) ) {
                instruction = this.decide( item.payload[i] );
                //utils.array.del(item.payload,i);
                item.payload.splice(i, 1 );
                //var counter = i;
                //utils.loop.array(instruction, function(u,t) {
                //    item.payload.splice(counter++, 0, t);
                //});
            }
        }.bind(this), function() {
            
            utils.loop.forL(item.payload.length,0,function(i) {

                if ( utils.check.isArray( item.payload[i-1] ) && item.payload[i-1].length ) {

                    previous = previous || item.callback;

                    if ( i===1 && item.args.length ) {
                        utils.loop.array(item.payload[i-1], function(a,b,c){
                            if (a !== 0) {
                                if ( utils.check.doesExist(item.args[a-1]) && c[a] === "&" ) c[a] = item.args[a-1];
                            }
                        });
                    }

                    if ( utils.check.doesExist(item.name) ) {
                        payload = [ [item.name,item.payload[i-1].shift()] ].concat(item.payload[i-1]);
                    } else {
                        payload = item.payload[i-1];
                    }

                    if ( utils.check.doesExist(item.name) ) {
                        payload = [ [item.name,item.payload[i-1].shift()] ].concat(item.payload[i-1]);
                    } else {
                        payload = item.payload[i-1];
                    }

                    method = system[attr].apply('', payload.concat(previous).concat(false));
                    previous = method;

                    //if (item.autoexec === false) {
                    //    Coffeemaker.core.system.handle.memory = method;
                    //}


                }

            }, function() {

//                    alert(item.autoexec);
                if (item.autoexec === false) {
                    Coffeemaker.core.system.handle.memory = method;
                } else if (item.autoexec === true) {
                    alert("handle.js Developper : execute again, in few seconds, Coffeemaker.core.system.handle.memory()");
                    Coffeemaker.core.system.handle.memory();
                    //method();
                }
                
            });

        });

    },

    args : function(type,array, cbk, item) {

        var utils = Coffeemaker.core.utilities;
        var system = Coffeemaker.core.system;

        var item = {};

        utils.array.slice(array, undefined, undefined, function(array) {
            
            utils.array.ensure(array,function(args_list) {

                utils.array.get(args_list,'last', function(last,args_list) {

                    utils.check.isBool(last, function(isbool) {

                        if (isbool === true ) {
                            autoexec = args_list.pop();
                        } else {
                            //Autoexec default
                            var autoexec = true;
                        }

                        //Callback setup
                        utils.array.get(args_list,'last', function(callback, args_list) {
                            
                            utils.array.slice(array, 1, -1, function(args) {
                                
                                //Args setup
                                utils.array.ensure(args, function(args) {
                                    
                                    //Processname and payload setup
                                    var processname;
                                    var payload;

                                    utils.check.isArray(args_list[0], function(isarray) {

                                        if ( isarray === true ) {
                                            processname = args_list[0][0];
                                            payload = args_list[0][1];
                                        } else {
                                            processname = '';
                                            payload = args_list[0];
                                        }

                                        //Callback verif
                                        system.handle.callback(callback, type, function(callback) {
                                            
                                            //Payload verif
                                            system.handle.payload(type,payload, function (payload) {
                                                
                                                //Configure fullname
                                                if (processname && payload.name) {
                                                    payload.name = [processname,payload.name];
                                                }

                                                //Correction
                                                payload = payload.payload; //FAIL...

                                                item.payload = payload;
                                                item.callback = callback;
                                                item.args = args;
                                                item.name = payload.name;
                                                item.autoexec = autoexec;

                                                if (utils.check.isFunction(cbk)) cbk(item, type)
                                                
                                            });


                                            
                                        });

                                    });

                                    
                                    
                                });

                                
                                
                            });
                            
                            
                            
                            
                        });


                        
                    });


                });


            
            
            
        });

            
            
            
        });

    }

}

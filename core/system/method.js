Coffeemaker.core.system.method = function(path, args, cbk) {

    var load = Coffeemaker.core.load;

    //var database = {};

    load.invoke('repo/methods/'+path, function(method) {
        
        load.invoke('core/system', function(system) {

            load.invoke('core/utilities', function(utils) {

                var database = args[0] || {};
                var payload, callback;

                utils.array.copy(method.payload, function(arr) {

                    utils.loop.array(arr.reverse(), function(a,b,c,endLoop){

                        callback = callback || cbk.bind('',database);
                        payload = load.action.bind(null, b.shift(), [ database ].concat(b),callback);
                        callback = payload;

                        if (endLoop === true) {
                            payload();
                        }

                    });


                });

            });

        });
        
    });

}

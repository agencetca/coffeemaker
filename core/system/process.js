Coffeemaker.core.system.process = function(path, args, cbk) {

    var load = Coffeemaker.core.load;

    load.invoke('repo/process/'+path, function(process) {
        
        load.invoke('core/system', function(system) {

            load.invoke('core/utilities', function(utils) {

                var database = args[0] || {};
                var payload, callback;

                utils.array.copy(process.payload, function(arr) {

                    utils.loop.array(arr.reverse(), function(a,b,c,endLoop){

                        callback = callback || cbk.bind('',database);
                        payload = load.method.bind(null, b.shift(), [ database ].concat(b),callback);
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

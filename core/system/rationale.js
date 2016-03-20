Coffeemaker.core.system.rationale = function(path, args, cbk) {

    var load = Coffeemaker.core.load;

    load.invoke('repo/rationales/'+path, function(rationale) {
        
        load.invoke('core/system', function(system) {

            load.invoke('core/utilities', function(utils) {

                var database = args[0] || {};
                var payload, callback;

                utils.array.copy(rationale.payload, function(arr) {

                    utils.loop.array(arr.reverse(), function(a,b,c,endLoop){

                        callback = callback || cbk.bind('',database);
                        payload = load.process.bind(null, b.shift(), [ database ].concat(b),callback);
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

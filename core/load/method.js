Coffeemaker.core.load.method = function( path, args, next ) {


    var load = Coffeemaker.core.load;

    load.invoke('core/utilities', function(utils) {

        utils.string.getLastPart('/',path,function(payload,repo) {
            
            utils.date.getCurrentTimestamp(function(date) {

                load.handle.transmitter('methods',repo, date, function() {

                    load.invoke('core/system', function(system) {

                        new system.method(path, args, next); 

                    });
                });

            });
        });
    });

    



}

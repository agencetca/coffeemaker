Coffeemaker.core.load.process = function( path, args, next ) {


    var load = Coffeemaker.core.load;

    load.invoke('core/utilities', function(utils) {

        utils.string.getLastPart('/',path,function(payload,repo) {
            
            utils.date.getCurrentTimestamp(function(date) {

                load.handle.transmitter('process',repo, date, function() {

                    load.invoke('core/system', function(system) {

                        new system.process(path, args, next); 

                    });
                });

            });
        });
    });

    



}

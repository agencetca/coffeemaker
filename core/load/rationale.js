Coffeemaker.core.load.rationale = function( path, args, next ) {


    var load = Coffeemaker.core.load;

    load.invoke('core/utilities', function(utils) {

        utils.string.getLastPart('/',path,function(payload,repo) {
            
            utils.date.getCurrentTimestamp(function(date) {

                load.handle.transmitter('rationales',repo, date, function() {

                    load.invoke('core/system', function(system) {

                        new system.rationale(path, args, next); 

                    });
                });

            });
        });
    });

    



}

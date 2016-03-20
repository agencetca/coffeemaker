Coffeemaker.core.load.action = function( path, args, next) {


    var load = Coffeemaker.core.load;

    load.invoke('core/utilities', function(utils) {

        utils.string.getLastPart('/',path,function(payload,repo) {
            
            utils.date.getCurrentTimestamp(function(date) {

                load.handle.transmitter('actions',repo, date, function() {

                    load.invoke('core/system', function(system) {

                        new system.action(path, args,next); 

                    });

                });
            });
        });
    });

    



}

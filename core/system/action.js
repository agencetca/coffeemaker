Coffeemaker.core.system.action = function(path, args, next) {

    var load = Coffeemaker.core.load;

    load.invoke('repo/actions/'+path, function(action) {
        
        load.invoke('core/system', function(system) {

            var item = {
                payload: action, 
                args : args
            }

            var starter = function(args) {
                system.exec(item,next,args);
            }

            starter(args);

        });
        
    });

}

Coffeemaker.core.system.exec = function (object,next,value) {


    //var utils = Coffeemaker.core.utilities;
    //var system = Coffeemaker.core.system;
    //var monitor = Coffeemaker.core.monitor;
    var result;
    var task;
    var date;
    var args = [];
    

    load = Coffeemaker.core.load;

    load.invoke('core/utilities', function(utils) {

        utils.loop.array(object.args, function(a,b,c,endLoop) {

            args.push(b);

            if (endLoop === true) {

                utils.check.isObject(args[0], function(checkDB) {

                    if(checkDB) {

                        if (next) { args.push(next); }

                        try {
                            var payload = object.payload;
                            args.unshift(null);
                            setTimeout(function() {
                                new (Function.prototype.bind.apply(payload, args));
                            },10);
                        } catch (e) {
                            console.log(e);
                        }

                    } else {

                        alert('system corrupted, no DB found');
                        //system corrupted, no DB found TODO
                    }
                });
            }
        });
    });
}

Coffeemaker.core.load.handle = {

    activity : function () {
        {}
    },

    transmitter : function (type,path,identifier,next) {

        var load = Coffeemaker.core.load;
        load.invoke('core/utilities', function(utils) {

            utils.check.inArray(Coffeemaker.config.path[type]+'/'+path,Coffeemaker.core.load.handle.loaded, function (downloaded) {

                if (downloaded === true) {

                    load.invoke('repo/'+type+'/'+path, function(loaded) {

                        if (loaded !== false) {

                            next();

                        } else {

                            //wait
                            var test = function(path,sid,cl) {

                                load.invoke(path, function(check) {
                                    if (check) {
                                        clearInterval(sid);
                                        cl();
                                    }
                                });
                            }

                            var sid = setInterval(function() {

                                test('repo/'+type+'/'+path,sid,next);

                            },10); //TODO 1000 or more leads to error
                        }

                    });

                } else {

                    Coffeemaker.core.load.handle.loaded.push(Coffeemaker.config.path[type]+'/'+path);

                    load.invoke('core/transmission', function(transmit) {

                        var required;

                        utils.check.isNumeric(Coffeemaker.core.load.handle.activity[identifier], function(verif) {

                            if ( ! verif ) Coffeemaker.core.load.handle.activity[identifier] = 0;
                            Coffeemaker.core.load.handle.activity[identifier]++;

                            new transmit.ajax.GET(Coffeemaker.config.path[type]+'/'+path+'/require.json','',function(require) {

                                try {required = JSON.parse(require);} catch(e) {
                                    fault.error.typeError('Unsupported Format', 'The '+type+' loader expects a valid JSON file');}

                                new transmit.ajax.GET(Coffeemaker.config.path[type]+'/'+path+'/'+required["."]["payload"],'',function(method) {

                                    utils.analyze.engine.setValue('repo/'+type+'/'+path,method, function() {

                                        utils.check.isObject(required[".."], function(isO) {

                                            if (!isO) required[".."] = {};
                                            
                                            utils.loop.object.simple(required[".."],function (x,y,z,endLoop) {

                                                if( endLoop !== true ) {
                                                   Coffeemaker.core.load.handle.transmitter(y,x,identifier,function() {
                                                       //TODO Why this empty function would be required???
                                                    });
                                                } else {
                                                   //next();
                                                    Coffeemaker.core.load.handle.activity[identifier]--;
                                                    if(Coffeemaker.core.load.handle.activity[identifier] === 0) {
                                                        delete Coffeemaker.core.load.handle.activity[identifier];
                                                        next();
                                                    }
                                                }
                                                   
                                            });

                                        }); 

                                    });

                                });

                            },true);

                        });

                    });

                }

            });

        });

    }

}

Coffeemaker.core.load.handle.loaded = [];

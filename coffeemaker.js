'use strict';

window.name = "Coffeemaker";
var TEST = {

    active : false,
    timeout : 4
}

window[window.name] = {

    config : {
    
        path : {
            root : ".",
            core : "core",
            documentation : {
                manual : "documentation/manual.html",
                tutorial : ""
            },
            repo : "repo"
        },

 
    },

    info : {
        version : "0.1",
    },

    documentation : function() {
        window.location = window.location.href+window[window.name].config.path.documentation.manual;
    },

    tutorial : function() {
        console.log('Sorry, not available yet');
    },

    logs : { //migth be deprecated at a point, see core/monitor
        tasks : {
            queued : [],
            success : [],
            error : [],
            ETA : 0,
            total : 0
        },
    },

    core : {

        system : {

            action : function(path, args, next) {

                var load = window[window.name].core.load;

                load.invoke(window[window.name].config.path['repo']+'/'+path, function(action) {

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

            },

            method : function(path, args, cbk) {

                var load = window[window.name].core.load;

                //var database = {};

                load.invoke(window[window.name].config.path['repo']+'/'+path, function(method) {

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

            },

            process : function(path, args, cbk) {

                var load = window[window.name].core.load;

                load.invoke(window[window.name].config.path['repo']+'/'+path, function(process) {

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

            },


            rationale : function(path, args, cbk) {

                var load = window[window.name].core.load;

                load.invoke(window[window.name].config.path['repo']+'/'+path, function(rationale) {

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

            },

            exec : function (object,next,value) {


                //var utils = window[window.name].core.utilities;
                //var system = window[window.name].core.system;
                //var monitor = window[window.name].core.monitor;
                var result;
                var task;
                var date;
                var args = [];


                var load = window[window.name].core.load;

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


                                        if (TEST.active === true) {

                                        setTimeout(function() {
                                            new (Function.prototype.bind.apply(payload, args));
                                        },TEST.timeout); //ERROR : if NO setTimeout are set, I get "too much recursion" in web console
                                        //Side note : 1 is enough but there is a W3C recommandation somewhere about the minimum timeout set at 4
                                        //
                                        } else {

                                            new (Function.prototype.bind.apply(payload, args));

                                        }
                                        
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
            },


        },

        load : {


            engine : {

                getValue : function (path, next) {

                    window[window.name].core.load.invoke(window[window.name].core.utilities, function(utils) {

                        var obj = window[window.name];
                        var result;

                        path = path.split('.').join('/');

                        var flag = false;
                        var p;
                        var p=path.split('/');

                        for (var i=0, p, len=p.length; i<len; i++){
                            if ( obj[p[i]]) {
                                flag = true;
                                obj = obj[p[i]];                    
                            }else{
                                flag = false;
                            }
                        }

                        if (flag === true) {
                            result = obj;
                        } else {
                            result = false;
                        }

                        next(result);

                    });

                },


                setValue : function (path, value, next, flag) {

                    window[window.name].core.load.invoke(window[window.name].core.utilities, function(utils) {

                        var obj = window[window.name];
                        var pathname = window[window.name]+'.';
                        var result;
                        var repo;

                        path = path.split('.').join('/');

                        var p;
                        var p=path.split('/');
                        var key = p.pop(); 

                        for (var i=0, p, len=p.length; i<len; i++){
                            pathname += p[i]+'.';
                            if ( ! obj[p[i]]) obj[p[i]] = {};                    
                            if ( obj[p[i]]) obj = obj[p[i]];                    
                            if (i === len-1) {

                                if (flag === true && typeof value === 'function' ) {
                                    obj[key] = value;
                                    if (next) next(obj[key]);
                                } else if (typeof value === 'object') {
                                    obj[key] = value;
                                    if (next) next(obj[key]);
                                } else {
                                    try {
                                        result = JSON.parse(value);
                                        obj[key] = result;
                                        if (next) next(obj[key]);
                                    } catch(e) {

                                        try {

                                            result =  function() {
                                                var func = new Function("return new "+value+"")();
                                                return func;
                                            }

                                            obj[key] = {};
                                            utils.loop.object.simple(result(), function(a,b,c,endLoop) {

                                                obj[key][a] = b;

                                                if (endLoop === true) {
                                                    if (next) next(obj[key]);
                                                }

                                            });

                                        } catch(e) {
                                            console.log(e);
                                        }

                                    }

                                }
                            }
                        }

                    });

                }
            },

            invoke : function(n, next) {

                var utils = window[window.name].core.utilities; //synchrone!

                utils.check.isString(n, function(isS) {

                    if (isS === false) {

                        utils.check.isFunction(n, function(isF) {

                            if (isF === true) {
                                next(n); 
                            } else {

                                utils.check.isObject(n, function(isO) {

                                    if (isO === true) {
                                        next(n); 
                                    } else {
                                        next(false);
                                    }

                                });
                            }
                        });

                    } else {

                        window[window.name].core.load.engine.getValue(n, function(data) {

                            utils.check.isObject(data, function(isO) {

                                if (isO === true) {
                                    next(data); 

                                } else {

                                    utils.check.isFunction(data, function(isF) {

                                        if (isF === true) {

                                            next(data); 

                                        } else {
                                            next(false);
                                        }

                                    });

                                }
                            });

                        });
                    }

                });
            },

            handle : {
    
                loaded : [],

                activity : function () {
                    {}
                },

                transmitter : function (path,identifier,next) { //TODO Need FULL review, plus dependancies management and conflict resolution

                    var load = window[window.name].core.load;
                    load.invoke('core/utilities', function(utils) {

                        utils.check.inArray(window[window.name].config.path['repo']+'/'+path,window[window.name].core.load.handle.loaded, function (downloaded) {

                            if (downloaded === true) {

                                load.invoke(window[window.name].config.path['repo']+'/'+path, function(loaded) {

                                    if (loaded !== false) {

                                        next();

                                    } else {

                                        //wait
                                        var test = function(path,sid,cl) { //performances are lost

                                            load.invoke(path, function(check) {
                                                if (check) {
                                                    clearInterval(sid);
                                                    cl();
                                                }
                                            });
                                        }

                                        var sid = setInterval(function() {

                                            test(window[window.name].config.path['repo']+'/'+path,sid,next);

                                        },4);
                                    }

                                });

                            } else {

                                window[window.name].core.load.handle.loaded.push(window[window.name].config.path['repo']+'/'+path);

                                load.invoke('core/transmission', function(transmit) {

                                    var required;

                                    utils.check.isNumeric(window[window.name].core.load.handle.activity[identifier], function(verif) {

                                        if ( ! verif ) window[window.name].core.load.handle.activity[identifier] = 0; //NOFAIL
                                        window[window.name].core.load.handle.activity[identifier]++;

                                        new transmit.ajax.GET(window[window.name].config.path['repo']+'/'+path+'/require.json','',function(require) {

                                            try {required = JSON.parse(require);} catch(e) {
                                                fault.error.typeError('Unsupported Format', 'The loader expects a valid JSON file');}

                                            utils.check.isArray(required["."], function(isA) {

                                                if (!isA) required["."] = [];

                                                utils.loop.array(required['.'], function(a,b,c,endLoop) {

                                                    new transmit.ajax.GET(window[window.name].config.path['repo']+'/'+path+'/'+b,'',function(method) {

                                                        window[window.name].core.load.engine.setValue(window[window.name].config.path['repo']+'/'+path,method, function() {

                                                            window[window.name].core.load.handle.activity[identifier]--;

                                                            if( endLoop === true ) {

                                                                utils.check.isArray(required[".."], function(isA) {

                                                                    if (!isA) required[".."] = [];

                                                                    //utils.loop.array(required[".."],function (x,y,z,endLoop) {


                                                                    //window[window.name].core.load.handle.activity[identifier]++;
                                                                    //window[window.name].core.load.handle.transmitter(y,x,identifier,next);


                                                                    //if (endLoop === true) {

                                                                    //Add required['!'] treatement
                                                                    if(window[window.name].core.load.handle.activity[identifier] === 0) {
                                                                        delete window[window.name].core.load.handle.activity[identifier];
                                                                        next();
                                                                    }

                                                                    //}

                                                                    //});

                                                                });

                                                            }

                                                        }); 

                                                    }, true);


                                                });

                                            });

                                        }, true);

                                    });

                                });

                            }

                        });

                    });
                }
            },

            action : function( path, args, next ) {

                var load = window[window.name].core.load;

                load.invoke('core/utilities', function(utils) {

                    utils.string.getLastPart('/',path,function(payload,repo) {

                        utils.date.getCurrentTimestamp(function(date) {

                            load.handle.transmitter(repo, date, function() {

                                load.invoke('core/system', function(system) {

                                    new system.action(path, args,next); 

                                });

                            });
                        });
                    });
                });
            }, 

            method : function( path, args, next ) {


                var load = window[window.name].core.load;

                load.invoke('core/utilities', function(utils) {

                    utils.string.getLastPart('/',path,function(payload,repo) {

                        utils.date.getCurrentTimestamp(function(date) {

                            load.handle.transmitter(repo, date, function() {

                                load.invoke('core/system', function(system) {

                                    new system.method(path, args, next); 

                                });
                            });

                        });
                    });
                });

            },

            process : function( path, args, next ) {

                var load = window[window.name].core.load;

                load.invoke('core/utilities', function(utils) {

                    utils.string.getLastPart('/',path,function(payload,repo) {

                        utils.date.getCurrentTimestamp(function(date) {

                            load.handle.transmitter(repo, date, function() {

                                load.invoke('core/system', function(system) {

                                    new system.process(path, args, next); 

                                });
                            });

                        });
                    });
                });

            },

            rationale : function( path, args, next ) {

                var load = window[window.name].core.load;

                load.invoke('core/utilities', function(utils) {

                    utils.string.getLastPart('/',path,function(payload,repo) {

                        utils.date.getCurrentTimestamp(function(date) {

                            load.handle.transmitter(repo,date, function() {

                                load.invoke('core/system', function(system) {

                                    new system.rationale(path, args, next); 

                                });
                            });

                        });
                    });
                });

            },

        },

        fault : {

            error : {

                typeError : function(name,message, next) {

                    var error = TypeError();
                    error.name = name;
                    error.message = message;
                    console.log(error);
                    if(next) next(error);
                    throw error;

                }

            }

        },

        monitor : {

            log : { //Need PARTIAL review ( too much synchrone! )

                task : {

                    queued : function(task, next) {

                        var load = window[window.name].core.load;
                        load.invoke('core/utilities', function (utils) {
                            utils.check.doesExist(task, function(taskExists) {
                                if (taskExists === true) {
                                    window[window.name].logs.tasks.queued.unshift(task);           
                                    if ( ! window[window.name].logs.tasks.total ) window[window.name].logs.tasks.total = 0;
                                    window[window.name].logs.tasks.total++;
                                    if (next) next();
                                } else {
                                    if (next) next(false);
                                }
                            });
                        });

                    },

                    unqueued : function(task, next) {
                        var load = window[window.name].core.load;
                        load.invoke('core/utilities', function (utils) {
                            utils.check.doesExist(task, function(taskExists) {
                                if (taskExists === true) {
                                    var index = window[window.name].logs.tasks.queued.indexOf(task);
                                    if (index > -1) {
                                        window[window.name].logs.tasks.queued.splice(index, 1);
                                        if (next) next();
                                    }
                                } else {
                                    if (next) next(false);
                                }
                            });
                        });
                    },

                    success : function(task, next) {
                        var load = window[window.name].core.load;
                        load.invoke('core/utilities', function (utils) {
                            utils.check.doesExist(task, function(taskExists) {
                                if (taskExists === true) {
                                    this.stop(task);
                                    window[window.name].logs.tasks.success.unshift(task);
                                    if (next) next();
                                } else {
                                    if (next) next(false);
                                }
                            }.bind(this));
                        }).bind(this);
                    },

                    error : function(task, next) {
                        var load = window[window.name].core.load;
                        load.invoke('core/utilities', function (utils) {
                            utils.check.doesExist(task, function(taskExists) {
                                if (taskExists === true) {
                                    if ( ! window[window.name].logs.tasks.error ) this.stop(task);
                                    window[window.name].logs.tasks.error.unshift(task);
                                    if (next) next();
                                } else {
                                    if (next) next(false);
                                }
                            }.bind(this));
                        }.bind(this));
                    },


                    set : {

                        ETA : function(next) {
                            var utils = window[window.name].core.utilities; //synchrone!
                            var total = window[window.name].logs.tasks.queued.length + window[window.name].logs.tasks.success.length + window[window.name].logs.tasks.error.length; //synchrone!
                            var done = window[window.name].logs.tasks.success.length + window[window.name].logs.tasks.error.length; //synchrone!
                            var ratio = done *100 / total; //synchrone!
                            if ( ratio ) {
                                window[window.name].logs.tasks.ETA = ratio; //synchrone!
                            } else {
                                window[window.name].logs.tasks.ETA = 0; //synchrone! 
                            }
                            if (next) next();
                        },

                        current : function (task, next) {
                            var utils = window[window.name].core.utilities; //synchrone!
                            window[window.name].logs.tasks.current = task; //synchrone!
                            if (next) next();
                        },

                        last : function (task, next) {
                            if ( ! task ) return;
                            var utils = window[window.name].core.utilities; //synchrone!
                            window[window.name].logs.tasks.last = task; //synchrone!
                            if (next) next();
                        },

                        first : function (task, next) {
                            if ( ! task ) return;
                            var utils = window[window.name].core.utilities; //synchrone!
                            window[window.name].logs.tasks.first = task; //synchrone!
                            if (next) next();
                        }

                    },

                    start : function(task, next) {
                        if ( ! task ) return;
                        var utils = window[window.name].core.utilities; //synchrone!
                        this.queued(task, function(task) {
                            this.set.last(window[window.name].logs.tasks.current);
                            this.set.current(task);
                        }.apply(this,[ task ]));
                        if (next) next(true);
                    },

                    stop : function (task, next) {

                        var utils = window[window.name].core.utilities; //synchrone!
                        this.set.ETA();
                        this.unqueued(task, function(task) {
                            this.set.first(task); //HACKY
                            this.set.last(window[window.name].logs.tasks.current);
                        }.apply(this,[ task ]));
                        setTimeout(function() {
                            if ( ! window[window.name].logs.tasks.queued.length ) {
                                delete window[window.name].logs.tasks.total;
                                delete window[window.name].logs.tasks.current;
                            }
                            if ( window[window.name].logs.tasks.ETA != 100 ) {
                                this.set.ETA();
                            }
                        }.bind(this),100);
                        if (next) next();
                    }

                },

                exception : function (identifier, object, next) {

                    if ( ! window[window.name].logs ) window[window.name].logs = {};
                    if ( ! window[window.name].logs.exceptions ) window[window.name].logs.exceptions = {};
                    if ( ! window[window.name].logs.exceptions[identifier] ) window[window.name].logs.exceptions[identifier] = [];

                    var utils = window[window.name].core.utilities;
                    window[window.name].logs.exceptions[identifier].push(object);
                    if (next) next(exception);

                    throw identifier;

                },

                network : {

                    fail : function (type, status, url, next) {

                        if ( ! window[window.name].logs ) window[window.name].logs = {};
                        if ( ! window[window.name].logs.network ) window[window.name].logs.network = {};
                        if ( ! window[window.name].logs.network.failures ) window[window.name].logs.network.failures = {};
                        if ( ! window[window.name].logs.network.failures[type] ) window[window.name].logs.network.failures[type] = [];

                        var utils = window[window.name].core.utilities;
                        if ( ! window[window.name].logs.network.failures[type][status] ) {
                            window[window.name].logs.network.failures[type][status] = [];
                        }

                        window[window.name].logs.network.failures[type][status].push(url);
                        if (next) next(url);
                    },

                    success : function (type, status, url, next) {

                        if ( ! window[window.name].logs ) window[window.name].logs = {};
                        if ( ! window[window.name].logs.network ) window[window.name].logs.network = {};
                        if ( ! window[window.name].logs.network.success ) window[window.name].logs.network.success = {};
                        if ( ! window[window.name].logs.network.success[type] ) window[window.name].logs.network.success[type] = [];

                        var utils = window[window.name].core.utilities;
                        if ( ! window[window.name].logs.network.success[type][status] ) {
                            window[window.name].logs.network.success[type][status] = [];
                        }

                        window[window.name].logs.network.success[type][status].push(url);
                        if (next) next(url);
                    }

                }
            }

        },

        transmission : {

            ajax : {

                GET : function (url,data,callback,async,cbk) {

                    if (!async) async = true;

                    var monitor = window[window.name].core.monitor;
                    var d = new Date();
                    var n = d.getTime(); 

                    var xmlHttp = null;
                    xmlHttp = new XMLHttpRequest();
                    xmlHttp.open( "GET", window[window.name].config.path.root+"/"+url+"?data="+data, async );
                    xmlHttp.send( null );

                    xmlHttp.onerror = function () {

                        monitor.log.network.fail('GET',xmlHttp.status,url)

                    }

                    xmlHttp.onreadystatechange=function(){

                        if (xmlHttp.readyState === 4) {
                            if (xmlHttp.status==200) {
                                if (callback) callback(xmlHttp.responseText);
                                monitor.log.network.success('GET',xmlHttp.status,url)
                                    if (cbk) cbk();
                            }else {
                                xmlHttp.onerror();
                            }
                        }
                    }
                }

            }

        },

        import : function (path,opt) {

            //TODO make a better importer

            if ( path.charAt(path.length-1) === "/" ) path = path.substr(0, path.length - 1);
            var base = path + "/";
            if ( ! Object.prototype.toString.call(opt) === '[object Array]' ) { 
                opt = [ opt ];
            }
	        var loop = function (arr,callback) {
		        var v = arr.length;
		        for (var i = 0; i < v; i++) {
			        callback(i,arr[i]);
		        }
		    }
            loop( opt, function(a,b) {
                path = base+b;
                var o = window[window.name];
                var p = path.split("/")
                var c = p.pop().split(".");
                var engine = function(obj, path){
                    for (var i=0, path=path.split('/'), len=path.length; i<len; i++){
                        if ( ! obj[path[i]]) obj[path[i]] = {}
                        obj = obj[path[i]];
                    };
                    return obj;
                };
                engine(window[window.name],path);
                if (c[c.length -1] === 'js' | c[c.length -1] === 'json') ext = c.pop(); 
                var component = c.join(".");
                if (ext !== '') { var ext = '.js' };
                path = p.join("/");
                if( ! this[component] ) {
                    var s  = document.createElement("script");
                    s.src  = window[window.name].config.path.root+"/"+path+"/"+component+ext;
                    document.head.appendChild(s);
                }
            }.bind(this));
        }
    }

}

//ugly manual loading 'll be wiped out when dedicated loaders 'll be available
window[window.name].core.import(window[window.name].config.path.core,["utilities/date","utilities/string","utilities/number","utilities/unix","utilities/check","utilities/loop","utilities/array", "utilities/object"]);
window[window.name].core.import(window[window.name].config.path.core,["toolchain/compile","toolchain/make","toolchain/inject","toolchain/configure"]);
window[window.name].core.import(window[window.name].config.path.core,["ui/appendElementTo","ui/create","ui/select"]);
window[window.name].core.import(window[window.name].config.path.core,["ui/events/addListener","ui/events/delListener"]);
window[window.name].core.import(window[window.name].config.path.core,["storage/stack"]);



Coffeemaker.core.capacities.load = function (uri,args,callback) {


    //IMPORTANT
    //This function is really tricky
    //Do NOT touch anything without making the big picture on the first hand
    //ALWAYS save this original BEFORE modifying it, seriously
    //
    //
    //For this to work follow this guideline : 
    //give an URI under the form some/thing/to/get or some.thing.to.get or even some/thing.to/get, as first paramater
    //give args in a ARRAY (NOTE TODO FEATURE NON IMPLEMENTED YET)
    //give a function as callback
    //
    //on the server, at the root location
    //create a repository "components" to hosts your JSON components
    //create a repository "methods" to hosts your methods
    //create a repository templates and put your templates inside
    //then choose the right template in Coffeemaker.config and coffemaker.js
    // Then use load to load anything like : 
    // load('components')
    // load('components/div')
    // load('check')
    // load('somthing that does not exist on core/capacities') > return false
    // load('a method, component or template that can be downloaded') > return undefined
    // put a function as a callback in the last case and it will be executed when EVERYTHING is loaded.
    
    var payload;
    var repository;
    var answer;

    var URI = uri;
    var ACTION = callback;

    var getContent = function(url,ext) {

        //console.log('looking online for '+url+' ('+ext+')');
        if (Coffeemaker.core.capacities.check.inArray(url,Coffeemaker.core.capacities.load.loaded)) return;

        //console.log('load try a new download for '+url+' ('+ext+')');
        if ( url === 'templates' ) url = 'template';

        var memory = new Coffeemaker.core.capacities.load.memory;

        var trick = function(u,ext,callback) {

            setTimeout(function() { //Order matters

               memory.push('loaded',u);

               if (callback) callback(); //2

            },1000);

        }

        var test = function(u,e, callback) {

            var CBKJS = function(data) {
                        Coffeemaker.core.capacities.analyze.engine.setValue(u,data);
                                if (! memory.check(u,'stack')) { 
                                    memory.push('stack',u);
                                        trick(u,'js',function() {
                                            
                                            if ( memory.compare() === 0 ) {
                                                if (typeof ACTION === 'function') ACTION(Coffeemaker.core.capacities.load(URI));
                                                memory.flush();
                                            }
                                            
                                        });
                                }
            }

            var CBKJSON = function(data) {
                if( data = JSON.parse(data) ) {
                    if (data.structure) {
                        Coffeemaker.core.capacities.analyze.engine.setValue(u,data);
                        Coffeemaker.core.capacities.loop.object.recursive(data.structure, function(a,b,c) {
                            if (a === 'element' && typeof b === 'string' && ! b.match('system::') ) {
                                if (! memory.check(u,'stack')) { 
                                    memory.push('stack',u);
                                    test('components/'+b, 'json', function() {
                                        trick(u,'json',function() {
                                            
                                            if ( memory.compare() === 0 ) {
                                                if (typeof ACTION === 'function') ACTION(Coffeemaker.core.capacities.load(URI));
                                                memory.flush();
                                            }
                                            
                                        });
                                    });
                                }
                            } else {
                                if (a === 'element') {
                                    if ( memory.compare() === 0 ) {
                                        if (typeof ACTION === 'function') ACTION(Coffeemaker.core.capacities.load(URI));
                                        memory.flush();
                                    }
                                }
                            }
                        }); 
                    }
                }
            }

            if (callback) callback();

            if (transmission = Coffeemaker.core.capacities.transmission.ajax) {
                if (e === 'json') {
                    new transmission.GET( u+'.'+e ,"", CBKJSON)
                } else if (e === 'js') {
                    new transmission.GET( u+'.'+e ,"", CBKJS)
                }
            }
        }

        test(url, ext, function() {
        });
    }

    try {
        payload = uri.split('.');
        payload = payload.join('/');
        payload = payload.split('/');
        Array.prototype.shift.apply(arguments);
    } catch (e) {
        //console.log(e);
    } finally {

        if (!payload) {
            return; 
        }

        repository = payload.shift();
        payload = payload.join('/');
        if(repository === 'component') repository = 'components';
        if(repository === 'method') repository = 'methods';
        if(repository === 'template') repository = 'templates';

        switch (repository) {

            case 'methods':
            case 'templates':
            case 'components':
                if ( payload ) {
                    //console.log('load check for '+repository+'/'+payload);
                    answer = Coffeemaker.core.capacities.analyze.engine.getValue(repository+'/'+payload);
                } else {
                    //console.log('load check for '+repository);
                    answer = Coffeemaker.core.capacities.analyze.engine.getValue(repository);
                }
                break;

            default:
                if ( payload ) {
                    //console.log('load check for '+"core/capacities/"+repository+'/'+payload);
                    answer = Coffeemaker.core.capacities.analyze.engine.getValue("core/capacities/"+repository+'/'+payload);
                } else {
                    //console.log('load check for '+"core/capacities/"+repository);
                    answer = Coffeemaker.core.capacities.analyze.engine.getValue("core/capacities/"+repository);
                }
                break;

        }


        if (answer) {

            //For isolation
            if ( typeof ACTION === 'function' ) {
                return ACTION( answer );
            } else {
                return answer;
            }

        } 

        else {

            payload = '/'+payload;
            if (payload === '/') payload = '';


            if (repository === 'components') {

                getContent( repository+payload, 'json', callback );
                return;

            } 

            else if (repository === 'methods') {

                getContent( repository+payload, 'js', callback );
                return;

            } 

            else if (repository === 'templates') {

                getContent( repository+payload, 'json', callback);
                return;

            } 

            else {

                return false;
            }

        }
    }
}

Coffeemaker.core.capacities.load.memory = function() {

    this.loaded = [];
    this.stack = [];

    this.push = function (repo,entry) {
        this[repo].push(entry);
    };

    this.check = function(entry,repo) {
        if (Coffeemaker.core.capacities.check.inArray(entry,this[repo])) { 
            return true;
        } else {
            return false;
        }
    };

    this.compare = function () {
        return this.stack.length - this.loaded.length;
    };

    this.flush = function () {
        this.loaded = [];
        this.stack = [];
    };

}

Coffeemaker.core.capacities.load.component = function (component,callback) {
    return Coffeemaker.core.capacities.load('components/'+component, '', callback);
}

Coffeemaker.core.capacities.load.template = function (template,callback) {
    return Coffeemaker.core.capacities.load('template/'+template, '', callback);
}

Coffeemaker.core.capacities.load.method = function (method,callback) {
    return Coffeemaker.core.capacities.load('methods/'+method, '', callback);
}

Coffeemaker.core.capacities.load.package = function (item,callback) {

    var load = Coffeemaker.core.capacities.load;
    var check = Coffeemaker.core.capacities.check;
    var loop = Coffeemaker.core.capacities.loop;

    load(item,'',function(object) {

        if(check.isObject(object) && check.isObject(object.logic) && check.isArray(object.logic.require)) {

            loop.array(object.logic.require, function(a,b) {

                load('methods/'+b)

            });

            //TODO : add a callback2 to loop in order to execute this callback2 at the end of the loop
            //AND/OR (need evealuation) TODO : add the possibility to load to load array of element and to execute the callback at the end only
            //AT THIS TIME it does not do any recursion ...
            //CHEATING : 
            
            setTimeout(function() {

                callback(object);

            },1200);


        } else {

            callback(object);

        }

    });

}

Coffeemaker.core.utilities.analyze = {

    engine : {
        
        getValue : function (path, next) {

            Coffeemaker.core.load.invoke(Coffeemaker.core.utilities, function(utils) {

                var obj = Coffeemaker;
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

        Coffeemaker.core.load.invoke(Coffeemaker.core.utilities, function(utils) {

            var obj = Coffeemaker;
            var pathname = 'Coffeemaker.';
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

    watch : function (target, min, max, maxTime, interval, callback, execNow, next) {

        var utils = Coffeemaker.core.utilities;
        var system = Coffeemaker.core.system;
        var counter = 0;

        if (!execNow) execNow = true;

        if (execNow) callback();

        new system.process({
            payload : function() {
                var sid = setInterval(function() {
                    var value = utils.analyze.engine.getValue(target);
                    callback();
                    if (min === 'none') {
                        if (value >= max || counter++ > maxTime) {
                            setTimeout(function() {
                                callback();
                            clearInterval(sid);
                            },interval);
                        }
                    }
                    else if (max === 'none') {
                        if (value < min || counter++ > maxTime) {
                            setTimeout(function() {
                                callback();
                            clearInterval(sid);
                            },interval);
                        }
                    } 
                    else if (min === 'none' && max === 'none') {
                        if (counter++ > maxTime) {
                            setTimeout(function() {
                                callback();
                            clearInterval(sid);
                            },interval);
                        }
                    } 
                    else {
                            setTimeout(function() {
                            clearInterval(sid);
                                callback();
                            },interval);
                    }
                },1000);
            },

            callback : {
                
                payload : function() {
                        
                    if (next) next();

                }
            }
        
        });
        
    }

}


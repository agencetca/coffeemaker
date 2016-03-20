Coffeemaker.core.system.build = function (fn) {


    var utils = Coffeemaker.core.utilities;
    var load = Coffeemaker.core.load;
    var system = Coffeemaker.core.system;
    var fault = Coffeemaker.core.fault;

        var current = [];
        utils.loop.array(arguments, function(a,b) {
            current.push(b);
        });

        var payload = current.shift();

        var processname;
        var methodname;
        var actionname;

        if ( utils.check.isArray(payload) ) {
            if (utils.check.isArray(payload[0])) {
                processname = payload[0][0];
                methodname = payload[0][1];
            } else {
                methodname = payload[0];
            }
            payload = payload[1];
        } else {
            methodname = '';
        }

        actionname = payload.substr(5);

        var args = current;
        var  result = [];

        var build;
        
        if ( utils.check.isString(payload) || utils.check.isFunction(payload) ) {
            if ( utils.check.isString(payload) ) payload = load.invoke(payload);
        } else {
            fault.error.typeError('Invalid Entry','First occurence in array(s) given to the builder must be a function, or the function name (string) of a function that exist in the related repository');
        }

        if ( utils.check.isObject(payload.prototype) && utils.check.isArray(payload.prototype.require) ) {
            var require = payload.prototype.require;
        } else {
            var require = [];
        }

        //Load dependencies
        utils.loop.array(require, function(a,b,c) {

            if ( utils.check.isString(b) ) {
                c[a] = load.invoke(b);
            }

        });

        build = {

            process : processname,
            method : methodname,
            action : actionname,
            payload : payload,
            args : require.concat(args),
        }
        
        result = function (a,b) {
             system.exec(build,a,b);
        }

    return result;
}

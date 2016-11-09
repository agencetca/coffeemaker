Coffeemaker.core.capacities.analyze = {

    engine : {
        
        getValue : function (path) {

            var obj = Coffeemaker;

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
                return obj;
            } else {
                return false;
            }

        },

        setValue : function (path,value) {

            var obj = Coffeemaker;
            var pathname = 'Coffeemaker.';

            path = path.split('.').join('/');

            var p;
            var p=path.split('/');
            var key = p.pop(); 

            for (var i=0, p, len=p.length; i<len; i++){
                pathname += p[i]+'.';
                if ( ! obj[p[i]]) obj[p[i]] = {};                    
                if ( obj[p[i]]) obj = obj[p[i]];                    
                if (i === len-1) {
                    if (typeof value === 'object') {
                       obj[key] = value;
                    } else {
                        try {
                            obj[key] = eval(pathname+value);
                        } catch(e) {
                            console.log(e);
                        }
                    }
                }
            }

            return true;

        },
        
//        var x = function (obj,path,force) {
//
//            var p;
//            var p=path.split('/');
//            if ( ! p.length) {
//                p=path.split('.');
//            }
//
//            if (!force) force = false;
//        
//            for (var i=0, p, len=p.length; i<len; i++){
//                if (force === true) {
//                     if ( ! obj[p[i]]) obj[p[i]] = {};
//                }
//                if ( obj[p[i]]) {
//                    obj = obj[p[i]];
//                }
//            }
//            
//           return obj;
//
//        }
//
//        var o = x(Coffeemaker,path,force);
//        
//        if (o === Coffeemaker) return false;
//        return o;
//
    },

    watch : function (target,min,max,maxTime,interval,callback,execNow) {

        var load = Coffeemaker.core.capacities.load;
        var analyze = load('analyze');
        var exe = load('exec');
        var counter = 0;

        if (!execNow) execNow = true;

        if (execNow) callback();

        exe({
            payload : function() {
                var sid = setInterval(function() {
                    var value = analyze.engine.getValue(target);
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
            }
        
        });
        
    }

}


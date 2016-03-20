Coffeemaker.core.load.invoke = function(n, next) {

    var utils = Coffeemaker.core.utilities; //synchrone!

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

           utils.analyze.engine.getValue(n, function(data) {

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
}

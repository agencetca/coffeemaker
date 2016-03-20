Coffeemaker.core.utilities.unix = {
	
    grep : function(str, context, cbk) {

        var load = Coffeemaker.core.load;
        load.invoke('core/utilities', function() {
            utils.check.isString(str, function(isStringStr) {
                utils.check.isString(context, function(isStringCtx) {
                    if (isStringStr === true && isStringCtx === true) {
                        next(context.match(str));
                    } else {
                        next(false);
                    }
                });
            });

        });
    }
}

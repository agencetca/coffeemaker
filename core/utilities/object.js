Coffeemaker.core.utilities.object = {

    merge : {

        nonDestructive : function(obj1, obj2, next) {
            var load = Coffeemaker.core.load;
            load.invoke('core/utilities', function() {
                var result = {};
                for (var attrname in obj1) { result[attrname] = obj1[attrname]; }
                for (var attrname in obj2) { result[attrname] = obj2[attrname]; }
                next(result);
            });
        }


    }


}

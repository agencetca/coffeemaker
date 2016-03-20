Coffeemaker.core.utilities.number = {

    random : function (min, max, next) {
        var load = Coffeemaker.core.load;
        load.invoke('core/utilities', function() {
            var result;
            if(!min) min = 0;
            if(!max) max = 1000000;
            result = Math.floor(Math.random() * max) + min;
            next(result);
        });
    }

}

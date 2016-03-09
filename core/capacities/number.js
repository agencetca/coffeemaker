Coffeemaker.core.capacities.number = {

    random : function (min,max) {
        if(!min) min = 0;
        if(!max) max = 1000000;
        return Math.floor(Math.random() * max) + min;
    }

}

message = {

    log : function(arguments,event) {

        var objectToLog = arguments[0];
        var logDuration = arguments[1] || 5;
        var element = event.target;

        var load = Coffeemaker.core.capacities.load;
        load('analyze', '', function(analyze) {
            element.innerHTML = analyze.engine.getValue(objectToLog);
            var counter = 0;
            var sid = setInterval(function() {
                if (counter++ > logDuration) clearInterval(sid);
                element.innerHTML = analyze.engine.getValue(objectToLog);
            }, 100);
        });

    }

}

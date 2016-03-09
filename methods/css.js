css = {

    affect : function(arguments, event) {

        var target = document.getElementById(arguments[0]);
        var prop = arguments[1];
        var value = arguments[2];

        if (prop === 'left' && target.state === 'open') {
            $(target).animate({
                'left' : '0' 
            });
            target.state = 'close'
        } else if (prop === 'right' && target.state === 'open') {
            $(target).animate({
                'right' : '0px' 
            });
            target.state = 'close'
        } else {
            
            if (prop === 'left') {
            $(target).animate({
                'left' : '-300px' 
            });
            target.state = 'open'
            }
            else if (prop === 'right') {
            $(target).animate({
                'right' : '-300px' 
            });
            target.state = 'open'
            }
        }

        
    },

    follow : {

        numeric : function(arguments, event) {

            var objectToFollow = arguments[0];
            var propertyToAdapt = arguments[1];
            var propertyUnit = arguments[2]; // %, px, ...
            var stopValue = arguments[3];
            var maxDuration = arguments[4] || 10;
            var element = event.target;

            var load = Coffeemaker.core.capacities.load;

            load('analyze', '', function (analyze) {

                var counter = 0;
                var sid = setInterval(function() {
                    if (counter++ > maxDuration) clearInterval(sid);
                    var value = analyze.engine.getValue(objectToFollow);
                    element.style.setProperty(propertyToAdapt,value+propertyUnit);
                    if (value === stopValue) clearInterval(sid);
                },100);


            });

        }
    }



}

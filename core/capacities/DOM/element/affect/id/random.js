Coffeemaker.core.capacities.DOM.element.affect.id.random = {

    id : function (element) {

        var load = Coffeemaker.core.process.load;
        var number = load('number');

         //generate random id
         var rand = number.random();
         //verify doesnt exist
         while (stack.get(rand)) {
             rand = number.random();
         }
         //record the new id
         stack.set(rand);
         //apply configuration
         element.id = rand;

    }


}

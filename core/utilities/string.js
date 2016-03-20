Coffeemaker.core.utilities.string = {


    getLastPart : function (sign, string, next) {

        var result;
        var rest;

        rest = string.split(sign);
        result = rest.pop();
        rest = rest.join(sign);

        next(result,rest);

    }



}

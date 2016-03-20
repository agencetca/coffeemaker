Coffeemaker.core.fault.error = {


    typeError : function(name,message, next) {

        var error = TypeError();
        error.name = name;
        error.message = message;
        console.log(error);
        if(next) next(error);
        throw error;

    }



}


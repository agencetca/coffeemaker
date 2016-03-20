Coffeemaker.core.ui.create = function ( tagname, configuration, cbk ) {

   var utils = Coffeemaker.core.utilities;
	    
	var element = document.createElement( tagname );
	var applyConfig = function(element,property,value) {
		if ( utils.check.doesExist( element[property] ) ) {
			if ( utils.check.isObject( value ) ) {
				utils.loop.object.simple ( value, function(a,b,c) {
					if ( utils.check.isFunction( b ) ) {
						applyConfig(element[property],a,b(element));
					} else {
						applyConfig(element[property],a,b);
					}
				});
			}else {
				element[property] = value;
			}
			
		}
	}

	if ( utils.check.isObject (configuration) ) {
		utils.loop.object.simple ( configuration, function(a,b,c) {
			applyConfig(element,a,b);
		});
	} else if ( utils.check.isArray (configuration) ) {
		utils.loop.array ( configuration, function(a,b) {
			applyConfig(element,a,b);
		});
	} else if ( utils.check.isString (configuration) ) {
			applyConfig(element,a,b);
	}
	
    if (utils.check.isFunction(cbk)) cbk();
	return element;

}

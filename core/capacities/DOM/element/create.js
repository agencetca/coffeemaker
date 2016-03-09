Coffeemaker.core.capacities.DOM.element.create = function ( tagname, configuration ) {

	    var load = Coffeemaker.core.capacities.load;
	    var check = load('check');
	    var loop = load('loop');
	    
	var element = document.createElement( tagname );
	var applyConfig = function(element,property,value) {
		if ( check.doesExist( element[property] ) ) {
			if ( check.isObject( value ) ) {
				loop.object.simple ( value, function(a,b,c) {
					if ( check.isFunction( b ) ) {
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

	if ( check.isObject (configuration) ) {
		loop.object.simple ( configuration, function(a,b,c) {
			applyConfig(element,a,b);
		});
	} else if ( check.isArray (configuration) ) {
		loop.array ( configuration, function(a,b) {
			applyConfig(element,a,b);
		});
	} else if ( check.isString (configuration) ) {
			applyConfig(element,a,b);
	}
	
	return element;

}

Coffeemaker.core.capacities.DOM.element.create.prototype.depend = {

	"packages" : ["core/capacities/loop","core/capacities/check"]

}

Coffeemaker.core.capacities.DOM.element.create.prototype.args = {

	"required" : ["1"],
	"require" : {
		"1" : "*"
	}

}

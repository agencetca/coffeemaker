Coffeemaker.core.capacities.DOM.element.select = function ( type, name, position ) {

    var load = Coffeemaker.core.capacities.load;
    var check = load('check');

	if ( type === 'id' && check.isString( name ) ) {

		return document.getElementById ( name );

	}

	if ( type === 'tag' && check.isString( name ) ) {

		switch ( name ) {

			case 'head' :
				return document.head || document.getElementsByTagName("head")[0];
			break

			case 'body' :
				return document.body || document.getElementsByTagName("body")[0];
			break

			default :

				if (check.doesExist( position ) ) {

					if (check.isNumeric( position ) ) {

						return document.getElementsByTagName(name)[position];

					} else {

                        return document.getElementsByTagName(name)
                    }

				} else {

					return document.getElementsByTagName(name)[0];

				}

			break

		}

	}

}

Coffeemaker.core.capacities.DOM.structure.appendElementTo.prototype.depend = {

	"packages" : ["check"]

}

Coffeemaker.core.capacities.DOM.structure.appendElementTo.prototype.args = {

	"required" : ["1","2"],
	"require" : {
		"1" : { 
			"ACCEPT" : ["IF",["core.package.check.isString","INPUT"]],
			"ACCEPT" : ["IF",["IN",["core.list.html.tags","INPUT"]]]
		},
		"2" : "core.package.check.isString"
	}

}

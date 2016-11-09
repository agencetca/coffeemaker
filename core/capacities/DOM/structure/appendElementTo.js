Coffeemaker.core.capacities.DOM.structure.appendElementTo = function ( element, target ) {

	target.appendChild(element);

}

Coffeemaker.core.capacities.DOM.structure.appendElementTo.prototype.depend = {

	"packages" : ["check"]

}

Coffeemaker.core.capacities.DOM.structure.appendElementTo.prototype.args = {

	"required" : ["1","2"],
	"require" : {
		"1" : "isHTML",
		"2" : "isHTML"
	}

}

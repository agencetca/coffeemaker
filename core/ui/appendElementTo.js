Coffeemaker.core.ui.appendElementTo = function ( element, target , cbk) {

    var utils = Coffeemaker.core.utilities;
	target.appendChild(element);
    if (utils.check.isFunction(cbk)) cbk();


}

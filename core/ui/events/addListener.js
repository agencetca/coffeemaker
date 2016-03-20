Coffeemaker.core.ui.events.addListener = function(element,eventName,callback,args,capture, cbk) {

    var utils = Coffeemaker.core.utilities;
	var func = callback;

	var listener = function(nt){

		func(args,nt);

	}

	element.addEventListener(eventName, listener , false);

    if (utils.check.isFunction(cbk)) cbk(listener);
	return listener;


}

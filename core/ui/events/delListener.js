Coffeemaker.core.ui.events.delListener = function(element,eventName,functionName,capture, cbk) {
	
    var utils = Coffeemaker.core.utilities;
	if ( ! capture ) capture = false;

	element.removeEventListener(eventName, functionName, capture);
    if (utils.check.isFunction(cbk)) cbk();

}

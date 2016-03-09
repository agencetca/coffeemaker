Coffeemaker.core.capacities.check = {
	
	hasClass : function (element, cls) {
		if(!cls) return;
		if(element instanceof HTMLElement) return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	},

	doesExist : function (thing) {

        thing = [ thing ];
        var load = Coffeemaker.core.capacities.load;
        var loop = load('loop');

	    var checking = '';	
        loop.array(thing,function(a,b) {
			if(typeof b === 'undefined') {
                checking = false;
			} else {
                checking = true;
            }
        });

        return checking;
    
	},

	type : function (thing) {
		return Object.prototype.toString.call(thing);
	},

	objectSize : function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    
	    return size;
	},

	isArray : function(thing) {
		
		if(this.doesExist(thing) && this.type(thing) === '[object Array]'){
			return true;
		}else{
			return false;
		}

	},

	isString : function(thing) {
		
		if(this.doesExist(thing) && this.type(thing) === '[object String]'){
			return true;
		}else{
			return false;
		}

	},

	isObject : function(thing) {
		
		if(this.doesExist(thing) && this.type(thing) === '[object Object]'){
			return true;
		}else{
			return false;
		}

	},

	isHTML : function(thing) {
	
        var load = Coffeemaker.core.capacities.load;
        var unix = load('unix');

		if( this.doesExist(thing) && unix.grep("HTML",this.type(thing)) ) {
			return true;
		}else{
			return false;
		}

	},

	isNotHTML : function(thing) {
	
        return ! this.isHTML(thing);

	},

	objectLength : function(obj) {

		var count = 0;

		for (var k in obj) {
			if (obj.hasOwnProperty(k)) {
				++count;
			}
		}

		return count;

	},


	inArray : function(value, array) {

		if ( ! this.isArray(array) ) return;

		if(array.indexOf(value) > -1){
			return array.indexOf(value) > -1;
		}else if(array.indexOf(parseInt(value)) > -1){
			return array.indexOf(parseInt(value)) > -1;
		}else{
			return false;
		}
	},

	inObject : function(value, object) {
		for(var prop in object) {
			if(object.hasOwnProperty(prop)) {
				if(object[prop] === value) {
					return true;
				}
			}
		}
		return false;
	},

	keyInObject : function(value, object) {

		if(object[value]){
			return true;
		}else{
			return false;
		}
	},
        
    isFunction : function(thing) {
        var getType = {};
        return thing && getType.toString.call(thing) === '[object Function]';
    },
    
    isJSON(str) {
		try {
		    JSON.parse(str);
		} catch (e) {
		    return false;
		}
		return true;
	},

    getDocHeight : function() {
        var D = document;
        return Math.max(
           D.body.scrollHeight, D.documentElement.scrollHeight,
           D.body.offsetHeight, D.documentElement.offsetHeight,
           D.body.clientHeight, D.documentElement.clientHeight
        );
    },

    isEventSupported : function(eventName) {
    
	    var el = document.createElement('div');
	    eventName = 'on' + eventName;
	    var isSupported = (eventName in el);
	    if (!isSupported) {
	        el.setAttribute(eventName, 'return;');
	        isSupported = typeof el[eventName] == 'function';
	    }
	    el = null;
	    return isSupported;
    
    }

}

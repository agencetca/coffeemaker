Coffeemaker.core.storage.stack = function (type, cbk) {

		var utils = Coffeemaker.core.utilities;

		if (type === 'a' || type === 'array') {
		    this.database = [];  
		} else {
		    this.database = {};
		}

		this.set = function(key, value, cbk) {

			if(value === true){value = 1;} 
			if(value === false){value = 0;} 
			//this.database[key] = CryptoJS.AES.encrypt(value, "Secret Passphrase");

			if (utils.check.isObject(this.database)) {
			    this.database[key] = value;
			} else if (utils.check.isArray(this.database)) {
			    this.database.push(key);
			}

            if (utils.check.isFunction(cbk)) cbk();
	
		};
	
		this.get = function(thing, cbk) {
			if (utils.check.isObject(this.database)) {
			//var decrypted = CryptoJS.AES.decrypt(this.database[key], "Secret Passphrase");
			//var answer = decrypted.toString(CryptoJS.enc.Utf8);
			var answer = this.database[thing];
				    return answer;
			} else if (utils.check.isArray(this.database)) {
			    var index = this.database.indexOf(thing);  
			    if (index) return this.database[index];
			}

            if (utils.check.isFunction(cbk)) cbk();

		};
	
		this.del = function(thing, cbk){
	
			if (utils.check.isObject(this.database)) {
				    delete this.database[thing];
			} else if (utils.check.isArray(this.database)) {
			    var index = this.database.indexOf(thing);  
			    delete this.database[index];
			}

            if (utils.check.isFunction(cbk)) cbk();

		};

		return this;
	
}

Coffeemaker.core.capacities.stack = function (type) {

		var load = Coffeemaker.core.process.load;
		var check = load('check');

		if (type === 'a' || type === 'array') {
		    this.database = [];  
		} else {
		    this.database = {};
		}

		this.set = function(key,value) {

			if(value === true){value = 1;} 
			if(value === false){value = 0;} 
			//this.database[key] = CryptoJS.AES.encrypt(value, "Secret Passphrase");

			if (check.isObject(this.database)) {
			    this.database[key] = value;
			} else if (check.isArray(this.database)) {
			    this.database.push(key);
			}
	
		};
	
		this.get = function(thing) {
			if (check.isObject(this.database)) {
			//var decrypted = CryptoJS.AES.decrypt(this.database[key], "Secret Passphrase");
			//var answer = decrypted.toString(CryptoJS.enc.Utf8);
			var answer = this.database[thing];
				    return answer;
			} else if (check.isArray(this.database)) {
			    var index = this.database.indexOf(thing);  
			    if (index) return this.database[index];
			}
		};
	
		this.del = function(thing){
	
			if (check.isObject(this.database)) {
				    delete this.database[thing];
			} else if (check.isArray(this.database)) {
			    var index = this.database.indexOf(thing);  
			    delete this.database[index];
			}
		};

		return this;
	
}

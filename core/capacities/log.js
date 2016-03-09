Coffeemaker.logs = {};
Coffeemaker.logs.tasks = {};
Coffeemaker.logs.tasks.queued = [];
Coffeemaker.logs.tasks.success = [];
Coffeemaker.logs.tasks.error = [];
Coffeemaker.logs.tasks.ETA = 0;
Coffeemaker.logs.tasks.total = 0;
Coffeemaker.logs.tasks.current = '';
Coffeemaker.logs.tasks.last = '';
Coffeemaker.logs.tasks.next = '';

Coffeemaker.core.capacities.log = {

	task : {

        queued : function(task) {

            if (!task) return;

            Coffeemaker.logs.tasks.queued.push(task);
            Coffeemaker.logs.tasks.total++;
        },

        success : function(task) {

            if (!task) return;

                this.stop(task);
                var index = Coffeemaker.logs.tasks.error.indexOf(task); 
                if (index === -1) {
                    Coffeemaker.logs.tasks.success.push(task);
                }
        },

        error : function(task) {

            if (!task) return;
            var index = Coffeemaker.logs.tasks.error.indexOf(task); 
            if (index === -1) {
                Coffeemaker.logs.tasks.error.push(task);
            }
            this.stop(task);
        },

        set : {

            ETA : function() {
                var x = Coffeemaker.logs.tasks.success.length+1;
                var y = Coffeemaker.logs.tasks.total;
                var z = (x)*100/y
                if ( x > 0 ) {
                    Coffeemaker.logs.tasks.ETA = z;
                } else {
                    Coffeemaker.logs.tasks.ETA = 0;
                    this.current('');
                }
            },

            current : function (task) {

                Coffeemaker.logs.tasks.current = task;

            },

            last : function (task) {

                Coffeemaker.logs.tasks.last = task;

            },
            next : function () {

                if (task = Coffeemaker.logs.queued[1]) {
                    Coffeemaker.logs.tasks.next = task;
                } else {
                    Coffeemaker.logs.tasks.next = '';
                }

            }

        },

        get : {

            ETA : function(value) {
                return Coffeemaker.logs.tasks.ETA;
            }

        },

        start : function(task) {
        
            if (!task) return;
            this.set.current(task);
        },

        stop : function (task) {

            if (!task) return;
            var index = Coffeemaker.logs.tasks.queued.indexOf(task); 
            if (index > -1) {
                    this.set.last(task);
                    Coffeemaker.logs.tasks.queued.splice(index, 1);
            }
            this.set.ETA();
        },

		init2 : function (id,value,total) {
	
			if ( ! Coffeemaker.logs ) Coffeemaker.logs = {};
			if ( ! Coffeemaker.logs.tasks ) Coffeemaker.logs.tasks = {};
			if ( ! Coffeemaker.logs.tasks[id] ) Coffeemaker.logs.tasks[id] = {};
			
			
			//if ( ! Coffeemaker.logs.tasks[identifier]['ETA'] ) {
				Coffeemaker.logs.tasks[id]['ETA'] = value | 0;
		
			
			if ( ! Coffeemaker.logs.tasks[id]['total'] ) {
				Coffeemaker.logs.tasks[id]['total'] = total | 0;
				Coffeemaker.logs.tasks[id]['ratio'] = 100/parseInt(total,10) | 0;
			}
			
			Coffeemaker.logs.tasks['current'] = id;
		
		},
	
		update : function (id,newvalue, identifier) {
		
			if ( ! Coffeemaker.logs ) Coffeemaker.logs = {};
			if ( ! Coffeemaker.logs.tasks ) Coffeemaker.logs.tasks = {};
			if ( ! Coffeemaker.logs.tasks[id] ) Coffeemaker.logs.tasks[id] = {};
		
			//alert(identifier);
			//var newvalue = 100-()+Coffeemaker.logs.tasks[identifier]['ratio'];
			var a = newvalue*100/Coffeemaker.logs.tasks[id]['total'];
			var b = 100-a;
			var c = b+Coffeemaker.logs.tasks[id]['ratio'];
			var d = c+1;
			this.init(id,d);
		
		},
		
		get2 : function (id,key) {
            
            if ( ! key ) {
                
			    if (Coffeemaker.logs && Coffeemaker.logs.tasks 
			    && Coffeemaker.logs.tasks[id]) {
				    return Coffeemaker.logs.tasks[id];
			    }
            } else {

			    if (Coffeemaker.logs && Coffeemaker.logs.tasks 
			    && Coffeemaker.logs.tasks[id] && Coffeemaker.logs.tasks[id][key]) {
				    return Coffeemaker.logs.tasks[id][key];
			    }
            }
		}
	},

	exception : function (identifier,message,object) {
	
		//var identifier = arguments[0];
		//Array.prototype.shift.apply(arguments);
		
		if ( ! Coffeemaker.logs ) Coffeemaker.logs = {};
		if ( ! Coffeemaker.logs.exceptions ) Coffeemaker.logs.exceptions = {};
		if ( ! Coffeemaker.logs.exceptions[identifier] ) Coffeemaker.logs.exceptions[identifier] = [];
		
		var exception = {};
		exception.message = message;
		exception.object = object;
		
		Coffeemaker.logs.exceptions[identifier].push(exception);
	
	},

	network : {

		fail : function (type,status,url) {
	
			var load = Coffeemaker.core.capacities.load;
			var check = load('check');

			if ( ! Coffeemaker.logs ) Coffeemaker.logs = {};
			if ( ! Coffeemaker.logs.network ) Coffeemaker.logs.network = {};
			if ( ! Coffeemaker.logs.network.failures ) Coffeemaker.logs.network.failures = {};
			if ( ! Coffeemaker.logs.network.failures[type] ) Coffeemaker.logs.network.failures[type] = [];
			if ( ! Coffeemaker.logs.network.failures[type][status] ) {
				Coffeemaker.logs.network.failures[type][status] = [];
			}
			//if ( ! check.inArray(url,Coffeemaker.network.failures[type][status])) {
				Coffeemaker.logs.network.failures[type][status].push(url);
			//}
		},
	
		success : function (type,status,url) {
	
			var load = Coffeemaker.core.capacities.load;
			var check = load('check');
		
			if ( ! Coffeemaker.logs ) Coffeemaker.logs = {};
			if ( ! Coffeemaker.logs.network ) Coffeemaker.logs.network = {};
			if ( ! Coffeemaker.logs.network.success ) Coffeemaker.logs.network.success = {};
			if ( ! Coffeemaker.logs.network.success[type] ) Coffeemaker.logs.network.success[type] = [];
			if ( ! Coffeemaker.logs.network.success[type][status] ) {
				Coffeemaker.logs.network.success[type][status] = [];
			}
			//if ( ! check.inArray(url,Coffeemaker.logs.network.success[type][status])) {
				Coffeemaker.logs.network.success[type][status].push(url);
			//}
		}
	
	}
	
}

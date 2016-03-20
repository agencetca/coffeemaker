Coffeemaker.logs = {};
Coffeemaker.logs.tasks = {};
Coffeemaker.logs.tasks.queued = [];
Coffeemaker.logs.tasks.success = [];
Coffeemaker.logs.tasks.error = [];
Coffeemaker.logs.tasks.ETA = 0;
Coffeemaker.logs.tasks.total = 0;

Coffeemaker.core.monitor.log = {

	task : {

        queued : function(task, next) {

            var load = Coffeemaker.core.load;
            load.invoke('core/utilities', function (utils) {
                utils.check.doesExist(task, function(taskExists) {
                    if (taskExists === true) {
                        Coffeemaker.logs.tasks.queued.unshift(task);           
                        if ( ! Coffeemaker.logs.tasks.total ) Coffeemaker.logs.tasks.total = 0;
                        Coffeemaker.logs.tasks.total++;
                        if (next) next();
                    } else {
                        if (next) next(false);
                    }
                });
            });

        },

        unqueued : function(task, next) {
            var load = Coffeemaker.core.load;
            load.invoke('core/utilities', function (utils) {
                utils.check.doesExist(task, function(taskExists) {
                    if (taskExists === true) {
                        var index = Coffeemaker.logs.tasks.queued.indexOf(task);
                        if (index > -1) {
                            Coffeemaker.logs.tasks.queued.splice(index, 1);
                            if (next) next();
                        }
                    } else {
                        if (next) next(false);
                    }
                });
            });
        },

        success : function(task, next) {
            var load = Coffeemaker.core.load;
            load.invoke('core/utilities', function (utils) {
                utils.check.doesExist(task, function(taskExists) {
                    if (taskExists === true) {
                        this.stop(task);
                        Coffeemaker.logs.tasks.success.unshift(task);
                        if (next) next();
                    } else {
                        if (next) next(false);
                    }
                }.bind(this));
            }).bind(this);
        },

        error : function(task, next) {
            var load = Coffeemaker.core.load;
            load.invoke('core/utilities', function (utils) {
                utils.check.doesExist(task, function(taskExists) {
                    if (taskExists === true) {
                        if ( ! Coffeemaker.logs.tasks.error ) this.stop(task);
                        Coffeemaker.logs.tasks.error.unshift(task);
                        if (next) next();
                    } else {
                        if (next) next(false);
                    }
                }.bind(this));
            }.bind(this));
        },

        set : {

            ETA : function(next) {
                var utils = Coffeemaker.core.utilities;
                var total = Coffeemaker.logs.tasks.queued.length + Coffeemaker.logs.tasks.success.length + Coffeemaker.logs.tasks.error.length;
                var done = Coffeemaker.logs.tasks.success.length + Coffeemaker.logs.tasks.error.length;
                var ratio = done *100 / total;
                if ( ratio ) {
                    Coffeemaker.logs.tasks.ETA = ratio;
                } else {
                    Coffeemaker.logs.tasks.ETA = 0; 
                }
                if (next) next();
            },

            current : function (task, next) {
                var utils = Coffeemaker.core.utilities;
                Coffeemaker.logs.tasks.current = task;
                if (next) next();
            },

            last : function (task, next) {
                if ( ! task ) return;
                var utils = Coffeemaker.core.utilities;
                Coffeemaker.logs.tasks.last = task;
                if (next) next();
            },

            first : function (task, next) {
                if ( ! task ) return;
                var utils = Coffeemaker.core.utilities;
                Coffeemaker.logs.tasks.first = task;
                if (next) next();
            }

        },

        start : function(task, next) {
            if ( ! task ) return;
            var utils = Coffeemaker.core.utilities;
            this.queued(task, function(task) {
                this.set.last(Coffeemaker.logs.tasks.current);
                this.set.current(task);
            }.apply(this,[ task ]));
            if (next) next(true);
        },

        stop : function (task, next) {

            var utils = Coffeemaker.core.utilities;
            this.set.ETA();
            this.unqueued(task, function(task) {
                this.set.first(task); //HACKY
                this.set.last(Coffeemaker.logs.tasks.current);
            }.apply(this,[ task ]));
            setTimeout(function() {
                if ( ! Coffeemaker.logs.tasks.queued.length ) {
                    delete Coffeemaker.logs.tasks.total;
                    delete Coffeemaker.logs.tasks.current;
                }
                if ( Coffeemaker.logs.tasks.ETA != 100 ) {
                    this.set.ETA();
                }
            }.bind(this),100);
            if (next) next();
        }

	},

	exception : function (identifier, object, next) {
	
		if ( ! Coffeemaker.logs ) Coffeemaker.logs = {};
		if ( ! Coffeemaker.logs.exceptions ) Coffeemaker.logs.exceptions = {};
		if ( ! Coffeemaker.logs.exceptions[identifier] ) Coffeemaker.logs.exceptions[identifier] = [];
		
        var utils = Coffeemaker.core.utilities;
		Coffeemaker.logs.exceptions[identifier].push(object);
        if (next) next(exception);

        throw identifier;
	
	},

	network : {

		fail : function (type, status, url, next) {
	
			if ( ! Coffeemaker.logs ) Coffeemaker.logs = {};
			if ( ! Coffeemaker.logs.network ) Coffeemaker.logs.network = {};
			if ( ! Coffeemaker.logs.network.failures ) Coffeemaker.logs.network.failures = {};
			if ( ! Coffeemaker.logs.network.failures[type] ) Coffeemaker.logs.network.failures[type] = [];

            var utils = Coffeemaker.core.utilities;
			if ( ! Coffeemaker.logs.network.failures[type][status] ) {
				Coffeemaker.logs.network.failures[type][status] = [];
			}

			Coffeemaker.logs.network.failures[type][status].push(url);
            if (next) next(url);
		},
	
		success : function (type, status, url, next) {
	
			if ( ! Coffeemaker.logs ) Coffeemaker.logs = {};
			if ( ! Coffeemaker.logs.network ) Coffeemaker.logs.network = {};
			if ( ! Coffeemaker.logs.network.success ) Coffeemaker.logs.network.success = {};
			if ( ! Coffeemaker.logs.network.success[type] ) Coffeemaker.logs.network.success[type] = [];


            var utils = Coffeemaker.core.utilities;
			if ( ! Coffeemaker.logs.network.success[type][status] ) {
				Coffeemaker.logs.network.success[type][status] = [];
			}

			Coffeemaker.logs.network.success[type][status].push(url);
            if (next) next(url);
		}
	
	}
	
}

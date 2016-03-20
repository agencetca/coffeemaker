Coffeemaker.core.utilities.check = {
	
    hasClass : function (element, cls, next) {
        this.doesExist(cls, function(doesExist) {
            if ( doesExist === false ) {
                next(false);
            } else {
                this.isHTML(element, function(isHTML) {
                    if (isHTML === false) {
                        next(false);
                    } else {
                        next((' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1);
                    }
                });
            }
        });
    },

	doesExist : function (thing, next) {
        if(thing) {
            next(true);
        } else {
            next(false);
        }
	},

	type : function (thing, next) {

        var result = Object.prototype.toString.call(thing);
		next(result);

	},

	objectSize : function(obj, next) {

        next(Object.keys(obj).length); //Compatibility issue with old browsers, and of course with IE8 (who cares? not me)
            
	},

	isArray : function(thing, next) {
        //this.doesExist(thing, function(doesExist) {
        //    if (doesExist === true) {
                this.type(thing, function(type) {
                    if(type === '[object Array]'){
                        next(true);
                    }else{
                        next(false);
                    }
                });
       //     } else {
       //         next(false);
       //     }
       // }.bind(this));
	},

	isString : function(thing, next) {
        //this.doesExist(thing, function(doesExist) {
        //    if (doesExist === true) {
                this.type(thing, function(type) {
                    if(type === '[object String]'){
                        next(true);
                    }else{
                        next(false);
                    }
                });
        //    } else {
        //        next(false);
        //    }
        //}.bind(this));
	},

	isNumeric : function(thing, next) {
        //this.doesExist(thing, function(doesExist) {
        //    if (doesExist === true) {
                this.type(thing, function(type) {
                    if(type === '[object Number]'){
                        next(true);
                    }else{
                        next(false);
                    }
                });
        //    } else {
        //        next(false);
        //    }
        //}.bind(this));
	},

	isObject : function(thing, next) {
        //this.doesExist(thing, function(doesExist) {
        //   if (doesExist === true) {
                this.type(thing, function(type) {
                    if(type === '[object Object]'){
                        next(true);
                    }else{
                        next(false);
                    }
                });
       //     } else {
       //         next(false);
       //     }
       // }.bind(this));
	},

	isBool : function(thing, next) {
        this.doesExist(thing, function(doesExist) {
           // if (doesExist === true) {
           //     this.type(thing, function(type) {
                    if(type === '[object Boolean]'){
                        next(true);
                    }else{
                        next(false);
                    }
                });
          //  } else {
          //      next(false);
          //  }
        //}.bind(this));
	},

	isTrue : function(thing, next) {
        //this.doesExist(thing, function(doesExist) {
        //    if (doesExist === true) {
                this.isBool(thing, function (isBool) {
                    if (isBool === true && thing === true) {
                        next(true);
                    } else {
                        next(false);
                    }
                });
        //    } else {
        //            next(false);
        //    }
        //});
	},

	isTruthy : function(thing, next) {
        //this.doesExist(thing, function(doesExist) {
        //    if (doesExist === true) {
                if (thing) {
                    next(true);
                } else {
                    next(false);
                }
       //     } else {
       //         next(false);
       //     }
       // });
	},

	isFalse : function(thing, next) {
        this.isTrue(thing, function(isTrue) {
            next( ! isTrue);
        });
	},
        
	isFalsy : function(thing, next) {
        this.isTruthy(thing, function(isTruthy) {
            next( ! isTruthy);
        });
	},

	isArguments : function(thing, next) {
        //this.doesExist(thing, function(doesExist) {
        //    if (doesExist === true) {
                this.type(thing, function(type) {
                    if(type === '[object Arguments]'){
                        next(true);
                    }else{
                        next(false);
                    }
                });
        //    } else {
        //        next(false);
        //    }
        //}.bind(this));
	},

    isFunction : function(thing, next) {
        //this.doesExist(thing, function(doesExist) {
        //    if (doesExist === true) {
                this.type(thing, function(type) {
                    if(type === '[object Function]'){
                        next(true);
                    }else{
                        next(false);
                    }
                });
        //    } else {
        //        next(false);
        //    }
        //}.bind(this));
    },
    
    isJSON(str, next) {
		try {
		    JSON.parse(str);
            next(true);
		} catch (e) {
            next(false);
		}
	},

	isHTML : function(thing, next) {
        var load = Coffeemaker.core.load;
        load.invoke('core/utilities',function(utils) {
         //   this.doesExist(thing, function(doesExist) {
         //       if (doesExist === true) {
                    this.type(thing, function(type) {
                        utils.unix.grep('HTML', type, function(match) {
                            this.doesExist(match, function(hasMatched) {
                                if (hasMatched) {
                                    next(true);
                                } else {
                                    next(false);
                                }
                            });
                        });
                    });
        //        } else {
        //            next(false);
        //        }
        //    }.bind(this));
        });
	},

	isNotHTML : function(thing, next) {
        this.isHTML(thing, function(isHTML) {
            next( ! isHTML);
        });
	},

	isEqual : function(thing, ref, next) {
        if (thing === ref) {
            next(true);
        } else {
            next(false);
        }
	},

	isNotEqual : function(thing, ref, next) {
        this.isEqual(thing, function(isEqual) {
            next( ! isEqual);
        });
	},

	inArray : function(value, array, next) {
        this.isArray(array, function(isArray) {
            if (isArray === true) {
                if(array.indexOf(value) > -1) {
                    next(true);
                } else if (array.indexOf(parseInt(value)) > -1) { 
                    next(true);
                } else {
                    next(false);
                }
            } else {
                next(false);
            }
        });
	},

	inObjectValue : function(value, object, next) {
        var load = Coffeemaker.core.load;
        load.invoke('core/utilities',function(utils) {
            var result = false;
            utils.loop.object.simple(object, function(a,b,c,endLoop) {
                if (value === b) result = true;
                if (endLoop === true) {
                    next(result);    
                }
            });
        });
	},

	inObjectValueDeep : function(value, object, next) {
        var load = Coffeemaker.core.load;
        load.invoke('core/utilities',function(utils) {
            var result = false;
            utils.loop.object.recursive(object, function(a,b,c,endLoop) {
                if (value === b) result = true;
                if (endLoop === true) {
                    next(result);    
                }
            });
        });
	},

	inObjectKey : function(value, object, next) {
        var load = Coffeemaker.core.load;
        load.invoke('core/utilities',function(utils) {
            var result = false;
            utils.loop.object.simple(object, function(a,b,c,endLoop) {
                if (value === a) result = true;
                if (endLoop === true) {
                    next(result);    
                }
            });
        });
	},

	inObjectKeyDeep : function(value, object, next) {
        var load = Coffeemaker.core.load;
        load.invoke('core/utilities',function(utils) {
            var result = false;
            utils.loop.object.recursive(object, function(a,b,c,endLoop) {
                if (value === a) result = true;
                if (endLoop === true) {
                    next(result);    
                }
            });
        });
	},

    getDocHeight : function(next) { //synchrone!
        var result;
        var D = document;
        result = Math.max(
           D.body.scrollHeight, D.documentElement.scrollHeight,
           D.body.offsetHeight, D.documentElement.offsetHeight,
           D.body.clientHeight, D.documentElement.clientHeight
        );
        next(result);
    },

    isEventSupported : function(eventName, next) { //synchrone!
	    var el = document.createElement('div');
	    eventName = 'on' + eventName;
	    var isSupported = (eventName in el);
	    if (!isSupported) {
	        el.setAttribute(eventName, 'return;');
	        isSupported = typeof el[eventName] == 'function';
	    }
	    el = null;
	    next(isSupported);
    }

}

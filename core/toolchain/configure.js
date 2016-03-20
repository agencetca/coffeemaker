Coffeemaker.core.toolchain.configure = function(obj){

	    var utils = Coffeemaker.core.utils;
	    var DOM = Coffeemaker.core.DOM;

            var fabric = function (elem,object,type) {

                var l;
                var o;
                var t;
                var e;

                if (type === 'design') {
                    o = object[type];
                    l = function (g,h) {
                        e.style.setProperty(g,h); 
                    }
                } 
                else if (type === 'events') {
                    o = object['logic'];
                    l = function (func,ns,eve) {
                        var funcs = func.split("/");
                        var scope = o;

                        utils.loop.array (funcs, function(i,r) {
                            scope = scope[r];
                        });

                        if( ns !== "*" ) {
                            scope = scope[ns]
                        }

                        utils.loop.object.recursive (scope, function(f,args) {
                            if (utils.check.isString(args)) {
                               args = [args]; 
                            }
                            
                            if (utils.check.isArray(args)) {
                                var fu = load.method(f);
                                if (utils.check.isEventSupported(eve)) {
							        DOM.event.addListener(e,eve,fu,args);
                                } else {
                                    if ( eve === 'onload' | eve === 'load' )

                                        //var fufu;
                                        var sid = setInterval(function() {
                                            try {
                                            var el = document.getElementById(e.id);    
                                            if (el) {
                                                //el.start(eve);
                                                fu(args, {
                                                    target : e
                                                });
                                            }
                                            } catch (e) {
                                                console.log(e);
                                            } finally {
                                                clearInterval(sid);
                                            }

                                        },1000);

                                        //alert(fufu.toString().replace(/e\.id/,e.id).replace(/args/,args).replace(/args/,args).replace(/fu/,f);

							        //if (DOM.event.custom && DOM.event.custom[eve]) 
                                       // DOM.event.custom[eve](e,eve,fu,args);
                                }
							//this.exportCode(eve,element.id,func,args);
                            }
                        });
                    }
                } 
                else {
                    return;
                }

                t = elem[type];
                e = elem['element'];

                if ( utils.check.isString(t)) {
                    if (t.match(',')) {
                        utils.loop.array (t.split(','),function(x,y) {
                            if (utils.check.isObject(o[y])) {
                                utils.loop.object.recursive (o[y],function(i,r) {
                                    l(i,r);
                                });
                            }
                        });
                    } else {
                        if (utils.check.isObject(o[t])) {
                            utils.loop.object.recursive (o[t],function(x,y) {
                                l(x,y);
                            });
                        }
                    }
                }else if ( utils.check.isArray(t)) {
                    utils.loop.array (t,function(x,y) {
                        if (utils.check.isObject(o[y])) {
                            utils.loop.object.recursive (o[y],function(i,r) {
                                l(i,r);
                            });
                        } else if (utils.check.isArray(o[y])) {
                            utils.loop.array (o[y],function(i,r) {
                                l(i,r);
                            });
                        }

                    });
                }else if ( utils.check.isObject(t)) {

                    utils.loop.object.simple (t,function(x,y) {
                        //TESTING
                       // if (utils.check.isEventSupported(x)) {
                            if ( utils.check.isObject(y) ) {
                                utils.loop.object.simple (y,function(i,r) {
                                    if ( utils.check.isArray(r) ) {
                                        utils.loop.array (r, function(f,g) {
                                            if ( utils.check.isString(g) ) {
                                                if ( (g !== "*") || ( ! utils.check.doesExist(r[1]) ) ) l(i,g,x); 
                                            }
                                        });
                                    } else if (utils.check.isString(r)) {
                                        if ( r === "*" ) l(i,r,x); 
                                    }
                                });
                            }
                       // }
                        //if (utils.check.isObject(o[x])) {
                        //    utils.loop.object.simple (o[x],function(i,r) {
                        //        l(i,r,eve);
                        //    });
                        //}
                        //ENDTEST

                        //if (utils.check.isObject(o[y])) {
                        //    utils.loop.object.recursive (o[y],function(i,r) {
                        //        l(i,r);
                        //    });
                        //} else if (utils.check.isArray(o[y])) {
                        //    utils.loop.array (o[y],function(i,r) {
                        //        l(i,r);
                        //    });
                        //}
                    });
                }
            
            }

            if ( utils.check.isObject(obj.structure) ) {
                console.log('obj to configure : '+obj.structure)
                
                utils.loop.object.recursive (obj.structure,function(a,b) { 
                
                	//alert(Coffeemaker.config.components);
                	//if ( a === "element" )zimport(Coffeemaker.config.components,b.element);
                	//if ( a === "element" )alert(b +   "      "     +JSON.stringify( load('components',b.element) ))
                	
                	
                	
                	
                	
                	
                	
                });
                
                utils.loop.object.recursive (obj.structure,function(a,b) { 
                    if ( utils.check.isObject(b) && utils.check.doesExist(b.element) ) {
                        console.log('element to configure : '+b.element)
                        if( utils.check.isHTML(b.element = Coffeemaker.core.toolchain.make(b.element)) ) {
                            if ( b.id ) {
                                b.element.id = b.id;
                            } else {
                                //coffeemaker.id(b.element);
                            }
                            if ( b.cls ) b.element.className = b.cls;
                            if ( b.design ) {
                                fabric(b,obj,'design')
                            }
                            if ( b.methods ) {
                                fabric(b,obj,'methods')
                            }
                            if ( b.events ) {
                                fabric(b,obj,'events')
                            }
                        }
                    }
                }.bind(this));
            }            
	}

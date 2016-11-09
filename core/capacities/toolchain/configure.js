Coffeemaker.core.capacities.toolchain.configure = function(obj){

	    var load = Coffeemaker.core.capacities.load;
	    var zimport = Coffeemaker.core.import;
        var loop = load('loop');
        var check = load('check');
	    var DOM = load('DOM');
            

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

                        loop.array (funcs, function(i,r) {
                            scope = scope[r];
                        });

                        if( ns !== "*" ) {
                            scope = scope[ns]
                        }

                        loop.object.recursive (scope, function(f,args) {
                            if (check.isString(args)) {
                               args = [args]; 
                            }
                            
                            if (check.isArray(args)) {
                                var fu = load.method(f);
                                if (check.isEventSupported(eve)) {
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

                if ( check.isString(t)) {
                    if (t.match(',')) {
                        loop.array (t.split(','),function(x,y) {
                            if (check.isObject(o[y])) {
                                loop.object.recursive (o[y],function(i,r) {
                                    l(i,r);
                                });
                            }
                        });
                    } else {
                        if (check.isObject(o[t])) {
                            loop.object.recursive (o[t],function(x,y) {
                                l(x,y);
                            });
                        }
                    }
                }else if ( check.isArray(t)) {
                    loop.array (t,function(x,y) {
                        if (check.isObject(o[y])) {
                            loop.object.recursive (o[y],function(i,r) {
                                l(i,r);
                            });
                        } else if (check.isArray(o[y])) {
                            loop.array (o[y],function(i,r) {
                                l(i,r);
                            });
                        }

                    });
                }else if ( check.isObject(t)) {

                    loop.object.simple (t,function(x,y) {
                        //TESTING
                       // if (check.isEventSupported(x)) {
                            if ( check.isObject(y) ) {
                                loop.object.simple (y,function(i,r) {
                                    if ( check.isArray(r) ) {
                                        loop.array (r, function(f,g) {
                                            if ( check.isString(g) ) {
                                                if ( (g !== "*") || ( ! check.doesExist(r[1]) ) ) l(i,g,x); 
                                            }
                                        });
                                    } else if (check.isString(r)) {
                                        if ( r === "*" ) l(i,r,x); 
                                    }
                                });
                            }
                       // }
                        //if (check.isObject(o[x])) {
                        //    loop.object.simple (o[x],function(i,r) {
                        //        l(i,r,eve);
                        //    });
                        //}
                        //ENDTEST

                        //if (check.isObject(o[y])) {
                        //    loop.object.recursive (o[y],function(i,r) {
                        //        l(i,r);
                        //    });
                        //} else if (check.isArray(o[y])) {
                        //    loop.array (o[y],function(i,r) {
                        //        l(i,r);
                        //    });
                        //}
                    });
                }
            
            }

            if ( check.isObject(obj.structure) ) {
                console.log('obj to configure : '+obj.structure)
                
                loop.object.recursive (obj.structure,function(a,b) { 
                
                	//alert(Coffeemaker.config.components);
                	//if ( a === "element" )zimport(Coffeemaker.config.components,b.element);
                	//if ( a === "element" )alert(b +   "      "     +JSON.stringify( load('components',b.element) ))
                	
                	
                	
                	
                	
                	
                	
                });
                
                loop.object.recursive (obj.structure,function(a,b) { 
                    if ( check.isObject(b) && check.doesExist(b.element) ) {
                        console.log('element to configure : '+b.element)
                        if( check.isHTML(b.element = Coffeemaker.core.capacities.toolchain.make(b.element)) ) {
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

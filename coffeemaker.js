'use strict';
var Coffeemaker = {

    config : {
    
    	root : "Coffeemaker-0.1",
        capacities : "core/capacities/",
        packages : "core/packages",
        process : "core/process",
        methods : "methods",
        components : "components",
        documentation : "documentation",
        templates : "templates",
        template: "example1",
        DOMwrapper : "data"
    
    },

    core : {

        import : function (path,opt) {

            if ( path.charAt(path.length-1) === "/" ) path = path.substr(0, path.length - 1);
            var base = path + "/";

            if ( ! Object.prototype.toString.call(opt) === '[object Array]' ) { 
                opt = [ opt ];
            }

            //if ( opt[0].charAt(opt[0][0]) === "/" ) opt[0] = opt[0].substr(0, opt[0]);
	        var loop = function (arr,callback) {
		        var v = arr.length;
		        for (var i = 0; i < v; i++) {
			        callback(i,arr[i]);
		        }
		    }

            loop( opt, function(a,b) {

                //path = base+"/"+b;
                path = base+b;

                var o = Coffeemaker;
                var p = path.split("/")
                //var r = p.shift();
                var c = p.pop().split(".");


                var engine = function(obj, path){
                    for (var i=0, path=path.split('/'), len=path.length; i<len; i++){
                        if ( ! obj[path[i]]) obj[path[i]] = {}
                        obj = obj[path[i]];
                    };
                    return obj;
                };

                engine(Coffeemaker,path);
                
                //for ( var n=0;n<opt.length;n++ ) {
                //    if ( ! o[p[n]] ) o[p[n]] = {};
                //    o = o[p[n]];
                //}

                if (c[c.length -1] === 'js' | c[c.length -1] === 'json') ext = c.pop(); 
                var component = c.join(".");
                if (ext !== '') { var ext = '.js' };

                path = p.join("/");
                if( ! this[component] ) {
                    var s  = document.createElement("script");
                    //s.src  = r+"/"+path+"/"+component+".js";
                    s.src  = Coffeemaker.config.root+"/"+path+"/"+component+ext;
                    document.head.appendChild(s);
                    //document.head.removeChild(s);
                }

            }.bind(this));
        }
    },

}

Coffeemaker.core.import(Coffeemaker.config.capacities,["number","unix","toolchain/configure"]);
Coffeemaker.core.import(Coffeemaker.config.capacities,["toolchain/make","toolchain/inject"]);
Coffeemaker.core.import(Coffeemaker.config.capacities,["alert","transmission/ajax/get","DOM/structure/appendElementTo","DOM/element/create","DOM/element/select","DOM/event/addListener","DOM/event/delListener"]);
Coffeemaker.core.import(Coffeemaker.config.capacities,["exec","check","loop","log","network/handler","analyze"]);
Coffeemaker.core.import(Coffeemaker.config.capacities,["UI/loading","download","compile","debug","stack","load"]);



window.onload = function() {


var load = Coffeemaker.core.capacities.load;
var toolchain = load('toolchain');
var UI = load('UI');
var DOM = load('DOM');
var compile = load('compile');
var check = Coffeemaker.core.capacities.check;
var loop = load('loop');




    var process = Coffeemaker.core.capacities.exec;
    new process({
        name : 'init',
        payload : function(folder,name) {

            load.package('component/gp/loader/loader', function(template) {

                new process({
                    
                    name : 'loading',

                    payload : function() {

                        compile(template,document.body);

                    }, 

                    callback : {

                        name : 'launch UI',

                        payload : function() {
                            
                            load.template('example1', function(data) {

                                    compile(data,document.body,'overwrite',2000);

                            });
                        }
                    }

                });

            });



            return


        },
        timeout : 0,
        callback : {

            name : 'load components',

            payload : function(e,f) {

                return;
                var template = Coffeemaker.templates[Coffeemaker.config.template];
                loop.object.recursive (template.structure,function(a,b) { 
                    if (a === 'element') load('components',b);
                });

            },
            timeout : 1000,
            callback : {

                name : 'load suppl components and methods',
                payload : function () {

                    return;
                    var components = Coffeemaker.components;
                    loop.object.recursive (components,function(a,b) { 
                        if (a === 'element') load('components',b);
                    });

                },
                timeout : 1000,
                callback : {

                    name : 'compile UI',
                    payload : function () {

                        return;
                        var template = Coffeemaker.templates[Coffeemaker.config.template];
                        return compile(template);

                    },
                    timeout : 1000,
                    callback : {

                        name : 'launch UI',
                        payload : function (display) {
                            return;
                            var body = DOM.element.select('tag','body');
                            var id = setInterval(function(){
                                if (Coffeemaker.logs.tasks.ETA = 100) {
                                    toolchain.inject(display,body,'overwrite')
                                        clearInterval(id);
                                }
                            }, 1500);
                        },
                        timeout : 1000,
                    }
                }
            }

        }
        
    });
        
}

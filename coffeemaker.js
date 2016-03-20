'use strict';
var Coffeemaker = {

    config : {
    
        path : {
            root : "",
            core : "core",
            documentation : "documentation",
            actions : "logic/actions",
            methods : "logic/methods",
            process : "logic/process",
            rationales : "logic/rationales",
            components : "ui/components",
            templates : "ui/templates",
        },
        ui : {
            template: "example1",
            DOMwrapper : "data"
        }
    
    },

    core : {

        import : function (path,opt) {

            //TODO make a better importer

            if ( path.charAt(path.length-1) === "/" ) path = path.substr(0, path.length - 1);
            var base = path + "/";
            if ( ! Object.prototype.toString.call(opt) === '[object Array]' ) { 
                opt = [ opt ];
            }
	        var loop = function (arr,callback) {
		        var v = arr.length;
		        for (var i = 0; i < v; i++) {
			        callback(i,arr[i]);
		        }
		    }
            loop( opt, function(a,b) {
                path = base+b;
                var o = Coffeemaker;
                var p = path.split("/")
                var c = p.pop().split(".");
                var engine = function(obj, path){
                    for (var i=0, path=path.split('/'), len=path.length; i<len; i++){
                        if ( ! obj[path[i]]) obj[path[i]] = {}
                        obj = obj[path[i]];
                    };
                    return obj;
                };
                engine(Coffeemaker,path);
                if (c[c.length -1] === 'js' | c[c.length -1] === 'json') ext = c.pop(); 
                var component = c.join(".");
                if (ext !== '') { var ext = '.js' };
                path = p.join("/");
                if( ! this[component] ) {
                    var s  = document.createElement("script");
                    s.src  = Coffeemaker.config.path.root+"/"+path+"/"+component+ext;
                    document.head.appendChild(s);
                }
            }.bind(this));
        }
    },

    repo : {
        actions : {},
        methods : {},
        process : {},
        rationales : {},
        components : {}
    }

}

//ugly manual loading 'll be wiped out when dedicated loaders 'll be available
Coffeemaker.core.import(Coffeemaker.config.path.core,["utilities/date","utilities/string","utilities/number","utilities/unix","utilities/check","utilities/loop","utilities/analyze","utilities/array", "utilities/object"]);
Coffeemaker.core.import(Coffeemaker.config.path.core,["toolchain/compile","toolchain/make","toolchain/inject","toolchain/configure"]);
Coffeemaker.core.import(Coffeemaker.config.path.core,["ui/appendElementTo","ui/create","ui/select"]);
Coffeemaker.core.import(Coffeemaker.config.path.core,["ui/events/addListener","ui/events/delListener"]);
Coffeemaker.core.import(Coffeemaker.config.path.core,["transmission/ajax/GET"]);
Coffeemaker.core.import(Coffeemaker.config.path.core,["monitor/log"]);
Coffeemaker.core.import(Coffeemaker.config.path.core,["storage/stack"]);
Coffeemaker.core.import(Coffeemaker.config.path.core,["fault/error"]);
Coffeemaker.core.import(Coffeemaker.config.path.core,["system/build","system/exec","system/action","system/method","system/process","system/rationale","system/handle"]);
Coffeemaker.core.import(Coffeemaker.config.path.core,["load/invoke","load/action","load/method", "load/process", "load/rationale","load/handle"]);


window.onload = function() {


    var load = Coffeemaker.core.load;
    
    //load.action('test/sayHello', [ myO, 'name' ], function(a) {
        //console.log(a);
    //});

    var o = {}
//    load.action('test/askMyName', [ o, 'name'], function(a) {
//        load.action('test/sayHello', [ a, 'namee' ], function(a) {
//            console.log(a);
//        });
//    });

    //load.action('test/addition', [ myO, 'list', 'total' ], function(a) {
    //    console.log(a);
    //});


//    var O = {};
//    O.plow = 'plow';


//        load.method('test/personnalizedHello', [ o ], function(a) {
//            console.log(a);
//        });
        
//        load.process('test/big', [ o ], function(a) {
//            console.log(a);
//        });


        load.rationale('test/giant', [ o ], function(a) {
            console.log(a);
        });

//    load.method('test/personnalizedHello', [ {} ], function() {
//        
//    load.method('test/personnalizedHello', [ {} ], function() {
//        
//        
//    });
//        
//    });
//
        

//    load.method('test/personnalizedHello', [], function(a) {
//        
//    load.method('test/personnalizedHello', [], function(a) {
//        
//        console.log(a);
//        
//    });
//        
//    });
//    load.method('test/personnalizedHello', [], function(a) {
//        
//    load.method('test/personnalizedHello', [], function(a) {
//        
//        console.log(a);
//        
//    });
//        
//    });
//
//    load.method('test/personnalizedHello', [], function(a) {
//        
//    load.method('test/personnalizedHello', [], function(a) {
//        
//        console.log(a);
//        
//    });
//        
//    });
//    var method = load.method('test/personnalizedHello');
//    var process = load.process('test/big');
//    var rationale = load.rationale('test/giant');
//
//    var button1 = load.component('core/button');
//    var button2 = load.component('core/button');
//    var button3 = load.component('core/button');
//    var button4 = load.component('core/button');
//
//    ui.attachLogic(action,button1);
//    ui.attachLogic(method,button2);
//    ui.attachLogic(process,button3);
//    ui.attachLogic(rationale,button4);
//
//    ui.inject("main",button1,button2,button3,button4);
}

Coffeemaker.core.capacities.UI.loading = {

	wheel : function() {
	
         var load = Coffeemaker.core.capacities.load;
         var compile = load('compile');

        var image = {
            "structure" : {
                "element" : "div",
                "design" : "style"
            },
            "design" : {
			    "style" : {
				    "width" : "200px",
				    "height" : "200px",
				    "margin-left": "auto",
				    "margin-right": "auto",
				    "padding-top": "5%",
				    "padding-bottom": "5%",
                    "background" : "transparent url('Coffeemaker-0.1/images/loading.gif') no-repeat center"
			    }
            }
        }

        return compile(image);

	},
	
	greenBar : function (object,ref) {
	
		var load = Coffeemaker.core.capacities.load;
		var DOM = load('DOM');
		var inject = load('toolchain/inject');
		var logs = load('log');
		var compile = load('compile');

		var loadingBar = {

            structure : {
                element : 'div',
                id : 'loadingbar',
                design : 'style',
                        events : {
                            onload : { 
                                test : ['b','c']
                            }
                        },
                payload : {
                    element : 'div',
                    id : 'payload',
                    design : 'payload',
                },
                message : {
                    element : 'div',
                    id : 'loadingmsg',
                    design : 'test',
                }
            },
            design : {
		        style : { 
		            width : '400px',
		            height : '40px',
		            "margin-left": 'auto',
		            "margin-right": 'auto',
		            background : 'lightgreen'
		        },
                payload : {
                    width : '0',
                    height : '100%',
                    background : 'green'
                },
                test : {
                    width : 'auto',
                    height : 'auto',
                    textAlign : 'left',
                    fontSize : '12px',
                    fontFamily : 'arial',
                }

            },
            logic : {

                test : {

                    //a : {"css/affect" : [ "loadingbar", "background", "red" ]},
                    b : { "message/inline" : [ "Coffeemaker.logs.tasks.current", "loadingmsg" , "Coffeemaker.logs.tasks.current" , 0, 100, 20 ] },
                    c : { "css/follow" : [ "width", "Coffeemaker.logs.tasks.ETA", "%" , 0, 100, 20, 'payload'] },

                }
            }
		 }  

         return compile(loadingBar);
	
	}



}

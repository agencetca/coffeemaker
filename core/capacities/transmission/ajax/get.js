Coffeemaker.core.capacities.transmission.ajax.GET = function (url,data,callback,async) {
	
	if (!async) async = true;

    var load = Coffeemaker.core.capacities.load;
    var logs = load('log');
    var d = new Date();
    var n = d.getTime(); 
    //logs.task.queued('ajax call-'+n);

	var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", Coffeemaker.config.root+"/"+url+"?data="+data, async );
    //logs.task.start('ajax call-'+n);
	xmlHttp.send( null );

	xmlHttp.onerror = function () {
	
		Coffeemaker.core.capacities.log.network.fail('GET',xmlHttp.status,url)
        //logs.task.error('ajax call-'+n);

	}

	xmlHttp.onreadystatechange=function(){
		
		if (xmlHttp.readyState === 4) {
			if (xmlHttp.status==200) {
		    	if (callback) callback(xmlHttp.responseText);
		    	Coffeemaker.core.capacities.log.network.success('GET',xmlHttp.status,url)
                //logs.task.success('ajax call-'+n);

			}else {
				xmlHttp.onerror();
			}
		}
	}
}

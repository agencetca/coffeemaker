Coffeemaker.core.transmission.ajax.GET = function (url,data,callback,async,cbk) {
	
	if (!async) async = true;

    var monitor = Coffeemaker.core.monitor;
    var d = new Date();
    var n = d.getTime(); 

	var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", Coffeemaker.config.path.root+"/"+url+"?data="+data, async );
	xmlHttp.send( null );

	xmlHttp.onerror = function () {
	
		monitor.log.network.fail('GET',xmlHttp.status,url)

	}

	xmlHttp.onreadystatechange=function(){
		
		if (xmlHttp.readyState === 4) {
			if (xmlHttp.status==200) {
		    	if (callback) callback(xmlHttp.responseText);
		    	monitor.log.network.success('GET',xmlHttp.status,url)
                if (cbk) cbk();
			}else {
				xmlHttp.onerror();
			}
		}
	}
}

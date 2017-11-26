/*///////////////////////////////////////////////////

file : route_loader.js
desc : route loadings
create_date : 2017.11.26
make_by : myoungsung.back
email : myoungsung84@gmail.com

*////////////////////////////////////////////////////


var route_loader = {};

var config = require('../config');


route_loader.init = function(app, router) {
	console.log('route_loader.init 호출됨.');
	return initRoutes(app, router);
};

function initRoutes(app, router) {
	var infoLen = config.route_info.length;
 
	for (var i = 0; i < infoLen; i++) {
		var curItem = config.route_info[i];
			
		var curModule = require(curItem.file);
		
		if (curItem.type == 'get') {
            router.route(curItem.path).get(curModule[curItem.method]);
		} else if (curItem.type == 'post') {
            router.route(curItem.path).post(curModule[curItem.method]);
		} else if (curItem.type == 'put'){
            router.route(curItem.path).put(curModule[curItem.method]);
        }
        else if (curItem.type == 'delete'){
            router.route(curItem.path).delete(curModule[curItem.method]);
        }        
        else {
            console.log('unkonw route type : '+ curItem.type);
		}
		
	}

    app.use('/', router);
}

module.exports = route_loader;
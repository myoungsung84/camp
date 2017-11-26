/*///////////////////////////////////////////////////

file : mongo.js
desc : mongo database handle module
create_date : 2017.11.26
make_by : myoungsung.back
email : myoungsung84@gmail.com

*////////////////////////////////////////////////////

var mongoose = require('mongoose');


var mongo = {};

mongo.init = function(app, config) {
	console.log('mongo init()');
	connect(app, config);
}

function connect(app, config) {
    var options = {
        useMongoClient: true,
    };
    
    mongoose.Promise = global.Promise;
	mongoose.connect(config.db_url, options);
	mongo.db = mongoose.connection;
	
	mongo.db.on('error', console.error.bind(console, 'mongoose db connection error.'));	
	mongo.db.on('open', function () {
		createSchema(app, config);		
	});
	mongo.db.on('disconnected', connect);

}

function createSchema(app, config) {
	var schemaLen = config.db_schemas.length;
	
	for (var i = 0; i < schemaLen; i++) {
		var curItem = config.db_schemas[i];		
		var curSchema = require(curItem.file).createSchema(mongoose);
		var curModel = mongoose.model(curItem.collection, curSchema);
		
		mongo[curItem.schemaName] = curSchema;
		mongo[curItem.modelName] = curModel;	
	}
	
	app.set('mongo', mongo);
}

module.exports = mongo;

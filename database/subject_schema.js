/*///////////////////////////////////////////////////

file : subject_schema.js
desc : mongo database subject schema.
create_date : 2017.11.26
make_by : myoungsung.back
email : myoungsung84@gmail.com

*////////////////////////////////////////////////////

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {
		
	var subjectSchema = mongoose.Schema({
	    title: {type: String, required:true},
        desc: {type: String, required:true},
        created_at: {type: Date, index: {unique: false}, 'default': Date.now},
        updated_at: {type: Date, index: {unique: false}, 'default': Date.now},
	});


	return subjectSchema;
};

module.exports = SchemaObj;


/*///////////////////////////////////////////////////

file : member.js
desc : mongo database member schema.
create_date : 2017.11.26
make_by : myoungsung.back
email : myoungsung84@gmail.com

*////////////////////////////////////////////////////

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {
		
	var memberSchema = mongoose.Schema({
        id:{type: String, required:true, unique: true},
        password:{type: String, required:true},        
	    name:{type: String, required:true},
        phone:{type: String, required:true},
        created_at: {type: Date, index: {unique: false}, 'default': Date.now},
        updated_at: {type: Date, index: {unique: false}, 'default': Date.now},
	});

	return memberSchema;
};

module.exports = SchemaObj;
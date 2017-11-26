/*///////////////////////////////////////////////////

file : package_schema.js
desc : mongo database package schema.
create_date : 2017.11.26
make_by : myoungsung.back
email : myoungsung84@gmail.com

*////////////////////////////////////////////////////

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {
		
	var packageSchema = mongoose.Schema({
	    title: {type: String, required:true},
        desc: {type: String, required:true},
        created_at: {type: Date, index: {unique: false}, 'default': Date.now},
        updated_at: {type: Date, index: {unique: false}, 'default': Date.now},
        open_date: {type: Date, index: {unique: false}, required:true},
        end_date: {type: Date, index: {unique: false}, required:true},
        start_accept_date: {type: Date, index: {unique: false}, required:true},
        end_accept_date: {type: Date, index: {unique: false}, required:true},
        items:[{
            subject: {type: mongoose.Schema.ObjectId, ref: 'subject'},
            member: {type: mongoose.Schema.ObjectId, ref: 'member'},
            start_time:{type: Date, required:true},
            end_time:{type: Date, required:true},            
        }]
	});

//	packageSchema.statics = {
//
//	};
    
	return packageSchema;
};

module.exports = SchemaObj;


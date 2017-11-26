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

	subjectSchema.statics = {
		load: function(id, callback) {
			this.findOne({_id: id})
				//.populate('writer', 'name provider email')
				//.populate('comments.writer')
				.exec(callback);
		},
		list: function(options, callback) {
			var criteria = options.criteria || {};			
			this.find(criteria)
				//.populate('writer', 'name provider email')
				.sort({'created_at': -1})
				.limit(Number(options.perPage))
				.skip(options.perPage * options.page)
				.exec(callback);
		}
	}
    
	return subjectSchema;
};

module.exports = SchemaObj;


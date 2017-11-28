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

	packageSchema.statics = {
		load: function(id, callback) {
			this.findOne({_id: id})
				//.populate('writer', 'name provider email')
				//.populate('comments.writer')
				.exec(callback);
		},
		list: function(options, callback) {
			var criteria = options.criteria || {};			
			this.find(criteria)
				.populate('writer', 'name provider email')
				.sort({'created_at': -1})
				.limit(Number(options.perPage))
				.skip(options.perPage * options.page)
				.exec(callback);
		}
	}
    
	return packageSchema;
};

module.exports = SchemaObj;


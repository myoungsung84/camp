/*///////////////////////////////////////////////////

file : subject.js
desc : route subject
create_date : 2017.11.26
make_by : myoungsung.back
email : myoungsung84@gmail.com

*////////////////////////////////////////////////////

/*/
name     : listsubject
type     : get
path     : /subject/
param    : 
desc     : get subject list
*/
var listsubject = function(req, res) {
    var mongo = req.app.get('mongo');
    
    var paramPage = req.body.page || req.query.page;
    var paramPerPage = req.body.perPage || req.query.perPage;
    
	if (mongo.db) {
		var options = {
			page: paramPage,
			perPage: paramPerPage
		}
        mongo.SubjectModel.list(options, function(err, results) {
			if (err) {
                var content = {
                    title:'list error',
                    stack:err.stack
                };                
                return res.status(404).json(content);                
            }
			
			if (results) {
                res.json(JSON.stringify(results));
			} else {
                return res.status(404).json({ error: 'item not found' });
			}
		});
		
	} else {
        return res.status(404).json({ error: 'data base not connect' });
	}
};

/*
name     : showsubject
type     : get
path     : /subject/
param    : {object_id}
desc     : get subject
*/
var showsubject = function(req, res) {
    
	
};

/*
name     : addsubject
type     : post
path     : /subject/
param    : 
desc     : add to subject
*/
var addsubject = function(req, res) {
    var mongo = req.app.get('mongo');
    
    var paramTitle = req.body.title;
    var paramDesc = req.body.desc;

	if (mongo.db) {
        var subject = new mongo.SubjectModel({
            title: paramTitle,
            desc: paramDesc,
        });
        subject.save(function(err, result){
            if (err) {
                var content = {
                    title:'save error',
                    stack:err.stack
                };                
                return res.status(404).json(content);
            }            
        });
        res.json( { message: 'item add' } );
	} else {
        return res.status(404).json({ error: 'data base not connect' });
	}	
};

/*
name     : updatesubject
type     : put
path     : /subject/
param    : object_id
desc     : update to subject
*/
var updatesubject = function(req, res) {
    var mongo = req.app.get('mongo');
    
    var subject = {
        title:req.body.title,
        desc:req.body.desc,
        updated_at:Date.now()
    }
    
    mongo.SubjectModel.update({ _id: req.params.id }, { $set: subject }, function(err, output){
        if(err) 
            res.status(500).json({ error: 'database failure' });
        console.log(output.n);
        if(!output.n) 
            return res.status(404).json({ error: 'item not found' });
        res.json( { message: 'item updated' } );
    });
};

/*
name     : deletesubject
type     : put
path     : /subject/
param    : object_id
desc     : delete to subject
*/
var deletesubject = function(req, res) {
	var mongo = req.app.get('mongo');

    mongo.SubjectModel.remove({ _id: req.params.id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });

        res.status(204).end();
    })
};

module.exports.listsubject = listsubject;
module.exports.showsubject = showsubject;
module.exports.addsubject = addsubject;
module.exports.updatesubject = updatesubject;
module.exports.deletesubject = deletesubject;



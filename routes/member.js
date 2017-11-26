/*///////////////////////////////////////////////////

file : subject.js
desc : route subject
create_date : 2017.11.26
make_by : myoungsung.back
email : myoungsung84@gmail.com

*////////////////////////////////////////////////////

/*/
name     : listmember
type     : get
path     : /member/
param    : 
desc     : get member list
*/
var listmember = function(req, res) {
    var mongo = req.app.get('mongo');
    
    var paramPage = req.body.page || req.query.page;
    var paramPerPage = req.body.perPage || req.query.perPage;
    
    if (mongo.db) {
		var options = {
			page: paramPage,
			perPage: paramPerPage
		}
        mongo.MemberModel.list(options, function(err, results) {
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
name     : showmember
type     : get
path     : /member/
param    : {object_id}
desc     : get member
*/
var showmember = function(req, res) {
    var mongo = req.app.get('mongo');
    
    var paramID = req.params.id;
    
    if (mongo.db) {

        mongo.MemberModel.load(paramID, function(err, results) {
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
name     : addmember
type     : post
path     : /member/
param    : 
desc     : add to member
*/
var addmember = function(req, res) {
    var mongo = req.app.get('mongo');
    
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    var paramName = req.body.name;
    var paramPhone = req.body.phone;
    
	if (mongo.db) {
        var member = new mongo.MemberModel({
            id:paramId,
            password:paramPassword,
            name:paramName,
            phone:paramPhone            
        });
        member.save(function(err, result){
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
name     : updatemember
type     : put
path     : /member/
param    : object_id
desc     : update to member
*/
var updatemember = function(req, res) {    
    var mongo = req.app.get('mongo');
    
    var member = {
        id:req.body.id,
        password:req.body.password,
        name:req.body.name,
        phone:req.body.phone,
        updated_at:Date.now()
    }
    
    mongo.MemberModel.update({ _id: req.params.id }, { $set: member }, function(err, output){
        if(err) 
            res.status(500).json({ error: 'database failure' });
        console.log(output.n);
        if(!output.n) 
            return res.status(404).json({ error: 'item not found' });
        res.json( { message: 'item updated' } );
    });
};

/*
name     : deletemember
type     : put
path     : /member/
param    : object_id
desc     : delete to member
*/
var deletemember = function(req, res) {
	var mongo = req.app.get('mongo');

    mongo.MemberModel.remove({ _id: req.params.id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });

        res.status(204).end();
    });
};

module.exports.listmember = listmember;
module.exports.showmember = showmember;
module.exports.addmember = addmember;
module.exports.updatemember = updatemember;
module.exports.deletemember = deletemember;



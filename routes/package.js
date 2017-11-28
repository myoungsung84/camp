/*///////////////////////////////////////////////////

file : package.js
desc : route subject
create_date : 2017.11.26
make_by : myoungsung.back
email : myoungsung84@gmail.com

*////////////////////////////////////////////////////

/*/
name     : listpackage
type     : get
path     : /package/
param    : 
desc     : get package list
*/
var listpackage = function(req, res) {
    var mongo = req.app.get('mongo');
    
    if (mongo.db) {
        mongo.PackageModel.find().populate('items.subject').populate('items.member').exec((err, results) => {
			if (err) {
                var content = {
                    title:'list error',
                    stack:err.stack
                };                
                return res.status(404).json(content);
            }
            
            if (results) {
                console.log(results);
                //res.json(JSON.stringify(results));
                res.status(200).json({message:'success', result : {}});
			} else {
                return res.status(404).json({ error: 'item not found' });
			}
        });

	} else {
        return res.status(404).json({ error: 'data base not connect' });
	}
    
};

/*
name     : showpackage
type     : get
path     : /package/
param    : {object_id}
desc     : get package
*/
var showpackage = function(req, res) {

};

/*
name     : addpackage
type     : post
path     : /package/
param    : 
desc     : add to package
*/
var addpackage = function(req, res) {
    var mongo = req.app.get('mongo');
    
    if(0)
    {
        var paramTitle = req.body.title;
        var paramDesc = req.body.desc;
        var paramOpendate = req.body.open_date;
        var paramEnddate = req.body.end_date;
        var paramStartAcceptdate = req.body.start_accept_date;
        var paramEndAcceptdate = req.body.end_accept_date;    
        var paramItems = req.body.items;
    }
    var paramTitle = '12월 기초 부동산 강의';
    var paramDesc = '부동산의 기초지식에 대하여 알아보자.';
    var paramOpendate = Date.now();
    var paramEnddate = Date.now();
    var paramStartAcceptdate = Date.now();
    var paramEndAcceptdate = Date.now();
    
    var items = [
        {
            subject : '5a1aa7494e9eff271c64d773',
            member : '5a1a754b523b012434306449',
            start_time : Date.now(),
            end_time : Date.now(),
        },
        {
            subject : '5a1aa7564e9eff271c64d774',
            member : '5a1a754b523b012434306449',
            start_time : Date.now(),
            end_time : Date.now(),
        }
    ];
    
    var paramItems = items;

	if (mongo.db) {
        var package = new mongo.PackageModel({
            title: paramTitle,
            desc: paramDesc,
            open_date: paramOpendate,
            end_date: paramEnddate,
            start_accept_date: paramStartAcceptdate,
            end_accept_date: paramEndAcceptdate,
            items: paramItems,
        });
        
        package.save(function(err, result){
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
name     : updatepackage
type     : put
path     : /package/
param    : object_id
desc     : update to package
*/
var updatepackage = function(req, res) {
    
    var paramTitle = req.body.title;
    var paramDesc = req.body.desc;
    var paramOpendate = req.body.open_date;
    var paramEnddate = req.body.end_date;
    var paramStartAcceptdate = req.body.start_accept_date;
    var paramEndAcceptdate = req.body.end_accept_date;    
    var paramItems = req.body.items;

    if (mongo.db) {
        var package = new mongo.PackageModel({
            title: paramTitle,
            desc: paramDesc,
            open_date: paramOpendate,
            end_date: paramEnddate,
            start_accept_date: paramStartAcceptdate,
            end_accept_date: paramEndAcceptdate,
            items: paramItems,
            updated_at:Date.now(),
        });
        
        mongo.PackageModel.update({ _id: req.params.id }, { $set: package }, function(err, output){
            if(err) 
                res.status(500).json({ error: 'database failure' });

            if(!output.n) 
                return res.status(404).json({ error: 'item not found' });
            res.json( { message: 'item updated' } );
        });
	} else {
        return res.status(404).json({ error: 'data base not connect' });
	}
};

/*
name     : deletepackage
type     : put
path     : /package/
param    : object_id
desc     : delete to package
*/
var deletepackage = function(req, res) {
	var mongo = req.app.get('mongo');

    mongo.PackageModel.remove({ _id: req.params.id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });

        res.status(204).end();
    });
};

module.exports.listpackage = listpackage;
module.exports.showpackage = showpackage;
module.exports.addpackage = addpackage;
module.exports.updatepackage = updatepackage;
module.exports.deletepackage = deletepackage;



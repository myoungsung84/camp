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
    console.log('listmember');
    
};

/*
name     : showmember
type     : get
path     : /member/
param    : {object_id}
desc     : get member
*/
var showmember = function(req, res) {
	
};

/*
name     : addmember
type     : post
path     : /member/
param    : 
desc     : add to member
*/
var addmember = function(req, res) {

};

/*
name     : updatemember
type     : put
path     : /member/
param    : object_id
desc     : update to member
*/
var updatemember = function(req, res) {    

};

/*
name     : deletemember
type     : put
path     : /member/
param    : object_id
desc     : delete to member
*/
var deletemember = function(req, res) {

};

module.exports.listmember = listmember;
module.exports.showmember = showmember;
module.exports.addmember = addmember;
module.exports.updatemember = updatemember;
module.exports.deletemember = deletemember;



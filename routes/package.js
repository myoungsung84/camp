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
path     : /member/
param    : 
desc     : get member list
*/
var listpackage = function(req, res) {
    console.log('listpackage');
};

/*
name     : showpackage
type     : get
path     : /member/
param    : {object_id}
desc     : get member
*/
var showpackage = function(req, res) {

};

/*
name     : addpackage
type     : post
path     : /member/
param    : 
desc     : add to member
*/
var addpackage = function(req, res) {

};

/*
name     : updatepackage
type     : put
path     : /member/
param    : object_id
desc     : update to member
*/
var updatepackage = function(req, res) {    

};

/*
name     : deletepackage
type     : put
path     : /member/
param    : object_id
desc     : delete to member
*/
var deletepackage = function(req, res) {

};

module.exports.listpackage = listpackage;
module.exports.showpackage = showpackage;
module.exports.addpackage = addpackage;
module.exports.updatepackage = updatepackage;
module.exports.deletepackage = deletepackage;



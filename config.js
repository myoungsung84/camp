/*///////////////////////////////////////////////////

file : subject.js
desc : application config file
create_date : 2017.11.26
make_by : myoungsung.back
email : myoungsung84@gmail.com

*////////////////////////////////////////////////////

module.exports = {
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/local',
	db_schemas: [
        {file:'./subject_schema', collection:'subject', schemaName:'SubjectSchema', modelName:'SubjectModel'},
        {file:'./member_schema', collection:'member', schemaName:'MemberSchema', modelName:'MemberModel'}
	],
	route_info: [
        {file:'./subject', path:'/subject/', method:'listsubject', type:'get'},
        {file:'./subject', path:'/subject/:id', method:'showsubject', type:'get'},
        {file:'./subject', path:'/subject/', method:'addsubject', type:'post'},
        {file:'./subject', path:'/subject/:id', method:'updatesubject', type:'put'},
        {file:'./subject', path:'/subject/:id', method:'deletesubject', type:'delete'},
        
        {file:'./member', path:'/member/', method:'listmember', type:'get'},
        {file:'./member', path:'/member/:id', method:'showmember', type:'get'},
        {file:'./member', path:'/member/', method:'addmember', type:'post'},
        {file:'./member', path:'/member/:id', method:'updatemember', type:'put'},
        {file:'./member', path:'/member/:id', method:'deletemember', type:'delete'}        
	],
}
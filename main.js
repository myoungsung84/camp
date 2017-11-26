/*///////////////////////////////////////////////////

file : main.js
desc : application main file.
create_date : 2017.11.26
make_by : myoungsung.back
email : myoungsung84@gmail.com

*////////////////////////////////////////////////////

var express = require('express'),
    http = require('http'),
    path = require('path');

var bodyParser = require('body-parser'),
    static = require('serve-static');


// 에러 핸들러 모듈 사용
//var errorHandler = require('errorhandler'),
//    expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
//var expressSession = require('express-session');


var config = require('./config');
var mongo = require('./database/mongo');
var route_loader = require('./routes/route_loader');


// 익스프레스 객체 생성
var app = express();



//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');


app.set('port', process.env.PORT || 3000);
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', static(path.join(__dirname, 'public')));

// 세션 설정
//app.use(expressSession({
//	secret:'my key',
//	resave:true,
//	saveUninitialized:true
//}));


var router = express.Router();
route_loader.init(app, router);


//===== 404 에러 페이지 처리 =====//
//var errorHandler = expressErrorHandler({
//    static: {
//        '404': './public/404.html'
//    }
//});
//
//app.use( expressErrorHandler.httpError(404) );
//app.use( errorHandler );



process.on('uncaughtException', function (err) {
	console.log(err.stack);
});

process.on('SIGTERM', function () {
    app.close();
});

app.on('close', function () {
	console.log("server close");
	if (mongo.db) {
		mongo.db.close();
	}
});

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('start camp server port : ' + app.get('port'));
	mongo.init(app, config);
});

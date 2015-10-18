var express = require('express')
    , routes = require('./server/app/routes/index')
    , user = require('./server/app/routes/user')
    , angularview = require('./server/app/routes/angularview')
    ,mail = require('./server/app/routes/mailer')
    , http = require('http')
    , path = require('path');

var app = express();

var MongoClient = require('mongodb').MongoClient;
var db;

var dbURL = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' + process.env.OPENSHIFT_MONGODB_DB_PASSWORD +
    '@' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/' + process.env.OPENSHIFT_APP_NAME;
if (process.env.OPENSHIFT_MONGODB_DB_USERNAME || process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    dbURL = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/' + process.env.OPENSHIFT_APP_NAME;
}

//var dbURL = "mongodb://localhost:27017/integration_test";

console.log(dbURL);

// Initialize connection once
MongoClient.connect(dbURL, function (err, database) {
    if (err) throw err;

    db = database;

    // Start the application after the database connection is ready
    //app.listen(3000);
    console.log("connected to the DB");
});

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

app.set('views', __dirname + '/client/public/views/app');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use('/public', express.static(path.join(__dirname, '/client/public')));

console.log(path.join(__dirname, '/client/public'));
//Hooking up the GUIs

//This enables to use ejs files as views
//app.set('view engine', 'ejs');

//This enables the .html files are views
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Hooking up the GUIs

// Development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/angularview', angularview.angularview);
app.post('/mail', mail.mailer);

//setup node mailer; Node api for sending email
setupMailer();

http.createServer(app).listen(app.get('port'), app.get('ip'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

function setupMailer() {
    //setup node mailer; Node api for sending email
    var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
    transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'urbanposhinteriorspl@gmail.com',
            pass: 'ykzhkdlzhbncgyaf'
        }
    });

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'urbanposhinteriorspl@gmail.com', // sender address
        to: 'urbanposhinteriorspl@gmail.com', // list of receivers
        subject: 'Node Server Started', // Subject line
        text: 'This is test mail which is sent when the server starts up', // plaintext body
        html: '<b>This is test mail which is sent when the server starts up</b>' // html body
    };

// send mail with defined transport object
    //In order to make this work
    //visit this link https://accounts.google.com/ContinueSignIn?sarp=1&scc=1&plt=AKgnsbteR\n534-5.7.14 and Turn it on.
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
}
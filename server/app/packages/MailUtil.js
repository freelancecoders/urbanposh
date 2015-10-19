MailClient = {
    init: function () {
        return;
    },

    init2: function () {

    },
    setupMailer: function () {
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
}
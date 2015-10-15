// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails
// send mail with defined transport object
//In order to make this work
//visit this link https://accounts.google.com/ContinueSignIn?sarp=1&scc=1&plt=AKgnsbteR\n534-5.7.14 and Turn it on.
// setup e-mail data with unicode symbols
exports.mailer = function (req, res) {
    var mailOptions = {
        from: 'sndk.roorkee@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Hello '+req.body.name, // Subject line
        html: "<b>"+req.body.comments+"</b>" // html body
    };
    if (transporter) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send(error);
                return;
            }
            console.log("Success");
            res.send("Success");
        });
    }
};
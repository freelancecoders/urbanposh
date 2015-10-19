//Boostrap. main

(function () {
    initDependencies();

    setEnv();

    startServer();

})();

function startServer() {
    ExpressUtils.startServer();
}

function setEnv() {
    MailClient.setupMailer();

    DBClient.setupDB();

    ExpressUtils.setupExpress();
}

function initDependencies() {
    require('./server/app/packages/DBUtil.js');

    require('./server/app/packages/MailUtil.js');

    require('./server/app/packages/ExpressUtils.js');

}
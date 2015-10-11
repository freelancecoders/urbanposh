/**
 * Created by vineet badoni on 20-10-2014.
 */
//Function which acts a s  main start point for the application
(function (){
    console.log('Setting up the Environment for the application');
    //(1) Setup Environment.
    setupExpress();

    setupMongoDB();

    startAppServer();
    //(2) Call main of the actual.
    console.log('Application started successfully');
})();

/**
 *
 */
function startAppServer(){

}

/**
 *
 */
function setupExpress(){
    console.log('Setting up Express');
}
/**
 *
 */
function setupMongoDB(){
    console.log('Setting up MongoDB');
}
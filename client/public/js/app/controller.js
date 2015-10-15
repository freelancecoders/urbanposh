var angularModule = angular.module('myApp1', []);

angularModule.controller('HelloController1', function ($scope) {
    //$scope.greeting = {message: "Hello"};
    //$scope.name = "Supriya";
});

angularModule.controller("MailController", ['$scope', '$http', function ($scope, $http) {
    $scope.message = "Say Hello";
    $scope.sendEmail = function () {
        //$scope.companies.push({'name': $scope.name, 'employees': $scope.employees, 'headoffice': $scope.headoffice});
        // Writing it to the server
        var dataObj = {
            name: $scope.name,
            email: $scope.email,
            comments: $scope.comments
        };
        console.log("Going to call /mail");
        var res = $http.post('/mail', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.message = "Mail Sent. Say Hello Again.";
        });
        res.error(function (data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
        });
        /* // Making the fields empty
         $scope.name = '';
         $scope.employees = '';
         $scope.headoffice = '';*/
    };
}]);
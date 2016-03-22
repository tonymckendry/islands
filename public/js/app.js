var app = angular.module("myApp", ['ngRoute', 'ngResource']);


//satellizer oauth config.  This connects facebook oauth to our application.
//production clientId - 976973585702482
// dev client Id -  230855193941767
app.config(function ($routeProvider, $authProvider, $locationProvider) {


 $routeProvider
 .when('/', {
   templateUrl: 'partials/home.html',
 })

 $locationProvider.html5Mode(true);

});

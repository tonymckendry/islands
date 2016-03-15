var app = angular.module("myApp", ['ngRoute', 'ngResource', 'satellizer']);


//satellizer oauth config.  This connects facebook oauth to our application.
//production clientId - 976973585702482
// dev client Id -  230855193941767
app.config(function ($routeProvider, $authProvider, $locationProvider) {

 $authProvider.facebook({

     clientId: '976973585702482',
     scope: ['email'],
     scopeDelimiter: ',',
     profileFields: ['name', 'id', 'picture.type(large)', 'emails']
   });


 $routeProvider
 .when('/', {
   templateUrl: 'partials/home.html',
   controller: 'mainController'
 })
 .when('/post',{
   templateUrl: 'partials/post/show.html',
   controller: 'postController'
 })
 .when('/login', {
   templateUrl: 'partials/login.html',
   controller: 'mainController'
 })

 .when('/new',{
  templateUrl: 'partials/post/new.html',
  controller: 'newController'
})
 .when('/profile',{
  templateUrl: 'partials/profile/show.html',
  controller: 'mainController'
})
 .when('/about',{
  templateUrl: 'partials/about.html',
  controller: 'mainController'
})
 .when('/contact',{
  templateUrl: 'partials/contact.html',
  controller: 'mainController'
})

 $locationProvider.html5Mode(true);

});

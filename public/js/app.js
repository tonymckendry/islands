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
 .when('/home', {
   templateUrl: 'partials/home.html',
   controller: 'mainController'
 })
 .when('/posts',{
   templateUrl: 'partials/post/index.html',
   controller: 'postController'
 })
 .when('/posts/:id',{
   templateUrl: 'partials/post/show.html',
   controller: 'postController'
 })
 .when('/posts/:id/edit',{
   templateUrl: 'partials/post/edit.html',
   controller: 'postController'
 })
 .when('/newpost',{
   templateUrl: 'partials/post/new.html',
   controller: 'newController'
 })

 .when('/login', {
   templateUrl: 'partials/login.html',
   controller: 'mainController'
 })


 .when('/profile',{
  templateUrl: 'partials/profile/show.html',
  controller: 'profileController'
})
 .when('/user/:id', {
   templateUrl: 'partials/profile/show.html',
   controller: 'profileShowController'
 })
 .when('/profile/new',{
  templateUrl: 'partials/profile/show.html',
  controller: 'profileController'
})

 .when('/new',{
  templateUrl: 'partials/post/new.html',
  controller: 'newController'
})

 .when('/about',{
  templateUrl: 'partials/about.html',
  controller: 'mainController'
})
 .when('/contact',{
  templateUrl: 'partials/contact.html',
  controller: 'mainController'
})
.when('/profile',{
  templateUrl: 'partials/profile/show.html',
  controller: 'profileController'
})
.when('/admin', {
  templateUrl: 'partials/admin.html',
  controller: 'postController'
})

 $locationProvider.html5Mode(true);

});

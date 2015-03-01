'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'myApp.controllers',
    'myApp.filters',
    'myApp.directives',
    'myApp.services'
]);


app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider
	.when("/login", {controller: "LoginCtrl", templateUrl: "login.html"})
	.when("/signup", {controller: "SignupCtrl", templateUrl: "signup.html"})
    .when("/", {controller: "HomeCtrl", templateUrl: "home.html"})
	.otherwise({redirectTo: "/"})
}]);

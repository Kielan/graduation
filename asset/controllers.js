'use strict';

var ctrls = angular.module('myApp.controllers', []);

ctrls.controller('AppCtrl', function ($scope, $http) {
	$scope.date = new Date();

});
ctrls.controller('HomeCtrl', function ($scope, $http) {
	$scope.tagline = "this is an awesome HOME tagline";
	$scope.title = "HOME";
});

ctrls.controller('LoginCtrl', function ($scope, $http, Kenbasket) {
	$scope.tagline = "this is an awesome ABOUT tagline";
    $scope.title = "ABOUT";
    $scope.newKen = {};
    $scope.kenBasket = kenBasket;
});

ctrls.controller('SignupCtrl', function ($scope, $http) {
    $scope.SignUp = function(form) {
	
	console.log(form);
	console.log(form.name);
	return $http.post("http://localhost:3000/api/signup", {
	    name: form.name,
	    username: form.username,
	    email: form.email,
	    password: form.password
	});
	
    }
})

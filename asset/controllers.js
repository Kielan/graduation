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
    $scope.SignUp = function(name, username, email, password) {
	
	console.log('help');
	return $http.post("http://localhost:3000/signup", {
	    name: name,
	    username: username,
	    email: email,
	    password: password
	});
	
    }
})

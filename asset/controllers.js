'use strict';

var ctrls = angular.module('myApp.controllers', []);

ctrls.controller('BookCtrl', function ($scope, $http) {
    
    $scope.NewObject = function (form) {
	console.log('controller');
	return $http.post("http://localhost:3000/api/newbook", {
	    title: form.title,
	    author: form.author,
	    quote: form.quote
	});
    }

});

ctrls.controller('HomeCtrl', function ($scope, $http) {
	$scope.tagline = "this is an awesome HOME tagline";
	$scope.title = "HOME";
});

ctrls.controller('LoginCtrl', function ($scope, $http) {

    $scope.LogIn = function(form) {
	return $http.post("http://localhost:3000/api/login", {
	    email: form.email,
	    password: form.password
	});
    }
    
});

ctrls.controller('SignupCtrl', function ($scope, $http) {
    $scope.SignUp = function(form) {
	
	return $http.post("http://localhost:3000/api/signup", {
	    name: form.name,
	    username: form.username,
	    email: form.email,
	    password: form.password
	});
    }
})

ctrls.controller('NavCtrl', function($scope, $http) {
    $scope.isLogged = true;
    $scope.currentAccount = "Jerry";
    
})

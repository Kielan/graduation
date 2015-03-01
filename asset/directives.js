'use strict';

var directives = angular.module('myApp.directives', [])

.directive('appDirective', function() {
  return {
    template: 'Name: {{developer.name}} Handle: {{developer.handle}}'
  };
});

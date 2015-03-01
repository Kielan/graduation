'use strict';

var filters = angular.module('sampleApp.filters', []);
filters.filter('sampleAppDate', function ($filter) {
  return function (datestr, format) {
    return $filter('date')(Date.parse(datestr) || datestr, format);
  }
});

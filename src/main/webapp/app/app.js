/**
 * Main module setter
 * @type angular app
 */
var module = angular.module('mpApp', [
  'mpApp.public',
  'mpApp.ui',
  'ngResource',
  'oc.lazyLoad'
]);

module.config(function($locationProvider, $stateProvider) {
	$locationProvider.hashPrefix();

});
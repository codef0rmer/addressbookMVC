// Naming the application module
var App = angular.module('addressBook', []);

// Setting up routing
App.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add', {templateUrl: 'partials/add.html', controller: App.addCtrl});
  $routeProvider.when('/list', {templateUrl: 'partials/list.html', controller: App.listCtrl});
  $routeProvider.when('/search', {templateUrl: 'partials/search.html', controller: App.searchCtrl});
  $routeProvider.otherwise({redirectTo: '/add'});
}]);

// Pass the data from one child $scope to another or parent $scope to child
//
// Catching **searchEmit** event propagated from **searchCtrl** and broadcasting it
// to another controller **listCtrl**
App.run(function ($rootScope) {
  $rootScope.$on('searchEmit', function (event, args) {
    $rootScope.$broadcast('searchBroadcast', args);
  });
});
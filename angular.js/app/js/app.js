var App = angular.module('addressBook', []);

App.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/add', {templateUrl: 'partials/add.html', controller: App.addCtrl});
    $routeProvider.when('/list', {templateUrl: 'partials/list.html', controller: App.listCtrl});
    $routeProvider.when('/search', {templateUrl: 'partials/search.html', controller: App.searchCtrl});
    $routeProvider.otherwise({redirectTo: '/add'});
  }]);

App.run(function ($rootScope) {
  $rootScope.$on('searchEmit', function (event, args) {
    $rootScope.$broadcast('searchBroadcast', args);
  });
});
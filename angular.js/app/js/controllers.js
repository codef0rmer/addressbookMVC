App.controller('navCtrl', ['$scope', '$location', function ($scope, $location) {
  $scope.navClass = function (page) {
    return page === $location.path().substring(1) ? 'active' : '';
  };
}]);

App.controller('addCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.save = function () {
    $http.post(
      '../../php/addNewContact.php' +
      '?full_name=' + $scope.full_name +
      '&email=' + $scope.email +
      '&phone=' + $scope.phone +
      '&address=' + $scope.address +
      '&id='
    ).success(function (data) {
      $scope.success = data.success;
      $scope.msg = data.msg;
      frmAdd.reset();
    });
  };
}]);

App.controller('listCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('../../php/listContacts.php').success(function (data) {
    $scope.contacts = data;
  });

  $scope.$on('searchBroadcast', function (event, args) {
    $scope.filter_full_name = args.full_name;
    $scope.filter_email = args.email;

    $http.get('../../php/listContacts.php?full_name=' + $scope.filter_full_name + '&email=' + $scope.filter_email).success(function (data) {
      $scope.contacts = data;
    });
  });
}]);

App.controller('searchCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.searchContacts = function (full_name, email) {
    $scope.$emit('searchEmit', {full_name: full_name, email: email});
  };
}]);
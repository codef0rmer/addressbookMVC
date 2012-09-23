/**
 * Nav Controller
 * For page navigation bar ul.nav-list
 */
App.controller('navCtrl', ['$scope', '$location', function ($scope, $location) {
  $scope.navClass = function (page) {
    var hash = $location.path().substring(1);
        hash = hash.indexOf('edit') === 0 ? 'add' : hash;

    return page === hash ? 'active' : '';
  };
}]);

/**
 * Add/Edit contact Controller
 * For add new/edit existing contact page
 */
App.controller('addCtrl', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
  // Default Title of the page, changes in edit mode
  $scope.formTitle = 'Add';

  // If it is an edit mode, fetch contact details based on id
  if ($routeParams.id !== undefined) {
    $http.get('../../php/searchById.php?id=' + $routeParams.id).success(function (data) {
      if (data.success === true) {
        $scope.id = data.contact.id;
        $scope.full_name = data.contact.full_name;
        $scope.email = data.contact.email;
        $scope.phone = data.contact.phone;
        $scope.address = data.contact.address;
        $scope.formTitle = 'Edit';
      }
    });
  }

  // Save/Update contact details
  $scope.save = function () {
    $http.post(
      '../../php/addNewContact.php' +
      '?full_name=' + $scope.full_name +
      '&email=' + $scope.email +
      '&phone=' + $scope.phone +
      '&address=' + $scope.address +
      '&id=' + $scope.id
    ).success(function (data) {
      $scope.success = data.success;
      $scope.msg = data.msg;
      if (data.success === true && $scope.id > 0) {
        console.log($location.path('/list'));
      }
      frmAdd.reset();
    });
  };
}]);

/**
 * List Contacts Controller
 * For list contacts page
 */
App.controller('listCtrl', ['$scope', '$http', function ($scope, $http) {

  // Fetch contacts on page load
  $http.get('../../php/listContacts.php').success(function (data) {
    $scope.contacts = data;
  });

  // Delete contact model
  $scope.deleteContact = function (contactModel) {
    if (confirm("Are you sure?")) {
      $http.get('../../php/deleteContact.php?id=' + contactModel.id).success(function (data) {
        if (data.success === false) {
          alert(data.msg);
        } else {
          $scope.contacts.splice($scope.contacts.indexOf(contactModel), 1);
        }
      });
    }
  };

  // Usefull for searchContact page, filtering the contacts stored in one controller
  // based on the search criteria set in another controller
  //
  // Catching **searchBroadcast** event emitted by the $rootScope
  $scope.$on('searchBroadcast', function (event, args) {
    $scope.filter_full_name = args.full_name;
    $scope.filter_email = args.email;
    $http.get('../../php/listContacts.php?full_name=' + $scope.filter_full_name + '&email=' + $scope.filter_email).success(function (data) {
      $scope.contacts = data;
    });
  });
}]);

/**
 * Search Contacts Controller
 * For search contacts page
 */
App.controller('searchCtrl', ['$scope', '$http', function ($scope, $http) {
  // Propagating **searchEmit** to be catched by $rootScope in app.js
  $scope.searchContacts = function (full_name, email) {
    $scope.$emit('searchEmit', {full_name: full_name, email: email});
  };
}]);
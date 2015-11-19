angular.module('starter.controllers', ['serviceMacros'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, crudService, setHeader, url) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.search = {
      txt: 'Sony store',
      search: function(txt){
        crudService({
          method: 'GET',
          url: url.getUrl()+'/sites/MLA/search?q='+txt,
        }).success(function (resp) {
          $scope.search.productos = resp.results;
        });
      }
    };

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('MacrosCtrl', function($scope, $ionicModal, Macros) {

  $ionicModal.fromTemplateUrl('templates/macroModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.macros = Macros.all();

  $scope.remove = function(macro) {
    Macros.remove(macro);
  }
  $scope.edit = function(macro) {
    $scope.macro = {
      id: macro.id,
      name: macro.name,
      txt: macro.txt,
      choice: "save"
    }
    $scope.modal.show();
  };
  $scope.add = function() {
    $scope.macro = {
      name: '',
      txt: '',
      choice: "add"
    }
    $scope.modal.show();

  };
  $scope.save = function(name, txt, choice) {
    console.log($scope.macro.choice);
    if (choice == "save") {
      Macros.save($scope.macro, name, txt);
    } else {
      var macro = Macros.create(name, txt);
      Macros.add(macro);
    }
    $scope.modal.hide();
  }
})

.directive('macroInput', function() {
  return {
    templateUrl: 'templates/macroInput.html',
    scope: {
      callback: "&",
      name: "@?",
      txt: "@?",
      choice: "@?"
    },
    link: function(scope, element, attrs){
        scope.callback = scope.callback();
        scope.act = function(name, txt, choice){
          scope.callback(name, txt, choice);
          scope.name = '';
          scope.txt = '';
        }
    }
  };
});

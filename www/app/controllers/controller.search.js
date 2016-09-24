angular.module('module.view.search', ['angular.filter'])
	.controller('searchCtrl', function($scope,$rootScope,$state,usersService,$ionicPopover,$ionicModal) {

    usersService.getAllAccounts().then(function(results){
      $scope.accountResults = results;
    });


  });

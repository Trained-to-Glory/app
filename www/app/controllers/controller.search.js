angular.module('module.view.search', ['angular.filter'])
	.controller('searchCtrl', function($scope,$rootScope,$state,usersService,$ionicSideMenuDelegate,$ionicPopover,$ionicModal) {

    usersService.getAllUsers().then(function(results){
      $scope.users = results;
    });

		$ionicSideMenuDelegate.canDragContent(false);

		$scope.fullscreenPopover = $ionicPopover.fromTemplate(popoverTemplate, {
				scope: $scope
		});

		$scope.openPopover = function($event) {
			 $scope.fullscreenPopover.show($event);
		};

		$scope.closePopover = function($event) {
			 $scope.fullscreenPopover.hide();
		};

		// Execute action on hide popover
		$scope.$on('popover.hidden', function() {
			 // Execute action
		});

		// Execute action on remove popover
		$scope.$on('popover.removed', function() {
			 // Execute action
		});

  });

angular.module('module.view.intro', [])
	.controller('introCtrl', function($scope,$rootScope,$state,$ionicSlideBoxDelegate,$stateParams) {
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
      };
      $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
      };

      // Called each time the slide changes
      $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
      };

      $scope.goToLogin = function(){
        $state.go('signin');
      };
    });

angular.module('module.view.createPlan', [])
	.controller('createPlanCtrl',['$scope','$rootScope','$state','$ionicHistory','$localStorage','appService','$cordovaCamera', 'postService', '$stateParams','$ionicActionSheet',
		 function($scope,$rootScope,$state,$ionicHistory,$localStorage,appService,$cordovaCamera, postService, $stateParams,$ionicActionSheet) {
    $scope.profile = $localStorage.account;
		$scope.postId = $stateParams.post;

		$scope.goBack = function() {
				$backView = $ionicHistory.backView();
			 $backView.go();
    };

		$scope.view = { };
		$scope.data = {};
		$scope.data.checklistArr = [{
			displayName: ''
		}];

		$scope.createPlan = function() {
			var $inputs = $('.event-form .event__input input');
			var data = {};
			$inputs.map( function(elm) {
				data[$(this).attr('name')] = $(this).val();
			});
			data.postType = 'Goal';
			data.photo = $scope.photo;
			data.checklist = $scope.data.checklistArr ;
			var key = postService.createPlan(data);
			$state.go('tabs.sentPlans');
		};

		if($stateParams.post){
			postService.getPlans($stateParams.post).then(function(results) {
				var data = {
					category: 'post',
					postId: $stateParams.post
				}
				$scope.post = results;
			});
		}

		$scope.updatePlan = function() {
			var $inputs = $('.event-form .event__input input');
			var data = {};
			$inputs.map(function(elm) {
				data[$(this).attr('name')] = $(this).val();
			});
			$scope.postId = $stateParams.post;
			data.checklist = $scope.checkList;
			data.postType = 'Goal';
			data.photo = $scope.photo;
			var key = postService.updatePlan(data,$scope.postId);
			$state.go('tabs.sentPlans');
		};

		$scope.pictureLook = { type: 1 };

		$scope.uploadEventPhoto = function () {
          $ionicActionSheet.show({
						titleText: 'Goal Photo',
						cancelText: 'Cancel',
							cancel: function() {
							},
              buttons: [{
                  text: 'Take Picture'
              }, {
                      text: 'Select From Gallery'
                  }],
              buttonClicked: function (index) {
                  switch (index) {
                      case 0: // Take Picture
                          document.addEventListener("deviceready", function () {
                              $cordovaCamera.getPicture(appService.getCameraOptions()).then(function (imageData) {
                                  $scope.photo = "data:image/jpeg;base64," + imageData;
																	$scope.pictureLook = { type: 2 };
                            			var key = postService.create($scope.photo);
                              });
                          }, false);

                          break;
                      case 1: // Select From Gallery
                          document.addEventListener("deviceready", function () {
                              $cordovaCamera.getPicture(appService.getLibraryOptions()).then(function (imageData) {
                                $scope.photo = "data:image/jpeg;base64," + imageData;
																$scope.pictureLook = { type: 2 };
                                var key = postService.create($scope.photo);
                              });
                          }, false);
                          break;
                  }
                  return true;
              }
          });
      };

}]);

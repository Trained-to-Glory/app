angular.module('module.view.createPlan', [])
	.controller('createPlanCtrl', function($scope,$rootScope,$state,$localStorage,appService,$cordovaCamera, postService, $stateParams,$ionicActionSheet) {
    $scope.profile = $localStorage.account;
		console.log($stateParams);
		$scope.postId = $stateParams.post;

		$scope.createPlan = function() {
			var $inputs = $('.event-form .event__input input');
			var data = {};
			$inputs.map( function(elm) {
				data[$(this).attr('name')] = $(this).val();
			});
			data.postType = 'plan';
			data.photo = $scope.photo;
			var key = postService.createPlan(data);
			$state.go('tabs.sentPlans');
		};

		if($stateParams.post){
			postService.getPlans($stateParams.post).then(function(results) {
				var data = {
					category: 'post',
					postId: $stateParams.post
				}
				console.log(data);
				$scope.post = results;
				console.log($scope.post);
			});
		}

		$scope.updatePlan = function() {
			var $inputs = $('.event-form .event__input input');
			var data = {};
			$inputs.map(function(elm) {
				data[$(this).attr('name')] = $(this).val();
			});
			$scope.postId = $stateParams.post;
			data.postType = 'plan';
			data.photo = $scope.photo;
			var key = postService.updatePlan(data,$scope.postId);
			$state.go('tabs.sentPlan');
			console.log('hit update');
		};

		$scope.uploadEventPhoto = function () {
          $ionicActionSheet.show({
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
                            			var key = postService.create($scope.photo);
                              }, function (err) {
                                  appService.showAlert('Error', err, 'Close', 'button-assertive', null);
                              });
                          }, false);

                          break;
                      case 1: // Select From Gallery
                          document.addEventListener("deviceready", function () {
                              $cordovaCamera.getPicture(appService.getLibraryOptions()).then(function (imageData) {
                                $scope.photo = "data:image/jpeg;base64," + imageData;
                                var key = postService.create($scope.photo);
                              }, function (err) {
                                  appService.showAlert('Error', err, 'Close', 'button-assertive', null);
                              });
                          }, false);
                          break;
                  }
                  return true;
              }
          });
      };

});

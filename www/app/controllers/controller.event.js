angular.module('module.view.event', [])
	.controller('eventCtrl', ['$scope','$rootScope','$state','interestService','$localStorage','appService','$cordovaCamera', 'postService', '$stateParams','$ionicActionSheet',
		function($scope,$rootScope,$state,interestService,$localStorage,appService,$cordovaCamera, postService, $stateParams,$ionicActionSheet) {
    $scope.profile = $localStorage.account;
		$scope.postId = $stateParams.post;

		$scope.createEvent = function() {
			var $inputs = $('.event-form .event__input input');
			var data = {};
			$inputs.map( function(elm) {
				data[$(this).attr('name')] = $(this).val();
			});
			var userPhoto = $localStorage.account.photo;
			data.postType = 'Event';
			data.photo = $scope.photo;
			data.userPhoto = userPhoto;
			var key = postService.create(data);
			$state.go('tabs.news');
		};


		$scope.getStablePost = function(){
			return interestService.getStablePost();
		};

		$scope.getStablePost().then(function(results) {
			var interests = [];
			for (key in results){
				interests.push({
					id: key,
					photo: results[key].photo
				});
			}
			$scope.stablePhoto = interests;
		});

		if($stateParams.post){
			postService.get($stateParams.post).then(function(results) {
				var data = {
					category: 'post',
					postId: $stateParams.post
				}
				$scope.post = results;
			});
		}

		$scope.updateEvent = function() {
			var $inputs = $('.event-form .event__input input');
			var data = {};
			$inputs.map(function(elm) {
				data[$(this).attr('name')] = $(this).val();
			});
			var userPhoto = $localStorage.account.photo;
			$scope.postId = $stateParams.post;
			data.postType = 'Event';
			data.photo = $scope.photo;
			data.userPhoto = userPhoto;
			var key = postService.update(data,$scope.postId);
			$state.go('tabs.news');
		};

		$scope.view = { type: 1 };

		$scope.uploadEventPhoto = function () {
          $ionicActionSheet.show({
						titleText: 'Event Photo',
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
																	$scope.view = { type: 2 };
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
																$scope.view = { type: 2 };
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

}]);

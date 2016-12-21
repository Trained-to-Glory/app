angular.module('module.view.regular', [])
	.controller('regularCtrl', ['$scope','$rootScope','$state','interestService','$localStorage','appService','$cordovaCamera', 'postService', '$stateParams','$ionicActionSheet',
		function($scope,$rootScope,$state,interestService,$localStorage,appService,$cordovaCamera, postService, $stateParams,$ionicActionSheet) {
    $scope.profile = $localStorage.account;


		$scope.createPost = function() {
			var $inputs = $('.event-form .event__input input');
			var data = {};
			$inputs.map( function(elm) {
				data[$(this).attr('name')] = $(this).val();
			});
			data.postType = 'Post';
			data.photo = $scope.photo;
			var key = postService.create(data);
			$state.go('tabs.news');
		};

		$scope.updatePost = function() {
			var $inputs = $('.event-form .event__input input');
			var data = {};
			$inputs.map(function(elm) {
				data[$(this).attr('name')] = $(this).val();
			});
			$scope.postId = $stateParams.post;
			data.postType = 'Post';
			data.photo = $scope.photo;
			var key = postService.update(data,$scope.postId);
			$state.go('tabs.news');
		};

		$scope.view = { type: 1 };

		$scope.uploadEventPhoto = function () {
          $ionicActionSheet.show({
						titleText: 'Post Photo',
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
                              });
                          }, false);

                          break;
                      case 1: // Select From Gallery
                          document.addEventListener("deviceready", function () {
                              $cordovaCamera.getPicture(appService.getLibraryOptions()).then(function (imageData) {
                                $scope.photo = "data:image/jpeg;base64," + imageData;
																$scope.view = { type: 2 };
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

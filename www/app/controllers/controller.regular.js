angular.module('module.view.regular', [])
	.controller('regularCtrl', function($scope,$rootScope,$state,$localStorage, postService, $ionicActionSheet, $cordovaCamera, appService) {
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
			data.postType = 'post';
			data.photo = $scope.photo;
			var key = postService.update(data,$scope.postId);
			$state.go('tabs.news');
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
                                  //alert(imageData);
                                  $scope.photo = "data:image/jpeg;base64," + imageData;
                              }, function (err) {
                                  appService.showAlert('Error', err, 'Close', 'button-assertive', null);
                              });
                          }, false);

                          break;
                      case 1: // Select From Gallery
                          document.addEventListener("deviceready", function () {
                              $cordovaCamera.getPicture(appService.getLibraryOptions()).then(function (imageData) {
                                $scope.photo = "data:image/jpeg;base64," + imageData;
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

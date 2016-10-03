angular.module('module.view.match', [])
	.controller('matchCtrl', function($scope,$localStorage,$ionicPopup,$ionicPlatform, $cordovaGeolocation,$rootScope,usersService,$state,interestService,$stateParams) {
		$scope.$on('$ionicView.loaded', function(event) {
			var posOptions = {timeout: 10000, enableHighAccuracy: true};
				$cordovaGeolocation.getCurrentPosition(posOptions)
					.then(function(position){
						var lat = position.coords.latitude;
						var long = position.coords.longitude;
						// $localStorage.account.lat = lat;
						// $localStorage.account.long = long;
						$localStorage.account.near = {lat: lat, long: long};
					},function(err){
						console.log('getCurrentPosition error' + angular.toJson(err));
					});
	  });

		var ref = firebase.database().ref('accounts');
		ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
			firebase.database().ref('/accounts/' + snapshot.key ).update({
				location: $localStorage.account.near
			});
		});



		 $scope.goBack = function (ui_sref) {
                    var currentView = $ionicHistory.currentView();
                    var backView = $ionicHistory.backView();

                    if (backView) {
                        //there is a back view, go to it
                        if (currentView.stateName == backView.stateName) {
                            //if not works try to go doubleBack
                            var doubleBackView = $ionicHistory.getViewById(backView.backViewId);
                            $state.go(doubleBackView.stateName, doubleBackView.stateParams);
                        } else {
                            backView.go();
                        }
                    } else {
                        $state.go(ui_sref);
                    }
          }

					$rootScope.likesPictures=[{img:"img/forest-likes.jpg"},{img:"img/water-likes.jpg"},{img:"img/jetty-likes.jpg"},{img:"img/city-likes.jpg"},{img:"img/mountain-likes.jpg"}];
					$rootScope.commitsPictures=[{img:"img/sunset-commits.jpg"},{img:"img/city-commits.jpg"},{img:"img/mountain-commits.jpg"},{img:"img/western-tatras-commits.jpg"},{img:"img/woods-commits.jpg"}];
					$rootScope.commentsPictures=[{img:"img/island-comments.jpg"},{img:"img/lake-comments.jpg"},{img:"img/foggy-comments.jpg"},{img:"img/sea-comments.jpg"},{img:"img/cloud-comments.jpg"}];

					$scope.getInterest = function(id){
						return interestService.get(id);
					};

					$scope.getInterest().then(function(results) {
						var interests = [];
						for (key in results){
							interests.push({
								id: key,
								label: results[key].displayName,
								photo: results[key].backgroundImg,
								icon: results[key].icon
							});
						}
						$scope.abs = interests;
					}, function(error){
					}).catch(function(error){
					});


		 $scope.gotoBrowse = function () {
                    $state.go('tabs.news');

        };

       $scope.gotoAccount = function () {
                    $state.go('tabs.account');

        };

        $scope.gotoCoaches = function () {
                    $state.go('tabs.coach');

        };

        $scope.gotoContacts = function () {
                    $state.go('tabs.contacts');

        };


});

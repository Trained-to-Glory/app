angular.module('module.view.match', [])
	.controller('matchCtrl', ['$scope','$localStorage','$ionicPopup','$ionicScrollDelegate','$ionicNavBarDelegate','$ionicPopover','$ionicPlatform', '$cordovaGeolocation','$rootScope','usersService','$state','interestService','$stateParams',
		function($scope,$localStorage,$ionicPopup,$ionicScrollDelegate,$ionicNavBarDelegate,$ionicPopover,$ionicPlatform, $cordovaGeolocation,$rootScope,usersService,$state,interestService,$stateParams) {
		$scope.$on('$ionicView.enter', function(event) {
			//  $ionicPopup.show({
			//  	title: 'Location',
			//  	subTitle: 'We Would Like To Access Your Location',
			//  	buttons: [
			//  		{ text: 'Cancel'},
			//  		{ text: 'OK' }
			//  	]
			//  });
			var posOptions = {timeout: 10000, enableHighAccuracy: true};
				$cordovaGeolocation.getCurrentPosition(posOptions)
					.then(function(position){
						var lat = position.coords.latitude;
						var long = position.coords.longitude;
						// $localStorage.account.lat = lat;
						// $localStorage.account.long = long;
					return	$localStorage.account.near = {lat: lat, long: long};
					},function(err){
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


				$scope.view = { type: 1 };

				$scope.logout = function() {
				if (firebase.auth()) {
					firebase.auth().signOut().then(function() {
						//Clear the saved credentials.
						$localStorage.$reset();
						$scope.closePopover();
						//Proceed to login screen.
						$state.go('authentication');
					}, function(error) {
						//Show error message.
						Utils.message(Popup.errorIcon, Popup.errorLogout);
					});
				}
			};

			$scope.onSwipeLeft1 = function () {
				$scope.view = { type: 2 };
			}

			$scope.changeView = function () {
				if ($scope.view == { type: 1 }){
					$scope.view == { type: 2 }
				} else if ($scope.view == { type: 1 }) {
					$scope.view == { type: 1}
				}
			}

			$scope.connectImages = [{
        src: 'img/connect/bright-animal.jpeg',
				label: 'Animals',
				id: '-KXc-PKqyc7JRXpB98vc'
			},{
        src: 'img/connect/bright-architecture.jpeg',
				label: 'Architecture',
				id: '-KXc-PKubG8nUAF4rbDW'
			},{
        src: 'img/connect/bright-art.jpeg',
				label: 'Art',
				id: '-KXc-PKubG8nUAF4rbDX'
			},{
				src: 'img/connect/rari-car.jpg',
				label: 'Cars',
				id: '-KXc-PKvsIOIXTjTComa'
			},{
        src: 'img/connect/design-match.jpg',
				label: 'Design',
				id: '-KXc-PKvsIOIXTjTComb'
			},{
				src: 'img/connect/diy-match.jpeg',
				label: 'DIY',
				id: '-KXc-PKvsIOIXTjTComc'
			},{
				src: 'img/connect/education-match.jpeg',
				label: 'Education',
				id: '-KXc-PKvsIOIXTjTComd'
			},{
				src: 'img/connect/events-match.jpg',
				label: 'Events',
				id: '-KXc-PKvsIOIXTjTCome'
			},{
				src: 'img/connect/fashion-match.jpeg',
				label: 'Fashion',
				id: '-KXc-PKyp2pTaXsaG6Ff'
			},{
				src: 'img/connect/food-match.jpg',
				label: 'Food & Drink',
				id: '-KXc-PKzxbTiOJzK6j72'
			},{
				src: 'img/connect/games-match.jpg',
				label: 'Games',
				id: '-KXc-PL0mQ1oYXeDiEyq'
			},{
				src: 'img/connect/gardening-match.jpeg',
				label: 'Gardening',
				id: '-KXc-PL0mQ1oYXeDiEyr'
			},{
				src: 'img/connect/hair-match.jpeg',
				label: 'Hair & Beauty',
				id: '-KXc-PL0mQ1oYXeDiEys'
			},{
				src: 'img/connect/health-match.jpg',
				label: 'Health & Sports',
				id: '-KXc-PL1IJeRKtEt1R70'
			},{
				src: 'img/connect/music-match.jpeg',
				label: 'Music',
				id: '-KXc-PL1IJeRKtEt1R71'
			},{
				src: 'img/connect/new-outdoors.jpg',
				label: 'Outdoors',
				id: '-KXc-PL3SLOgnBvXlR5i'
			},{
				src: 'img/connect/new-tech.jpeg',
				label: 'Technology',
				id: '-KXc-PL3SLOgnBvXlR5j'
    }];

		$scope.leaderImages = [{
			src: 'img/leader/animals-lead.jpg',
			label: 'Animals',
			id: '-KXc-PL6yz4ugqb4XxuH'
		},{
			src: 'img/leader/better-architecture.jpeg',
			label: 'Architecture',
			id: '-KXc-PL6yz4ugqb4XxuI'
		},{
			src: 'img/leader/art-lead.jpg',
			label: 'Art',
			id: '-KXc-PL6yz4ugqb4XxuJ'
		},{
			src: 'img/leader/cars-lead.jpg',
			label: 'Cars',
			id: '-KXc-PL6yz4ugqb4XxuK'
		},{
			src: 'img/leader/design-lead.jpg',
			label: 'Design',
			id: '-KXc-PL6yz4ugqb4XxuL'
		},{
			src: 'img/leader/diy-lead.jpeg',
			label: 'DIY',
			id: '-KXc-PL73JPkLGBGOhT0'
		},{
			src: 'img/leader/education-lead.jpeg',
			label: 'Education',
			id: '-KXc-PL9UBFedjtGjwym'
		},{
			src: 'img/leader/events-lead.jpg',
			label: 'Events',
			id: '-KXc-PL9UBFedjtGjwyn'
		},{
			src: 'img/leader/fashion-lead.jpeg',
			label: 'Fashion',
			id: '-KXc-PL9UBFedjtGjwyo'
		},{
			src: 'img/leader/food-lead.jpeg',
			label: 'Food & Drink',
			id: '-KXc-PL9UBFedjtGjwyp'
		},{
			src: 'img/leader/game-lead.jpeg',
			label: 'Games',
			id: '-KXc-PLA0DrJOIW_0BOY'
		},{
			src: 'img/leader/gardening-lead.jpeg',
			label: 'Gardening',
			id: '-KXc-PLBtt6_xc6WZesE'
		},{
			src: 'img/leader/hair-lead.jpg',
			label: 'Hair & Beauty',
			id: '-KXc-PLBtt6_xc6WZesF'
		},{
			src: 'img/leader/health-lead.jpeg',
			label: 'Health & Sports',
			id: '-KXc-PLBtt6_xc6WZesG'
		},{
			src: 'img/leader/music-lead.jpeg',
			label: 'Music',
			id: '-KXc-PLCBDqeU-66GvDx'
		},{
			src: 'img/leader/outdoors-lead.jpg',
			label: 'Outdoors',
			id: '-KXc-PLCBDqeU-66GvDy'
		},{
			src: 'img/leader/technology-explore.jpeg',
			label: 'Technology',
			id: '-KXc-PLCBDqeU-66GvDz'
	}];

			$scope.onSwipeRight1 = function () {
				$scope.view = { type: 1 };
			}

			$scope.onSwipeLeft2 = function () {
				$state.go('tabs.sentPlans');
			}

			$scope.onSwipeRight2 = function () {
				$state.go('tabs.explore');
			}

			$scope.getTrainersInterest = function(id){
				return interestService.getTrainers(id);
			};

					// $scope.getInterest = function(id){
					// 	return interestService.get(id);
					// };

					$scope.getInterest = interestService.get().then(function(results) {
						var interests = [];
						for (key in results){
							interests.push({
								id: key
							});
						}
						$scope.interestId = interests;
					});



					$scope.repeatData = $scope.connectImages.map(function(value, index) {
							return {
									src: value.src,
									label: value.label,
									id: $scope.abs
							};
					});

					$scope.leaderRepeatData = $scope.leaderImages.map(function(value, index) {
							return {
									src: value.src,
									label: value.label,
									id: $scope.abs
							};
					});


					$scope.limit = 10;
					$scope.loadMore = function(){
						if($scope.abs){
							var max = $scope.abs.length;
							if($scope.limit <=  max){
								$scope.moreToScroll = true;
								if($scope.limit - max < 10 && $scope.limit - max > 0){
									$scope.limit += Math.abs($scope.limit - max);
									$scope.moreToScroll = true;
									return;
								}
								$scope.limit += 10;
							}else{
								$scope.moreToScroll = false;
							}
						}
						$scope.$broadcast('scroll.infiniteScrollComplete');
					};

					$scope.loadMoreTrainers = function(){
	          if($scope.trainers){
	            var max = $scope.trainers.length;
	            if($scope.limit <  max){
	              $scope.moreToScroll = true;
	              if($scope.limit - max < 10 && $scope.limit - max > 0){
	                $scope.limit += Math.abs($scope.limit - max);
	                $scope.moreToScroll = true;
	                return;
	              }
	              $scope.limit += 10;
	            }else{
	              $scope.moreToScroll = false;
	            }
	          }
	          $scope.$broadcast('scroll.infiniteScrollComplete');
	        };

					$scope.getTrainersInterest().then(function(results) {
						var coach = [];
						for (key in results){
							coach.push({
								id: key
							});
						}
						$scope.trainers = coach;
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

}]);

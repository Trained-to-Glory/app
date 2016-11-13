angular.module('module.view.match', [])
	.controller('matchCtrl', function($scope,$localStorage,$ionicPopup,$ionicScrollDelegate,$ionicNavBarDelegate,$ionicPopover,$ionicPlatform, $cordovaGeolocation,$rootScope,usersService,$state,interestService,$stateParams) {
		$scope.$on('$ionicView.loaded', function(event) {
			// $ionicPopup.show({
			// 	title: 'Location',
			// 	subTitle: 'We Would Like To Access Your Location',
			// 	buttons: [
			// 		{ text: 'Cancel'},
			// 		{ text: 'OK' }
			// 	]
			// });
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

					$scope.getInterest = function(id){
						return interestService.get(id);
					};

					$scope.limit = 8;
	        $scope.loadMore = function(){
	          if($scope.abs){
	            var max = $scope.abs.length;
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

					usersService.getInterestName($localStorage.account.userId).then(function(results) {
						var interests = [];
						for (key in results){
							interests.push({
								id: key,
								label: results[key].displayName,
								photo: results[key].backgroundImg,
								numbers: results[key].numbers
							});
						}
						$scope.abs = interests;
					});

					$scope.getTrainersInterest().then(function(results) {
						var coach = [];
						for (key in results){
							coach.push({
								id: key,
								label: results[key].displayName,
								photo: results[key].backgroundImg,
								numbers: results[key].numbers
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

});

var popoverTemplate =
		'<ion-popover-view class="menu popover" ng-click="popover.hide()" style="background-color: #fff;top: -9px;">' +
		'<ion-content scroll="true">' +
		'<ion-list style="position:absolute;top:-10vh;">' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="browse()"> Home' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="search()"> Search' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="match()"> Match' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="explore()"> Discover' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="coach()"> Leaders' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="plans()"> Goals' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="calendar()"> Sessions' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="notifications()"> Notifications' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="partners()"> Partners' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="settings()"> Settings' +
		'</ion-item>' +
		'<a class="item item-avatar" nav-clear style="padding-left: 65px;padding-top:15px;margin-left:2px;" ng-click="account()">'+
		'<img ng-src="{{ profile.userPhoto }}" style="margin-left: 2px;">'+
		'<p style="display: block;color: black !important;">{{profile.firstName + " " + profile.lastName}}<p style="display:block;color: red">{{profile.userName}}</p>'+
		'</a>'+
		'<ion-item class="font-thin" style="font-size: 18px;display:table;" ng-click="logout()"> Sign Out' +
		'</ion-item>' +
		'</ion-list>'+
		'</ion-content>' +
		'</ion-popover-view>';

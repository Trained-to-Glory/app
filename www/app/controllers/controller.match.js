angular.module('module.view.match', [])
	.controller('matchCtrl', function($scope,$localStorage,$ionicPopup,$ionicPopover,$ionicPlatform, $cordovaGeolocation,$rootScope,usersService,$state,interestService,$stateParams) {
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

					$rootScope.likesPictures=[{img:"img/forest-likes.jpg"},{img:"img/water-likes.jpg"},{img:"img/jetty-likes.jpg"},{img:"img/city-likes.jpg"},{img:"img/mountain-likes.jpg"}];
					$rootScope.commitsPictures=[{img:"img/sunset-commits.jpg"},{img:"img/city-commits.jpg"},{img:"img/mountain-commits.jpg"},{img:"img/western-tatras-commits.jpg"},{img:"img/woods-commits.jpg"}];
					$rootScope.commentsPictures=[{img:"img/island-comments.jpg"},{img:"img/lake-comments.jpg"},{img:"img/foggy-comments.jpg"},{img:"img/sea-comments.jpg"},{img:"img/cloud-comments.jpg"}];


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

				$scope.browse = function () {
					$scope.closePopover();
						$state.go('tabs.news');
				};

				$scope.explore = function () {
					$scope.closePopover();
					$state.go('tabs.explore');
				};

				$scope.match = function () {
					$scope.closePopover();
						$state.go('tabs.match');

				};

				$scope.coach = function () {
					 $scope.closePopover();
						$state.go('tabs.coach');
				};

				$scope.plans = function () {
					 $scope.closePopover();
						$state.go('tabs.sentPlans');
				};

				$scope.reminder = function () {
					$scope.closePopover();
						$state.go('tabs.reminders');
				};

				$scope.partners = function () {
					$scope.closePopover();
						$state.go('tabs.partners');
				};

				$scope.settings = function () {
					$scope.closePopover();
						$state.go('tabs.settings');
				};

				$scope.search = function () {
					$scope.closePopover();
						$state.go('tabs.search');
				};

				$scope.calendar = function () {
					$scope.closePopover();
						$state.go('tabs.reminders');
				};

				$scope.account = function (){
					$scope.closePopover();
					$state.go('tabs.account');
				};

				$scope.notifications = function (){
					$scope.closePopover();
					$state.go('tabs.communicate');
				};

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

					$scope.getInterest().then(function(results) {
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

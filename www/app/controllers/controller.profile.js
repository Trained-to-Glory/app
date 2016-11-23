angular.module('module.view.profile', [])
	.controller('profileCtrl', function($scope,$rootScope,$timeout,$cordovaCamera,$log,$ionicPopover,$stateParams,$ionicScrollDelegate,$ionicNavBarDelegate,appService,$ionicActionSheet,engagementService,usersService,$state,postService,$ionicSideMenuDelegate,$localStorage) {
		$rootScope.slideHeader = false;
   	$rootScope.slideHeaderPrevious = 0;

	$scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

	$scope.getScrollPosition = function() {
      $timeout(function () {
       $scope.data = $ionicScrollDelegate.getScrollPosition().top;

    });
  };


	$scope.onSwipeRight = function () {
		$state.go('tabs.sentPlans');
	}

	$scope.view = { type: 1 };

	$scope.togglePartner = function(partnerId){
			var partner = $scope.contacts;
			 if(!partner){
				 return false;
			 }
			partner.partnered = !partner.partnered;
			var state = (partner.partnered)?'partner':'unpartner';
			return engagementService[state]({category:'partners', categoryId:partnerId, userId: $localStorage.account.userId});
	};

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

		$scope.limit = 10;

		$scope.loadMore = function(){
			if($scope.userPosts && $scope.userPosts.itemsArr){
				var max = $scope.userPosts.itemsArr.length;
				if($scope.limit <  max){
					$scope.moreToScroll = true;
					if($scope.limit - max < 10 && $scope.limit - max > 0){
						$scope.limit += Math.abs($scope.limit - max);
						$scope.moreToScroll = false;
						return;
					}
					$scope.limit += 10;
				}else{
					$scope.moreToScroll = false;
				}
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		};

		usersService.getAllUsers($localStorage.account.userId).then(function(results){
			var arr = [];
			for(var key in results){
				results[key].key = key;
				arr.push(results[key]);
			}
			var contacts = {
					items: results,
					itemsArr: arr
			};

			delete results[$localStorage.account.userId];

			for(var id in contacts.items){
			 //check to see if there is a like on this post
			 (function(id){
				 engagementService.partnered({category:'partners', categoryId:id, userId: $localStorage.account.userId}).then(function(partnered){
					contacts.items[id].partnered = partnered;
				});
			})(id,contacts.items);
			}
			$scope.people = contacts.items;
		});

		$scope.loadMoreUserCommits = function(){
			if($scope.userCommits && $scope.userCommits.itemsArr){
				var max = $scope.userCommits.itemsArr.length;
				if($scope.limit <  max){
					$scope.moreToScroll = true;
					if($scope.limit - max < 10 && $scope.limit - max > 0){
						$scope.limit += Math.abs($scope.limit - max);
						$scope.moreToScroll = false;
						return;
					}
					$scope.limit += 10;
				}else{
					$scope.moreToScroll = false;
				}
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		};

		$scope.loadMorePartnerPost = function(){
			if($scope.userNews && $scope.userNews.itemsArr){
				var max = $scope.userNews.itemsArr.length;
				if($scope.limit <  max){
					$scope.moreToScroll = true;
					if($scope.limit - max < 10 && $scope.limit - max > 0){
						$scope.limit += Math.abs($scope.limit - max);
						$scope.moreToScroll = false;
						return;
					}
					$scope.limit += 10;
				}else{
					$scope.moreToScroll = false;
				}
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		};

		$scope.loadMoreContacts = function(){
			if($scope.contacts && $scope.contacts.itemsArr){
				var max = $scope.contacts.itemsArr.length;
				if($scope.limit <  max){
					$scope.moreToScroll = true;
					if($scope.limit - max < 10 && $scope.limit - max > 0){
						$scope.limit += Math.abs($scope.limit - max);
						$scope.moreToScroll = false;
						return;
					}
					$scope.limit += 10;
				}else{
					$scope.moreToScroll = false;
				}
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		};



	usersService.getUserPost($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		var arr = [];
		var photos = [];
		for(var key in results){
			results[key].key = key;
			arr.push(results[key]);
			if (results[key].photo != ""){
				photos.push(results[key]);
			}
		}
		var userPost = {
				itemsArr: photos
		};
		 $scope.userPosts = userPost;
	});

	usersService.getUserTotalPartners($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items

		 $scope.userPartners = results;
	});

	usersService.getUserCommits($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		var arr = [];
		var photos = [];
		for(var key in results){
			results[key].key = key;
			arr.push(results[key]);
			if (results[key].photo != ""){
				photos.push(results[key]);
			}
		}
		var userCommits = {
			itemsArr: photos
		};
		 $scope.userCommits = userCommits;
	});

	postService.getNews().then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		var arr = [];
		var photos = [];
		for(var key in results){
			results[key].key = key;
			arr.push(results[key]);
			if (results[key].photo != ""){
				photos.push(results[key]);
			}
		}
		var news = {
				itemsArr: photos
		};
		//make it available to the directive to officially show/hide, toggle
		$scope.news = news;
	});

	$scope.scrollEvent = function() {
			var scrollamount = $ionicScrollDelegate.$getByHandle('scrollHandle').getScrollPosition().top;
			//$ionicScrollDelegate.scrollBy(0,20, true);
			if (scrollamount > 0) { // Would hide nav-bar immediately when scrolled and show it only when all the way at top. You can fiddle with it to find the best solution for you
				$ionicNavBarDelegate.showBar(false);
			} else {
				$ionicNavBarDelegate.showBar(true);
			}
		}

	usersService.getPartnerPosts($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		var arr = [];
		var photos = [];
		for(var key in results){
			results[key].key = key;
			arr.push(results[key]);
			if (results[key].photo != ""){
				photos.push(results[key]);
			}
		}
		var userNews = {
				itemsArr: photos
		};
		 $scope.userNews = userNews;
	});

	usersService.getUserTotalCommits($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		 $scope.userTotalCommits = results;
	});

	usersService.getUserTotalPost($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		 $scope.userTotalPost = results;
	});

	usersService.getPartners($localStorage.account.userId).then(function(results){
		var arr = [];
		for(var key in results){
			results[key].key = key;
			arr.push(results[key]);
		}
		var contacts = {
				items: results,
				itemsArr: arr
		};
		delete results[$localStorage.account.userId];

		for(var id in contacts.items){
		 //check to see if there is a like on this post
		 (function(id, items){
			 engagementService.partnered({category:'partners', categoryId:id, userId: $localStorage.account.userId}).then(function(partnered){
 				items.partnered = partnered;
 			});
		})(id, contacts.items[id]);
		}

		$scope.contacts = contacts;
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

        $scope.news = {
            type: 'image',
            items: postService.getNews()
        }

				$scope.menuPopover = $ionicPopover.fromTemplate(menuTemplate, {
						scope: $scope
				});

		$scope.profile = $localStorage.account;

		$scope.uploadUserPhoto = function () {
					$ionicActionSheet.show({
						titleText: 'Profile Picture',
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
															$cordovaCamera.getPicture(appService.getProfileCameraOptions()).then(function (imageData) {
																	//alert(imageData);
																	$localStorage.account.userPhoto = "data:image/jpeg;base64," + imageData;
																	var ref = firebase.database().ref('accounts');
																	ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
																		firebase.database().ref('/accounts/' + snapshot.key ).update({
																			userPhoto: $localStorage.account.userPhoto
																		}).then( function() {
																			$localStorage.account.userPhoto = userPhoto;
																			$scope.profile.userPhoto = $localStorage.account.userPhoto;
																			return;
																		});
																	});
																	$localStorage.account.userPhoto = "data:image/jpeg;base64," + imageData;
																	$scope.profile.userPhoto = $localStorage.account.userPhoto;
															}, function (err) {
																	appService.showAlert('Error', err, 'Close', 'button-assertive', null);
															});
													}, false);

													break;
											case 1: // Select From Gallery
													document.addEventListener("deviceready", function () {
															$cordovaCamera.getPicture(appService.getProfileLibraryOptions()).then(function (imageData) {
																$localStorage.account.userPhoto = "data:image/jpeg;base64," + imageData;
																var ref = firebase.database().ref('accounts');
																ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
																	firebase.database().ref('/accounts/' + snapshot.key ).update({
																		userPhoto: $localStorage.account.userPhoto
																	}).then( function() {
																		$localStorage.account.userPhoto = userPhoto;
																		$scope.profile.userPhoto = $localStorage.account.userPhoto;
																		return;
																	});
																});
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

		$scope.gotoMatch = function () {
                    $state.go('tabs.match');

        };

       $scope.gotoBrowse = function () {
                    $state.go('tabs.news');

        };

        $scope.gotoCoaches = function () {
                    $state.go('tabs.coach');

        };

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


}).directive('scrollWatch', function($rootScope) {
  return function(scope, elem, attr) {
    var start = 0;
    var threshold = 150;

    elem.bind('scroll', function(e) {
      if(e.detail.scrollTop - start > threshold) {
        $rootScope.slideHeader = true;
      } else {
        $rootScope.slideHeader = false;
      }
      if ($rootScope.slideHeaderPrevious >= e.detail.scrollTop - start) {
        $rootScope.slideHeader = false;
      }
      $rootScope.slideHeaderPrevious = e.detail.scrollTop - start;
      $rootScope.$apply();
    });
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
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="plans()"> Plans' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="calendar()"> Calendar' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="notifications()"> Notifications' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="partners()"> Partners' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="settings()"> Settings' +
		'</ion-item>' +
		'<a class="item item-avatar" nav-clear style="padding-left: 65px;padding-top:15px;" ng-click="account()">'+
		'<img ng-src="{{ profile.userPhoto }}" style="margin-left: 2px;">'+
		'<p style="display: block;color: black !important;">{{profile.firstName + " " + profile.lastName}}<p style="display:block;color: red">{{profile.userName}}</p>'+
		'</a>'+
		'<ion-item class="font-thin" style="font-size: 18px;display:table;" ng-click="logout()"> Sign Out' +
		'</ion-item>' +
		'</ion-list>'+
		'</ion-content>' +
		'</ion-popover-view>';

var searchTemplate =
    '<ion-popover-view class="search">' +
    '<ion-content scroll="false">' +
    '<div class="list item-input-inset">' +
    '<label class="item-input-wrapper">' +
    '<i class="icon ion-ios-search placeholder-icon"></i>' +
    '<input type="search" placeholder="Search" ng-model="schoolSearch" ng-model-options="{ debounce: 550 }" ng-change="getSearch(schoolSearch)"></label>' +
    ' <i class="icon ion-close" ng-show="schoolSearch" ng-click="getSearch(\'\');popover.hide($event);schoolSearch=\'\'"></i>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

var contactTemplate =
    '<ion-popover-view class="right large">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-avatar item-text-wrap" ng-click="contactPopover.hide($event);"ng-repeat="contact in contacts" ui-sref="tabs.chat({chat: contact})">' +
    '<img ng-src="{{contact.photo}}">' +
    '<h2 class="dark font-thin">{{contact.name}}</h2>' +
    '<p class="dark font-thin">{{contact.subject}}</p>' +
    '</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

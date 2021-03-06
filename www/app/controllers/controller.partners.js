angular.module('module.view.partners', [])
	.controller('partnersCtrl', ['$scope','$rootScope', 'postService','$ionicPopover','$state','$ionicHistory','$localStorage','$stateParams','usersService','engagementService',
		function($scope,$rootScope, postService,$ionicPopover,$state,$ionicHistory,$localStorage,$stateParams,usersService,engagementService) {

		$scope.loading = true;
		$scope.noMoreItemsAvailable = false;
		$scope.people = [];
		console.log($localStorage.account);


		$scope.loadMore = function(){
			var posts = firebase.database().ref(['accounts'].join('/'));
			if ($scope.lastId == undefined) {
				posts.orderByKey().limitToFirst(20).once("value", function(snapshot) {
					$scope.loading = false;
					var currentObj = snapshot.val();
					var array = $.map(currentObj, function(value, index) {
							return [value];
					});

					delete currentObj[$localStorage.account.userId];

					var arr = [];
					 for(var key in currentObj){
							currentObj[key].key = key;
							arr.push(currentObj[key]);
						}

						var contacts = {
							itemsArr: arr,
							items: currentObj
						}

	        		for(var id in contacts.items){
		        		 (function(id, items){
		        			 engagementService.partnered({category:'partners', categoryId:$localStorage.account.userId, userId:id }).then(function(partnered){
		         				items.partnered = partnered;
		         			});
		        		})(id, contacts.items[id]);
	        		};

						$scope.people = [];
						$scope.people = $scope.people.concat(contacts.itemsArr);
						console.log($scope.people);
						$scope.lastId = $scope.people[$scope.people.length - 1].key;

						if ( array.length != 20 ) {
							 $scope.noMoreItemsAvailable = true;
						}
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.$apply();
				});
			}else{
				posts.orderByKey().startAt($scope.lastId).limitToFirst(21).on("value", function(snapshot) {
					$scope.loading = false;
					var currentObj = snapshot.val();
					var array = $.map(currentObj, function(value, index) {
							return [value];
					});

					delete currentObj[$localStorage.account.userId];

					var arr = [];
					 for(var key in currentObj){
							currentObj[key].key = key;
							arr.push(currentObj[key]);
						}
						arr.shift();
						var contacts = {
							itemsArr: arr,
							items: currentObj
						}

						for(var id in contacts.items){
						 //check to see if there is a like on this post
						 (function(id, items){
							 engagementService.partnered({category:'partners', categoryId:$localStorage.account.userId, userId:id }).then(function(partnered){
								items.partnered = partnered;
							});
						})(id, contacts.items[id]);
						}
						console.log(contacts.itemsArr);
						$scope.people = $scope.people.concat(contacts.itemsArr);
						console.log($scope.people);
						$scope.lastId = $scope.people[$scope.people.length - 1].key;

						if ( array.length != 20 ) {
							 $scope.noMoreItemsAvailable = true;
						}
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.$apply();
				});
			}
		};

		$scope.openPopover = function($event) {
			 $scope.fullscreenPopover.show($event);
		};

		$scope.modeType = $stateParams.mode;
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

			$scope.togglePartner = function(partnerId){
					var partner = $scope.people;
 				   if(!partner){
						 return false;
					 }
					partner.partnered = !partner.partnered;
					var state = (partner.partnered)?'partner':'unpartner';
					return engagementService[state]({category:'partners', categoryId:$localStorage.account.userId,userId: partnerId});
			};


			$scope.profile = $localStorage.account;

			$scope.gotoMatch = function () {
	                    $state.go('tabs.match');

	        };

	       $scope.gotoBrowse = function () {
	                    $state.go('tabs.contacts');

	        };

	        $scope.gotoCoaches = function () {
	                    $state.go('tabs.coach');

	        };

					$scope.fullscreenPopover = $ionicPopover.fromTemplate(popoverTemplate, {
							scope: $scope
					});

					$scope.browse = function () {
						$scope.closePopover();
							$state.go('tabs.contacts');
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

}]);

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
				'<a class="item item-avatar" nav-clear style="padding-left: 65px;padding-top:15px;" ng-click="account()">'+
				'<img ng-src="{{ profile.userPhoto }}" style="margin-left: 2px;">'+
				'<p style="display: block;color: black !important;">{{profile.firstName + " " + profile.lastName}}<p style="display:block;color: red">{{profile.userName}}</p>'+
				'</a>'+
				'<ion-item class="font-thin" style="font-size: 18px;display:table;" ng-click="logout()"> Sign Out' +
				'</ion-item>' +
				'</ion-list>'+
				'</ion-content>' +
				'</ion-popover-view>';

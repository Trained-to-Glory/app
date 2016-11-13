angular.module('module.view.contacts', [])
	.controller('contactsCtrl', function($scope,$rootScope,$state,usersService,$ionicPopover,$localStorage,engagementService,$stateParams,interestService) {
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

				$scope.togglePartner = function(partnerId){
						var partner = $scope.ones;
					   if(!partner){
							 return false;
						 }
						partner.partnered = !partner.partnered;
						var state = (partner.partnered)?'partner':'unpartner';
						return engagementService[state]({category:'partners', categoryId:partnerId, userId: $localStorage.account.userId});
				};
				var output = {};
				var rad = function(x) {
					return x * Math.PI / 180;
				};

			 var getDistance = function(p1, p2) {
				 var R = 3963.190592; // Earth’s mean radius in miles
				 var dLat = rad(p2.lat - p1.lat);
				 var dLong = rad(p2.long - p1.long);
				 var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
		    Math.sin(dLong / 2) * Math.sin(dLong / 2);
				 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
				 var d = R * c;
				 return d; // returns the distance in miles
			 };


		$scope.gotoFriend = function () {
                    $state.go('tabs.friend');

        };

				interestService.getInterestUsers($stateParams.activity).then(function(results){
							  $scope.myLocation = $localStorage.account.near;
								delete results[$localStorage.account.userId];
								$scope.users = results;
						});


				$scope.orderByLocation2 = function(input, location, order) {
	 	 		if(!(input && input.location)){
	 	 			return input;
	 	 		}
	 	     var output = [];
	 	 		var tempObj = {};
	 	 		var rad = function(x) {
	 	 			return x * Math.PI / 180;
	 	 		};

	 	 	 var getDistance = function(p1, p2) {
	 	 		 var R = 3963.190592; // Earth’s mean radius in miles
	 	 		 var dLat = rad(p2.lat - p1.lat);
	 	 		 var dLong = rad(p2.long - p1.long);
	 	 		 var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	 	     Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
	 	     Math.sin(dLong / 2) * Math.sin(dLong / 2);
	 	 		 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	 	 		 var d = R * c;
	 	 		 return d; // returns the distance in miles
	 	 	 };

	 	 	 for(var key in input){
	 	 		 tempObj[key] = input[key];
	 	 		 tempObj[key].distance = getDistance(location,tempObj[key].location);
	 	 	 }

	 	 	 var tempArr = Object.keys(tempObj).sort(function(a,b){return tempObj[a].distance - tempObj[b].distance});

	 	 	 for(var i = 0; i < tempArr.length; i++){
	 	 		 output.push(tempObj[tempArr[i]]);
	 	 	 }
	 	     // Do filter work here
	 	     return output;
	 	   }

			 $scope.limit = 10;

			 $scope.loadMore = function(){
				 if($scope.users && $scope.users.itemsArr){
					 var max = $scope.users.itemsArr.length;
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

			$scope.fullscreenPopover = $ionicPopover.fromTemplate(popoverTemplate, {
					scope: $scope
			});

})

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

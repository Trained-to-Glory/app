angular.module('module.view.contacts', [])
	.controller('contactsCtrl',['$scope','$rootScope','$state','usersService','$ionicPopover','$localStorage','engagementService','$stateParams','interestService','$cordovaContacts','$ionicPlatform',
	function($scope,$rootScope,$state,usersService,$ionicPopover,$localStorage,engagementService,$stateParams,interestService,$cordovaContacts,$ionicPlatform) {
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

		$scope.loading = true;
		$scope.usersLength;

		$scope.loadMore = function(){
			var users = firebase.database().ref(['accounts'].join('/'));
			if ($scope.lastId == undefined) {
				users.orderByKey().limitToFirst(20).once("value", function(snapshot) {
					$scope.waiting = false;
					$scope.faster = false;
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
						 //check to see if there is a like on this post
						 (function(id){
							 engagementService.partnered({category:'partners', categoryId:$localStorage.account.userId, userId: id}).then(function(partnered){
								contacts.items[id].partnered = partnered;
							});
						})(id,contacts.items);
						}

						$scope.scrollPeople = [];
						$scope.scrollPeople = $scope.scrollPeople.concat(contacts.itemsArr);
						console.log($scope.scrollPeople);
						$scope.lastId = $scope.scrollPeople[$scope.scrollPeople.length - 1].key;

						if ( array.length != 20 ) {
							 $scope.noMoreItemsAvailable = true;
						}
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.$apply();
				});
			}else{
				users.orderByKey().startAt($scope.lastId).limitToFirst(21).on("value", function(snapshot) {
					$scope.waiting = false;
					$scope.faster = false;
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
						 (function(id){
							 engagementService.partnered({category:'partners', categoryId:$localStorage.account.userId, userId: id}).then(function(partnered){
								contacts.items[id].partnered = partnered;
							});
						})(id,contacts.items);
						}

						$scope.scrollPeople = $scope.scrollPeople.concat(contacts.itemsArr);
						console.log($scope.scrollPeople);
						$scope.lastId = $scope.scrollPeople[$scope.scrollPeople.length - 1].key;

						if ( array.length != 20 ) {
							 $scope.noMoreItemsAvailable = true;
						}
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.$apply();
				});
			}
		};

		$scope.loadMoreContacts = function(){
			var users = firebase.database().ref(['accounts'].join('/'));
			if ($scope.lastId == undefined) {
				users.orderByKey().limitToFirst(20).once("value", function(snapshot) {
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
						 //check to see if there is a like on this post
						 (function(id){
							 engagementService.partnered({category:'partners', categoryId:$localStorage.account.userId, userId: id}).then(function(partnered){
								contacts.items[id].partnered = partnered;
							});
						})(id,contacts.items);
						}

						$scope.scrollPeople = [];
						$scope.scrollPeople = $scope.scrollPeople.concat(contacts.itemsArr);
						console.log($scope.scrollPeople);
						$scope.lastId = $scope.scrollPeople[$scope.scrollPeople.length - 1].key;

						if ( array.length != 20 ) {
							 $scope.noMoreItemsAvailable = true;
						}
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.$apply();
				});
			}else{
				users.orderByKey().startAt($scope.lastId).limitToFirst(21).on("value", function(snapshot) {
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
						 (function(id){
							 engagementService.partnered({category:'partners', categoryId:$localStorage.account.userId, userId: id}).then(function(partnered){
								contacts.items[id].partnered = partnered;
							});
						})(id,contacts.items);
						}

						$scope.scrollPeople = $scope.scrollPeople.concat(contacts.itemsArr);
						console.log($scope.scrollPeople);
						$scope.lastId = $scope.scrollPeople[$scope.scrollPeople.length - 1].key;

						if ( array.length != 20 ) {
							 $scope.noMoreItemsAvailable = true;
						}
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.$apply();
				});
			}
		};


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

				$scope.connectType = $stateParams.type;
				console.log($scope.connectType);
				$scope.waiting = true;

				if($stateParams.type == 'Connect'){
				interestService.getInterestUsers($stateParams.activity).then(function(results){
							$scope.waiting = false;
							  $scope.myLocation = $localStorage.account.near;
								delete results[$localStorage.account.userId];
								$scope.users = results;
								console.log(results);
								var array = $.map(results, function(value, index) {
	                  return [value];
	              });

								var users = {
										items: results
								};

								for(var id in users.items){
								 //check to see if there is a like on this post
								 (function(id){
									 engagementService.partnered({category:'partners', categoryId:id, userId: $localStorage.account.userId}).then(function(partnered){
										users.items[id].partnered = partnered;
									});
								})(id,users.items);
								}

								$scope.usersArr = array;
								$scope.usersLength = array.length;
								console.log($scope.users);
						});
				};

				$scope.faster = true;
				if($stateParams.type == 'Leaders'){
				interestService.getLeaderInterestUsers($stateParams.activity).then(function(results){
					$scope.faster = false;
							  $scope.myLocation = $localStorage.account.near;
								delete results[$localStorage.account.userId];
								$scope.people = results;

								var array = $.map(results, function(value, index) {
	                  return [value];
	              });

								var people = {
										items: results
								};

								for(var id in people.items){
								 //check to see if there is a like on this post
								 (function(id){
									 engagementService.partnered({category:'partners', categoryId:id, userId: $localStorage.account.userId}).then(function(partnered){
										people.items[id].partnered = partnered;
									});
								})(id,people.items);
								}

								$scope.peopleLength = array.length;
								console.log(array);
								$scope.$apply();
						});
			};

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


}]).filter('orderByLocation', function() {

  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input, location, order) {
		if(!input){
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
});

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

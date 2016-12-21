angular.module('module.view.friend', [])
	.controller('friendCtrl',['$scope','$log','engagementService','$localStorage', '$rootScope','$state','postService', 'usersService','$stateParams',
		 function($scope,$log,engagementService,$localStorage, $rootScope,$state,postService, usersService,$stateParams) {
		 $scope.profile = $localStorage.account;
		 usersService.get($stateParams.contact).then(function(results) {
 			//create a local object so we can create the datastructure we want
 			var ones = {
 					items: results
 			};
 			engagementService.partnered({category:'partners', categoryId:$localStorage.account.userId, userId:$stateParams.contact }).then(function(partnered){
 			 $scope.ones.partnered = partnered;
 		 });
 			$scope.ones = ones.items;
 			$scope.$apply();
 				//check to see if there is a like on this post
 		});

		$scope.togglePartner = function(partnerId){
				var partner = $scope.ones;
			   if(!partner){
					 return false;
				 }
				partner.partnered = !partner.partnered;
				var state = (partner.partnered)?'partner':'unpartner';
				return engagementService[state]({categoryId:partnerId, userId: $localStorage.account.userId});
		};
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

		usersService.getUserPost($stateParams.contact).then(function(results) {
			//create a local object so we can create the datastructure we want
			//so we can use it to show/hide, toggle ui items
			var arr = [];
			for(var key in results){
				results[key].key = key;
				arr.push(results[key]);
			}
			var userPost = {
					items: results,
					itemsArr: arr
			};
			 $scope.userPosts = userPost;
			 $scope.$apply();
		});

		$scope.view = { type: 1 };


		usersService.getUserTotalPartners($stateParams.contact).then(function(results) {
			//create a local object so we can create the datastructure we want
			//so we can use it to show/hide, toggle ui items
			 $scope.userPartners = results;
			 $scope.$apply();
		});

		usersService.getUserCommits($stateParams.contact).then(function(results) {
			//create a local object so we can create the datastructure we want
			//so we can use it to show/hide, toggle ui items
			var arr = [];
			for(var key in results){
				results[key].key = key;
				arr.push(results[key]);
			}
			var userCommits = {
					items: results,
					itemsArr: arr
			};
			 $scope.userCommits = userCommits;
			 $scope.$apply();
		});

		usersService.getUserTotalCommits($stateParams.contact).then(function(results) {
			//create a local object so we can create the datastructure we want
			//so we can use it to show/hide, toggle ui items
			 $scope.userTotalCommits = results;
			 $scope.$apply();
		});

		usersService.getUserTotalPost($stateParams.contact).then(function(results) {
			//create a local object so we can create the datastructure we want
			//so we can use it to show/hide, toggle ui items
			 $scope.userTotalPost = results;
			 $scope.$apply();
		});

		usersService.getPartners($stateParams.contact).then(function(results){
			var arr = [];
			for(var key in results){
				results[key].key = key;
				arr.push(results[key]);
			}
			var contacts = {
					items: results,
					itemsArr: arr
			};

				 engagementService.partnered({category:'partners', categoryId:$stateParams.contact, userId: $localStorage.account.user}).then(function(partnered){
	 				$scope.contacts.partnered = partnered;
	 			});

			$scope.contacts = contacts;
			console.log(contacts);
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

		$scope.profile = $stateParams.contact;
		$scope.view = { type: 1 };


}]);
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
		'<img ng-src="{{ profile.userPhoto }}" style="margin-left:2px;">'+
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

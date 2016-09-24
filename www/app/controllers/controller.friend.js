angular.module('module.view.friend', [])
	.controller('friendCtrl', function($scope,engagementService,$localStorage, $rootScope,$state,partnersService,postService, usersService,$stateParams) {
		 console.log($stateParams.contact);
		 $scope.profile = $localStorage.account;

		$scope.togglePartner = function(partnerId){
				var partner = $scope.ones;
			console.log({partnerId: partnerId, partner: partner, userId: $localStorage.account.userId});
			   if(!partner){
					 return false;
				 }
				partner.partnered = !partner.partnered;
				var state = (partner.partnered)?'partner':'unpartner';
				return engagementService[state]({category:'partners', categoryId:partnerId, userId: $localStorage.account.userId});
		};

		usersService.get($stateParams.contact).then(function(results) {
			//create a local object so we can create the datastructure we want
			$scope.ones = results;
				//check to see if there is a like on this post
				engagementService.partnered({category:'partners', categoryId:$scope.ones.userId, userId: $localStorage.account.userId}).then(function(partnered){
					$scope.ones.partnered = partnered;
				});
		});

		usersService.getUserPost($stateParams.contact).then(function(results) {
			//create a local object so we can create the datastructure we want
			//so we can use it to show/hide, toggle ui items
			$scope.photo = results;
			for(var id in $scope.photo){
				//check to see if there is a like on this post
				engagementService.partnered({category:'partners', categoryId:id, itemId: $localStorage.account.userId}).then(function(partnered){
					$scope.photo.partnered = partnered;
					console.log({user: $scope.photo, partnered: partnered});
				});
			}
			console.log($scope.photo);
		});

		usersService.getUserCommits($stateParams.contact).then(function(results) {
			//create a local object so we can create the datastructure we want
			//so we can use it to show/hide, toggle ui items
			$scope.commit = results;
			for(var id in $scope.commit){
				//check to see if there is a like on this post
				engagementService.partnered({category:'partners', categoryId:id, itemId: $localStorage.account.userId}).then(function(partnered){
					$scope.photo.partnered = partnered;
					console.log({user: $scope.photo, partnered: partnered});
				});
			}
			console.log($scope.photo);
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


		$scope.profile = { type: 1 };

		$scope.gotoAccounts = function () {
            $state.go('tabs.account');
        };

     $scope.gotoBrowse = function () {
          	$state.go('tabs.news');
      };

      $scope.gotoCoaches = function () {
            $state.go('tabs.coach');
      };

});

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

angular.module('module.view.profile', [])
	.controller('profileCtrl', function($scope,$rootScope,$log,$stateParams,engagementService,usersService,$state,postService,partnersService,$ionicSideMenuDelegate,userInterestService, $localStorage) {

	$scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

	$scope.togglePartner = function(partnerId){
			var partner = $scope.contacts;
			console.log(partner);
			$log.log({partnerId: partnerId, partner: partner, userId: $localStorage.account.userId});
			 if(!partner){
				 return false;
			 }
			partner.partnered = !partner.partnered;
			var state = (partner.partnered)?'partner':'unpartner';
			return engagementService[state]({category:'partners', categoryId:partnerId, userId: $localStorage.account.userId});
	};

	usersService.getUserPost($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		 $scope.userPosts = results;
	});

	usersService.getUserTotalPartners($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		 $scope.userPartners = results;
	});

	usersService.getUserCommits($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		 $scope.userCommits = results;
		 console.log($scope.userCommits);
	});

	usersService.getUserNews($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		 $scope.userNews = results;
		 $log.log($scope.userNews);
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
		var contacts = {
				items: results
		};
		for(var id in contacts.items){
			engagementService.partnered({category:'partners', categoryId:id, userId: $localStorage.account.userId}).then(function(partnered){
				contacts.items[id].partnered = partnered;
			});
		};
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


		$scope.profile = $localStorage.account;

		$scope.gotoMatch = function () {
                    $state.go('tabs.match');

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

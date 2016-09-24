angular.module('module.view.partners', [])
	.controller('partnersCtrl', function($scope,$rootScope, postService,$state,$ionicHistory,$localStorage,$stateParams,partnersService,usersService,engagementService) {
		console.log($stateParams);
		$scope.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
	  };

	if($stateParams.contact){
		usersService.get($stateParams.contact).then(function(results) {
			//create a local object so we can create the datastructure we want
			//so we can use it to show/hide, toggle ui items
			$scope.ones = results;
		 for(var id in $scope.ones){
			 //check to see if there is a like on this post
			 engagementService.partnered({category:'partners', categoryId:id, itemId: $localStorage.account.userId}).then(function(partnered){
				 $scope.ones.partnered = partnered;
				 console.log({user: $scope.ones, partnered: partnered});
			 });
		 }
		 console.log($scope.ones);
		});
	};

	if(!$stateParams.contact){
		usersService.get().then(function(results) {
			//create a local object so we can create the datastructure we want
			//so we can use it to show/hide, toggle ui items
			 var contacts = {
			 		items: results
			 };
			 for(var id in contacts.items){
			// 	//check to see if there is a like on this post
				engagementService.partnered({category:'partners', categoryId:id, itemId: $localStorage.account.userId}).then(function(partnered){
					contacts.items.partnered = partnered;
				});
			 	engagementService.totalPartners({category:'partners', categoryId: $localStorage.account.userId}).then(function(totalPartners){
			 		contacts.items[id].totalPartners = totalPartners;
			 	});
			 }
		 	//make it available to the directive to officially show/hide, toggle
			 $scope.contacts = contacts;
			 console.log($scope.contacts);
		});
	}

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

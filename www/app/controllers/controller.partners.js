angular.module('module.view.partners', [])
	.controller('partnersCtrl', function($scope,$rootScope, postService,$ionicPopover,$state,$ionicHistory,$localStorage,$stateParams,usersService,engagementService) {


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

					$scope.fullscreenPopover = $ionicPopover.fromTemplate(popoverTemplate, {
							scope: $scope
					});

					$scope.browse = function () {

							$state.go('tabs.news');
					};

					$scope.explore = function () {

							$state.go('tabs.explore');
					};

					$scope.match = function () {

							$state.go('tabs.match');
					};

					$scope.coach = function () {

							$state.go('tabs.coach');
					};

					$scope.plans = function () {

							$state.go('tabs.sentPlans');
					};

					$scope.reminder = function () {

							$state.go('tabs.reminders');
					};

					$scope.likeList = function () {

							$state.go('tabs.likeList');
					};

					$scope.partners = function () {

							$state.go('tabs.partners');
					};

					$scope.settings = function () {

							$state.go('tabs.settings');
					};

					$scope.search = function () {

							$state.go('tabs.search');
					};

					$scope.calendar = function () {

							$state.go('tabs.reminders');
					};

					$scope.account = function (){
						$state.go('tabs.account')
					};

					$scope.logout = function() {

					 if (firebase.auth()) {
						 firebase.auth().signOut().then(function() {
							 //Clear the saved credentials.
							 $localStorage.$reset();
							 //Proceed to login screen.
							 $state.go('authentication');
						 }, function(error) {
							 //Show error message.
							 Utils.message(Popup.errorIcon, Popup.errorLogout);
						 });
					 }
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

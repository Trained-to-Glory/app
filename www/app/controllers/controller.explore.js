angular.module('module.view.explore', [])
	.controller('exploreCtrl', function($scope,$rootScope,$localStorage,$state,postService,engagementService,$ionicSideMenuDelegate,$ionicPopover) {
        $scope.newsPopover = $ionicPopover.fromTemplate(newsTemplate, {
                    scope: $scope
        });

		$scope.gotoBrowse = function () {
                    $state.go('tabs.news');

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

        $scope.gotoMatch = function () {
                    $state.go('tabs.match');

        };

       $scope.gotoAccount = function () {
                    $state.go('tabs.account');

        };

        $scope.gotoCoaches = function () {
                    $state.go('tabs.coach');

        };

        $scope.searchPopover = $ionicPopover.fromTemplate(searchTemplate, {
                    scope: $scope
                });

        $ionicSideMenuDelegate.canDragContent(false);

				var publicServices = {
						'post': true,
						'engagement': true
				}

				//for dev purposes only. remove when done
				for (var key in publicServices) {
						if (publicServices[key]) {
								$scope[key + 'Service'] = eval(key + 'Service');
								window[key + 'Service'] = $scope[key + 'Service'];
						}
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


				$ionicSideMenuDelegate.canDragContent(false);

				$scope.delete = function (id) {
						return postService.delete(id);
				};

				$scope.update = function (data) {
						return postService.update(data);
				};

				$scope.event = function () {

						$state.go('tabs.event');
				};

				postService.getNews().then(function(results) {
					//create a local object so we can create the datastructure we want
					//so we can use it to show/hide, toggle ui items
					var news = {
							type: 'image',
							items: results
					};
					for(var id in news.items){
						//check to see if there is a like on this post
						engagementService.liked({category:'post', categoryId:id, itemId: $localStorage.account.userId}).then(function(liked){
							news.items[id].liked = liked;
						});
						engagementService.committed({category:'post', categoryId:id, itemId: $localStorage.account.userId}).then(function(committed){
							news.items[id].committed = committed;
						});
						engagementService.totalLikes({category:'post', categoryId: $localStorage.account.userId}).then(function(totalLikes){
							news.items[id].totalLikes = totalLikes;
						});
						engagementService.totalCommits({category:'post', categoryId: $localStorage.account.userId}).then(function(totalCommits){
							news.items[id].totalCommits = totalCommits;
						});
					}
					//make it available to the directive to officially show/hide, toggle
					$scope.news = news;
				});
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

				$scope.notifications = function(){
						$state.go('tab.communicate');
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
	'<ion-list>' +
	'<ion-item class="user">' +
	'</ion-item>' +
	'</ion-list>'
	'</ion-content>' +
	'</ion-popover-view>';

var popoverTemplate =
 '<ion-popover-view class="menu popover" style="background-color: #fff;top: -9px;">' +
 '<ion-content scroll="true">' +
 '<ion-list style="position:absolute;top:-10vh;">' +
 '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="browse()"> Home' +
 '</ion-item>' +
 '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="search()"> Search' +
 '</ion-item>' +
 '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="match()"> Match' +
 '</ion-item>' +
 '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="explore()"> Explore' +
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
 '<img ng-src="{{ profile.userPhoto }}">'+
 '<p style="display: block;color: black !important;">{{profile.firstName + " " + profile.lastName}}<p style="display:block;color: red">{{profile.userName}}</p>'+
 '</a>'+
 '<ion-item class="font-thin" style="font-size: 18px;display:table;" ng-click="logout()"> Sign Out' +
 '</ion-item>' +
 '</ion-list>'+
 '</ion-content>' +
 '</ion-popover-view>';

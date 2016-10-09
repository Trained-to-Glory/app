angular.module('module.view.sentPlans', [])
	.controller('sentPlansCtrl', function($scope,$rootScope,$state,$localStorage,$log, $ionicPopover,appService,postService, engagementService,$ionicScrollDelegate) {
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

        $scope.contactPopover = $ionicPopover.fromTemplate(contactTemplate, {
                    scope: $scope
                });

								$scope.delete = function (id) {
				            return postService.deletePlans(id);
				        };


								$scope.plansPopover = $ionicPopover.fromTemplate(plansTemplate, {
										scope: $scope
								});

								$scope.createPlan = function () {
				            $state.go('tabs.create-plan');
				        };

								$scope.profile = $localStorage.account;

								$scope.toggleCommit = function(postId, userId){
				          var posts = $scope.view.items;
				          if(postId in posts){
				            var post = $scope.view.items[postId];
				            var actionable = post.state.actionable;
				            if(actionable){
				              post.committed = !post.committed;
				              var state = (post.committed)?'commit':'decommit';
				              return engagementService[state]({category:'plan', categoryId:postId, userId: $localStorage.account.userId});
				            }
				          }
				            return false;
				        };

								postService.getUserPlans($localStorage.account.userId).then(function(results) {
				          //create a local object so we can create the datastructure we want
				          //so we can use it to show/hide, toggle ui items
									var view = {
				              items: results
				          };

									for(var id in view.items){
				           //check to see if there is a like on this post
									 engagementService.committed({category:'post',categoryId:id, userId: $localStorage.account.userId}).then(function(committed){
										 view.items[id].committed = committed;
									 });
									};
				          $scope.view = view;
									$scope.viewNumberPlans = Object.keys(view).length;
				        });

								$scope.fullscreenPopover = $ionicPopover.fromTemplate(popoverTemplate, {
										scope: $scope
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
    '<ion-popover-view class="search" style= "top:510.703 !important">' +
    '<ion-content scroll="false">' +
    '<div class="list item-input-inset">' +
    '<label class="item-input-wrapper">' +
    '<i class="icon ion-ios-search placeholder-icon"></i>' +
    '<input type="search" placeholder="Search" ng-model="schoolSearch" ng-model-options="{ debounce: 550 }" ng-change="getSearch(schoolSearch)"></label>' +
    ' <i class="icon ion-close" ng-show="schoolSearch" ng-click="getSearch(\'\');popover.hide($event);schoolSearch=\'\'"></i>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';
var plansTemplate =
    '<ion-popover-view class="small right">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-icon-left item-text-wrap" ng-click="createPlan()">' +
    '<i class="icon ion-ios-bell-outline"></i>Create Plan' +
    '</div>' +
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
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="coach()"> Coaches' +
		    '</ion-item>' +
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="plans()"> Plans' +
		    '</ion-item>' +
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="calendar()"> Calendar' +
		    '</ion-item>' +
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="likeList()"> Notifications' +
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

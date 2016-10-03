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
				          $log.log({postId: postId, posts: posts, userId: $localStorage.account.userId});
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
				        });


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
var plansTemplate =
    '<ion-popover-view class="medium right">' +
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

angular.module('module.view.sentPlans', [])
	.controller('sentPlansCtrl', function($scope,$rootScope,$state,$localStorage,$stateParams,$ionicScrollDelegate,$ionicNavBarDelegate,$log,usersService, $ionicPopover,appService,postService, engagementService,$ionicScrollDelegate) {
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
								// angular.element(document).ready(function () {
								// 	$scope.progressbar = ngProgressFactory.createInstance();
								// 	$scope.progressbar.setHeight('20px');
								// 	$scope.progressbar.setColor('red');
								// 	$scope.progressbar.set(0);
								// 	var element = $scope.progressbar.getDomElement();
								// 	$scope.progressbar.setParent(document.querySelector('.progress-bar'));
							  //   });


        $scope.contactPopover = $ionicPopover.fromTemplate(contactTemplate, {
                    scope: $scope
                });

								$scope.delete = function (id) {
				            return postService.deletePlans(id);
				        };

								postService.getNews().then(function(results) {
									//create a local object so we can create the datastructure we want
									//so we can use it to show/hide, toggle ui items
									var arr = [];
				          for(var key in results){
				            results[key].key = key;
				            arr.push(results[key]);
				          }

									var news = {
											itemsArr: arr
									};
									//make it available to the directive to officially show/hide, toggle
									$scope.news = news;
								});


								$scope.plansPopover = $ionicPopover.fromTemplate(plansTemplate, {
										scope: $scope
								});

								$scope.createPlan = function () {
										$scope.closePlan();
										$scope.closeRequestPopover();
				            $state.go('create-plan');
				        };

								$scope.onSwipeLeft = function () {
									$state.go('tabs.account');
								}

								$scope.onSwipeRight = function () {
									$state.go('tabs.match');
								}

								$scope.profile = $localStorage.account;

								$scope.toggleCommit = function(postId, userId){
				          var posts = $scope.view.items;
				          if(postId in posts){
				            var post = $scope.view.items[postId];
				            var actionable = post.state.actionable;
				            if(actionable){
				              post.liked = !post.liked;
				              var state = (post.liked)?'commit':'decommit';
				              if(post.liked){
				                post.totalCommits = 'Joined';
				              }else{
				                post.totalCommits = 'Click to join.';
				              }
				              return engagementService[state]({category:'plan', categoryId:postId, userId: $localStorage.account.userId});
				            }
				          }
				            return false;
				        };

								$scope.isChecked = false;
									$scope.selected = [];
									$scope.checkedOrNot = function (item, isChecked, index, totalChecklist) {
											if (isChecked) {
													$scope.selected.push(item);
													engagementService.engagedActivities({category:'plans', categoryId:item.id, userId:$localStorage.account.userId});
											} else {
													var _index = $scope.selected.indexOf(interest);
													$scope.selected.splice(_index, 1);
													engagementService.disEngagedActivities({category:'plans', categoryId:item.id, userId:$localStorage.account.userId});
											}
									};

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
										$scope.scrollPeople = contacts.itemsArr;
									});

								usersService.getUserPlans($localStorage.account.userId).then(function(results) {
				          //create a local object so we can create the datastructure we want
				          var arr = [];
				          for(var key in results){
				            results[key].key = key;
				            arr.push(results[key]);
				          }
				          var view = {
				              type: 'item',
				              items: results,
				              itemsArr: arr
				          };
				          for(var id in view.items){
				           //check to see if there is a like on this post
				           (function(id, items){
				             engagementService.liked({category:'post', categoryId:id, userId: $localStorage.account.userId}).then(function(liked){
				              items.liked = liked;
				             });
				             engagementService.committed({category:'post',categoryId:id, userId: $localStorage.account.userId}).then(function(committed){
				               items.committed = committed;
				             });
				             engagementService.totalLikes({category:'post', categoryId: id}).then(function(totalLikes){
				               items.totalLikes = totalLikes;
				             });
				             engagementService.totalCommits({category:'post', categoryId: id}).then(function(totalCommits){
				               items.totalCommits = totalCommits;
				             });
				           })(id, view.items[id]);
				          }
				          //make it available to the directive to officially show/hide, toggle
				          $scope.view = view;
				        });

								$scope.limit = 10;

								$scope.loadMore = function(){
									if($scope.view && $scope.view.itemsArr){
										var max = $scope.view.itemsArr.length;
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

								$scope.scrollEvent = function() {
				            var scrollamount = $ionicScrollDelegate.$getByHandle('scrollHandle').getScrollPosition().top;
				            //$ionicScrollDelegate.scrollBy(0,20, true);
				            if (scrollamount > 0) { // Would hide nav-bar immediately when scrolled and show it only when all the way at top. You can fiddle with it to find the best solution for you
				              $ionicNavBarDelegate.showBar(false);
				            } else {
				              $ionicNavBarDelegate.showBar(true);
				            }
				          }

								$scope.newsPopover = $ionicPopover.fromTemplate(newsTemplate, {
										scope: $scope
								});

								$scope.requestPopover = $ionicPopover.fromTemplate(requestTemplate, {
									scope: $scope
								})

								$scope.openPopover = function($event) {
			             $scope.fullscreenPopover.show($event);
			          };

			          $scope.closePopover = function($event) {
			             $scope.fullscreenPopover.hide();
			          };

								$scope.closeRequestPopover = function($event){
									$scope.requestPopover.hide()
								}

								$scope.closePlan = function($event) {
			             $scope.plansPopover.hide();
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

							 $scope.closePopover = function($event) {
		              $scope.newsPopover.hide();
		           };

							 $scope.createEvent = function () {
			           $scope.closePopover();
			           $state.go('event');
			         }

			         $scope.createPost = function () {
			           $scope.closePopover();
			           $state.go('regular');
			         }

			         $scope.createGoal = function () {
			           $scope.closePopover();
			           $state.go('create-plan');
			         }

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
var newsTemplate =
    '<ion-popover-view class="medium right">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-icon-left item-text-wrap" ng-click="createEvent()">' +
    '<i class="icon ion-ios-bell-outline"></i>Create Event' +
    '</div>' +
    '<div class="item item-icon-left item-text-wrap" ng-click="createPost()">' +
    '<i class="icon ion-ios-camera-outline"></i>Create Post' +
    '</div>' +
    '<div class="item item-icon-left item-text-wrap" ng-click="createGoal()">' +
    '<i class="icon ion-ios-star-outline" style="margin-left:3px"></i>Create Goal' +
    '</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';
var plansTemplate =
    '<ion-popover-view class="small right">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-icon-left item-text-wrap" ng-click="createPlan()">' +
    '<i class="icon ion-ios-bell-outline"></i>Create Goals' +
    '</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

		var requestTemplate =
		    '<ion-popover-view class="small right">' +
		    '<ion-content>' +
		    '<div class="list">' +
		    '<div class="item item-icon-left item-text-wrap" ng-click="createPlan()">' +
		    '<i class="icon ion-ios-bell-outline"></i>Request Goals' +
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
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="explore()"> Discover' +
		    '</ion-item>' +
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="coach()"> Coaches' +
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
		    '<a class="item item-avatar" nav-clear style="padding-left: 65px;padding-top:15px;margin-left:2px;" ng-click="account()">'+
		    '<img ng-src="{{ profile.userPhoto }}" style="margin-left: 2px;">'+
		    '<p style="display: block;color: black !important;">{{profile.firstName + " " + profile.lastName}}<p style="display:block;color: red">{{profile.userName}}</p>'+
		    '</a>'+
		    '<ion-item class="font-thin" style="font-size: 18px;display:table;" ng-click="logout()"> Sign Out' +
		    '</ion-item>' +
		    '</ion-list>'+
		    '</ion-content>' +
		    '</ion-popover-view>';

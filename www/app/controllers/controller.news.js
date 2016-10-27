angular.module('module.view.news', [])
    .controller('newsCtrl', function ($scope, $rootScope,$http,$timeout,$ionicHistory,$ionicNavBarDelegate,$ionicScrollDelegate,interestService,usersService, $state, $cordovaCamera, $localStorage, $ionicActionSheet, $ionicSideMenuDelegate, $ionicPopover, $log, engagementService, postService, appService,appointmentsService) {
      $scope.$on('$ionicView.enter', function() {
    //Check if there's an authenticated user, if there is non, redirect to login.
    if(firebase.auth().currentUser) {
          $scope.loggedIn = true;
        } else {
          $scope.loggedIn = false;
          $state.go('login');
        }
        if(!$localStorage.isGuest) {
          //Authentication details.
          //Account details.
          //Set the variables to be shown on home.html
          //console.log("Firebase Auth: " + JSON.stringify(firebase.auth().currentUser));
          //Account details.
          //console.log("Account: " + JSON.stringify($localStorage.account));
          $scope.email = $localStorage.account.email;
          $scope.provider = $localStorage.account.provider;
        } else {
          //console.log("Firebase Auth: " + JSON.stringify(firebase.auth().currentUser));
          //Logged in user is previously logged in as guest. Set variables to Guest variables.
          $scope.email = "Guest";
          $scope.provider = "Firebase";
          $scope.loggedIn = true;
        }

        var publicServices = {
            'post': true,
            'engagement': true,
            'appointments': true
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

        $scope.createEvent = function () {
          $scope.closeView();
            $state.go('tabs.event');
        };

        $scope.createPost = function () {
            $scope.closeView();
            $state.go('tabs.regular');
        };

        $scope.gotoExplore = function () {
            $state.go('tabs.explore');

        };

        $scope.gotoMatch = function () {
            $state.go('tabs.match');
            $scope.$on("$ionicView.leave", function(event, data){
              $scope.menuTemplate.hide();
               // handle event
            });
        };

        $scope.doRefresh = function() {
           $timeout( function() {
             //simulate async response
             //Stop the ion-refresher from spinning
             $scope.$broadcast('scroll.refreshComplete');
           }, 1000);

         };
        $scope.gotoAccount = function () {
            $state.go('tabs.account');

        };

        $scope.gotoCoaches = function () {
            $state.go('tabs.coach');
        };



        $scope.toggleLike = function(postId, userId){
          var posts = $scope.view.items;
          if(postId in posts){
            var post = $scope.view.items[postId];
            var actionable = post.state.actionable;
            if(actionable){
              post.liked = !post.liked;
              var state = (post.liked)?'like':'unlike';
              if(!post.liked){
                ++post.totalLikes;
              }else if(post.totalLikes > 0){
                --post.totalLikes;
              }
              return engagementService[state]({category:'post', categoryId:postId, userId: $localStorage.account.userId});
            }
          }
            return false;
        };

        $scope.togglePartnerLike = function(postId, userId){
          var posts = $scope.partnerPost.items;
          if(postId in posts){
            var post = $scope.partnerPost.items[postId];
            var actionable = post.state.actionable;
            if(actionable){
              post.liked = !post.liked;
              var state = (post.liked)?'like':'unlike';
              if(!post.liked){
                ++post.totalLikes;
              }else if(post.totalLikes > 0){
                --post.totalLikes;
              }
              return engagementService[state]({category:'post', categoryId:postId, userId: $localStorage.account.userId});
            }
          }
            return false;
        };

        $scope.togglePartnerCommit = function(postId, userId){
          var posts = $scope.partnerPost.items;
          if(postId in posts){
            var post = $scope.partnerPost.items[postId];
            var actionable = post.state.actionable;
            if(actionable){
              post.committed = !post.committed;
              var state = (post.committed)?'commit':'decommit';
              if(!post.committed){
                ++post.totalCommits;
              }else if(post.totalCommits > 0){
                --post.totalCommits;
              }
              return engagementService[state]({category:'post', categoryId:postId, userId: $localStorage.account.userId});
            }
          }
            return false;
        };

        $scope.toggleCommit = function(postId, userId){
          var posts = $scope.partnerPost.items;
          if(postId in posts){
            var post = $scope.partnerPost.items[postId];
            var actionable = post.state.actionable;
            if(actionable){
              post.committed = !post.committed;
              var state = (post.committed)?'commit':'decommit';
              if(!post.committed){
                ++post.totalCommits;
              }else if(post.totalCommits > 0){
                --post.totalCommits;
              }
              return engagementService[state]({category:'post', categoryId:postId, userId: $localStorage.account.userId});
            }
          }
            return false;
        };

        $scope.newsPopover = $ionicPopover.fromTemplate(newsTemplate, {
            scope: $scope
        });

        $scope.fullscreenPopover = $ionicPopover.fromTemplate(popoverTemplate, {
            scope: $scope
        })

          $scope.openPopover = function($event) {
             $scope.fullscreenPopover.show($event);
          };

          $scope.closePopover = function($event) {
             $scope.fullscreenPopover.hide();
          };

          $scope.closeView = function($event) {
             $scope.newsPopover.hide();
          };

          // Execute action on hide popover
          $scope.$on('popover.hidden', function() {
             // Execute action
          });

          // Execute action on remove popover
          $scope.$on('fullscreenPopover.hide', function() {
             // Execute action
          });

        $ionicSideMenuDelegate.canDragContent(false);

        $scope.delete = function (id) {
            return postService.delete(id);
        };

        $scope.update = function (data) {
            return postService.update(data);
        };

        $scope.event = function () {
            $scope.closeView();
            $state.go('tabs.event');
        };

        $scope.profile = $localStorage.account;

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

        $scope.loadMorePartnerPost = function(){
          if($scope.partnerPost && $scope.partnerPost.itemsArr){
            var max = $scope.partnerPost.itemsArr.length;
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

        $scope.view = { type: 1 };

        usersService.getUserPost($localStorage.account.userId).then(function(results) {
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
             postService.getComments(id).then(function(results) {
     					$scope.comments = [];
     					for(var key in results){
     						results[key].key = key;
     						$scope.comments.push(results[key]);
     					}
     					var comments = {
     							items: results
     					};
     					$scope.commmentsNumber = $scope.comments.length;
     				});
           })(id, view.items[id]);
          }
          //make it available to the directive to officially show/hide, toggle
          $scope.view = view;
          $scope.viewNumberPost = Object.keys(view).length;
        });

         usersService.getPartnerPosts($localStorage.account.userId).then(function(results) {
           //so we can use it to show/hide, toggle ui items
           var arr = [];
           for(var key in results){
             results[key].key = key;
             arr.push(results[key]);
           }
           var partnerPost = {
               type: 'item',
               items: results,
               itemsArr: arr
           };
           for(var id in partnerPost.items){
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
              postService.getComments(id).then(function(results) {
      					$scope.comments = [];
      					for(var key in results){
      						results[key].key = key;
      						$scope.comments.push(results[key]);
      					}
      					var comments = {
      							items: results
      					};
      					$scope.commmentsNumber = $scope.comments.length;
      				});
            })(id, partnerPost.items[id]);
           }
           //make it available to the directive to officially show/hide, toggle
           $scope.partnerPost = partnerPost;
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

     })
    });

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
        '<a class="item item-avatar" nav-clear style="padding-left: 65px;padding-top:15px;margin-left:2px;" ng-click="account()">'+
        '<img ng-src="{{ profile.userPhoto }}" style="margin-left: 2px;">'+
        '<p style="display: block;color: black !important;">{{profile.firstName + " " + profile.lastName}}<p style="display:block;color: red">{{profile.userName}}</p>'+
        '</a>'+
        '<ion-item class="font-thin" style="font-size: 18px;display:table;" ng-click="logout()"> Sign Out' +
        '</ion-item>' +
        '</ion-list>'+
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
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

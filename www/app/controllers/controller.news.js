angular.module('module.view.news', [])
    .controller('newsCtrl', function ($scope, $rootScope,$http,$timeout,$ionicHistory,usersService, $state, $cordovaCamera, $localStorage, $ionicActionSheet, $ionicSideMenuDelegate, $ionicPopover, $log, engagementService, postService, appService,appointmentsService) {

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
            $state.go('tabs.event');
        };

        $scope.createPost = function () {
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
              return engagementService[state]({category:'post', categoryId:postId, userId: $localStorage.account.userId});
            }
          }
            return false;
        };

        $scope.toggleCommit = function(postId, userId){
          var posts = $scope.view.items;
          $log.log({postId: postId, posts: posts, userId: $localStorage.account.userId});
          if(postId in posts){
            var post = $scope.view.items[postId];
            var actionable = post.state.actionable;
            if(actionable){
              post.committed = !post.committed;
              var state = (post.committed)?'commit':'decommit';
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

          // Execute action on hide popover
          $scope.$on('popover.hidden', function() {
             // Execute action
          });

          // Execute action on remove popover
          $scope.$on('popover.removed', function() {
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

            $state.go('tabs.event');
        };

        $scope.profile = $localStorage.account;

        usersService.getUserPost($localStorage.account.userId).then(function(results) {
          //create a local object so we can create the datastructure we want
          var view = {
              type: 'item',
              items: results
          };
          for(var id in view.items){
           //check to see if there is a like on this post
            engagementService.liked({category:'post', categoryId:id, userId: $localStorage.account.userId}).then(function(liked){
              view.items[id].liked = liked;
            });
            engagementService.committed({category:'post',categoryId:id, userId: $localStorage.account.userId}).then(function(committed){
              view.items[id].committed = committed;
            });
            engagementService.totalLikes({category:'post', categoryId: $localStorage.account.userId}).then(function(totalLikes){
              view.items[id].totalLikes = totalLikes;
            });
            engagementService.totalCommits({category:'post', categoryId: $localStorage.account.userId}).then(function(totalCommits){
              view.items[id].totalCommits = totalCommits;
            });
          }
          //make it available to the directive to officially show/hide, toggle
          $scope.view = view;
          $scope.viewNumberPost = Object.keys(view).length;
        });

        $scope.moredata = false;

        $scope.loadMore = function() {
          usersService.getMorePartnerPosts($localStorage.account.userId).then(function(results) {
            //so we can use it to show/hide, toggle ui items
            var partnerPost = {
                type: 'image',
                items: results
            };
            for(var id in partnerPost.items){
             //check to see if there is a like on this post
              engagementService.liked({category:'post', categoryId:id, userId: $localStorage.account.userId}).then(function(liked){
                partnerPost.items[id].liked = liked;
              });
              engagementService.committed({category:'post',categoryId:id, userId: $localStorage.account.userId}).then(function(committed){
                partnerPost.items[id].committed = committed;
              });
              engagementService.totalLikes({category:'post', categoryId: $localStorage.account.userId}).then(function(totalLikes){
                partnerPost.items[id].totalLikes = totalLikes;
              });
              engagementService.totalCommits({category:'post', categoryId: $localStorage.account.userId}).then(function(totalCommits){
                partnerPost.items[id].totalCommits = totalCommits;
              });
            }
            //make it available to the directive to officially show/hide, toggle
            $scope.partnerPost = Object.assign(partnerPost);
            $scope.$broadcast('scroll.infiniteScrollComplete');
          });

          usersService.getMoreUserPost($localStorage.account.userId).then(function(results) {
            //create a local object so we can create the datastructure we want
            var view = {
                type: 'item',
                items: results
            };
            for(var id in view.items){
             //check to see if there is a like on this post
              engagementService.liked({category:'post', categoryId:id, userId: $localStorage.account.userId}).then(function(liked){
                view.items[id].liked = liked;
              });
              engagementService.committed({category:'post',categoryId:id, userId: $localStorage.account.userId}).then(function(committed){
                view.items[id].committed = committed;
              });
              engagementService.totalLikes({category:'post', categoryId: $localStorage.account.userId}).then(function(totalLikes){
                view.items[id].totalLikes = totalLikes;
              });
              engagementService.totalCommits({category:'post', categoryId: $localStorage.account.userId}).then(function(totalCommits){
                view.items[id].totalCommits = totalCommits;
              });
            }
            //make it available to the directive to officially show/hide, toggle
            $scope.view = Object.assign(view);
            $scope.$broadcast('scroll.infiniteScrollComplete');
          });
        };

         usersService.getPartnerPosts($localStorage.account.userId).then(function(results) {
           //so we can use it to show/hide, toggle ui items
           var partnerPost = {
               type: 'image',
               items: results
           };
           for(var id in partnerPost.items){
            //check to see if there is a like on this post
             engagementService.liked({category:'post', categoryId:id, userId: $localStorage.account.userId}).then(function(liked){
               partnerPost.items[id].liked = liked;
             });
             engagementService.committed({category:'post',categoryId:id, userId: $localStorage.account.userId}).then(function(committed){
               partnerPost.items[id].committed = committed;
             });
             engagementService.totalLikes({category:'post', categoryId: $localStorage.account.userId}).then(function(totalLikes){
               partnerPost.items[id].totalLikes = totalLikes;
             });
             engagementService.totalCommits({category:'post', categoryId: $localStorage.account.userId}).then(function(totalCommits){
               partnerPost.items[id].totalCommits = totalCommits;
             });
           }
           //make it available to the directive to officially show/hide, toggle
           $scope.partnerPost = partnerPost;
           $scope.partnerNumberPost = Object.keys(partnerPost).length;
         });

         $scope.browse = function () {
             $state.go('tabs.news');
         };

         $scope.explore = function () {
           $state.go('tabs.explore');
         };

         $scope.match = function () {
           $scope.closePopover();
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
           $state.go('tabs.account');
         };

         $scope.notifications = function (){
           $state.go('tabs.communicate');
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

angular.module('module.view.news', [])
    .controller('newsCtrl', function ($scope, $rootScope,$http,usersService, $state, $cordovaCamera, $localStorage, $ionicActionSheet, $ionicSideMenuDelegate, $ionicPopover, $log, engagementService, postService, appService,appointmentsService) {

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
               // handle event
               console.log("State Params: ", data.stateParams);
            });
        };

        $scope.gotoAccount = function () {
            $state.go('tabs.account');

        };

        $scope.gotoCoaches = function () {
            $state.go('tabs.coach');
        };

        $scope.toggleLike = function(postId, userId){
          var posts = $scope.news.items;
          if(postId in posts){
            var post = $scope.news.items[postId];
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
          var posts = $scope.news.items;
          $log.log({postId: postId, posts: posts, userId: $localStorage.account.userId});
          if(postId in posts){
            var post = $scope.news.items[postId];
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

        $scope.menuPopover = $ionicPopover.fromTemplate(menuTemplate, {
            scope: $scope
        });

        //$ionicSideMenuDelegate.canDragContent(false);

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


        usersService.getPartnerPosts($localStorage.account.userId).then(function(results) {
          //create a local object so we can create the datastructure we want
          //so we can use it to show/hide, toggle ui items
          var news = {
              type: 'classic',
              items: results
          };
          for(var id in news.items){
           //check to see if there is a like on this post
            engagementService.liked({category:'post', categoryId:id, userId: $localStorage.account.userId}).then(function(liked){
              news.items[id].liked = liked;
            });
            engagementService.committed({category:'post',categoryId:id, userId: $localStorage.account.userId}).then(function(committed){
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

        usersService.getPartnerPosts($localStorage.account.userId).then(function(results) {
          //create a local object so we can create the datastructure we want
          //so we can use it to show/hide, toggle ui items
          var news = {
              type: 'uncut',
              items: results
          };
          for(var id in news.items){
           //check to see if there is a like on this post
            engagementService.liked({category:'post', categoryId:id, userId: $localStorage.account.userId}).then(function(liked){
              news.items[id].liked = liked;
            });
            engagementService.committed({category:'post',categoryId:id, userId: $localStorage.account.userId}).then(function(committed){
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

        usersService.getUserPost($localStorage.account.userId).then(function(results) {
          //create a local object so we can create the datastructure we want
          //so we can use it to show/hide, toggle ui items
          var news = {
              type: 'classic',
              items: results
          };
          for(var id in news.items){
           //check to see if there is a like on this post
            engagementService.liked({category:'post', categoryId:id, userId: $localStorage.account.userId}).then(function(liked){
              news.items[id].liked = liked;
            });
            engagementService.committed({category:'post',categoryId:id, userId: $localStorage.account.userId}).then(function(committed){
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

        usersService.getUserPost($localStorage.account.userId).then(function(results) {
          //create a local object so we can create the datastructure we want
          //so we can use it to show/hide, toggle ui items
          var news = {
              type: 'item',
              items: results
          };
          for(var id in news.items){
           //check to see if there is a like on this post
            engagementService.liked({category:'post', categoryId:id, userId: $localStorage.account.userId}).then(function(liked){
              news.items[id].liked = liked;
            });
            engagementService.committed({category:'post',categoryId:id, userId: $localStorage.account.userId}).then(function(committed){
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

         usersService.getPartnerPosts($localStorage.account.userId).then(function(results) {
           //create a local object so we can create the datastructure we want
           //so we can use it to show/hide, toggle ui items
           var news = {
               type: 'image',
               items: results
           };
           for(var id in news.items){
            //check to see if there is a like on this post
             engagementService.liked({category:'post', categoryId:id, userId: $localStorage.account.userId}).then(function(liked){
               news.items[id].liked = liked;
             });
             engagementService.committed({category:'post',categoryId:id, userId: $localStorage.account.userId}).then(function(committed){
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

         $scope.signOut = function () {
           $ionicLoading.show({
             template: 'Signing out...'
           });
           $timeout(function () {
             $ionicLoading.hide();
             $scope.goTo('authentication');
           }, 2000);

         }

    });

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

var menuTemplate =
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
    '<a class="item item-avatar" nav-clear style="padding-left: 65px;padding-top:15px;">'+
    '<img ng-src="{{ profile.userPhoto }}" ng-click="account()">'+
    '<p style="display: block;color: black !important;">{{profile.firstName + " " + profile.lastName}}<p style="display:block;color: red">{{profile.userName}}</p>'+
    '</a>'+
    '<ion-item class="font-thin" style="font-size: 18px;display:table;" ng-click="signOut()"> Sign Out' +
    '</ion-item>' +
    '</ion-list>'+
    '</ion-content>' +
    '</ion-popover-view>';

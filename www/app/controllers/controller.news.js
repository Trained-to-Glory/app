angular.module('module.view.news', [])
    .controller('newsCtrl', ['$scope', '$rootScope','$http','$timeout','$ionicHistory','$ionicNavBarDelegate','$ionicScrollDelegate','interestService','usersService', '$state', '$cordovaCamera', '$localStorage', '$ionicActionSheet', '$ionicSideMenuDelegate', '$ionicPopover', '$log', 'engagementService', 'postService', 'appService',
       function ($scope, $rootScope,$http,$timeout,$ionicHistory,$ionicNavBarDelegate,$ionicScrollDelegate,interestService,usersService, $state, $cordovaCamera, $localStorage, $ionicActionSheet, $ionicSideMenuDelegate, $ionicPopover, $log, engagementService, postService, appService) {
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
            'engagement': true
        }

        //for dev purposes only. remove when done
        for (var key in publicServices) {
            if (publicServices[key]) {
                $scope[key + 'Service'] = eval(key + 'Service');
                window[key + 'Service'] = $scope[key + 'Service'];
            }
        };

        usersService.getUserPlans($localStorage.account.userId).then(function(results) {
          //create a local object so we can create the datastructure we want
          var arr = [];
          for(var key in results){
            results[key].key = key;
            arr.push(results[key]);
          }
          var plan = {
              type: 'item',
              items: results,
              itemsArr: arr
          };
          for(var id in plan.items){
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
           })(id, plan.items[id]);
          }
          //make it available to the directive to officially show/hide, toggle
          $scope.plan = plan;
          $scope.planArr = plan.itemsArr;
          $scope.planLength = $scope.planArr.length;
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

        $scope.bottomPopover = $ionicPopover.fromTemplate(bottomTemplate, {
            scope: $scope
        });

        $scope.fullscreenPopover = $ionicPopover.fromTemplate(popoverTemplate, {
            scope: $scope
        })

          $scope.openPopover = function($event) {
             $scope.fullscreenPopover.show($event);
          };

          $scope.closePopover = function($event) {
             $scope.newsPopover.hide();
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
        $scope.limitPartner = 10;

        $scope.loadMore = function(){
          if($scope.totalPost){
            var max = $scope.totalPost.length;
            if($scope.limit <  max){
              $scope.moreToScroll = true;
              if($scope.limit - max < 10 && $scope.limit - max > 0){
                $scope.limit += Math.abs($scope.limit - max);
                $scope.moreToScroll = true;
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
          if($scope.totalPost && $scope.partnerPost.itemsArr){
            var max = $scope.partnerPost.itemsArr.length;
            if($scope.limitPartner <  max){
              $scope.moreToScroll = true;
              if($scope.limitPartner - max < 10 && $scope.limitPartner - max > 0){
                $scope.limitPartner += Math.abs($scope.limitPartner - max);
                $scope.moreToScroll = false;
                return;
              }
              $scope.limitPartner += 10;
            }else{
              $scope.moreToScroll = false;
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.view = { type: 1 };

        $scope.onSwipeLeft = function () {
          $state.go('tabs.explore');
        }

        $scope.getPhoto = function(){
    			return interestService.getStablePost();
    		};

    		$scope.getPhoto().then(function(results) {
    			var interests = [];
    			for (key in results){
    				interests.push({
    					id: key,
    					label: results[key].displayName
    				});
    			}
    			$scope.photo = interests;
    		});


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
          $scope.viewArr = view.itemsArr;
          $scope.view = view;
        });

        usersService.getPartnerPosts($localStorage.account.userId).then(function(results) {
          //create a local object so we can create the datastructure we want
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
          $scope.partnerPostArr = partnerPost.itemsArr;
          //merge view itemsArr into partnerPost for disaply purposes
          $scope.totalPost = partnerPost.itemsArr.concat($scope.view.itemsArr);
          $scope.partnerPost = partnerPost;
        });

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

     })
   }]);

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

    var bottomTemplate =
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

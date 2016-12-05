angular.module('module.view.news', [])
    .controller('newsCtrl', ['$scope', '$sce','$rootScope','$http', '$firebaseArray', '$timeout','$ionicHistory','$ionicNavBarDelegate','$ionicScrollDelegate','interestService','usersService', '$state', '$cordovaCamera', '$localStorage', '$ionicActionSheet', '$ionicSideMenuDelegate', '$ionicPopover', '$log', '$firebaseArray','engagementService', 'postService', 'appService',
       function ($scope, $rootScope, $sce, $firebaseArray, $http,$timeout,$ionicHistory,$ionicNavBarDelegate,$ionicScrollDelegate,interestService,usersService, $state, $cordovaCamera, $localStorage, $ionicActionSheet, $ionicSideMenuDelegate, $ionicPopover, $log, $firebaseArray, engagementService, postService, appService) {
      $scope.$on('$ionicView.enter', function() {
        //Check if there's an authenticated user, if there is non, redirect to login.
        if(firebase.auth().currentUser) {
              $sce.loggedIn = true;
            } else {
              $sce.loggedIn = false;
              $state.go('login');
            }
            if(!$localStorage.isGuest) {
              //Authentication details.
              //Account details.
              //Set the variables to be shown on home.html
              var email = (firebase.auth().currentUser);
              //Account details.
              //console.log("Account: " + JSON.stringify($localStorage.account));
              $sce.email = email;
              $sce.userId = (firebase.auth().currentUser).uid;
              $sce.provider = (firebase.auth().currentUser).provider;
            } else {
              //console.log("Firebase Auth: " + JSON.stringify(firebase.auth().currentUser));
              //Logged in user is previously logged in as guest. Set variables to Guest variables.
              $sce.email = "Guest";
              $sce.provider = "Firebase";
              $sce.loggedIn = true;
            }

        $scope.loading = true;
           usersService.getPartnerPosts($sce.userId).then(function(results) {
          //create a local object so we can create the datastructure we want
          $scope.loading = false;

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
             engagementService.liked({category:'post', categoryId:id, userId: $sce.userId}).then(function(liked){
              items.liked = liked;
             });
             engagementService.committed({category:'post',categoryId:id, userId: $sce.userId}).then(function(committed){
               items.committed = committed;
             });
             engagementService.totalLikes({category:'post', categoryId: id}).then(function(totalLikes){
               items.totalLikes = totalLikes;
             });
             engagementService.totalCommits({category:'post', categoryId: id}).then(function(totalCommits){
               items.totalCommits = totalCommits;
             });

             engagementService.totalComments({category: 'post',categoryId: id}).then(function(totalComments){
               items.totalComments = totalComments;
             });

           })(id, partnerPost.items[id]);
          }
          //make it available to the directive to officially show/hide, toggle
          $sce.partnerPostArr = partnerPost.itemsArr;
          //merge view itemsArr into partnerPost for disaply purposes
          $sce.totalPost = partnerPost.itemsArr.concat($scope.view.itemsArr);

          console.log($sce.totalPost[$sce.totalPost.length - 1].key);
          $sce.partnerPost = partnerPost;
          $scope.$apply();
        });



        $scope.profile = $localStorage.account;
                usersService.getUserPost($sce.userId).then(function(results) {
                  //create a local object so we can create the datastructure we want
                  var arr = [];
                  for(var key in results){
                    results[key].key = key;
                    arr.push(results[key]);
                  }

                  console.log(arr);
                  console.log(arr[arr.length - 1].key);
                  var view = {
                      type: 'item',
                      items: results,
                      itemsArr: arr
                  };
                  for(var id in view.items){
                   //check to see if there is a like on this post
                   (function(id, items){
                     engagementService.liked({category:'post', categoryId:id, userId: $sce.userId}).then(function(liked){
                      items.liked = liked;
                     });
                     engagementService.committed({category:'post',categoryId:id, userId: $sce.userId}).then(function(committed){
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
                  $scope.viewArr = view.itemsArr;
                  $scope.view = view;
                  $scope.$apply();
                  //make it available to the directive to officially show/hide, toggle
                });

        $scope.connectImages = [{
          src: 'img/connect/bright-animal.jpeg',
  				label: 'Animals',
  				id: '-KXc-PKqyc7JRXpB98vc'
  			},{
          src: 'img/connect/bright-architecture.jpeg',
  				label: 'Architecture',
  				id: '-KXc-PKubG8nUAF4rbDW'
  			},{
          src: 'img/connect/bright-art.jpeg',
  				label: 'Art',
  				id: '-KXc-PKubG8nUAF4rbDX'
  			},{
  				src: 'img/connect/rari-car.jpg',
  				label: 'Cars',
  				id: '-KXc-PKvsIOIXTjTComa'
  			},{
          src: 'img/connect/design-match.jpg',
  				label: 'Design',
  				id: '-KXc-PKvsIOIXTjTComb'
  			},{
  				src: 'img/connect/diy-match.jpeg',
  				label: 'DIY',
  				id: '-KXc-PKvsIOIXTjTComc'
  			},{
  				src: 'img/connect/education-match.jpeg',
  				label: 'Education',
  				id: '-KXc-PKvsIOIXTjTComd'
  			},{
  				src: 'img/connect/events-match.jpg',
  				label: 'Events',
  				id: '-KXc-PKvsIOIXTjTCome'
  			},{
  				src: 'img/connect/fashion-match.jpeg',
  				label: 'Fashion',
  				id: '-KXc-PKyp2pTaXsaG6Ff'
  			},{
  				src: 'img/connect/food-match.jpg',
  				label: 'Food & Drink',
  				id: '-KXc-PKzxbTiOJzK6j72'
  			},{
  				src: 'img/connect/games-match.jpg',
  				label: 'Games',
  				id: '-KXc-PL0mQ1oYXeDiEyq'
  			},{
  				src: 'img/connect/gardening-match.jpeg',
  				label: 'Gardening',
  				id: '-KXc-PL0mQ1oYXeDiEyr'
  			},{
  				src: 'img/connect/hair-match.jpeg',
  				label: 'Hair & Beauty',
  				id: '-KXc-PL0mQ1oYXeDiEys'
  			},{
  				src: 'img/connect/health-match.jpg',
  				label: 'Health & Sports',
  				id: '-KXc-PL1IJeRKtEt1R70'
  			},{
  				src: 'img/connect/music-match.jpeg',
  				label: 'Music',
  				id: '-KXc-PL1IJeRKtEt1R71'
  			},{
  				src: 'img/connect/new-outdoors.jpg',
  				label: 'Outdoors',
  				id: '-KXc-PL3SLOgnBvXlR5i'
  			},{
  				src: 'img/connect/new-tech.jpeg',
  				label: 'Technology',
  				id: '-KXc-PL3SLOgnBvXlR5j'
      }];

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
              return engagementService[state]({category:'post', categoryId:postId, userId: $sce.userId});
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
              return engagementService[state]({category:'post', categoryId:postId, userId: $sce.userId});
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
              return engagementService[state]({category:'post', categoryId:postId, userId: $sce.userId});
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
              return engagementService[state]({category:'post', categoryId:postId, userId: $sce.userId});
            }
          }
            return false;
        };


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

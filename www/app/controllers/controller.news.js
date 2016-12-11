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

        $scope.profile = $localStorage.account;
        $scope.lastId;
        $scope.noMoreItemsAvailable = false;
        $scope.totalPost = [];
        $scope.totalPost.connect = [];
        $scope.totalPost.leader = [];
        $scope.totalPost.together = [];
        $scope.totalPost.unite = [];

        $scope.totalPost.coach = [];
        $scope.totalPost.mentor = [];


        if ($scope.lastId == undefined) {
        var posts = firebase.database().ref(['posts'].join('/'));
          posts.orderByKey().limitToFirst(20).once("value", function(snapshot) {
            $scope.totalPost.photos = [];
            var currentObj = snapshot.val();
            var array = $.map(currentObj, function(value, index) {
                return [value];
            });

            var arr = [];
             for(var key in currentObj){
                currentObj[key].key = key;
                arr.push(currentObj[key]);
              }

              var news = {
                itemsArr: arr,
                items: currentObj
              }

              for(var id in news.items){
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
               })(id, news.items[id]);
              }

              $scope.totalPost.photos = $scope.totalPost.photos.concat(news.itemsArr);
              $scope.totalPostItems = news.items;
              console.log($scope.totalPost.photos);
              $scope.lastId = $scope.totalPost.photos[$scope.totalPost.photos.length - 1].key;

              if ( array.length != 20 ) {
                 $scope.noMoreItemsAvailable = true;
              }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$apply();
          });
        };

        $scope.doRefresh = function (){
          var posts = firebase.database().ref(['posts'].join('/'));
          posts.orderByKey().startAt($scope.lastId).limitToFirst(21).on("value", function(snapshot) {
            $scope.totalPost.photos = [];
            var currentObj = snapshot.val();
            var array = $.map(currentObj, function(value, index) {
                return [value];
            });
            var arr = [];
             for(var key in currentObj){
                currentObj[key].key = key;
                arr.push(currentObj[key]);
              }
              arr.shift();
              var news = {
                itemsArr: arr,
                items: currentObj
              }

              for(var id in news.items){
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

               })(id, news.items[id]);
              }

              $scope.totalPost.photos = news.itemsArr.concat($scope.totalPost.photos);
              $scope.totalPostItems = news.items;
              $scope.lastId = $scope.totalPost.photos[$scope.totalPost.photos.length - 1].key;

            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
          });
        };

        $scope.loadMore = function(){
          var posts = firebase.database().ref(['posts'].join('/'));
          if ($scope.lastId == undefined) {
            posts.orderByKey().limitToFirst(20).once("value", function(snapshot) {
              $scope.loading = false;
              $scope.totalPost.photos = [];
              var currentObj = snapshot.val();
              var array = $.map(currentObj, function(value, index) {
                  return [value];
              });

              var arr = [];
               for(var key in currentObj){
                  currentObj[key].key = key;
                  arr.push(currentObj[key]);
                }

                var news = {
                  itemsArr: arr,
                  items: currentObj
                }

                for(var id in news.items){
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

                 })(id, news.items[id]);
                }

                $scope.totalPost.photos = $scope.totalPost.photos.concat(news.itemsArr);
                $scope.totalPostItems = news.items;
                $scope.lastId = $scope.totalPost.photos[$scope.totalPost.photos.length - 1].key;

                if ( array.length != 20 ) {
                   $scope.noMoreItemsAvailable = true;
                }
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$apply();
            });
          }else{
            posts.orderByKey().startAt($scope.lastId).limitToFirst(21).on("value", function(snapshot) {
              var currentObj = snapshot.val();
              $scope.totalPost.photos = [];
              var array = $.map(currentObj, function(value, index) {
                  return [value];
              });
              var arr = [];
               for(var key in currentObj){
                  currentObj[key].key = key;
                  arr.push(currentObj[key]);
                }
                arr.shift();
                var news = {
                  itemsArr: arr,
                  items: currentObj
                }

                for(var id in news.items){
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

                 })(id, news.items[id]);
                }

                $scope.totalPost.photos = $scope.totalPost.photos.concat(news.itemsArr);
                $scope.totalPostItems = news.items;
                $scope.lastId = $scope.totalPost.photos[$scope.totalPost.photos.length - 1].key;

                if ( array.length != 20 ) {
                   $scope.noMoreItemsAvailable = true;
                }
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$apply();
            });
          }
        };

        var plans = firebase.database().ref(['plans'].join('/'));
          plans.orderByKey().limitToLast(100).once("value", function(snapshot) {
            $scope.loading = false;
            var currentObj = snapshot.val();
            var array = $.map(currentObj, function(value, index) {
                return [value];
            });

            $scope.totalPost.plans = [];
            $scope.totalPost.goals = [];
            $scope.totalPost.focus = [];
            $scope.totalPost.finish = [];

            var arr = [];
             for(var key in currentObj){
                currentObj[key].key = key;
                arr.push(currentObj[key]);
                if (currentObj[key].photo != ""){
     							photos.push(currentObj[key]);
     						}
              }

              var plansArr = {
                itemsArr: arr
              }

              $scope.totalPost.plans = $scope.totalPost.plans.concat(plansArr.itemsArr);

              $scope.totalPost.goals = $scope.totalPost.plans.slice(0, 5);
              $scope.totalPost.focus = $scope.totalPost.plans.slice(6, 12);
              $scope.totalPost.finish = $scope.totalPost.plans.slice(12, 18);

              $scope.finishLength = $scope.totalPost.finish.length;
              $scope.focusLength = $scope.totalPost.focus.length;
              $scope.goalsLength = $scope.totalPost.goals.length;

              $scope.finishPhoto = $scope.totalPost.finish.photo;
              $scope.focusPhoto = $scope.totalPost.focus.photo;
              $scope.goalsPhoto = $scope.totalPost.goals.photo;

              $scope.lastId = $scope.totalPost.plans[$scope.totalPost.plans.length - 1].key;

            $scope.$apply();
          });

            $scope.connectImages = [{
              src: 'img/browse/dog-browse.jpg',
      				label: 'Animals',
              id: '-KXc-PKqyc7JRXpB98vc',
              description: 'Some words'
      			},{
              src: 'img/browse/architecture-browse.jpeg',
      				label: 'Architecture',
              id: '-KXc-PKubG8nUAF4rbDW',
              description: 'Some words'
      			},{
              src: 'img/browse/art-browse.jpg',
      				label: 'Art',
              id: '-KXc-PKubG8nUAF4rbDX',
              description: 'Some words'
            },{
              src: 'img/browse/open-car-browse.jpeg',
              label: 'Cars',
              id: '-KXc-PKvsIOIXTjTComa'
            },{
              src: 'img/browse/design-browse.jpg',
              label: 'Design',
              id: '-KXc-PKvsIOIXTjTComb'
          }];
          $scope.totalPost.connect = $scope.totalPost.connect.concat($scope.connectImages);

          $scope.togetherImages = [{
            src: 'img/browse/diy-browse-connect.jpeg',
            label: 'DIY',
            id: '-KXc-PKvsIOIXTjTComc',
            description: 'Some words'
          },{
            src: 'img/browse/education-browse-connect.jpeg',
            label: 'Education',
            id: '-KXc-PKvsIOIXTjTComd',
            description: 'Some words'
          },{
            src: 'img/browse/events-browse-connect.jpg',
            label: 'Events',
            id: '-KXc-PKvsIOIXTjTCome',
            description: 'Some words'
          },{
            src: 'img/browse/fashion-browse-connect.jpeg',
            label: 'Fashion',
            id: '-KXc-PKyp2pTaXsaG6Ff'
          },{
            src: 'img/browse/food-browse-connect.jpeg',
            label: 'Food & Drink',
            id: '-KXc-PKzxbTiOJzK6j72'
        }];

        $scope.totalPost.together = $scope.totalPost.together.concat($scope.togetherImages);

        $scope.uniteImages = [{
          src: 'img/browse/games-browse-connect.jpeg',
          label: 'Games',
          id: '-KXc-PL0mQ1oYXeDiEyq',
          description: 'Some words'
        },{
          src: 'img/browse/gardening-browse-connect.jpeg',
          label: 'Gardening',
          id: '-KXc-PL0mQ1oYXeDiEyr',
          description: 'Some words'
        },{
          src: 'img/browse/health-browse-connect.jpg',
          label: 'Health & Sports',
          id: '-KXc-PL1IJeRKtEt1R70',
          description: 'Some words'
        },{
          src: 'img/browse/music-browse-connect.jpg',
          label: 'Music',
          id: '-KXc-PL1IJeRKtEt1R71'
        },{
          src: 'img/browse/tech-browse-connect.png',
  				label: 'Technology',
  				id: '-KXc-PL3SLOgnBvXlR5j'
      }];

      $scope.totalPost.unite = $scope.totalPost.unite.concat($scope.uniteImages);

      $scope.leaderImages = [{
  			src: 'img/browseLeader/animal-browse-lead.jpeg',
  			label: 'Animals',
  			id: '-KXc-PL6yz4ugqb4XxuH',
        description: 'Some words'
  		},{
  			src: 'img/browseLeader/architecture-lead-browse.jpeg',
  			label: 'Architecture',
  			id: '-KXc-PL6yz4ugqb4XxuI',
        description: 'Some words'
  		},{
  			src: 'img/browseLeader/art-lead-browse.jpg',
  			label: 'Art',
  			id: '-KXc-PL6yz4ugqb4XxuJ',
        description: 'Some words'
  		},{
  			src: 'img/browseLeader/car-lead-browse.jpeg',
  			label: 'Cars',
  			id: '-KXc-PL6yz4ugqb4XxuK',
        description: 'Some words'
  		},{
  			src: 'img/browseLeader/design-lead-browse.jpg',
  			label: 'Design',
  			id: '-KXc-PL6yz4ugqb4XxuL',
        description: 'Some words'
  		},{
  			src: 'img/leader/diy-lead.jpeg',
  			label: 'DIY',
  			id: '-KXc-PL73JPkLGBGOhT0',
        description: 'Some words'
  	}];

    $scope.totalPost.leader = $scope.totalPost.leader.concat($scope.leaderImages);

    $scope.coachImages = [{
      src: 'img/browseLeader/education-browse-lead.jpg',
      label: 'Education',
      id: '-KXc-PL9UBFedjtGjwym',
      description: 'Some words'
    },{
      src: 'img/browseLeader/events-browse-lead.jpg',
      label: 'Events',
      id: '-KXc-PL9UBFedjtGjwyn',
      description: 'Some words'
    },{
      src: 'img/browseLeader/fashion-browse-lead.jpg',
      label: 'Fashion',
      id: '-KXc-PL9UBFedjtGjwyo',
      description: 'Some words'
    },{
      src: 'img/browseLeader/food-browse-lead.jpg',
      label: 'Food & Drink',
      id: '-KXc-PL9UBFedjtGjwyp',
      description: 'Some words'
    },{
      src: 'img/browseLeader/game-browse-lead.jpg',
      label: 'Games',
      id: '-KXc-PLA0DrJOIW_0BOY',
      description: 'Some words'
  }];

  $scope.totalPost.coach = $scope.totalPost.coach.concat($scope.coachImages);

  $scope.mentorImages = [{
    src: 'img/browseLeader/garden-browse-lead.jpg',
    label: 'Gardening',
    id: '-KXc-PLBtt6_xc6WZesE',
    description: 'Some words'
  },{
    src: 'img/browseLeader/health-browse-lead.jpg',
    label: 'Health & Sports',
    id: '-KXc-PLBtt6_xc6WZesG',
    description: 'Some words'
  },{
    src: 'img/browseLeader/music-browse-lead.jpg',
    label: 'Music',
    id: '-KXc-PLCBDqeU-66GvDx',
    description: 'Some words'
  },{
    src: 'img/browseLeader/outdoors-browse-lead.jpg',
    label: 'Outdoors',
    id: '-KXc-PLCBDqeU-66GvDy',
    description: 'Some words'
  },{
    src: 'img/browseLeader/tech-browse-lead.jpeg',
    label: 'Technology',
    id: '-KXc-PLCBDqeU-66GvDz',
    description: 'Some words'
}];

$scope.totalPost.mentor = $scope.totalPost.mentor.concat($scope.mentorImages);

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
        };


        $scope.createEvent = function () {
            $state.go('tabs.event');
        };

        $scope.createPost = function () {
            $state.go('tabs.regular');
        };


        $scope.toggleLike = function(postId, userId){
          var posts = $scope.totalPostItems;
          if(postId in posts){
            var post = $scope.totalPostItems[postId];
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
          var posts = $scope.totalPostItems;
          if(postId in posts){
            var post = $scope.totalPostItems[postId];
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


        $scope.view = { type: 1 };

        $scope.onSwipeLeft = function () {
          $state.go('tabs.explore');
        }

         $scope.createEvent = function () {
           $state.go('event');
         }

         $scope.createPost = function () {
           $state.go('regular');
         }

         $scope.createGoal = function () {
           $state.go('create-plan');
         }

     })
   }]);

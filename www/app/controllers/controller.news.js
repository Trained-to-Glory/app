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
  })


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
        $scope.totalPost.photos = [];
        $scope.totalPost.plans = [];

        $scope.loadMore = function(){
          var posts = firebase.database().ref(['posts'].join('/'));
          if ($scope.lastId == undefined) {
            posts.orderByKey().limitToLast(20).once("value", function(snapshot) {
              $scope.loading = false;
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
                console.log($scope.totalPost.photos);
                $scope.totalPostItems = news.items;
                $scope.refreshId = $scope.totalPost.photos[$scope.totalPost.photos.length - 1].key;
                $scope.lastId = $scope.totalPost.photos[$scope.totalPost.photos.length - $scope.totalPost.photos.length].key;

                if ( array.length != 20 ) {
                   $scope.noMoreItemsAvailable = true;
                }
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$apply();
            });
          }else{
            posts.orderByKey().endAt($scope.lastId).limitToFirst(21).on("value", function(snapshot) {
              var currentObj = snapshot.val();
              var array = $.map(currentObj, function(value, index) {
                  return [value];
              });
              var arr = [];
               for(var key in currentObj){
                  currentObj[key].key = key;
                  arr.push(currentObj[key]);
                }
                // arr.shift();
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
                $scope.lastId = $scope.totalPost.photos[$scope.totalPost.photos.length - $scope.totalPost.photos.length].key;
                if ( array.length != 20 ) {
                   $scope.noMoreItemsAvailable = true;
                }
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$apply();
            });
          }
        };

        $scope.doRefresh = function (){
          var posts = firebase.database().ref(['posts'].join('/'));
          posts.orderByKey().startAt($scope.refreshId).limitToFirst(20).on("value", function(snapshot) {
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

            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
          });
        };

            $scope.connectImages = [{
              src: 'img/browse/dog-browse.jpg',
      				label: 'Animals',
              id: '-KXc-PKqyc7JRXpB98vc',
              description: '“An animal’s eyes have the power to speak a great language.”― Martin Buber'
      			},{
              src: 'img/browse/architecture-browse.jpeg',
      				label: 'Architecture',
              id: '-KXc-PKubG8nUAF4rbDW',
              description: '"In architecture you should live for 150 years, because you have to learn in the first 75 years."― Renzo Piano'
      			},{
              src: 'img/browse/art-browse.jpg',
      				label: 'Art',
              id: '-KXc-PKubG8nUAF4rbDX',
              description: '"Art is freedom. Being able to bend things most people see as a straight line."'
            },{
              src: 'img/browse/open-car-browse.jpeg',
              label: 'Cars',
              id: '-KXc-PKvsIOIXTjTComa',
              description: '“Always focus on the front windshield and not the review mirror.”― Colin Powell'
            },{
              src: 'img/browse/design-browse.jpg',
              label: 'Design',
              id: '-KXc-PKvsIOIXTjTComb',
              description: '"Creativity is allowing yourself to make mistakes. Design is knowing which ones to keep.”― Scott Adams'
          }];
          $scope.totalPost.connect = $scope.totalPost.connect.concat($scope.connectImages);

          $scope.togetherImages = [{
            src: 'img/browse/diy-browse-connect.jpeg',
            label: 'DIY',
            id: '-KXc-PKvsIOIXTjTComc',
            description: '"If you think it\'s that simple, Then do it yourself."'
          },{
            src: 'img/browse/education-browse-connect.jpeg',
            label: 'Education',
            id: '-KXc-PKvsIOIXTjTComd',
            description: '"Education is the most powerful weapon which you can use to change the world.”― Nelson Mandela'
          },{
            src: 'img/browse/events-browse-connect.jpg',
            label: 'Events',
            id: '-KXc-PKvsIOIXTjTCome',
            description: '"The most successful event is the one that achieves your goals and exceeds your expectations."'
          },{
            src: 'img/browse/fashion-browse-connect.jpeg',
            label: 'Fashion',
            id: '-KXc-PKyp2pTaXsaG6Ff',
            description: '"Always dress like your going to see your worst enemy.”― Kimora Lee'
          },{
            src: 'img/browse/food-browse-connect.jpeg',
            label: 'Food & Drink',
            id: '-KXc-PKzxbTiOJzK6j72',
            description: '"If you cant feed a hundred people, then feed just one.”― Mother Teresa'
        }];

        $scope.totalPost.together = $scope.totalPost.together.concat($scope.togetherImages);

        $scope.uniteImages = [{
          src: 'img/browse/games-browse-connect.jpeg',
          label: 'Games',
          id: '-KXc-PL0mQ1oYXeDiEyq',
          description: '"To win the game just remain in the game."'
        },{
          src: 'img/browse/gardening-browse-connect.jpeg',
          label: 'Gardening',
          id: '-KXc-PL0mQ1oYXeDiEyr',
          description: '"By plucking her petals, you do not gather the beauty of the flower.”― Rabindranath Tagore'
        },{
          src: 'img/browse/health-browse-connect.jpg',
          label: 'Health & Sports',
          id: '-KXc-PL1IJeRKtEt1R70',
          description: '"He who is not courageous enough to take risk will accomplish nothing in life.”― Muhammad Ali'
        },{
          src: 'img/browse/music-browse-connect.jpg',
          label: 'Music',
          id: '-KXc-PL1IJeRKtEt1R71',
          description: '"Music can change the world because it can change people.”― Bano'
        },{
          src: 'img/browse/tech-browse-connect.png',
  				label: 'Technology',
  				id: '-KXc-PL3SLOgnBvXlR5j',
          description: '"People who are crazy enough to think they can change the world are the ones who do.”― Steve Jobs'
      }];

      $scope.totalPost.unite = $scope.totalPost.unite.concat($scope.uniteImages);

      $scope.leaderImages = [{
  			src: 'img/browseLeader/animal-browse-lead.jpeg',
  			label: 'Animals',
  			id: '-KXc-PL6yz4ugqb4XxuH',
        description: '"I\'ve never met an animal I didn\'t like, and I cant say the same thing about people."'
  		},{
  			src: 'img/browseLeader/architecture-lead-browse.jpeg',
  			label: 'Architecture',
  			id: '-KXc-PL6yz4ugqb4XxuI',
        description: '"It is not the beauty of a building you should look at; it\'s the construction of the foundation that will stand the test of time.”― David Allan Coe'
  		},{
  			src: 'img/browseLeader/art-lead-browse.jpg',
  			label: 'Art',
  			id: '-KXc-PL6yz4ugqb4XxuJ',
        description: '"The true work of art is but a shadow of the divine perfection.”― Michelangelo'
  		},{
  			src: 'img/browseLeader/car-lead-browse.jpeg',
  			label: 'Cars',
  			id: '-KXc-PL6yz4ugqb4XxuK',
        description: '"What\'s the difference between a 4.0 and a 4.6?”― Jay Z'
  		},{
  			src: 'img/browseLeader/design-lead-browse.jpg',
  			label: 'Design',
  			id: '-KXc-PL6yz4ugqb4XxuL',
        description: '"Classical design is a mirror of the human mind. It\'s how we see the world.”― Robert McKee'
  		},{
  			src: 'img/leader/diy-lead.jpeg',
  			label: 'DIY',
  			id: '-KXc-PL73JPkLGBGOhT0',
        description: '"Set yourself earnestly to see what you are made to do, and then set yourself earnestly to do it." - Phillips Brooks'
  	}];

    $scope.totalPost.leader = $scope.totalPost.leader.concat($scope.leaderImages);

    $scope.coachImages = [{
      src: 'img/browseLeader/education-browse-lead.jpg',
      label: 'Education',
      id: '-KXc-PL9UBFedjtGjwym',
      description: '"An investment in knowledge pays the best interest.”― Benjamin Franklin'
    },{
      src: 'img/browseLeader/events-browse-lead.jpg',
      label: 'Events',
      id: '-KXc-PL9UBFedjtGjwyn',
      description: '"It\s LIT"'
    },{
      src: 'img/browseLeader/fashion-browse-lead.jpg',
      label: 'Fashion',
      id: '-KXc-PL9UBFedjtGjwyo',
      description: '"The difference between style and fashion is quality.”― Giorgio Armani'
    },{
      src: 'img/browseLeader/food-browse-lead.jpg',
      label: 'Food & Drink',
      id: '-KXc-PL9UBFedjtGjwyp',
      description: '"Food is symbolic of love when words are inadequate.”― Alan D. Wolfelt'
    },{
      src: 'img/browseLeader/game-browse-lead.jpg',
      label: 'Games',
      id: '-KXc-PLA0DrJOIW_0BOY',
      description: '"Today was good. Today was fun. Tomorrow is another one.”― Dr. Seuss'
  }];

  $scope.totalPost.coach = $scope.totalPost.coach.concat($scope.coachImages);

  $scope.mentorImages = [{
    src: 'img/browseLeader/garden-browse-lead.jpg',
    label: 'Gardening',
    id: '-KXc-PLBtt6_xc6WZesE',
    description: '"To plant a garden is to believe in tomorrow.”― Audrey Hepburn'
  },{
    src: 'img/browseLeader/health-browse-lead.jpg',
    label: 'Health & Sports',
    id: '-KXc-PLBtt6_xc6WZesG',
    description: '"Never be comfortable with good enough.”― Ray Lewis'
  },{
    src: 'img/browseLeader/music-browse-lead.jpg',
    label: 'Music',
    id: '-KXc-PLCBDqeU-66GvDx',
    description: '"Don\'t worry about a thing. Every little thing is gonna be alright.”― Bob Marley'
  },{
    src: 'img/browseLeader/outdoors-browse-lead.jpg',
    label: 'Outdoors',
    id: '-KXc-PLCBDqeU-66GvDy',
    description: '"I would rather be amongst forest animals and the sounds of nature, than among and the noise of man.”― Anthony Douglass Williams'
  },{
    src: 'img/browseLeader/tech-browse-lead.jpeg',
    label: 'Technology',
    id: '-KXc-PLCBDqeU-66GvDz',
    description: '"I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it.”― Bill Gates'
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


        $scope.toggleLike = function(key, userId){
          var posts = $scope.totalPostItems;
          console.log(posts);
          if(key in posts){
            var post = $scope.totalPostItems[key];
            console.log(post);
            var actionable = post.state.actionable;
            if(actionable){
              post.liked = !post.liked;
              var state = (post.liked)?'like':'unlike';
              if(!post.liked){
                ++post.totalLikes;
              }else if(post.totalLikes > 0){
                --post.totalLikes;
              }
              return engagementService[state]({category:'post', categoryId:key, userId: $sce.userId});
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
   }]);

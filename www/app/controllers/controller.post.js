angular.module('module.view.post', [])
	.controller('postCtrl', function($scope,$rootScope,$state,appointmentsService,$ionicPopover,$ionicSideMenuDelegate,postService,$localStorage, appService, $cordovaSocialSharing, $ionicHistory,$ionicPopup,$cordovaSocialSharing,postService,engagementService,$stateParams) {
		$scope.postId = $stateParams.post;
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

			$scope.event = function () {
				$state.go('tabs.event');
			}

			if($stateParams.post){
				postService.get($stateParams.post).then(function(results) {
					var data = {
						category: 'post',
						categoryId: $stateParams.post
					}
					engagementService.totalLikes(data).then(function(totalLikes){
						results.totalLikes = totalLikes;
					});

					engagementService.totalComments(data).then(function(totalComments){
						results.totalComments = totalComments;
						$scope.commentMode = !!totalComments;
					});

					$scope.post = results;
				});
			}

		if ($state.is('tabs.post-detail') || $state.is('tabs.commits') || $state.is('tabs.comments') || $state.is('tabs.likes')) {
      	$stateParams.post === null ? $scope.post = postService.get() : $scope.post = $stateParams.post;
      }

        $scope.share = function (post) {
            document.addEventListener("deviceready", function () {
                $cordovaSocialSharing.share(post.description, post.postType, post.owner, post.location, post.date, post.time,post.image)
                    .then(function (result) {
                        appService.showAlert('Post Shared', result, 'Ok', 'button-balanced', null);
                    }, function (err) {
                        appService.showAlert('Error Occured', err, 'Ok', 'button-assertive', null);
                    });
            }, false);
        }

		$scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
               title: 'Report Post',
               template: ' Are you sure you want to report this post?'
             });
             confirmPopup.then(function(res) {
               if(res) {
               } else {
               }
             });
        };

        $scope.gotoFriend = function(){
        	$state.go('tabs.friend');
        }

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


				$scope.profile = $localStorage.account;
				//type, category, categoryId, itemId, userId, comment,
				$scope.createComment = function(){
					var obj = {
							"comment": $scope.post.comment,
							"created": firebase.database.ServerValue.TIMESTAMP,
							"userPhoto": $localStorage.account.userPhoto,
							"userName": $localStorage.account.userName,
							"state": {
									"actionable": true,
									"visible": true,
									"active": true
							}
					};
					var db = firebase.database().ref('engagementComments');
					var userId = firebase.auth().currentUser.uid;
				 // Write the new post's data simultaneously in the posts list and the user's post list.
					 var updates = {};
					 updates['engagementComments/' +  'post' + '/' + firebase.database.ServerValue.TIMESTAMP + '/' + userId] = obj;
					 updates['accounts/' + userId + 'engagementComments/' + 'post' + '/' + firebase.database.ServerValue.TIMESTAMP + '/' + userId] = obj;
					 return firebase.database().ref().update(updates);
				};

				postService.getPostComments().then(function(results) {
					$scope.comments = results[$stateParams.post];
				});

				$scope.activateCommentMode = function(){
					$scope.commentMode = true;
				};

				$scope.deactivateCommentMode = function(){
					$scope.commentMode = false;
				};

				$ionicSideMenuDelegate.canDragContent(false);

				$scope.fullscreenPopover = $ionicPopover.fromTemplate(popoverTemplate, {
						scope: $scope
				});

});

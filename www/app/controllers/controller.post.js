angular.module('module.view.post', [])
	.controller('postCtrl', ['$scope','$rootScope','$ionicActionSheet','$state','$ionicPopover','$ionicSideMenuDelegate','postService','$localStorage', 'appService', '$cordovaSocialSharing', '$ionicHistory','$ionicPopup','$cordovaSocialSharing','postService','engagementService','$stateParams',
		function($scope,$rootScope,$ionicActionSheet,$state,$ionicPopover,$ionicSideMenuDelegate,postService,$localStorage, appService, $cordovaSocialSharing, $ionicHistory,$ionicPopup,$cordovaSocialSharing,postService,engagementService,$stateParams) {
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
					var arr = [];
					for(var key in results){
						results[key].key = key;
						arr.push(results[key]);
					}
					var data = {
						category: 'post',
						categoryId: $stateParams.post,
						items: results,
						itemsArr: arr
					}
					for(var id in data.items){
           //check to see if there is a like on this post
           (function(id, items){
             engagementService.liked({category:'post', categoryId:$stateParams.post, userId: $localStorage.account.userId}).then(function(liked){
              items.liked = liked;
             });
             engagementService.committed({category:'post',categoryId:$stateParams.post, userId: $localStorage.account.userId}).then(function(committed){
               items.committed = committed;
             });
             engagementService.totalLikes({category:'post', categoryId: $stateParams.post}).then(function(totalLikes){
               items.totalLikes = totalLikes;
             });
             engagementService.totalCommits({category:'post', categoryId: $stateParams.post}).then(function(totalCommits){
               items.totalCommits = totalCommits;
             });

             engagementService.totalComments({category: 'post',categoryId: $stateParams.post}).then(function(totalComments){
               items.totalComments = totalComments;
             });

           })(id, data.items[id]);
          }
					$scope.post = results;
				});
			}

		if ($state.is('tabs.post-detail') || $state.is('tabs.commits') || $state.is('tabs.comments') || $state.is('tabs.likes')) {
      	$stateParams.post === null ? $scope.post = postService.get() : $scope.post = $stateParams.post;
      }

        $scope.share = function (post) {
					$scope.closePopover();
            document.addEventListener("deviceready", function () {
                $cordovaSocialSharing.share(post.description, post.postType, post.owner, post.location, post.date,post.photo)
                    .then(function (result) {
                        appService.showAlert('Post Shared', result, 'Ok', 'button-balanced', null);
                    }, function (err) {
                        appService.showAlert('Error Occured', err, 'Ok', 'button-assertive', null);
                    });
            }, false);
        }

		$scope.showConfirm = function() {
			$scope.closePopover();
            var confirmPopup = $ionicPopup.confirm({
               title: 'Report Post',
               template: ' Do you want to report this post?'
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
            var post = $stateParams.post;
            var actionable = $stateParams.actionable.actionable;
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
            return false;
        };

				$scope.profile = $localStorage.account;
				$scope.formData = {};
				//type, category, categoryId, itemId, userId, comment,
				$scope.createComment = function () {
            //create a location in the table
            var obj = {
								"comment": $scope.formData.searchText,
								"created": firebase.database.ServerValue.TIMESTAMP,
								"userPhoto": $localStorage.account.userPhoto,
								"userName": $localStorage.account.userName,
								"state": {
										"actionable": true,
										"visible": true,
										"active": true
								}
            };
            var db = firebase.database().ref();
            var posts = db.child('posts');
            var postsKey = posts.push(obj).key;
            var userId = firebase.auth().currentUser.uid;

       // Write the new post's data simultaneously in the posts list and the user's post list.
         var updates = {};
         updates[['engagementComments', 'post', $stateParams.post].join('/')] = obj;
         updates[['accounts', userId , 'engagementComments' , $stateParams.post , userId].join('/')] = obj;

         return firebase.database().ref().push(updates);
        };

				$scope.toggleLike = function(postId, userId){
            var post = $stateParams.post;
            var actionable = $stateParams.actionable.actionable;
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
            return false;
        };

				$scope.closePopover = function($event) {
					 $scope.menuPopover.hide();
				};

				$scope.limit = 5;

        $scope.loadMore = function(){
          if($scope.comments){
            var max = $scope.comments.length;
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


				postService.getComments($stateParams.post).then(function(results) {
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

				$scope.menuPopover = $ionicPopover.fromTemplate(menuTemplate, {
            scope: $scope
        });

				$scope.showPopup = function() {
					$ionicActionSheet.show({
							titleText: 'Post',
							cancelText: 'Cancel',
								cancel: function() {
								},
							buttons: [{
									 text: '<i class="icon ion-ios-flag"></i> Report'
							}, {
											text: '<i class="icon ion-ios-undo"></i> Share'
								}],buttonClicked: function (index) {
	                  switch (index) {
	                      case 0: // Take Picture
														$ionicPopup.show({
														title: 'Report Post',
														subTitle: 'Are you sure you would like to report this post?',
														buttons: [
															{ text: 'Cancel'},
															{ text: 'OK' }
														]
													 });
	                          break;
	                      case 1: // Select From Gallery
														document.addEventListener("deviceready", function () {
																$cordovaSocialSharing.share(post.description, post.postType, post.owner, post.location, post.date, post.time,post.image)
																		.then(function (result) {
																				appService.showAlert('Post Shared', result, 'Ok', 'button-balanced', null);
																		}, function (err) {
																				appService.showAlert('Error Occured', err, 'Ok', 'button-assertive', null);
																		});
														}, false);
	                          break;
	                  }
	                  return true;
	              }
					});
				};


}]);

var menuTemplate =
    '<ion-popover-view class="small" style="height: 101px !important;box-shadow: none !important;background-color: transparent;">' +
    '<ion-content>' +
    '<div class="list" style = "">' +
    '<div class="item item-icon-left item-text-wrap" ng-click="showConfirm()" style="border-color: transparent"> Report' +
    '</div>' +
    '<div class="item item-icon-left item-text-wrap" ng-click="share()" style="border-color: transparent"> Share' +
    '</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

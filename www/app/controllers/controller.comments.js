angular.module('module.view.comments', [])
	.controller('commentsCtrl',['$scope','$rootScope','$state','$localStorage','$ionicPopover', 'postService','appService','$stateParams','$timeout','$ionicHistory',
		 function($scope,$rootScope,$state,$localStorage,$ionicPopover, postService,appService,$stateParams,$timeout,$ionicHistory) {
				$scope.profile = $localStorage.account;
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

				postService.getComments($stateParams.post).then(function(results) {
					$scope.comments = [];
					for(var key in results){
						results[key].key = key;
						$scope.comments.push(results[key]);
					}
					var comments = {
							items: results
					};
				});


        if ($state.is('tabs.post-detail') || $state.is('tabs.commits') || $state.is('tabs.comments') || $state.is('tabs.likes')) {
            $stateParams.post === null ? $scope.post = postService.getRandomObject($scope.news.items) : $scope.post = $stateParams.post;

        }

        $scope.gotoLikes = function () {
                    $state.go('tabs.likes');
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
        };

        $scope.gotoCommit = function () {
                    $state.go('tabs.commits');
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
        };

				$scope.activateCommentMode = function(){
					$scope.commentMode = true;
				};

				$scope.deactivateCommentMode = function(){
					$scope.commentMode = false;
				};

				$scope.formData = {};
				//type, category, categoryId, itemId, userId, comment,
				$scope.createComment = function (comment) {
            //create a location in the table
						postService.createComment({comment: comment, postId: $stateParams.post})
						.then(function(results){
							$scope.comments.push(results);
							$scope.formData.comment = '';
							$scope.$apply();
						});
        };

}]);

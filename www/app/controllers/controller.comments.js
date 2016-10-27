angular.module('module.view.comments', [])
	.controller('commentsCtrl', function($scope,$rootScope,$state,$localStorage,$ionicPopover, postService,appService,$stateParams,$timeout,$ionicHistory) {
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
				$scope.fullscreenPopover = $ionicPopover.fromTemplate(popoverTemplate, {
            scope: $scope
        })

				$scope.limit = 10;

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

        $scope.news = {
                    type: 'image',
                    items: postService.getNews()
                }

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


var searchTemplate =
    '<ion-popover-view class="search">' +
    '<ion-content scroll="false">' +
    '<div class="list item-input-inset">' +
    '<label class="item-input-wrapper">' +
    '<i class="icon ion-ios-search placeholder-icon"></i>' +
    '<input type="search" placeholder="Search" ng-model="schoolSearch" ng-model-options="{ debounce: 550 }" ng-change="getSearch(schoolSearch)"></label>' +
    ' <i class="icon ion-close" ng-show="schoolSearch" ng-click="getSearch(\'\');popover.hide($event);schoolSearch=\'\'"></i>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';
});

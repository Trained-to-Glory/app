angular.module('module.view.commits', [])
	.controller('commitsCtrl',['$scope','$rootScope','$state','$localStorage','$stateParams','postService','$ionicHistory','$ionicPopover',
	 function($scope,$rootScope,$state,$localStorage,$stateParams,postService,$ionicHistory,$ionicPopover) {
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
                }

		$scope.news = {
                    type: 'image',
                    items: postService.getNews()
                }

         $scope.searchPopover = $ionicPopover.fromTemplate(searchTemplate, {
                    scope: $scope
                });

        if ($state.is('tabs.post-detail') || $state.is('tabs.commits') || $state.is('tabs.comments') || $state.is('tabs.likes')) {
					$stateParams.post === null ? $scope.post = postService.get() : $scope.post = $stateParams.post;
        }

				$scope.gotoLikes = function () {
              $state.go('tabs.likes');
              $ionicHistory.nextViewOptions({
                  disableAnimate: true,
                  disableBack: true
              });
        };

        $scope.gotoComments = function () {
            $state.go('tabs.comments');
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
        };

				$scope.gotoCommits = function () {
            $state.go('tabs.commits');
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
        };

				postService.getPostCommits($stateParams.post).then(function(results) {
					//create a local object so we can create the datastructure we want
					//so we can use it to show/hide, toggle ui items
					var commits = results;
					//make it available to the directive to officially show/hide, toggle
					$scope.commits = commits;
				});

       $scope.like = function (post) {
                    post.likes === undefined ? post.likes = [] : null;
                    if ($scope.liked == true) {
                        $scope.liked = false;
                        post.likes.splice(_.findIndex(post.likes, ['name', $localStorage.userName]));
                    } else {
                        $scope.liked = true;
                        post.likes.push({ name: $rootScope.user.name, photo: $localStorage.userPhoto, publishedDate: new Date() });
                    }
        };

}]);
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

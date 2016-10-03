angular.module('module.view.likes', [])
	.controller('likesCtrl', function($scope,$rootScope,$log,$state,$localStorage,$stateParams,engagementService,postService,$ionicHistory,usersService) {
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

								$log.log($stateParams.post);

								if($stateParams.post){
								engagementService.likes('post', $stateParams.post).then(function(results) {
									  var likers = results;
										for(var id in likers){
											usersService.get(id).then(function(user){
												likers[id].profile = user;
											});
										}
											$scope.likers = likers;
									});
								}

								postService.getPostLikes($stateParams.post).then(function(results) {
									//create a local object so we can create the datastructure we want
									//so we can use it to show/hide, toggle ui items
									var likes = results;
									//make it available to the directive to officially show/hide, toggle
									$scope.likes = likes;
								});

		$scope.gotoCommits = function () {
                    $state.go('tabs.commits');
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
        };

        $scope.gotoComments = function () {
                    $state.go('tabs.comment');
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
        };

				if ($state.is('tabs.post-detail') || $state.is('tabs.commits') || $state.is('tabs.comments') || $state.is('tabs.likes')) {
		      	$stateParams.post === null ? $scope.post = postService.get() : $scope.post = $stateParams.post;
		      }

					postService.getPostCommits($stateParams.post).then(function(results) {
						//create a local object so we can create the datastructure we want
						//so we can use it to show/hide, toggle ui items
						var commits = results;
						//make it available to the directive to officially show/hide, toggle
						$scope.commits = commits;
					});

					$scope.sendChat = function (item) {
										 appService.KeepKeyboardOpen('#textChat');
										 var message = {
												 sentAt: new Date(),
												 name: $localStorage.userName,
												 photo: $localStorage.userPhoto,
												 text: item,
												 senderid: $localStorage.account.userId
										 };

										 $timeout(function () {
												 $scope.chat.messages.push(message);
												 appService.KeepKeyboardOpen('#textChat');
												 viewScroll.scrollBottom(true);
										 }, 0);

										 $scope.input = '';

										 $timeout(function () {
												 $scope.chat.messages.push({
														 sentAt: new Date(),
														 name: $scope.chat.recepientname,
														 photo: $scope.chat.recepientphoto,
														 text: randomMessages[Math.floor(Math.random() * randomMessages.length)],
														 senderid: $scope.chat.recepientid
												 });

												 appService.KeepKeyboardOpen('#textChat');
												 viewScroll.scrollBottom(true);
										 }, 2000);
						 }

       $scope.like = function (post) {
                    post.likes === undefined ? post.likes = [] : null;
                    if ($scope.liked == true) {
                        $scope.liked = false;
                        post.likes.splice(_.findIndex(post.likes, ['name', $localStorage.userName]));
                    } else {
                        $scope.liked = true;
                        post.likes.push({ name: $localStorage.userName, photo: $localStorage.userPhoto, publishedDate: new Date() });
                    }
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

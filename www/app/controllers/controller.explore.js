angular.module('module.view.explore', ['angular.filter'])
	.controller('exploreCtrl', ['$scope','$rootScope','$localStorage','$state','postService','usersService','engagementService','$ionicSideMenuDelegate','$ionicPopover',
		function($scope,$rootScope,$localStorage,$state,postService,usersService,engagementService,$ionicSideMenuDelegate,$ionicPopover) {
        $scope.newsPopover = $ionicPopover.fromTemplate(newsTemplate, {
                    scope: $scope
        });

				usersService.getAllUsers().then(function(results){
					delete results[$localStorage.account.userId];
		      $scope.users = results;
		    });

				$scope.view = { type: 1 };

		$scope.clearSearch = function() {
		    $scope.lookUp = null;
				$scope.view = { type: 1}
				console.log($scope.view);
		}

		console.log($scope.view);


		$scope.gotoBrowse = function () {
                    $state.go('tabs.news');

        };

				$scope.onSwipeLeft = function () {
          $state.go('tabs.match');
        }

				$scope.onSwipeRight = function () {
					$state.go('tabs.news');
				}


        $scope.gotoMatch = function () {
                    $state.go('tabs.match');

        };

       $scope.gotoAccount = function () {
                    $state.go('tabs.account');

        };

        $scope.gotoCoaches = function () {
                    $state.go('tabs.coach');

        };

        $scope.searchPopover = $ionicPopover.fromTemplate(searchTemplate, {
                    scope: $scope
                });

        $ionicSideMenuDelegate.canDragContent(false);

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
				}

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


				$ionicSideMenuDelegate.canDragContent(false);

				$scope.delete = function (id) {
						return postService.delete(id);
				};

				$scope.update = function (data) {
						return postService.update(data);
				};

				$scope.event = function () {

						$state.go('tabs.event');
				};

				$scope.limit = 8;

        $scope.loadMore = function(){
          if($scope.news && $scope.news.itemsArr){
            var max = $scope.news.itemsArr.length;
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


				postService.getNews().then(function(results) {
					//create a local object so we can create the datastructure we want
					//so we can use it to show/hide, toggle ui items

					var arr = [];
          for(var key in results){
            results[key].key = key;
            arr.push(results[key]);
          }

					var news = {
							itemsArr: arr
					};
					//make it available to the directive to officially show/hide, toggle
					$scope.news = news;
				});

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
	'<ion-list>' +
	'<ion-item class="user">' +
	'</ion-item>' +
	'</ion-list>'
	'</ion-content>' +
	'</ion-popover-view>';

var searchTemplate =
'<div class="bar bar-header item-input-inset"> '+
' <label class="item-input-wrapper"> ' +
'	 <i class="icon ion-ios-search placeholder-icon"></i> ' +
'	 <input type="search" placeholder="Search"> ' +
' </label>' +
' <button class="button button-clear"> ' +
'	 Cancel ' +
' </button> '
'</div>';

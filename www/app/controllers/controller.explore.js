angular.module('module.view.explore', ['angular.filter'])
	.controller('exploreCtrl', ['$scope','$rootScope', '$localStorage','$window','$state','postService','usersService','engagementService','$ionicSideMenuDelegate','$ionicPopover',
		function($scope,$rootScope,$localStorage,$window,$state,postService,usersService,engagementService,$ionicSideMenuDelegate,$ionicPopover) {
			$scope.lastId;
			$scope.noMoreItemsAvailable = false;
			$scope.loading = true;

			$scope.shuffleArray = function(array){
				var currentIndex = array.length, temporaryValue, randomIndex;

				// While there remain elements to shuffle...
				while (0 !== currentIndex) {

					// Pick a remaining element...
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex -= 1;

					// And swap it with the current element.
					temporaryValue = array[currentIndex];
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}

				return array;
			}
				var posts = firebase.database().ref(['posts'].join('/'));
					posts.orderByKey().limitToFirst(7).once("value", function(snapshot) {
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
								itemsArr: arr
							}
							// $scope.news = news.itemsArr;
							$scope.news = news.itemsArr;
							$scope.news.sort(function(){return 0.5 - Math.random()});
							$scope.$apply();
			});

			var goals = firebase.database().ref(['plans'].join('/'));
				goals.orderByKey().limitToFirst(10).once("value", function(snapshot) {
					$scope.loading = false;
					var goalsObj = snapshot.val();
					var array = $.map(goalsObj, function(value, index) {
							return [value];
					});

					var arr = [];
					 for(var key in goalsObj){
							goalsObj[key].key = key;
							arr.push(goalsObj[key]);
						}

						var viewGoals = {
							itemsArr: arr,
							items: goalsObj
						}

						for(var id in viewGoals.items){
						 //check to see if there is a like on this post
						 (function(id, items){
							 engagementService.totalLikes({category:'plans', categoryId: id}).then(function(totalLikes){
								 items.totalLikes = totalLikes;
							 });
							 engagementService.totalCommits({category:'plans', categoryId: id}).then(function(totalCommits){
								 items.totalCommits = totalCommits;
							 });
							 engagementService.totalComments({category: 'plans',categoryId: id}).then(function(totalComments){
								 items.totalComments = totalComments;
							 });
						 })(id, viewGoals.items[id]);
						}
						// $scope.news = news.itemsArr;
						$scope.viewGoals = viewGoals.itemsArr;
						$scope.$apply();
		});

			// $scope.loadMore = function(){
			// 	var posts = firebase.database().ref(['posts'].join('/'));
			// 	if ($scope.lastId == undefined) {
			// 		posts.orderByKey().limitToFirst(20).once("value", function(snapshot) {
			// 			$scope.loading = false;
			// 			var currentObj = snapshot.val();
			// 			var array = $.map(currentObj, function(value, index) {
			// 					return [value];
			// 			});
			//
			// 			var arr = [];
			// 			 for(var key in currentObj){
			// 					currentObj[key].key = key;
			// 					arr.push(currentObj[key]);
			// 				}
			//
			// 				var news = {
			// 					itemsArr: arr
			// 				}
			//
			// 				$scope.news = $scope.news.concat(news.itemsArr);
			// 				$scope.lastId = $scope.news[$scope.news.length - 1].key;
			// 				console.log($scope.news);
			// 				if ( array.length != 20 ) {
			// 					 $scope.noMoreItemsAvailable = true;
			// 				}
			// 			$scope.$broadcast('scroll.infiniteScrollComplete');
			// 			$scope.$apply();
			// 		});
			// 	}else{
			// 		posts.orderByKey().startAt($scope.lastId).limitToFirst(21).on("value", function(snapshot) {
			// 			$scope.loading = false;
			// 			var currentObj = snapshot.val();
			// 			var array = $.map(currentObj, function(value, index) {
			// 					return [value];
			// 			});
			// 			var arr = [];
			// 			 for(var key in currentObj){
			// 					currentObj[key].key = key;
			// 					arr.push(currentObj[key]);
			// 				}
			// 				arr.shift();
			// 				var news = {
			// 					itemsArr: arr
			// 				}
			//
			// 				$scope.news = $scope.news.concat(news.itemsArr);
			// 				console.log($scope.news);
			// 				$scope.lastId = $scope.news[$scope.news.length - 1].key;
			//
			// 				if ( array.length != 20 ) {
			// 					 $scope.noMoreItemsAvailable = true;
			// 				}
			// 			$scope.$broadcast('scroll.infiniteScrollComplete');
			// 			$scope.$apply();
			// 		});
			// 	}
			// };

			$scope.doRefresh = function (){
				var posts = firebase.database().ref(['posts'].join('/'));
				posts.orderByKey().startAt($scope.lastId).limitToFirst(21).on("value", function(snapshot) {
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
							itemsArr: arr
						}

						$scope.news = news.itemsArr.concat($scope.news);

					$scope.$broadcast('scroll.refreshComplete');
				});
			};


				usersService.getAllUsers().then(function(results){
					delete results[$localStorage.account.userId];

					var array = $.map(results, function(value, index) {
							return [value];
					});

					for(var id in results){
					 //check to see if there is a like on this post
					 (function(id){
						 engagementService.partnered({category:'partners', categoryId:id, userId: $localStorage.account.userId}).then(function(partnered){
							results[id].partnered = partnered;
						});
					})(id,results);
					}

					$scope.fewUsers = array;
					$scope.fewUsers.sort(function(){return 0.5 - Math.random()});
		      $scope.users = results;
					$scope.$apply();
		    });

				$scope.view = { type: 1 };

		$scope.clearSearch = function() {
		    $scope.lookUp = null;
				$scope.view = { type: 1}
		}



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

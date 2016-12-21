angular.module('module.view.profile', [])
	.controller('profileCtrl',['$scope','$rootScope','$timeout','$cordovaCamera','$log','$ionicPopover','$stateParams','$ionicScrollDelegate','$ionicNavBarDelegate','appService','$ionicActionSheet','engagementService','usersService','$state','postService','$ionicSideMenuDelegate','$localStorage',
		function($scope,$rootScope,$timeout,$cordovaCamera,$log,$ionicPopover,$stateParams,$ionicScrollDelegate,$ionicNavBarDelegate,appService,$ionicActionSheet,engagementService,usersService,$state,postService,$ionicSideMenuDelegate,$localStorage) {
		$rootScope.slideHeader = false;
   	$rootScope.slideHeaderPrevious = 0;
		$scope.noMoreItemsAvailable = false;

	$scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

	var myPostsPromise = firebase.database().ref(['accounts', $localStorage.account.userId , 'userPartners', 'partners', $localStorage.account.userId].join('/'));
	 myPostsPromise.once('value').then(function (snapshot) {
				var obj = {};
				var myPosts = snapshot.val();
				if (myPosts) {
					 var postsPromise = firebase.database().ref(['posts'].join('/'));
					 postsPromise.orderByKey().limitToFirst(20).once("value", function(snapshot) {
						 var posts = snapshot.val();
						 if(posts){
							 for(var key in	myPosts){
								 obj[key] = posts[key];
							 }
							 return obj;
						 }
						 return obj;
					 });
				}
				return obj;
		});



	$scope.onSwipeRight = function () {
		$state.go('tabs.sentPlans');
	}

	$scope.view = { type: 1 };

		$scope.openPopover = function($event) {
			 $scope.fullscreenPopover.show($event);
		};

		$scope.closePopover = function($event) {
			 $scope.fullscreenPopover.hide();
		};

		// Execute action on hide popover
		$scope.$on('popover.hidden', function() {
			 // Execute action
		});

		// Execute action on remove popover
		$scope.$on('popover.removed', function() {
			 // Execute action
		});

		usersService.getAllUsers($localStorage.account.userId).then(function(results){
			var arr = [];
			for(var key in results){
				results[key].key = key;
				arr.push(results[key]);
			}
			var contacts = {
					items: results,
					itemsArr: arr
			};

			delete results[$localStorage.account.userId];

			for(var id in contacts.items){
			 //check to see if there is a like on this post
			 (function(id){
				 engagementService.partnered({category:'partners', categoryId:id, userId: $localStorage.account.userId}).then(function(partnered){
					contacts.items[id].partnered = partnered;
				});
			})(id,contacts.items);
			}
			$scope.people = contacts.items;
			$scope.$apply();
		});



		$scope.loading = true;

		if ($scope.lastpostId == undefined) {
		var userPosts = firebase.database().ref(['accounts', $localStorage.account.userId, 'posts'].join('/'));
			userPosts.orderByKey().limitToFirst(20).once("value", function(snapshot) {
				$scope.loading = false;
				var currentObj = snapshot.val();
				var array = $.map(currentObj, function(value, index) {
						return [value];
				});

				var arr = [];
				var photos = [];

				 for(var key in currentObj){
						currentObj[key].key = key;
						arr.push(currentObj[key]);
						if (currentObj[key].photo != ""){
							photos.push(currentObj[key]);
						}
					}

					var userPost = {
							itemsArr: photos
					};

					$scope.userPosts = userPost;

					if ( array.length != 20 ) {
						 $scope.noMoreItemsAvailable = true;
					}
				$scope.$apply();
				$scope.$broadcast('scroll.infiniteScrollComplete');

			});
		};

		$scope.loadMore = function(){
			$scope.loading = false;
			var userPosts = firebase.database().ref(['accounts', $localStorage.account.userId, 'posts'].join('/'));
			if ($scope.lastId == undefined) {
				userPosts.orderByKey().limitToFirst(20).once("value", function(snapshot) {
					var currentObj = snapshot.val();
					var array = $.map(currentObj, function(value, index) {
							return [value];
					});

					var arr = [];
					var photos = [];

					 for(var key in currentObj){
							currentObj[key].key = key;
							arr.push(currentObj[key]);
							if (currentObj[key].photo != ""){
								photos.push(currentObj[key]);
							}
						}

						var userPost = {
							itemsArr: photos
						}

						$scope.userPosts = [];
						console.log(userPost.itemsArr);

						$scope.userPosts = $scope.userPosts.concat(userPost.itemsArr);
						$scope.lastId = $scope.userPosts[$scope.userPosts.length - 1].key;

						if ( array.length != 20 ) {
							 $scope.noMoreItemsAvailable = true;
						}
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.$apply();
				});
			}else{
				userPosts.orderByKey().startAt($scope.lastId).limitToFirst(21).on("value", function(snapshot) {
					var currentObj = snapshot.val();
					var array = $.map(currentObj, function(value, index) {
							return [value];
					});
					var arr = [];
					var photos = [];

					for(var key in currentObj){
						 currentObj[key].key = key;
						 arr.push(currentObj[key]);
						 if (currentObj[key].photo != ""){
							 photos.push(currentObj[key]);
						 }
					 }

						arr.shift();
						var userPosts = {
							itemsArr: photos
						}

						$scope.userPosts = $scope.userPosts.concat(userPost.itemsArr);
						$scope.lastId = $scope.userPosts[$scope.userPosts.length - 1].key;

						if ( array.length != 20 ) {
							 $scope.noMoreItemsAvailable = true;
						}
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.$apply();
				});
			}
		};


	usersService.getUserTotalPartners($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items

		 $scope.userPartners = results;
		 $scope.$apply();
	});

	usersService.getUserCommits($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		var arr = [];
		var photos = [];
		for(var key in results){
			results[key].key = key;
			arr.push(results[key]);
			if (results[key].photo != ""){
				photos.push(results[key]);
			}
		}
		var userCommits = {
			itemsArr: photos
		};
		 $scope.userCommits = userCommits;
		 $scope.$apply();
	});



	usersService.getPartnerPosts($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		var arr = [];
		var photos = [];
		for(var key in results){
			results[key].key = key;
			arr.push(results[key]);
			if (results[key].photo != ""){
				photos.push(results[key]);
			}
		}
		var userNews = {
				itemsArr: photos
		};
		 $scope.userNews = userNews;
		 $scope.$apply();
	});

	usersService.getUserTotalCommits($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		 $scope.userTotalCommits = results;
		 $scope.$apply();
	});

	usersService.getUserTotalPost($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		 $scope.userTotalPost = results;
		 $scope.$apply();
	});

	usersService.getPartners($localStorage.account.userId).then(function(results){
		var arr = [];
		for(var key in results){
			results[key].key = key;
			arr.push(results[key]);
		}
		var contacts = {
				items: results,
				itemsArr: arr
		};
		delete results[$localStorage.account.userId];

		for(var id in contacts.items){
			 (function(id, items){
				 engagementService.partnered({category:'partners', categoryId:$localStorage.account.userId, userId:id }).then(function(partnered){
	 				items.partnered = partnered;
	 			});
			})(id, contacts.items[id]);
		};
		console.log(contacts);
		$scope.contacts = contacts;
		$scope.$apply();
	});

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

		$scope.profile = $localStorage.account;
		console.log($scope.profile);

		$scope.uploadUserPhoto = function () {
					$ionicActionSheet.show({
						titleText: 'Profile Picture',
						cancelText: 'Cancel',
							cancel: function() {
							},
							buttons: [{
									text: 'Take Picture'
							}, {
											text: 'Select From Gallery'
									}],
							buttonClicked: function (index) {
									switch (index) {
											case 0: // Take Picture
													document.addEventListener("deviceready", function () {
															$cordovaCamera.getPicture(appService.getProfileCameraOptions()).then(function (imageData) {
																	//alert(imageData);
																	$localStorage.account.userPhoto = "data:image/jpeg;base64," + imageData;
																	var ref = firebase.database().ref('accounts');
																	ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
																		firebase.database().ref('/accounts/' + snapshot.key ).update({
																			userPhoto: $localStorage.account.userPhoto
																		}).then( function() {
																			$localStorage.account.userPhoto = userPhoto;
																			$scope.profile.userPhoto = $localStorage.account.userPhoto;
																			return;
																		});
																	});
																	$localStorage.account.userPhoto = "data:image/jpeg;base64," + imageData;
																	$scope.profile.userPhoto = $localStorage.account.userPhoto;
															});
													}, false);
													break;
											case 1: // Select From Gallery
													document.addEventListener("deviceready", function () {
															$cordovaCamera.getPicture(appService.getProfileLibraryOptions()).then(function (imageData) {
																$localStorage.account.userPhoto = "data:image/jpeg;base64," + imageData;
																var ref = firebase.database().ref('accounts');
																ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
																	firebase.database().ref('/accounts/' + snapshot.key ).update({
																		userPhoto: $localStorage.account.userPhoto
																	}).then( function() {
																		$localStorage.account.userPhoto = userPhoto;
																		$scope.profile.userPhoto = $localStorage.account.userPhoto;
																		return;
																	});
																});
															});
													}, false);
													break;
									}
									return true;
							}
					});
			};

		$scope.gotoMatch = function () {
                    $state.go('tabs.match');

        };

       $scope.gotoBrowse = function () {
                    $state.go('tabs.news');

        };

        $scope.gotoCoaches = function () {
                    $state.go('tabs.coach');

        };

				$scope.browse = function () {
					$scope.closePopover();
						$state.go('tabs.news');
				};

				$scope.explore = function () {
					$scope.closePopover();
					$state.go('tabs.explore');
				};

				$scope.match = function () {
					$scope.closePopover();
						$state.go('tabs.match');

				};

				$scope.coach = function () {
					 $scope.closePopover();
						$state.go('tabs.coach');
				};

				$scope.plans = function () {
					 $scope.closePopover();
						$state.go('tabs.sentPlans');
				};

				$scope.reminder = function () {
					$scope.closePopover();
						$state.go('tabs.reminders');
				};

				$scope.partners = function () {
					$scope.closePopover();
						$state.go('tabs.partners');
				};

				$scope.settings = function () {
					$scope.closePopover();
						$state.go('tabs.settings');
				};

				$scope.search = function () {
					$scope.closePopover();
						$state.go('tabs.search');
				};

				$scope.calendar = function () {
					$scope.closePopover();
						$state.go('tabs.reminders');
				};

				$scope.account = function (){
					$scope.closePopover();
					$state.go('tabs.account');
				};

				$scope.notifications = function (){
					$scope.closePopover();
					$state.go('tabs.communicate');
				};

				$scope.logout = function() {
				if (firebase.auth()) {
					firebase.auth().signOut().then(function() {
						//Clear the saved credentials.
						$localStorage.$reset();
						$scope.closePopover();
						//Proceed to login screen.
						$state.go('authentication');
					}, function(error) {
						//Show error message.
						Utils.message(Popup.errorIcon, Popup.errorLogout);
					});
				}
			};


}]);

angular.module('module.view.profile', [])
	.controller('profileCtrl',['$scope','$rootScope','$timeout','$cordovaCamera','$log','$ionicPopover','$stateParams','$ionicScrollDelegate','$ionicNavBarDelegate','appService','$ionicActionSheet','engagementService','usersService','$state','postService','$ionicSideMenuDelegate','$localStorage',
		function($scope,$rootScope,$timeout,$cordovaCamera,$log,$ionicPopover,$stateParams,$ionicScrollDelegate,$ionicNavBarDelegate,appService,$ionicActionSheet,engagementService,usersService,$state,postService,$ionicSideMenuDelegate,$localStorage) {
		$rootScope.slideHeader = false;
   	$rootScope.slideHeaderPrevious = 0;

	$scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };


	$scope.onSwipeRight = function () {
		$state.go('tabs.sentPlans');
	}

	$scope.view = { type: 1 };

	$scope.togglePartner = function(partnerId){
			var partner = $scope.contacts;
			 if(!partner){
				 return false;
			 }
			partner.partnered = !partner.partnered;
			var state = (partner.partnered)?'partner':'unpartner';
			return engagementService[state]({category:'partners', categoryId:partnerId, userId: $localStorage.account.userId});
	};

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

		$scope.limit = 10;

		$scope.loadMore = function(){
			if($scope.userPosts && $scope.userPosts.itemsArr){
				var max = $scope.userPosts.itemsArr.length;
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
		});

		$scope.loadMoreUserCommits = function(){
			if($scope.userCommits && $scope.userCommits.itemsArr){
				var max = $scope.userCommits.itemsArr.length;
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

		$scope.loadMorePartnerPost = function(){
			if($scope.userNews && $scope.userNews.itemsArr){
				var max = $scope.userNews.itemsArr.length;
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

		$scope.loadMoreContacts = function(){
			if($scope.contacts && $scope.contacts.itemsArr){
				var max = $scope.contacts.itemsArr.length;
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



	usersService.getUserPost($localStorage.account.userId).then(function(results) {
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
		var userPost = {
				itemsArr: photos
		};
		 $scope.userPosts = userPost;
		$localStorage.account.posts = userPost.itemsArr;
	});


	usersService.getUserTotalPartners($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		 $scope.userPartners = results;
		 $localStorage.account.totalPartners = results;
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
		 $localStorage.account.profileCommits = userCommits.itemsArr;
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
		 $localStorage.account.userNews = userNews;
	});

	usersService.getUserTotalCommits($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		 $scope.userTotalCommits = results;
		 $localStorage.account.totalCommits = results;
	});

	usersService.getUserTotalPost($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		 $scope.userTotalPost = results;
		 $localStorage.account.totalPost = results;
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
		 //check to see if there is a like on this post
		 (function(id, items){
			 engagementService.partnered({category:'partners', categoryId:id, userId: $localStorage.account.userId}).then(function(partnered){
 				items.partnered = partnered;
 			});
		})(id, contacts.items[id]);
		}

		$scope.contacts = contacts;
	});

	console.log($scope.profile.posts);


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

				$scope.menuPopover = $ionicPopover.fromTemplate(menuTemplate, {
						scope: $scope
				});

		$scope.profile = $localStorage.account;
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
															}, function (err) {
																	appService.showAlert('Error', err, 'Close', 'button-assertive', null);
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
															}, function (err) {
																	appService.showAlert('Error', err, 'Close', 'button-assertive', null);
															});
													}, false);
													break;
									}
									return true;
							}
					});
			};

}]);

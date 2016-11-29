angular.module('module.view.communicate', [])
	.controller('communicateCtrl', ['$scope','$rootScope','$state','$ionicHistory','$ionicPopover','usersService','$localStorage','interestService',
	function($scope,$rootScope,$state,$ionicHistory,$ionicPopover,usersService,$localStorage,interestService) {

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

								$scope.openPopover = function($event) {
			             $scope.fullscreenPopover.show($event);
			          };

								$scope.profile = $localStorage.account;

								$scope.limit = 10;

				        $scope.loadMore = function(){
				          if($scope.userPostsLikes && $scope.userPostsLikes.itemsArr){
				            var max = $scope.userPostsLikes.itemsArr.length;
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

								$scope.getPicture = function(id){
									return interestService.getPictures(id);
								};

								$scope.getPicture().then(function(results) {
									var pictures = [];
									for (key in results){
										pictures.push({
											id: key,
											label: results[key].label,
											photo: results[key].displayName
										});
									}
									$scope.picture = pictures;
								}, function(error){
								})

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

								$scope.loadMoreCommits = function(){
				          if($scope.userPlanCommits && $scope.userPlanCommits.itemsArr.length){
				            var max = $scope.userPlanCommits.itemsArr.length;
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

								$scope.loadMorePostCommits = function(){
				          if($scope.userPostCommits && $scope.userPostCommits.itemsArr.length){
				            var max = $scope.userPostCommits.itemsArr.length;
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

								$scope.loadMoreAppointmentCommits = function(){
				          if($scope.userAppointmentCommits && $scope.userAppointmentCommits.itemsArr.length){
				            var max = $scope.userAppointmentCommits.itemsArr.length;
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

            usersService.getUserPostsLikes($localStorage.account.userId).then(function(results) {
          		//create a local object so we can create the datastructure we want
          		//so we can use it to show/hide, toggle ui items
							var arr = [];
		          for(var key in results){
		            results[key].key = key;
		            arr.push(results[key]);
		          }
		          var userPostsLikes = {
		              items: results,
		              itemsArr: arr
		          };
							delete userPostsLikes[$localStorage.account.userId];
          		 $scope.userPostsLikes = userPostsLikes;
          	});

            usersService.getUserCommitsPlan($localStorage.account.userId).then(function(results) {
          		//create a local object so we can create the datastructure we want
          		//so we can use it to show/hide, toggle ui items
							var arr = [];
		          for(var key in results){
		            results[key].key = key;
		            arr.push(results[key]);
		          }
		          var userPlanCommits = {
		              items: results,
		              itemsArr: arr
		          };
							delete userPlanCommits[$localStorage.account.userId];
          		 $scope.userPlanCommits = userPlanCommits;
          	});

            usersService.getUserCommitsPost($localStorage.account.userId).then(function(results) {
          		//create a local object so we can create the datastructure we want
          		//so we can use it to show/hide, toggle ui items
							var arr = [];
		          for(var key in results){
		            results[key].key = key;
		            arr.push(results[key]);
		          }
		          var userPostsCommits = {
		              items: results,
		              itemsArr: arr
		          };
							delete userPostsCommits[$localStorage.account.userId];
          		 $scope.userPostCommits = userPostsCommits;
          	});

            usersService.getUserCommitsAppointment($localStorage.account.userId).then(function(results) {
          		//create a local object so we can create the datastructure we want
          		//so we can use it to show/hide, toggle ui items
							var arr = [];
		          for(var key in results){
		            results[key].key = key;
		            arr.push(results[key]);
		          }

		          var userAppointmentCommits = {
		              items: results,
		              itemsArr: arr
		          };
							delete userAppointmentCommits[$localStorage.account.userId];
          		 $scope.userAppointmentCommits = userAppointmentCommits;
          	});

						$scope.fullscreenPopover = $ionicPopover.fromTemplate(popoverTemplate, {
								scope: $scope
						});

						$scope.browse = function () {

								$state.go('tabs.news');
						};

						$scope.explore = function () {

								$state.go('tabs.explore');
						};

						$scope.match = function () {

								$state.go('tabs.match');
						};

						$scope.coach = function () {

								$state.go('tabs.coach');
						};

						$scope.plans = function () {

								$state.go('tabs.sentPlans');
						};

						$scope.reminder = function () {

								$state.go('tabs.reminders');
						};

						$scope.notifications = function () {

								$state.go('tabs.communicate');
						};

						$scope.partners = function () {

								$state.go('tabs.partners');
						};

						$scope.settings = function () {

								$state.go('tabs.settings');
						};

						$scope.search = function () {

								$state.go('tabs.search');
						};

						$scope.calendar = function () {

								$state.go('tabs.reminders');
						};

						$scope.account = function (){
							$state.go('tabs.account')
						};

						$scope.logout = function() {

						 if (firebase.auth()) {
							 firebase.auth().signOut().then(function() {
								 //Clear the saved credentials.
								 $localStorage.$reset();
								 //Proceed to login screen.
								 $state.go('authentication');
							 }, function(error) {
								 //Show error message.
								 Utils.message(Popup.errorIcon, Popup.errorLogout);
							 });
						 }
					 };


}]);
var menuTemplate =
    '<ion-popover-view class="menu popover" style="background-color: #fff;top: -9px;">' +
    '<ion-content scroll="true">' +
    '<ion-list style="position:absolute;top:-10vh;">' +
    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="browse()"> Home' +
    '</ion-item>' +
    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="search()"> Search' +
    '</ion-item>' +
    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="match()"> Match' +
    '</ion-item>' +
    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="explore()"> Discover' +
    '</ion-item>' +
    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="coach()"> Coaches' +
    '</ion-item>' +
    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="plans()"> Goals' +
    '</ion-item>' +
    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="calendar()"> Sessions' +
    '</ion-item>' +
    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="notifications()"> Notifications' +
    '</ion-item>' +
    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="partners()"> Partners' +
    '</ion-item>' +
    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="settings()"> Settings' +
    '</ion-item>' +
    '<a class="item item-avatar" nav-clear style="padding-left: 65px;padding-top:15px;">'+
    '<img ng-src="{{ profile.userPhoto }}" ng-click="account()" style="margin-left: 2px;">'+
    '<p style="display: block;color: black !important;">{{profile.firstName + " " + profile.lastName}}<p style="display:block;color: red">{{profile.userName}}</p>'+
    '</a>'+
    '<ion-item class="font-thin" style="font-size: 18px;display:table;" ng-click="logout()"> Sign Out' +
    '</ion-item>' +
    '</ion-list>'+
    '</ion-content>' +
    '</ion-popover-view>';

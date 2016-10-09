angular.module('module.view.coach', [])
	.controller('coachCtrl', function($scope,$rootScope,$ionicPopover,$state,$localStorage,$cordovaGeolocation,interestService) {
		$scope.$on('$ionicView.loaded', function(event) {
			var posOptions = {timeout: 10000, enableHighAccuracy: true};
				$cordovaGeolocation.getCurrentPosition(posOptions)
					.then(function(position){
						var lat = position.coords.latitude;
						var long = position.coords.longitude;
						// $localStorage.account.lat = lat;
						// $localStorage.account.long = long;
						$localStorage.account.near = {lat: lat, long: long};
					},function(err){
					});
	  });

		var ref = firebase.database().ref('accounts');
		ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
			firebase.database().ref('/accounts/' + snapshot.key ).update({
				location: $localStorage.account.near
			});
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

				$scope.getInterest = function(id){
					return interestService.getTrainers(id);
				};

				$scope.loadMore = function(id) {
					interestService.getMoreTrainers(id).then(function(results) {
						var match = results;
						//so we can use it to show/hide, toggle ui items
						$scope.match = Object.assign(match);
						$scope.$broadcast('scroll.infiniteScrollComplete');
				});
			};

				$scope.getInterest().then(function(results) {
					var interests = [];
					for (key in results){
						interests.push({
							id: key,
							label: results[key].displayName,
							photo: results[key].backgroundImg,
							numbers: results[key].numbers
						});
					}
					$scope.abs = interests;
				}, function(error){
				}).catch(function(error){
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

				$scope.likeList = function () {

						$state.go('tabs.likeList');
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

			 $scope.fullscreenPopover = $ionicPopover.fromTemplate(popoverTemplate, {
					 scope: $scope
			 });
});

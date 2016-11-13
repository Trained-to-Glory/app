angular.module('module.view.interest', [])
	.controller('interestCtrl', function($scope,$rootScope,$state,$ionicPopover,usersService,interestService,$localStorage, engagementService) {
		$scope.getInterest = function(id){
			return interestService.getCategoryList(id);
		};

		$scope.getInterest().then(function(results) {
			var interests = [];
			for (key in results){
				interests.push({
					id: key,
					label: results[key].displayName,
					photo: results[key].backgroundImg,
					numbers: results[key].numbers,
					subCategory: results[key].sub_categories
				});
			}
			$scope.interests = interests;
		});

		usersService.getInterestDisplay($localStorage.account.userId).then(function(results) {
			//create a local object so we can create the datastructure we want
			var ones = {
					items: results
			};
			$scope.ones = ones.items;
				//check to see if there is a like on this post
		});

		$scope.toggleInterest = function(partnerId){
				var partner = $scope.ones;
			   if(!partner){
					 return false;
				 }
				partner.partnered = !partner.partnered;
				var state = (partner.partnered)?'partner':'unpartner';
				return engagementService[state]({category: 'interest',categoryId:partnerId, userId: $localStorage.account.userId});
		};


		$scope.class = "white";

		$scope.limit = 10;

		$scope.loadMore = function(){
			if($scope.interests){
				var max = $scope.interests.length;
				if($scope.limit <  max){
					$scope.moreToScroll = true;
					if($scope.limit - max < 10 && $scope.limit - max > 0){
						$scope.limit += Math.abs($scope.limit - max);
						$scope.moreToScroll = true;
						return;
					}
					$scope.limit += 10;
				}else{
					$scope.moreToScroll = false;
				}
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		};

		$scope.isChecked = false;
			$scope.selected = [];
			$scope.checkedOrNot = function (interest, isChecked, index) {
					if (isChecked) {
							$scope.selected.push(interest);
							engagementService.engagedActivities({category:'interest', categoryId:interest.id, userId:$localStorage.account.userId});
					} else {
							var _index = $scope.selected.indexOf(interest);
							$scope.selected.splice(_index, 1);
							engagementService.disEngagedActivities({category:'interest', categoryId:interest.id, userId:$localStorage.account.userId});
					}
			};

			$scope.fullscreenPopover = $ionicPopover.fromTemplate(popoverTemplate, {
					scope: $scope
			});

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
});

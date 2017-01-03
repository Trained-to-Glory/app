angular.module('module.view.interest', [])
	.controller('interestCtrl', ['$scope','$rootScope','$state','$ionicPopover','usersService','interestService','$localStorage', '$stateParams', 'engagementService',
		function($scope,$rootScope,$state,$ionicPopover,usersService,interestService,$localStorage, $stateParams, engagementService) {
		$scope.getInterest = function(id){
			return interestService.get(id);
		};
		$scope.hideNext = $stateParams.location;

		$scope.interestImages = [{
			src: 'img/interest/animal.jpg',
			label: 'Animals',
			id: '-KXc-PKqyc7JRXpB98vc'
		},{
			src: 'img/interest/architecture.jpg',
			label: 'Architecture',
			id: '-KXc-PKubG8nUAF4rbDW'
		},{
			src: 'img/interest/art.jpg',
			label: 'Art',
			id: '-KXc-PKubG8nUAF4rbDX'
		},{
			src: 'img/interest/car.jpg',
			label: 'Cars',
			id: '-KXc-PKvsIOIXTjTComa'
		},{
			src: 'img/interest/design.jpg',
			label: 'Design',
			id: '-KXc-PKvsIOIXTjTComb'
		},{
			src: 'img/interest/diy.jpg',
			label: 'DIY',
			id: '-KXc-PKvsIOIXTjTComc'
		},{
			src: 'img/interest/education.jpg',
			label: 'Education',
			id: '-KXc-PKvsIOIXTjTComd'
		},{
			src: 'img/interest/events.jpg',
			label: 'Events',
			id: '-KXc-PKvsIOIXTjTCome'
		},{
			src: 'img/interest/fashion.jpg',
			label: 'Fashion',
			id: '-KXc-PKyp2pTaXsaG6Ff'
		},{
			src: 'img/interest/beer.jpg',
			label: 'Food & Drink',
			id: '-KXc-PKzxbTiOJzK6j72'
		},{
			src: 'img/interest/video-controller.jpg',
			label: 'Games',
			id: '-KXc-PL0mQ1oYXeDiEyq'
		},{
			src: 'img/interest/garden.jpg',
			label: 'Gardening',
			id: '-KXc-PL0mQ1oYXeDiEyr'
		},{
			src: 'img/interest/hair.jpg',
			label: 'Hair & Beauty',
			id: '-KXc-PL0mQ1oYXeDiEys'
		},{
			src: 'img/interest/roller-skates.jpg',
			label: 'Health & Sports',
			id: '-KXc-PL1IJeRKtEt1R70'
		},{
			src: 'img/interest/music.jpg',
			label: 'Music',
			id: '-KXc-PL1IJeRKtEt1R71'
		},{
			src: 'img/interest/outdoor.jpg',
			label: 'Outdoors',
			id: '-KXc-PL3SLOgnBvXlR5i'
		},{
			src: 'img/interest/technology.jpg',
			label: 'Technology',
			id: '-KXc-PL3SLOgnBvXlR5j'
	}];

	$scope.repeatData = $scope.interestImages.map(function(value, index) {
			return {
					src: value.src,
					label: value.label,
					id: $scope.abs
			};
	});


		$scope.getInterest().then(function(results) {
			var interests = [];
			for (key in results){
				interests.push({
					id: key
				});
			}
			$scope.interestId = interests;
			console.log(interests);

		});

		$scope.profile = $localStorage.account;

		$scope.getLeadInterest = function(id){
			return interestService.getLeaderInterest(id);
		};

		$scope.getLeadInterest().then(function(results) {
			var interests = [];
			for (key in results){
				interests.push({
					id: key
				});
			}
			$scope.leadInterest = interests;
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
				if($scope.limit <=  max){
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
}]);

angular.module('module.view.roleRather', [])
	.controller('roleRatherCtrl', ['$scope','$rootScope','$ionicHistory','$state','interestService','$localStorage', '$stateParams', 'engagementService',
		function($scope,$rootScope,$ionicHistory,$state,interestService,$localStorage,$stateParams, engagementService) {
		$scope.data = {};
		$scope.data.editProfile = $state.prevScope == 'user' ? true : false;

		$scope.hideNext = $stateParams.location;
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

			$scope.hideNext = $stateParams.location;

			$scope.limit = 10;

			$scope.ratherImages = [{
				src: 'img/roleRather/animal-explore.jpeg',
				label: 'Animals',
				id: '-KXc-PL6yz4ugqb4XxuH'
			},{
				src: 'img/roleRather/architecture-explore.jpeg',
				label: 'Architecture',
				id: '-KXc-PL6yz4ugqb4XxuI'
			},{
				src: 'img/roleRather/new-art.jpeg',
				label: 'Art',
				id: '-KXc-PL6yz4ugqb4XxuJ'
			},{
				src: 'img/roleRather/car.jpeg',
				label: 'Cars',
				id: '-KXc-PL6yz4ugqb4XxuK'
			},{
				src: 'img/roleRather/design-explore.jpg',
				label: 'Design',
				id: '-KXc-PL6yz4ugqb4XxuL'
			},{
				src: 'img/roleRather/diy-explore.jpeg',
				label: 'DIY',
				id: '-KXc-PL73JPkLGBGOhT0'
			},{
				src: 'img/roleRather/education-explore.jpg',
				label: 'Education',
				id: '-KXc-PL9UBFedjtGjwym'
			},{
				src: 'img/roleRather/new-events.jpeg',
				label: 'Events',
				id: '-KXc-PL9UBFedjtGjwyn'
			},{
				src: 'img/roleRather/fashion-explore.jpg',
				label: 'Fashion',
				id: '-KXc-PL9UBFedjtGjwyo'
			},{
				src: 'img/roleRather/new-food.jpeg',
				label: 'Food & Drink',
				id: '-KXc-PL9UBFedjtGjwyp'
			},{
				src: 'img/roleRather/games-explore.jpeg',
				label: 'Games',
				id: '-KXc-PLA0DrJOIW_0BOY'
			},{
				src: 'img/roleRather/gardening-explore.jpg',
				label: 'Gardening',
				id: '-KXc-PLBtt6_xc6WZesE'
			},{
				src: 'img/roleRather/hair-explore.jpeg',
				label: 'Hair & Beauty',
				id: '-KXc-PLBtt6_xc6WZesF'
			},{
				src: 'img/roleRather/health-explore.jpg',
				label: 'Health & Sports',
				id: '-KXc-PLBtt6_xc6WZesG'
			},{
				src: 'img/roleRather/music-explore.jpg',
				label: 'Music',
				id: '-KXc-PLCBDqeU-66GvDx'
			},{
				src: 'img/roleRather/outdoors-explore.jpeg',
				label: 'Outdoors',
				id: '-KXc-PLCBDqeU-66GvDy'
			},{
				src: 'img/roleRather/tech-phone.jpeg',
				label: 'Technology',
				id: '-KXc-PLCBDqeU-66GvDz'
		}];

		$scope.repeatData = $scope.ratherImages.map(function(value, index) {
				return {
						src: value.src,
						label: value.label,
						id: $scope.abs
				};
		});

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

			$scope.getInterest = function(id){
				return interestService.getLeaderInterest(id);
			};

			$scope.getInterest().then(function(results) {
				var interests = [];
				for (key in results){
					interests.push({
						id: key
					});
				}
				$scope.interests = interests;
				console.log(interests);
			});

			$scope.gotoProfile = function () {
											$state.go('tabs.account');
											$ionicHistory.nextViewOptions({
													disableAnimate: true,
													disableBack: true
						});
					};

			$scope.isChecked = false;
		    $scope.selected = [];
		    $scope.checkedOrNot = function (interest, isChecked, index) {
		        if (isChecked) {
		            $scope.selected.push(interest);
								engagementService.engagedActivities({category:'leaderInterest', categoryId:interest.id, userId:$localStorage.account.userId});
		        } else {
		            var _index = $scope.selected.indexOf(interest);
		            $scope.selected.splice(_index, 1);
								engagementService.disEngagedActivities({category:'leaderInterest', categoryId:interest.id, userId:$localStorage.account.userId});
		        }
		    };


}]);

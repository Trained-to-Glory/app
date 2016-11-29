angular.module('module.view.rather', [])
	.controller('ratherCtrl', ['$scope','$rootScope','$state','$ionicHistory','interestService','$localStorage', 'engagementService',
		function($scope,$rootScope,$state,$ionicHistory,interestService,$localStorage, engagementService) {
		$scope.data = {};
		$scope.data.editProfile = $state.prevScope == 'user' ? true : false;
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


			$scope.gotoProfile = function () {
	                    $state.go('tabs.account');
	                    $ionicHistory.nextViewOptions({
	                        disableAnimate: true,
	                        disableBack: true
	          });
	        };
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

			$scope.getInterest = function(id){
				return interestService.get(id);
			};

			$scope.getInterest().then(function(results) {
				var interests = [];
				for (key in results){
					interests.push({
						id: key,
						label: results[key].displayName
					});
				}
				$scope.interests = interests;
			});

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

}]);

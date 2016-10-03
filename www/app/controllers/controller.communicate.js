angular.module('module.view.communicate', [])
	.controller('communicateCtrl', function($scope,$rootScope,$state,$ionicHistory,usersService,$localStorage,interestService) {

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

                $scope.getInterest = function(id){
      						return interestService.get(id);
      					};

      					$scope.getInterest().then(function(results) {
      						var interests = [];
      						for (key in results){
      							interests.push({
      								id: key,
      								label: results[key].displayName,
      								photo: results[key].backgroundImg,
      								icon: results[key].icon
      							});
      						}
      						$scope.abs = interests;
      					}, function(error){
      					}).catch(function(error){
      					});

                usersService.getUserPostsLikes($localStorage.account.userId).then(function(results) {
              		//create a local object so we can create the datastructure we want
              		//so we can use it to show/hide, toggle ui items
              		 $scope.userPostsLikes = results;
              	});

                usersService.getUserCommitsPlan($localStorage.account.userId).then(function(results) {
              		//create a local object so we can create the datastructure we want
              		//so we can use it to show/hide, toggle ui items
              		 $scope.userPlanCommits = results;
              	});

                usersService.getUserCommitsPost($localStorage.account.userId).then(function(results) {
              		//create a local object so we can create the datastructure we want
              		//so we can use it to show/hide, toggle ui items
              		 $scope.userPostCommits = results;
              	});

                usersService.getUserCommitsAppointment($localStorage.account.userId).then(function(results) {
              		//create a local object so we can create the datastructure we want
              		//so we can use it to show/hide, toggle ui items
              		 $scope.userAppointmentCommits = results;
              	});

});

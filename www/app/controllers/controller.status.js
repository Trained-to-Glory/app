angular.module('module.view.status', [])
	.controller('statusCtrl', function($scope,$rootScope,$state,$localStorage) {
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

			$scope.user = {
	      email: '',
	      password: ''
	    };

			var ref = firebase.database().ref('accounts');
			ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
				firebase.database().ref('/accounts/' + snapshot.key ).set({
					status: $scope.user.person || $scope.user.leader
				});
			});
});

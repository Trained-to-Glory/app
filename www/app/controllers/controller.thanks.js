angular.module('module.view.thanks', [])
	.controller('thanksCtrl', function($scope,$rootScope,$log,$state,$http) {

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
	// Stripe Response Handler
		$scope.stripeCallback = function (code, result) {
		    if (result.error) {
		      $log.log('it failed! error: ' + result.error.message);
		    } else {
						$http.post('https://cryptic-castle-62840.herokuapp.com/stripe/charge', {token: result.id}).then(function(result){
							console.log(result);
						},function(error){
							console.log(error);
						});
		        $log.log('success! token: ' + result.id);
		    }
		};
});

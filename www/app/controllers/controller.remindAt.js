angular.module('module.view.remind', [])
	.controller('remindCtrl', function($scope,$rootScope,$state) {

		$scope.closeRemindAt = function () {
        $scope.modalRemindAt.hide();
    };

		$scope.isChecked = false;
			$scope.selected = [];
			$scope.checkedOrNot = function (item, isChecked, index) {
					if (isChecked) {
							$scope.selected.push(item);
					} else {
							var _index = $scope.selected.indexOf(item);
							$scope.selected.splice(_index, 1);
					}
					//$scope.selected.push($localStorage.account);

			};
});

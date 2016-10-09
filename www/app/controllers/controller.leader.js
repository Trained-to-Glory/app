angular.module('module.view.leader', [])
	.controller('leaderCtrl', function($scope,$rootScope,$state) {
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
								
        $scope.profile = { type: 1 };

		$scope.gotoMatch = function () {
                    $state.go('tabs.match');

        };

       $scope.gotoBrowse = function () {
                    $state.go('tabs.news');

        };

        $scope.gotoAccount = function () {
                    $state.go('tabs.account');

        };


});

var searchTemplate =
    '<ion-popover-view class="search">' +
    '<ion-content scroll="false">' +
    '<div class="list item-input-inset">' +
    '<label class="item-input-wrapper">' +
    '<i class="icon ion-ios-search placeholder-icon"></i>' +
    '<input type="search" placeholder="Search" ng-model="schoolSearch" ng-model-options="{ debounce: 550 }" ng-change="getSearch(schoolSearch)"></label>' +
    ' <i class="icon ion-close" ng-show="schoolSearch" ng-click="getSearch(\'\');popover.hide($event);schoolSearch=\'\'"></i>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

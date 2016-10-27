angular.module('module.view.trainers', [])
	.controller('trainersCtrl', function($scope,$rootScope,$state,partnersService,$stateParams) {
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

		$scope.gotoLeader = function () {
                    $state.go('tabs.leader');

        };


        $scope.contacts = partnersService.getContacts();
});

var contactTemplate =
    '<ion-popover-view class="right large">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-avatar item-text-wrap" ng-click="contactPopover.hide($event);"ng-repeat="contact in contacts" ui-sref="tabs.chat({chat: contact})">' +
    '<img ng-src="{{contact.photo}}">' +
    '<h2 class="dark font-thin">{{contact.name}}</h2>' +
    '<p class="dark font-thin">{{contact.subject}}</p>' +
    '</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

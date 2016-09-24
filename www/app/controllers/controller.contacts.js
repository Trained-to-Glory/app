angular.module('module.view.contacts', [])
	.controller('contactsCtrl', function($scope,$rootScope,$state,$localStorage,engagementService,partnersService,$stateParams,interestService) {
		console.log($stateParams);
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

				$scope.togglePartner = function(partnerId){
						var partner = $scope.account;
					console.log({partnerId: partnerId, partner: partner, userId: $localStorage.account.userId});
					   if(!partner){
							 return false;
						 }
						partner.partnered = !partner.partnered;
						var state = (partner.partnered)?'partner':'unpartner';
						return engagementService[state]({category:'partners', categoryId:partnerId, userId: $localStorage.account.userId});
				};

		$scope.gotoFriend = function () {
                    $state.go('tabs.friend');

        };
				interestService.getInterestUsers($stateParams.activity).then(function(results){
						$scope.users = results;
						console.log($scope.users);
				});
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

angular.module('module.view.settings', [])
	.controller('settingsCtrl', function($scope,$rootScope,$cordovaInAppBrowser,$state,$ionicPopover,$stateParams,$ionicLoading,$timeout,Popup,$localStorage) {
				$scope.service = function(){
					$cordovaInAppBrowser.open('https://www.trainedtoglory.com/terms-of-service','_blank', 'location=yes');return false;
					$state.go('service');
				}

				var options = {
		      location: 'yes',
		      clearcache: 'yes',
		      toolbar: 'yes',
		      closebuttoncaption: 'DONE?'
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

				$scope.profile = $localStorage.account;

				$scope.policy = function () {
						$state.go('policy');
				};

				$scope.service = function () {
						$state.go('service');
				};

				$scope.support = function () {
						$state.go('support');
				};


				$scope.logout = function() {
				 if (firebase.auth()) {
					 firebase.auth().signOut().then(function() {
						 //Clear the saved credentials.
						 $localStorage.$reset();
						 //Proceed to login screen.
						 $state.go('signin');
					 }, function(error) {
						 //Show error message.
						 Utils.message(Popup.errorIcon, Popup.errorLogout);
					 });
				 }
			 };

});

var popoverTemplate =
		'<ion-popover-view class="menu popover" ng-click="popover.hide()" style="background-color: #fff;top: -9px;">' +
		'<ion-content scroll="true">' +
		'<ion-list style="position:absolute;top:-10vh;">' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="browse()"> Home' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="search()"> Search' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="match()"> Match' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="explore()"> Discover' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="coach()"> Leaders' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="plans()"> Goals' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="calendar()"> Sessions' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="notifications()"> Notifications' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="partners()"> Partners' +
		'</ion-item>' +
		'<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="settings()"> Settings' +
		'</ion-item>' +
		'<a class="item item-avatar" nav-clear style="padding-left: 65px;padding-top:15px;" ng-click="account()">'+
		'<img ng-src="{{ profile.userPhoto }}" style="margin-left: 2px;">'+
		'<p style="display: block;color: black !important;">{{profile.firstName + " " + profile.lastName}}<p style="display:block;color: red">{{profile.userName}}</p>'+
		'</a>'+
		'<ion-item class="font-thin" style="font-size: 18px;display:table;" ng-click="logout()"> Sign Out' +
		'</ion-item>' +
		'</ion-list>'+
		'</ion-content>' +
		'</ion-popover-view>';

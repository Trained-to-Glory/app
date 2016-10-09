angular.module('module.view.reminders', [])
	.controller('remindersCtrl', function($scope,postService,usersService,$localStorage, $rootScope,$state,$ionicPopover,$ionicModal,appService,engagementService,$localStorage) {
	postService.getUserAppointments($localStorage.account.userId).then(function(results) {
		var reminders = {
			items: results
		};
		for(var id in reminders.items){
		 //check to see if there is a like on this post
		 engagementService.committed({category:'post',categoryId:id, userId: $localStorage.account.userId}).then(function(committed){
			 view.items[id].committed = committed;
		 });
		};
		$scope.reminders = reminders;
	});

	$scope.toggleCommit = function(postId, userId){
		var posts = $scope.reminders.items;
		if(postId in posts){
			var post = $scope.reminders.items[postId];
			var actionable = post.state.actionable;
			if(actionable){
				post.committed = !post.committed;
				var state = (post.committed)?'commit':'decommit';
				return engagementService[state]({category:'schedule', categoryId:postId, userId: $localStorage.account.userId});
			}
		}
			return false;
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

	usersService.getUserCommits($localStorage.account.userId).then(function(results) {
		//create a local object so we can create the datastructure we want
		//so we can use it to show/hide, toggle ui items
		 $scope.userCommits = results;
	});

	$scope.profile = $localStorage.account;

	$scope.delete = function (id) {
			return postService.deleteAppointment(id);
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



        $scope.viewDate = new Date();
                $scope.notifyTimes = ['at set time', '15 mins before', '30 mins before', '45 mins before', 'an hour before'];
                $scope.notifications = appService.getNotifications();
                getDateEvents(moment($scope.viewDate._d).startOf('day')._d);

                $scope.decrementDate = function (item) {
                    if (angular.isUndefined($scope.viewDate._d)) $scope.viewDate = moment($scope.viewDate).startOf('day').subtract(1, 'days');
                    else $scope.viewDate = moment($scope.viewDate._d).startOf('day').subtract(1, 'days');
                    getDateEvents($scope.viewDate._d)
                };

                $scope.incrementDate = function (item) {
                    if (angular.isUndefined($scope.viewDate._d)) $scope.viewDate = moment($scope.viewDate).startOf('day').add(1, 'days');
                    else $scope.viewDate = moment($scope.viewDate._d).startOf('day').add(1, 'day');
                    getDateEvents($scope.viewDate._d)
                };
                function getDateEvents(date) {
                    var range = moment().range(date, moment(date).endOf('day'));
                    $scope.seletedDateEvents = [];
                    angular.forEach($scope.notifications, function (value, key) {
                        if (moment(value.startsAt).within(range)) {
                            $scope.seletedDateEvents.push(value);
                        }
                    });
                }

                if ($state.is('create-edit-reminder')) {
                    $stateParams.reminder !== null ? $scope.reminder = angular.copy($stateParams.reminder) : $scope.reminder = { type: 'Add Task', startsAt: new Date(), endsAt: new Date(), allDay: true, remindTime: [] };
                    $stateParams.type !== null ? $scope.reminder.type = angular.copy($stateParams.type) : null;
                }

                $scope.calendarPopover = $ionicPopover.fromTemplate(calendarTemplate, {
                    scope: $scope
                });

                $ionicModal.fromTemplateUrl('app/dashboard/remind-at-modal.html', {
                    scope: $scope,
                    animation: 'fade-in-scale'
                }).then(function (modal) {
                    $scope.modalRemindAt = modal;
                });
                $scope.openRemindAt = function () {
                    $scope.modalRemindAt.show();
                };

                $scope.closeRemindAt = function () {
                    $scope.modalRemindAt.hide();
                };

                $scope.notifyCheck = function (index, item) {
                    if (angular.isUndefined($scope.reminder.remindTime[index])) {
                        $scope.reminder.remindTime[index] = item;
                    } else {
                        $scope.reminder.remindTime[index] = false;
                    }
                }

                $scope.saveReminder = function () {
                    if ($scope.reminderForm.$valid) {
                        if ($stateParams.reminder === null) {
                            $rootScope.notifications.push($scope.reminder);
                        } else {
                            $rootScope.notifications.splice($rootScope.notifications.indexOf(_.find($rootScope.notifications, function (obj) { return obj == $stateParams.reminder })), 1, $scope.reminder);
                        }
                    } else {
                        appService.showAlert('Form Invalid', '<p class="text-center">A title and start date is required</p>', 'Ok', 'button-assertive', null);
                    }

                }

								$scope.fullscreenPopover = $ionicPopover.fromTemplate(popoverTemplate, {
										scope: $scope
								});
    $scope.calendarView = 'month';
                $scope.viewDate = new Date();
                $scope.events = $scope.notifications;

                $scope.eventClicked = function (event) {
                    //alert.show('Clicked', event);
                };

                $scope.eventEdited = function (event) {
                    //alert.show('Edited', event);
                };

                $scope.eventDeleted = function (event) {
                    //alert.show('Deleted', event);
                };

                $scope.eventTimesChanged = function (event) {
                    //alert.show('Dropped or resized', event);
                };

                $scope.toggle = function ($event, field, event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    event[field] = !event[field];
                };

                $scope.viewChangeClicked = function (nextView, date) {
                    $scope.viewDate = date;
                    $scope.seletedDateEvents = [];
                    if (nextView === 'day') {
                        angular.forEach($scope.events, function (value, key) {
                            var range = moment().range(value.startsAt, value.endsAt);
                            if (range.contains(date)) {
                                $scope.seletedDateEvents.push(value);
                            }
                        });
                        return false;
                    }
                };

                $scope.getDayEvents = function () {
                    $scope.selectedDate = new Date();
                    angular.forEach($scope.events, function (value, key) {
                        var range = moment().range(value.startsAt, value.endsAt);
                        if (range.contains(new Date())) {
                            $scope.seletedDateEvents.push(value);
                        }
                    });
                }

								$scope.browse = function () {

										$state.go('tabs.news');
								};

								$scope.explore = function () {

										$state.go('tabs.explore');
								};

								$scope.match = function () {

										$state.go('tabs.match');
								};

								$scope.coach = function () {

										$state.go('tabs.coach');
								};

								$scope.plans = function () {

										$state.go('tabs.sentPlans');
								};

								$scope.reminder = function () {

										$state.go('tabs.reminders');
								};

								$scope.likeList = function () {

										$state.go('tabs.likeList');
								};

								$scope.partners = function () {

										$state.go('tabs.partners');
								};

								$scope.settings = function () {

										$state.go('tabs.settings');
								};

								$scope.search = function () {

										$state.go('tabs.search');
								};

								$scope.calendar = function () {

										$state.go('tabs.reminders');
								};

								$scope.notifications = function () {

										$state.go('tabs.communicate');
								};

								$scope.account = function (){
									$state.go('tabs.account')
								};

								$scope.logout = function() {

								 if (firebase.auth()) {
									 firebase.auth().signOut().then(function() {
										 //Clear the saved credentials.
										 $localStorage.$reset();
										 //Proceed to login screen.
										 $state.go('authentication');
									 }, function(error) {
										 //Show error message.
										 Utils.message(Popup.errorIcon, Popup.errorLogout);
									 });
								 }
							 };

								$scope.menuPopover = $ionicPopover.fromTemplate(menuTemplate, {
				            scope: $scope
				        });



});

moment.locale('en', {
    calendar: {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow, ] MMM Do dddd',
        lastWeek: '[Last] MMM Do dddd',
        nextWeek: 'MMM Do dddd',
        sameElse: 'L'
    }
})

var calendarTemplate =
    '<ion-popover-view class="large center calendar">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'Add Call\'})"><i class="icon ion-ios-telephone-outline"></i>Add Call</div>' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'Add Email\'})"><i class="icon ion-ios-at"></i>Add Email</div>' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'Add Task\'})"><i class="icon ion-ios-checkmark-outline"></i>Add Task</div>' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'Add Event\'})"><i class="icon ion-ios-calendar-outline"></i>Add Event</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';
		var menuTemplate =
		    '<ion-popover-view class="menu popover" style="background-color: #fff;top: -9px;">' +
		    '<ion-content scroll="true">' +
		    '<ion-list style="position:absolute;top:-10vh;">' +
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="browse()"> Home' +
		    '</ion-item>' +
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="search()"> Search' +
		    '</ion-item>' +
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="match()"> Match' +
		    '</ion-item>' +
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="explore()"> Explore' +
		    '</ion-item>' +
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="coach()"> Coaches' +
		    '</ion-item>' +
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="plans()"> Plans' +
		    '</ion-item>' +
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="calendar()"> Calendar' +
		    '</ion-item>' +
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="notifications()"> Notifications' +
		    '</ion-item>' +
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="partners()"> Partners' +
		    '</ion-item>' +
		    '<ion-item class="font-thin" style="font-size: 24px;margin-bottom:3vh;display:table;" ng-click="settings()"> Settings' +
		    '</ion-item>' +
		    '<a class="item item-avatar" nav-clear style="padding-left: 65px;padding-top:15px; ng-click="account()"">'+
		    '<img ng-src="{{ profile.userPhoto }}">'+
		    '<p style="display: block;color: black !important;">{{profile.firstName + " " + profile.lastName}}<p style="display:block;color: red">{{profile.userName}}</p>'+
		    '</a>'+
		    '<ion-item class="font-thin" style="font-size: 18px;display:table;" ng-click="logout()"> Sign Out' +
		    '</ion-item>' +
		    '</ion-list>'+
		    '</ion-content>' +
		    '</ion-popover-view>';

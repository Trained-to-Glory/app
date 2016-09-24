angular.module('module.view.signup', ['full_starter.factory'])
	.controller('signupCtrl', function($scope,$rootScope,engagementService,$ionicPopup,$state,conversationService,Utils,Popup,$localStorage,interestService,userInterestService) {
   $scope.$on('$ionicView.enter', function() {
    //Clear the Registration Form.
    $scope.user = {
      email: '',
      password: ''
    };
  })
	var ttgLogo = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/TTG-Symbol-2015-02.png?alt=media&token=b10c70be-92a1-47af-84c4-ab82500922fb';

   $scope.register = function(user) {
		 	//Function to retrieve the account object from the Firebase database and store it on $localStorage.account.
		   getAccountAndLogin = function(key) {
		     firebase.database().ref('accounts/' + key).on('value', function(response) {
		       var account = response.val();
		 			account.key = key;
		       $localStorage.account = account;
		 			$localStorage.key = account.key;
		     });
		     $state.go('tabs.rather');
		   };
    //Check if form is filled up.
    if (angular.isDefined(user)) {
      Utils.show();
      firebase.database().ref('accounts').orderByChild('userName').equalTo(user.userName).once('value').then(function(accounts) {
        if (accounts.exists()) {
          Utils.message(Popup.errorIcon, Popup.emailAlreadyExists);
        } else {
          //Create Firebase account.
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(function() {
							var userId = firebase.auth().currentUser.uid;
              //Add Firebase account reference to Database. Firebase v3 Implementation.
              firebase.database().ref('accounts').child(userId).set({
                email: user.email,
                firstName: user.firstName,
								userPhoto: ttgLogo,
                lastName: user.lastName,
                userName: user.userName,
                userId: firebase.auth().currentUser.uid,
                dateCreated: Date(),
                provider: 'Firebase'
              }).then(function(response) {
                //Account created successfully, logging user in automatically after a short delay.
                Utils.message(Popup.successIcon, Popup.accountCreateSuccess)
                  .then(function() {
                    getAccountAndLogin(response);
                  })
                  .catch(function() {
                    //User closed the prompt, proceed immediately to login.
                    getAccountAndLogin(response);
                  });
                $localStorage.loginProvider = "Firebase";
                $localStorage.email = user.email;
                $localStorage.password = user.password;
              });
            })
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              //Show error message.
              console.log(errorCode);
              switch (errorCode) {
								case 'username is already in use':
									$ionicPopup.show({
										title: 'Error',
										subTitle: error.message,
										buttons: [
											{ text: 'OK' }
										]
									});
									break;
                case 'auth/email-already-in-use':
								$ionicPopup.show({
									title: 'Error',
									subTitle: error.message,
									buttons: [
										{ text: 'OK' }
									]
								});
                  Utils.message(Popup.errorIcon, Popup.emailAlreadyExists);
                  break;
                case 'auth/invalid-email':
								$ionicPopup.show({
									title: 'Error',
									subTitle: error.message,
									buttons: [
										{ text: 'OK' }
									]
								});
                  Utils.message(Popup.errorIcon, Popup.invalidEmail);
                  break;
                case 'auth/operation-not-allowed':
								$ionicPopup.show({
									title: 'Error',
									subTitle: error.message,
									buttons: [
										{ text: 'OK' }
									]
								});
                  Utils.message(Popup.errorIcon, Popup.notAllowed);
                  break;
                case 'auth/weak-password':
								$ionicPopup.show({
									title: 'Error',
									subTitle: error.message,
									buttons: [
										{ text: 'OK' }
									]
								});
                  Utils.message(Popup.errorIcon, Popup.weakPassword);
                  break;
                default:
								$ionicPopup.show({
									title: 'Error',
									subTitle: error.message,
									buttons: [
										{ text: 'OK' }
									]
								});
                  Utils.message(Popup.errorIcon, Popup.errorRegister);
                  break;
              }
            });
        }
      });
    }
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

  $scope.createInterestList = function(){
    return interestService.createInterestList();
  };



    $scope.starterScreen = function() {
				console.log('controller.signup StartScreen()');

                $rootScope.user = {
                    id: 1,
                    name: 'Adam Ionic',
                    email: 'adamionic@email.com',
                    photo: 'img/users/1.jpg',
                    city: 'Cambridge, United Kingdom'
                }
                $scope.contacts = conversationsService.getContacts();
                $scope.searchPopover = $ionicPopover.fromTemplate(searchTemplate, {
                    scope: $scope
                });
                $scope.getSearch = function (search) {
                    $scope.searchFilter = search;
                }

                $cordovaGeolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: true }).then(
                    function (position) {
                        $rootScope.currentLocation = [position.coords.latitude, position.coords.longitude];
                    });

                $scope.goTo = function (page) {
                    $scope.closeAll();//Close all Modals
                    $state.go(page);
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
                }

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

                $scope.signOut = function () {
                    $ionicLoading.show({
                        template: 'Signing out...'
                    });
                    $timeout(function () {
                        $ionicLoading.hide();
                        $scope.goTo('authentication');
                    }, 2000);

               }
          }
});

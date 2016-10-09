angular.module('module.view.login', [])
  .controller('loginCtrl', function ($scope, $ionicPopup, $rootScope, $state, $ionicModal, postService, $ionicLoading,$firebaseAuth, $timeout, $localStorage, Utils, $cordovaOauth, Popup, Social) {
    $scope.$on('$ionicView.enter','cloud:push:notification', function (event, data) {
         var msg = data.message;
         alert(msg.title + ': ' + msg.text);
      //Clear the Login Form.
      $scope.user = {
        email: '',
        password: ''
      };

      //Check if user is already authenticated on Firebase and authenticate using the saved credentials.
      if ($localStorage) {
        if ($localStorage.loginProvider) {
          Utils.message(Popup.successIcon, Popup.welcomeBack);
          //The user is previously logged in, and there is a saved login credential.
          if ($localStorage.loginProvider == "Firebase") {
            //Log the user in using Firebase.
            loginWithFirebase($localStorage.email, $localStorage.password);
          } else {
            //Log the user in using Social Login.
            var provider = $localStorage.loginProvider;
            var credential;
            switch (provider) {
              case 'Facebook':
                credential = firebase.auth.FacebookAuthProvider.credential($localStorage.access_token);
                break;
              case 'Google':
                credential = firebase.auth.GoogleAuthProvider.credential($localStorage.id_token, $localStorage.access_token);
                break;
              case 'Twitter':
                credential = firebase.auth.TwitterAuthProvider.credential($localStorage.oauth_token, $localStorage.oauth_token_secret);
                break;
            }
            loginWithCredential(credential, $localStorage.loginProvider);
          }
        } else if ($localStorage.isGuest) {
          //The user previously logged in as guest, entering as a new guest again.
          Utils.message(Popup.successIcon, Popup.welcomeBack);
          loginFirebaseGuest();
        }
      }
    })

    $scope.login = function (user) {
      if (angular.isDefined(user)) {
        Utils.show();
        loginWithFirebase(user.email, user.password);
      }
    };

    //Function to login to Firebase using email and password.
    loginWithFirebase = function (email, password) {

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (response) {
          //Retrieve the account from the Firebase Database
          var userId = firebase.auth().currentUser.uid;
          firebase.database().ref('accounts').orderByChild('userId').equalTo(userId).once('value').then(function (accounts) {
            if (accounts.exists()) {
              accounts.forEach(function (account) {
                //Account already exists, proceed to home.
                Utils.hide();
                firebase.database().ref('accounts/' + account.key).on('value', function (response) {
                  var account = response.val();
                  $localStorage.account = account;
                });
                $state.go('tabs.news');
              });
            }
          });
          $localStorage.loginProvider = "Firebase";
          $localStorage.email = email;
          $localStorage.password = password;
        })
        .catch(function (error) {
          var errorCode = error.code;
          showFirebaseLoginError(errorCode);
        });
    }

    //Function to login to Firebase using a credential and provider.
    loginWithCredential = function (credential, provider) {
      firebase.auth().signInWithCredential(credential)
        .then(function (response) {
          //Check if account already exists on the database.
          checkAndLoginAccount(response, provider, credential);
          //Save social login credentials.
          $localStorage.loginProvider = provider;
          $localStorage.credential = credential;
        })
        .catch(function (error) {
          //Show error message.
          var errorCode = error.code;
          showSocialLoginError(errorCode);
        });
    };

    //Check if the Social Login used already has an account on the Firebase Database. If not, the user is asked to complete a form.
    checkAndLoginAccount = function (response, provider, credential) {
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('accounts').orderByChild('userId').equalTo(userId).once('value').then(function (accounts) {
        if (accounts.exists()) {
          accounts.forEach(function (account) {
            //Account already exists, proceed to home.
            Utils.hide();
            firebase.database().ref('accounts/' + account.key).on('value', function (response) {
              var account = response.val();
              $localStorage.account = account;
            });
            $state.go('tabs.news');
          });
        } else {
          //No account yet, proceed to completeAccount.
          Utils.hide();
          $localStorage.provider = provider;
          $state.go('tabs.signup');
        }
      });
    };

    //Shows the error popup message when using the Login with Firebase.
    showFirebaseLoginError = function (errorCode) {
      switch (errorCode) {
        case 'auth/user-not-found':
        $ionicPopup.show({
          title: 'Error',
          subTitle: 'Email Not Found',
          buttons: [
            { text: 'OK' }
          ]
        });
          Utils.message(Popup.errorIcon, Popup.emailNotFound);
          break;
        case 'auth/wrong-password':
        $ionicPopup.show({
          title: 'Error',
          subTitle: 'Wrong Password. Try Again.',
          buttons: [
            { text: 'OK' }
          ]
        });
          Utils.message(Popup.errorIcon, Popup.wrongPassword);
          break;
        case 'auth/user-disabled':
        $ionicPopup.show({
          title: 'Error',
          subTitle: 'Account Disabled',
          buttons: [
            { text: 'OK' }
          ]
        });
          Utils.message(Popup.errorIcon, Popup.accountDisabled);
          break;
        case 'auth/too-many-requests':
        $ionicPopup.show({
          title: 'Error',
          subTitle: 'Too Many Requests',
          buttons: [
            { text: 'OK' }
          ]
        });
          Utils.message(Popup.errorIcon, Popup.manyRequests);
          break;
        default:
        $ionicPopup.show({
          title: 'Error',
          subTitle: 'Attempt Login Again',
          buttons: [
            { text: 'OK' }
          ]
        });
          Utils.message(Popup.errorIcon, Popup.errorLogin);
          break;
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
    }

    $scope.gotoHome = function () {
      $scope.closeAll();
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
      });
      $timeout(function () {
        $ionicLoading.hide();
        $state.go('tabs.news');
      }, 2000);

    };

    $scope.signIn = function (){
      $state.go('tabs.login');
    };

    // Login modal
    $ionicModal.fromTemplateUrl('app/intro/login.html', {
      scope: $scope,
      animation: 'fade-in-scale',
      backdropClickToClose: false
    }).then(function (modal) {
      $scope.modalLogin = modal;
    });
    $scope.openLogin = function () {
      $scope.modalLogin.show();
    };
    $scope.closeLogin = function () {
      $scope.modalLogin.hide();
    };

    // Forgot Password modal
    $ionicModal.fromTemplateUrl('app/intro/forgot.html', {
      scope: $scope,
      animation: 'fade-in-scale',
      backdropClickToClose: false
    }).then(function (modal) {
      $scope.modalForgot = modal;
    });
    $scope.openForgot = function () {
      $scope.modalForgot.show();
    };
    $scope.closeForgot = function () {
      $scope.modalForgot.hide();
    };

    $scope.closeAll = function () {
      $scope.closeForgot();
      $scope.closeLogin();
    };

    $scope.starterScreen = function () {
      $rootScope.user = {
        id: 1,
        name: 'Adam Ionic',
        email: 'adamionic@email.com',
        photo: 'img/users/1.jpg',
        city: 'Cambridge, United Kingdom'
      }
      $scope.contacts = engagementsService.getContacts();
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

    $scope.$on('$ionicView.enter', function() {
     //Clear the Registration Form.
     $scope.user = {
       email: '',
       password: ''
     };
   })
   var ttgLogo = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/blank-profile-picture-973460_1280.png?alt=media&token=8459468a-c1df-41dc-9645-a10582b0656d';

    $scope.register = function(user) {
       //Function to retrieve the account object from the Firebase database and store it on $localStorage.account.
     //Check if form is filled up.
     if (angular.isDefined(user)) {
       Utils.show();
       firebase.database().ref('accounts').orderByChild('userName').equalTo(user.userName).once('value').then(function(accounts) {
         if (accounts.exists()) {
           Utils.message();
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
                 Utils.message()
                   .then(function() {
                     getAccountAndLogin(firebase.auth().currentUser.uid);
                   })
                   .catch(function() {
                     //User closed the prompt, proceed immediately to login.
                     getAccountAndLogin(firebase.auth().currentUser.uid);
                   });
                 $localStorage.loginProvider = "Firebase";
                 $localStorage.email = user.email;
                 $localStorage.firstName = user.firstName;
                 $localStorage.lastName = user.lastName;
                 $localStorage.userName = user.userName;
                 $localStorage.photo= ttgLogo;
                 $localStorage.userId = firebase.auth().currentUser.uid;
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


   getAccountAndLogin = function(key) {
     firebase.database().ref('accounts/' + key).on('value', function(response) {
       var account = response.val();
       $localStorage.account = account;
     });
     $state.go('tabs.rather');
   };

  });

angular.module('module.view.signin', [])
  .controller('signinCtrl', ['$scope', '$ionicPopup', '$rootScope', '$state', '$ionicModal', 'postService', '$ionicLoading','$firebaseAuth', '$timeout','$ionicSlideBoxDelegate', '$localStorage', 'Utils', '$cordovaOauth', 'Popup',
    function ($scope, $ionicPopup, $rootScope, $state, $ionicModal, postService, $ionicLoading,$firebaseAuth, $timeout,$ionicSlideBoxDelegate, $localStorage, Utils, $cordovaOauth, Popup) {
    $scope.$on('$ionicView.enter', function() {
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


    $scope.login = function(user) {
      if (angular.isDefined(user)) {
        Utils.show();
        loginWithFirebase(user.email, user.password);
      }
    };


    //Function to login to Firebase using email and password.
    loginWithFirebase = function(email, password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(response) {
          //Retrieve the account from the Firebase Database
          var userId = firebase.auth().currentUser.uid;
          firebase.database().ref('accounts').orderByChild('userId').equalTo(userId).once('value').then(function(accounts) {
            if (accounts.exists()) {
              accounts.forEach(function(account) {
                //Account already exists, proceed to home.
                Utils.hide();
                firebase.database().ref('accounts/' + account.key).on('value', function(response) {
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
        .catch(function(error) {
          var errorCode = error.code;
          showFirebaseLoginError(errorCode);
        });
    }

    //Function to login to Firebase using a credential and provider.
    loginWithCredential = function(credential, provider) {
      firebase.auth().signInWithCredential(credential)
        .then(function(response) {
          //Check if account already exists on the database.
          checkAndLoginAccount(response, provider, credential);
          //Save social login credentials.
          $localStorage.loginProvider = provider;
          $localStorage.credential = credential;
        })
        .catch(function(error) {
          //Show error message.
          var errorCode = error.code;
          showSocialLoginError(errorCode);
        });
    };

    //Function to login guests to Firebase. Note that each attempt inserts a new user in your Firebase Auth User with their own userId.
    loginFirebaseGuest = function() {
      firebase.auth().signInAnonymously()
        .then(function(response) {
          Utils.hide();
          $localStorage.isGuest = true;
          $state.go('tabs.news');
        })
        .catch(function(error) {
          var errorCode = error.code;
          showFirebaseLoginError(errorCode);
        });
    };

    //Check if the Social Login used already has an account on the Firebase Database. If not, the user is asked to complete a form.
    checkAndLoginAccount = function(response, provider, credential) {
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('accounts').orderByChild('userId').equalTo(userId).once('value').then(function(accounts) {
        if (accounts.exists()) {
          accounts.forEach(function(account) {
            //Account already exists, proceed to home.
            Utils.hide();
            firebase.database().ref('accounts/' + account.key).on('value', function(response) {
              var account = response.val();
              $localStorage.account = account;
            });
            $state.go('tabs.news');
          });
        } else {
          //No account yet, proceed to completeAccount.
          Utils.hide();
          $localStorage.provider = provider;
          $state.go('authentication');
        }
      });
    };

    //Shows the error popup message when using the Login with Firebase.
    showFirebaseLoginError = function(errorCode) {
      switch (errorCode) {
        case 'auth/user-not-found':
          Utils.message(Popup.errorIcon, Popup.emailNotFound);
          break;
        case 'auth/wrong-password':
          Utils.message(Popup.errorIcon, Popup.wrongPassword);
          break;
        case 'auth/user-disabled':
          Utils.message(Popup.errorIcon, Popup.accountDisabled);
          break;
        case 'auth/too-many-requests':
          Utils.message(Popup.errorIcon, Popup.manyRequests);
          break;
        default:
          Utils.message(Popup.errorIcon, Popup.errorLogin);
          break;
      }
    };

    //Shows the error popup message when using the Social Login with Firebase.
    showSocialLoginError = function(errorCode) {
      switch (errorCode) {
        case 'auth/account-exists-with-different-credential':
          Utils.message(Popup.errorIcon, Popup.accountAlreadyExists);
          break;
        case 'auth/invalid-credential':
          Utils.message(Popup.errorIcon, Popup.sessionExpired);
          break;
        case 'auth/operation-not-allowed':
          Utils.message(Popup.errorIcon, Popup.serviceDisabled);
          break;
        case 'auth/user-disabled':
          Utils.message(Popup.errorIcon, Popup.accountDisabled);
          break;
        case 'auth/user-not-found':
          Utils.message(Popup.errorIcon, Popup.userNotFound);
          break;
        case 'auth/wrong-password':
          Utils.message(Popup.errorIcon, Popup.wrongPassword);
          break;
        default:
          Utils.message(Popup.errorIcon, Popup.errorLogin);
          break;
      }
    };

    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
      };
      $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
      };

      // Called each time the slide changes
      $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
      };


    //Check if the Social Login used already has an account on the Firebase Database. If not, the user is asked to complete a form.
  }]);

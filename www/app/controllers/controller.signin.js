angular.module('module.view.signin', [])
  .controller('signinCtrl', function ($scope, $ionicPopup, $rootScope, $state, $ionicModal, postService, $ionicLoading,$firebaseAuth, $timeout, $localStorage, Utils, $cordovaOauth, Popup, Social) {
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


    $scope.login = function(user) {
      if (angular.isDefined(user)) {
        Utils.show();
        loginWithFirebase(user.email, user.password);
      }
    };

    $scope.loginWithFacebook = function() {
      Utils.show();
      //Login with Facebook token using the appId from app.js
      $cordovaOauth.facebook(Social.facebookAppId, ["public_profile", "email"]).then(function(response) {
        var credential = firebase.auth.FacebookAuthProvider.credential(response.access_token);
        $localStorage.access_token = response.access_token;
        loginWithCredential(credential, 'Facebook');
      }, function(error) {
        //User cancelled login. Hide the loading modal.
        Utils.hide();
      });
    };

    $scope.loginWithGoogle = function() {
      Utils.show();
      //Login with Google token using the googleWebClientId from app.js
      $cordovaOauth.google(Social.googleWebClientId, ["https://www.googleapis.com/auth/userinfo.email"]).then(function(response) {
        var credential = firebase.auth.GoogleAuthProvider.credential(response.id_token,
          response.access_token);
        $localStorage.id_token = response.id_token;
        $localStorage.access_token = response.access_token;
        loginWithCredential(credential, 'Google');
      }, function(error) {
        //User cancelled login. Hide the loading modal.
        Utils.hide();
      });
    };

    $scope.loginWithTwitter = function() {
      Utils.show();
      //Login with Twitter token using the twitterKey and twitterSecret from app.js
      $cordovaOauth.twitter(Social.twitterKey, Social.twitterSecret).then(function(response) {
        var credential = firebase.auth.TwitterAuthProvider.credential(response.oauth_token,
          response.oauth_token_secret);
        $localStorage.oauth_token = response.oauth_token;
        $localStorage.oauth_token_secret = response.oauth_token_secret;
        loginWithCredential(credential, 'Twitter');
      }, function(error) {
        //User cancelled login. Hide the loading modal.
        Utils.hide();
      });
    };

    $scope.loginAsGuest = function() {
      Utils.show();
      loginFirebaseGuest();
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
        $ionicPopup.show({
             title: 'Error',
             subTitle: Popup.emailNotFound,
             buttons: [
               { text: 'OK' }
             ]
           });
          Utils.message(Popup.errorIcon, Popup.emailNotFound);
          break;
        case 'auth/wrong-password':
        $ionicPopup.show({
             title: 'Error',
             subTitle: Popup.wrongPassword,
             buttons: [
               { text: 'OK' }
             ]
           });
          Utils.message(Popup.errorIcon, Popup.wrongPassword);
          break;
        case 'auth/user-disabled':
        $ionicPopup.show({
             title: 'Error',
             subTitle: Popup.accountDisabled,
             buttons: [
               { text: 'OK' }
             ]
           });
          Utils.message(Popup.errorIcon, Popup.accountDisabled);
          break;
        case 'auth/too-many-requests':
        $ionicPopup.show({
             title: 'Error',
             subTitle: Popup.manyRequests,
             buttons: [
               { text: 'OK' }
             ]
           });
          Utils.message(Popup.errorIcon, Popup.manyRequests);
          break;
        default:
        $ionicPopup.show({
             title: 'Error',
             subTitle: Popup.errorLogin,
             buttons: [
               { text: 'OK' }
             ]
           });
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


    //Check if the Social Login used already has an account on the Firebase Database. If not, the user is asked to complete a form.
  });

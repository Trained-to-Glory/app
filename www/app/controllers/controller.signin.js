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
  });

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
                firebase.database().ref('accounts/' + userId).on('value', function(response) {
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

    //Check if the Social Login used already has an account on the Firebase Database. If not, the user is asked to complete a form.
    checkAndLoginAccount = function(response, provider, credential) {
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('accounts').orderByChild('userId').equalTo(userId).once('value').then(function(accounts) {
        if (accounts.exists()) {
          accounts.forEach(function(account) {
            //Account already exists, proceed to home.
            Utils.hide();
            firebase.database().ref('accounts/' + userId).on('value', function(response) {
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
  });

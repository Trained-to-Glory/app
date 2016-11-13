// register.js
// This is the controller that handles the registration of the user through Firebase.
// When the user is done registering, the user is automatically logged in.
'Use Strict';
angular.module('module.view.login', [])
.controller('loginCtrl', function($scope, $state, $localStorage, Utils, Popup, $ionicPopup) {
  $scope.$on('$ionicView.enter', function() {
    //Clear the Registration Form.
    $scope.user = {
      email: '',
      password: ''
    };
  })
  var ttgLogo = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/blank-profile-picture-973460_1280.png?alt=media&token=8459468a-c1df-41dc-9645-a10582b0656d';

  $scope.register = function(user) {
    //Check if form is filled up.
    if (angular.isDefined(user)) {
      Utils.show();
      firebase.database().ref('accounts').orderByChild('email').equalTo(user.email).once('value').then(function(accounts) {
        if (accounts.exists()) {
          Utils.message(Popup.errorIcon, Popup.emailAlreadyExists);
        } else {
          //Create Firebase account.
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(function() {
              $scope.userId = firebase.auth().currentUser.uid;
              //Add Firebase account reference to Database. Firebase v3 Implementation.
              firebase.database().ref('accounts').child($scope.userId).set({
                 fullName: user.fullName,
                 userPhoto: ttgLogo,
                 person: user.person || '',
                 leader: user.leader || '',
                 userName: user.userName,
                 userId: firebase.auth().currentUser.uid,
                 dateCreated: Date(),
                 provider: 'Firebase'
              }).then(function(response) {
                //Account created successfully, logging user in automatically after a short delay.
                Utils.message(Popup.successIcon, Popup.accountCreateSuccess)
                  .then(function() {
                    getAccountAndLogin(firebase.auth().currentUser.uid);
                  })
                  .catch(function() {
                    //User closed the prompt, proceed immediately to login.
                    getAccountAndLogin(firebase.auth().currentUser.uid);
                  });
                  $localStorage.loginProvider = "Firebase";
                   $localStorage.email = user.email;
                   $localStorage.fullName = user.fullName;
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
              switch (errorCode) {
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

  getAccountAndLogin = function(userId){
    var accounts = (userId) ? firebase.database().ref('accounts/' + userId) : firebase.database().ref('accounts');
    return accounts.once('value').then(function (snapshot) {
        var currentObj = snapshot.val();
        $localStorage.account = currentObj;
        if (currentObj.person) {
          $state.go('interest');
            return currentObj;
        }else if (currentObj.leader) {
          $state.go('interest');
          return currentObj;
        }
        return undefined;
    });
  };

  //Function to retrieve the account object from the Firebase database and store it on $localStorage.account.
  // getAccountAndLogin = function(key) {
  //   firebase.database().ref('accounts/' + key).on('value', function(response) {
  //     var account = response.val();
  //     $localStorage.account = account;
  //   });
  //   $state.go('tabs.rather');
  // };

});

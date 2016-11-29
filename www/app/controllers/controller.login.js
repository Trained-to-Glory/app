// register.js
// This is the controller that handles the registration of the user through Firebase.
// When the user is done registering, the user is automatically logged in.
'Use Strict';
angular.module('module.view.login', [])
.controller('loginCtrl', ['$scope', '$state', '$localStorage', 'Utils', 'Popup', '$ionicPopup',
  function($scope, $state, $localStorage, Utils, Popup, $ionicPopup) {
  $scope.$on('$ionicView.enter', function() {
    //Clear the Registration Form.
    $scope.user = {
      email: '',
      password: ''
    };
  })
  var ttgLogo = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/profile-picture.png?alt=media&token=65aba398-c6e7-4780-b78c-75bf973d7ead';

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
                 backUpPhoto: ttgLogo,
                 status: user.person || user.leader,
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
                   $localStorage.status = user.person || user.leader;
                   $localStorage.photo= ttgLogo;
                   $localStorage.backUpPhoto = ttgLogo;
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
                  Utils.message(Popup.errorIcon, Popup.emailAlreadyExists);
                  break;
                case 'auth/invalid-email':
                  Utils.message(Popup.errorIcon, Popup.invalidEmail);
                  break;
                case 'auth/operation-not-allowed':
                  Utils.message(Popup.errorIcon, Popup.notAllowed);
                  break;
                case 'auth/weak-password':
                  Utils.message(Popup.errorIcon, Popup.weakPassword);
                  break;
                default:
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
        if (currentObj.status == 'person') {
          $state.go('interest');
            return currentObj;
        }else if (currentObj.status == 'leader') {
          $state.go('roleRather');
          return currentObj;
        }
        return undefined;
    });
  };

}]);

angular.module('module.view.signup', [])
	.controller('signupCtrl', ['$scope','$rootScope','engagementService','$ionicPopup','$state','Utils','Popup','$localStorage','interestService',
		function($scope,$rootScope,engagementService,$ionicPopup,$state,Utils,Popup,$localStorage,interestService) {
		$scope.$on('$ionicView.enter', function() {
     //Clear the Registration Form.
     $scope.user = {
       email: '',
       password: ''
     };
   })

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
               //Add Firebase account reference to Database. Firebase v3 Implementation.
               firebase.database().ref().child('accounts').push({
                 email: user.email,
                 userId: firebase.auth().currentUser.uid,
                 dateCreated: Date(),
                 provider: 'Firebase'
               }).then(function(response) {
                 //Account created successfully, logging user in automatically after a short delay.
                 Utils.message(Popup.successIcon, Popup.accountCreateSuccess)
                   .then(function() {
                     getAccountAndLogin(response.key);
                   })
                   .catch(function() {
                     //User closed the prompt, proceed immediately to login.
                     getAccountAndLogin(response.key);
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

   //Function to retrieve the account object from the Firebase database and store it on $localStorage.account.
   getAccountAndLogin = function(key) {
     firebase.database().ref('accounts/' + key).on('value', function(response) {
       var account = response.val();
       $localStorage.account = account;
     });
     $state.go('home');
   };

}]);

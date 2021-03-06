
angular.module('full_starter', ['ionic','firebase','angular.filter', 'dcbImgFallback','views.glory','ng-mfb','ion-floating-menu','ngStorage', 'ngCordovaOauth', 'ngCordova', 'full_starter.controllers', 'full_starter.routes', 'full_starter.services', 'full_starter.directives','full_starter.factory'])

  //Constants for the Popup messages
  //For the icons, refer to http://ionicons.com for all icons.
  //Here you can edit the success and error messages on the popups.
  .constant('Popup', {
    delay: 3000, //How long the popup message should show before disappearing (in milliseconds -> 3000 = 3 seconds).
    successIcon: "ion-happy-outline",
    errorIcon: "ion-sad-outline",
    accountCreateSuccess: "Congratulations! Your account has been created. Logging you in.",
    success: "Congratulations! Keep up the great work.",
    emailAlreadyExists: "Sorry, but an account with that email address already exists. Please register with a different email address.",
    userNameAlreadyExists: "Sorry, but an account with that username already exists. Please register with a different username.",
    accountAlreadyExists: "Sorry, but an account with the same credential already exists. Please check your account and try again.",
    emailNotFound: "Sorry, but we couldn\'t find an account with that email address. Please check your email and try again.",
    userNotFound: "Sorry, but we couldn\'t find a user with that account. Please check your account and try again.",
    invalidEmail: "Sorry, but you entered an invalid email. Please check your email and try again.",
    notAllowed: "Sorry, but registration is currently disabled. Please contact support and try again.",
    serviceDisabled: "Sorry, but logging in with this service is current disabled. Please contact support and try again.",
    wrongPassword: "Sorry, but the password you entered is incorrect. Please check your password and try again.",
    accountDisabled: "Sorry, but your account has been disabled. Please contact support and try again.",
    weakPassword: "Sorry, but you entered a weak password. Please enter a stronger password and try again.",
    errorRegister: "Sorry, but we encountered an error registering your account. Please try again later.",
    passwordReset: "A password reset link has been sent to: ",
    errorPasswordReset: "Sorry, but we encountered an error sending your password reset email. Please try again later.",
    errorLogout: "Sorry, but we encountered an error logging you out. Please try again later.",
    sessionExpired: "Sorry, but the login session has expired. Please try logging in again.",
    errorLogin: "Sorry, but we encountered an error logging you in. Please try again later.",
    welcomeBack: "Welcome back! It seems like you should still be logged in. Logging you in now.",
    manyRequests: "Sorry, but we\'re still proccessing your previous login. Please try again later.",

  })


  .run(['$ionicPlatform', function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.StatusBar) {
        if (ionic.Platform.isAndroid()) {
          StatusBar.backgroundColorByHexString("#D3D3D3");
        } else {
          StatusBar.backgroundColorByHexString("#D3D3D3");
        }
      }

      if (window.cordova && ionic.Platform.isIOS()) {
        window.addEventListener("statusTap", function() {
          $ionicScrollDelegate.scrollTop(true);
        });
      }


      if(window.cordova && window.cordova.InAppBrowser){
        window.open =  window.cordova.InAppBrowser.open;
      }

      $ionicPlatform.registerBackButtonAction(function(e) {
        if ($state.current.name == 'tabs.news') {
          ionic.Platform.exitApp();
        } else if($state.current.name == 'signin') {
          ionic.Platform.exitApp();
        } else if ($ionicHistory.backView()) {
          $ionicHistory.goBack();
        }
        e.preventDefault();
        return false;
      }, 101);

    });
  }])

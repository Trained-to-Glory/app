angular.module('full_starter.routes', [])
  .constant('Popup', {
    delay: 3000, //How long the popup message should show before disappearing (in milliseconds -> 3000 = 3 seconds).
    successIcon: "ion-happy-outline",
    success: "Great job, keep up the great work.",
    errorIcon: "ion-sad-outline",
    accountCreateSuccess: "Congratulations! Your account has been created. Logging you in.",
    emailAlreadyExists: "Sorry, but an account with that email address already exists. Please register with a different email and try again.",
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
    manyRequests: "Sorry, but we\'re still proccessing your previous login. Please try again later."
  })

  .config(['$stateProvider', '$urlRouterProvider','$ionicConfigProvider', '$logProvider', 'calendarConfig', function ($stateProvider, $urlRouterProvider,$ionicConfigProvider, $logProvider, calendarConfig) {
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text("");
    $ionicConfigProvider.navBar.alignTitle("left");
    $ionicConfigProvider.tabs.position("top");
    if (!ionic.Platform.isIOS()) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }

    calendarConfig.titleFormats.week = 'MMMM';
    calendarConfig.dateFormatter = 'moment';
    calendarConfig.allDateFormats.moment.date.hour = 'h:mm a';
    calendarConfig.allDateFormats.moment.title.day = 'MMM D ddd';
    calendarConfig.i18nStrings.weekNumber = 'Week {week}';
    calendarConfig.dateFormats.weekDay = 'ddd';
    calendarConfig.dateFormats.day = 'D';
    calendarConfig.displayAllMonthEvents = true;
    calendarConfig.displayEventEndTimes = true;
    //turning off $log
    $logProvider.debugEnabled(false);

    $stateProvider
      .state('tabs', {
        url: '/tabs',
        abstract: true,
        params: { account: null },
        templateUrl: 'app/core/sidemenu.html',
        controller: 'settingsCtrl'
      })

      .state('tabs.news', {
        url: '/news',
        views: {
          'Home': {
            templateUrl: 'app/news/news.html',
            controller: 'newsCtrl'
          }
        }
      })

      .state('tabs.match', {
        url: '/match',
        views: {
          'Connect': {
            templateUrl: 'app/shop/match.html',
            controller: 'matchCtrl'
          }
        }
      })


      .state('tabs.sentPlans', {
        url: '/sentPlans',
        params: { user: null },
        views: {
          'Goals': {
            templateUrl: 'app/chat/sentPlans.html',
            controller: 'sentPlansCtrl'
          }
        }
      })

      .state('tabs.account', {
        url: '/account',
        params: { account: null },
        views: {
          'Profile': {
            templateUrl: 'app/account/account.html',
            controller: 'profileCtrl'
          }
        }
      })

      .state('tabs.explore', {
        url: '/explore',
        views: {
          'Explore': {
            templateUrl: 'app/news/explore.html',
            controller: 'exploreCtrl'
          }
        }
      })

      .state('friend', {
        url: '/friend',
        params: { contact: null },
        templateUrl: 'app/account/friend.html',
        controller: 'friendCtrl'
      })

      .state('intro', {
        url: '/intro',
        templateUrl: 'app/intro/intro.html',
        controller: 'introCtrl'
      })

      .state('communicate', {
        url: '/communicate',
        params: { contact: null },
        templateUrl: 'app/settings/communicate.html',
        controller: 'communicateCtrl'
      })

      .state('post-detail', {
        url: '/post-detail',
        params: { post: null, actionable: null },
        templateUrl: 'app/news/post.html',
        controller: 'postCtrl'
      })

      .state('plan-detail', {
        url: '/plan-detail',
        params: { plan: null, actionable: null },
        templateUrl: 'app/news/plan.html',
        controller: 'postCtrl'
      })

      .state('comments', {
        url: '/comments',
        params: { post: null },
        templateUrl: 'app/news/comments.html',
        controller: 'commentsCtrl'
      })
      .state('likes', {
        url: '/likes',
        params: { post: null },
        templateUrl: 'app/news/likes.html',
        controller: 'likesCtrl'
      })

      .state('forgot', {
        url: '/forgot',
        templateUrl: 'app/intro/forgot.html',
        controller: 'forgotCtrl'
      })

      .state('commits', {
        url: '/commits',
        params: { post: null },
        templateUrl: 'app/news/commits.html',
        controller: 'commitsCtrl'
      })

      .state('contacts', {
        url: '/contacts',
        params: {activity: null, type: null},
        templateUrl: 'app/dashboard/contacts.html',
        controller: 'contactsCtrl'
      })

      .state('contactLeader', {
        url: '/contactLeader',
        params: {activity: null, type: null},
        templateUrl: 'app/dashboard/contactLeader.html',
        controller: 'contactsCtrl'
      })

      .state('lead', {
        url: '/lead',
        params: {activity: null},
        templateUrl: 'app/dashboard/lead.html',
        controller: 'leadCtrl'
      })

      .state('roleRather', {
        url: '/roleRather',
        templateUrl: 'app/shop/roleRather.html',
        controller: 'roleRatherCtrl'
      })

      .state('status', {
        url: '/status',
        templateUrl: 'app/settings/status.html',
        controller: 'statusCtrl'
      })

      .state('partners', {
        url: '/partners',
        params: { partner: null, mode: null },
        templateUrl: 'app/account/partners.html',
        controller: 'partnersCtrl'
      })

      .state('findPartners', {
        url: '/findPartners',
        params: { partner: null, mode: null },
        templateUrl: 'app/account/findPartners.html',
        controller: 'partnersCtrl'
      })

      .state('interest', {
        url: '/interest',
        templateUrl: 'app/shop/interest.html',
        controller: 'interestCtrl'
      })

      .state('edit-profile', {
        url: '/edit-profile',
        templateUrl: 'app/account/edit-profile.html',
        controller: 'editProfileCtrl'
      })

      .state('event', {
        url: '/event',
        params: { post: null, mode: null },
        templateUrl: 'app/news/event.html',
        controller: 'eventCtrl'
      })

      .state('regular', {
        url: '/regular',
        params: { post: null, mode: null },
        templateUrl: 'app/news/regular.html',
        controller: 'regularCtrl'
      })

      .state('create-plan', {
        url: '/create-plan',
        params: { post: null, mode: null },
        templateUrl: 'app/dashboard/create-plan.html',
        controller: 'createPlanCtrl'
      })

      .state('settings', {
        url: '/settings',
        templateUrl: 'app/settings/settings.html',
        controller: 'settingsCtrl'
      })


      .state('authentication', {
        url: '/authentication',
        templateUrl: 'app/intro/authentication.html',
        controller: 'loginCtrl',
      })

      .state('passwords', {
        url: '/passwords',
        templateUrl: 'app/intro/passwords.html',
        controller: 'loginCtrl',
      })

      .state('policy', {
        url: '/policy',
        templateUrl: 'app/intro/policy.html',
        controller: 'settingsCtrl'
      })

      .state('service', {
        url: '/service',
        templateUrl: 'app/intro/service.html',
        controller: 'settingsCtrl'
      })

      .state('support', {
        url: '/support',
        templateUrl: 'app/intro/support.html',
        controller: 'settingsCtrl'
      })

      .state('signin', {
        url: '/signin',
        templateUrl: 'app/intro/signin.html',
        controller: 'signinCtrl',
      });
    $urlRouterProvider.otherwise('signin');

  }]);

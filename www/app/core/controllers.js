(function () {

    'use strict'

    angular.module('full_starter.controllers', [
        'mwl.calendar',
        'ngCordova',
        'ngLodash',
        'angularMoment',
        'angular.filter',
        'module.view.login',
        'module.view.communicate',
        'module.view.lead',
        'module.view.news',
        'module.view.signin',
        'module.view.intro',
        'module.view.post',
        'module.view.commits',
        'module.view.likes',
        'module.view.comments',
        'module.view.match',
        'module.view.createPlan',
        'module.view.regular',
        'module.view.event',
        'module.view.contacts',
        'module.view.friend',
        'module.view.sidemenu',
        'module.view.profile',
        'module.view.editProfile',
        'module.view.partners',
        'module.view.sentPlans',
        'module.view.settings',
        'module.view.roleRather',
        'module.view.interest',
        'module.view.status',
        'module.view.explore',
        'module.view.editEvent',
        'module.view.forgot'
    ])

})();

moment.locale('en', {
    calendar: {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow, ] dddd Do MMM',
        lastWeek: '[Last] dddd Do MMM',
        nextWeek: 'dddd Do MMM',
        sameElse: 'L'
    }
})

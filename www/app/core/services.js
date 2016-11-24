(function () {

    'use strict'

    angular.module('full_starter.services', ['firebase','service.engagements',
        'service.interest','service.post','service.users', 'service.appointments'])

      .factory('appService', ['$state', '$ionicPopup', '$ionicActionSheet', '$ionicHistory', '$ionicLoading', '$timeout',
            function ($state, $ionicPopup, $ionicActionSheet, $ionicHistory, $ionicLoading, $timeout) {

                return {
                    getNews: function () {
                        return _news;
                    },
                    getMessages: function () {
                        return _messages;
                    },
                    getContacts: function () {
                        return _contacts;
                    },
                    getProducts: function () {
                        return _products;
                    },
                    getNotifications: function () {
                        return _notifications;
                    },
                    getRandomMessages: function () {
                        return _randMessages;
                    },
                    getRandomObject: function (arr) {
                        return arr[Math.floor(Math.random() * arr.length)];
                    },
                    Loading: function (params) {
                        if (params === 'show') {
                            $ionicLoading.show({
                                template: '<ion-spinner></ion-spinner>'
                            });
                        } else {
                            $ionicLoading.hide();
                        }
                    },
                    KeepKeyboardOpen: function (params) {
                        var txtInput = angular.element(document.body.querySelector(params));
                        txtInput.one('blur', function () {
                            txtInput[0].focus();
                        });
                    },
                    showAlert: function (title, text, buttonText, buttonType, page) {
                        var alertPopup = $ionicPopup.alert({
                            title: title,
                            template: text,
                            buttons: [{ text: buttonText, type: buttonType }]
                        });
                        $timeout(function () {
                            alertPopup.close();
                        }, 1500000);

                        alertPopup.then(function (res) {
                            page != null ? $state.go(page) : '';
                            alertPopup.close();
                        });
                    },
                    getGreetingTime: function (m) {
                        var g = null;

                        if (!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

                        var split_afternoon = 12 //24hr time to split the afternoon
                        var split_evening = 17 //24hr time to split the evening
                        var currentHour = parseFloat(m.format("HH"));

                        if (currentHour >= split_afternoon && currentHour <= split_evening) {
                            g = "Good Afternoon";
                        } else if (currentHour >= split_evening) {
                            g = "Good Evening";
                        } else {
                            g = "Good Morning";
                        }
                        return g;
                    },
                    getCameraOptions: function () {
                        return {
                            quality: 80,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.CAMERA,
                            encodingType: Camera.EncodingType.JPEG,
                            allowEdit: true,
                            saveToPhotoAlbum: true,
                            correctOrientation: true
                        };
                    },
                    getProfileCameraOptions: function () {
                        return {
                            quality: 80,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.CAMERA,
                            encodingType: Camera.EncodingType.JPEG,
                            allowEdit: true,
                            saveToPhotoAlbum: true,
                            correctOrientation: true
                        };
                    },
                    getProfileLibraryOptions: function () {
                        return {
                            quality: 80,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                            encodingType: Camera.EncodingType.JPEG,
                            allowEdit: true,
                            saveToPhotoAlbum: false,
                            correctOrientation: true
                        };
                    },
                    getLibraryOptions: function () {
                        return {
                            quality: 80,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                            encodingType: Camera.EncodingType.JPEG,
                            allowEdit: true,
                            saveToPhotoAlbum: false,
                            correctOrientation: true
                        };
                    },
                }
            }]);
})();

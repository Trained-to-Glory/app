(function () {

    'use strict';

    angular.module('full_starter.services',[
      'firebase',
      'service.engagements',
      'service.interest',
      'service.post',
      'service.users',
      'service.appointments'])

      .factory('appService', ['$state', '$ionicPopup', '$ionicActionSheet', '$ionicHistory', '$ionicLoading', '$timeout',
            function ($state, $ionicPopup, $ionicActionSheet, $ionicHistory, $ionicLoading, $timeout) {

                return {
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
                            page !== null ? $state.go(page) : '';
                            alertPopup.close();
                        });
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
                    }
                }
            }]);
})();

angular.module('full_starter.directives', ['directive.checklist'])

    .directive('sideMenu', [function () {
        return {
            restrict: 'E',
            templateUrl: 'app/core/sidemenu.html',
        };
    }])

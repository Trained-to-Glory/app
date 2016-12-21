angular.module('full_starter.directives', ['directive.checklist','directive.partners', 'directive.friends'])

    .directive('sideMenu', [function () {
        return {
            restrict: 'E',
            templateUrl: 'app/core/sidemenu.html',
        };
    }]);

(function () {

'use strict';

angular.module('directive.medialoader', [])
  .directive('mediaLoader', function () {
    return {
      restrict: 'A',
      scope: { hires: '@' },
    	link: function(scope, $element, $attrs) {
        element.one('load', function() {
            element.attr('src', scope.hires);
          });
        }
      };
    });
})();

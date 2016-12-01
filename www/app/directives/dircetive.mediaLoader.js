(function () {

'use strict';

angular.module('directive.medialoader', [])
  .directive('mediaLoader', function () {
    return {
    	restrict: 'EA',
    	scope: true,
    	link: function(scope, $element, $attrs) {
    		var imageBack = $attrs.backgroundimg;
    		var img = new Image();
    			img.onload = function() {
    				scope.thisMainDisplayImg = imageBack;
    			};

      		img.onerror = function() {}

      		img.src = imageBack;
      	}
      };
    });
})();

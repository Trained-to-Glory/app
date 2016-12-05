(function () {

'use strict';

angular.module('directive.pictureloader', [])
  .directive('pictureLoader', function () {
    return {
    	restrict: 'EA',
    	scope: true,
    	link: function(scope, $element, $attrs) {
    		var imageBack = $attrs.profilebackgroundimg;
    		var img = new Image();
    			img.onload = function() {
    				scope.thisProfileDisplayImg = imageBack;
    			};

      		img.onerror = function() {}

      		img.src = imageBack;
      	}
      };
    });
})();

(function () {

'use strict';

angular.module('directive.checklist', [])
  .directive('checkList', function () {
    return {
      templateUrl :'app/directives/directive.checklist.html',
      restrict: 'E',
      scope: {
        arr: '='
      },
      link: function(scope) {

    		scope.add = function(){
    			scope.arr.push({
      			displayName: ''
      		});
    		};

    		scope.remove = function(key){
    			var len = scope.arr.length;
    			var arr = [];
    			for(var i = 0; i < len; i++){
    					if(key == i){
    						continue;
    					}
    				arr.push(scope.arr[i]);
    			}
    			scope.arr = arr;
    		};

      }
    };
  });
})();

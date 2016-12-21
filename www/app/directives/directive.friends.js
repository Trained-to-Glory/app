(function () {

'use strict';

angular.module('directive.friends', [])
  .directive('friends', ['usersService', 'engagementService','$stateParams', function (usersService, engagementService, $stateParams) {
    return {
      templateUrl :'app/directives/directive.friends.html',
      restrict: 'E',
      scope: {
        arr: '='
      },
      link: function(scope,$element, $attrs) {

        scope.value = JSON.parse($attrs.friend);
        scope.togglePartner = function(partnerId){
  					var partner = scope.contacts;
   				   if(!partner){
  						 return false;
  					 }
  					partner.partnered = !partner.partnered;
  					var state = (partner.partnered)?'partner':'unpartner';
            if (state == 'partner') {
              scope.value.partnered = true;
            }else {
              scope.value.partnered = false;
            }
  					return engagementService[state]({category:'partners', categoryId:$stateParams.contact,userId: partnerId});
  			}

        scope.profile = $stateParams.contact;

        engagementService.partnered({category:'partners', categoryId:$stateParams.contact, userId:scope.value.userId }).then(function(partnered){
         scope.value.partnered = partnered;
         scope.$apply();
       });

      }
    };
  }]);
})();

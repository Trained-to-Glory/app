(function () {

'use strict';

angular.module('directive.partners', [])
  .directive('partners', ['usersService', 'engagementService','$localStorage', function (usersService, engagementService, $localStorage) {
    return {
      templateUrl :'app/directives/directive.partners.html',
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
  					return engagementService[state]({category:'partners', categoryId:$localStorage.account.userId,userId: partnerId});
  			}

        scope.profile = $localStorage.account;

        engagementService.partnered({category:'partners', categoryId:$localStorage.account.userId, userId:scope.value.userId }).then(function(partnered){
         scope.value.partnered = partnered;
         scope.$apply();
       });
      }
    };
  }]);
})();

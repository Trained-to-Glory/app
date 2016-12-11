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
        usersService.getPartners($localStorage.account.userId).then(function(results){
      		var arr = [];
          if (results) {
            for(var key in results){
        			results[key].key = key;
        			arr.push(results[key]);
        		}
          };

      		var contacts = {
      				items: results,
      				itemsArr: arr
      		};
      		delete results[$localStorage.account.userId];
          if(contacts.items){
        		for(var id in contacts.items){
        		 //check to see if there is a like on this post
        		 (function(id, items){
        			 engagementService.partnered({category:'partners', categoryId:$localStorage.account.userId, userId:id }).then(function(partnered){
         				items.partnered = partnered;
         			});
        		})(id, contacts.items[id]);
        		}
          };

      		scope.contacts = contacts;
      	});
      }
    };
  }]);
})();

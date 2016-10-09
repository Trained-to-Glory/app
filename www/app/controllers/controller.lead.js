angular.module('module.view.lead', [])
	.controller('leadCtrl', function($scope,$rootScope,$state,$localStorage,engagementService,$stateParams,interestService) {
		$scope.goBack = function (ui_sref) {
                    var currentView = $ionicHistory.currentView();
                    var backView = $ionicHistory.backView();

                    if (backView) {
                        //there is a back view, go to it
                        if (currentView.stateName == backView.stateName) {
                            //if not works try to go doubleBack
                            var doubleBackView = $ionicHistory.getViewById(backView.backViewId);
                            $state.go(doubleBackView.stateName, doubleBackView.stateParams);
                        } else {
                            backView.go();
                        }
                    } else {
                        $state.go(ui_sref);
                    }
                }

				$scope.togglePartner = function(partnerId){
						var partner = $scope.ones;
					   if(!partner){
							 return false;
						 }
						partner.partnered = !partner.partnered;
						var state = (partner.partnered)?'partner':'unpartner';
						return engagementService[state]({category:'partners', categoryId:partnerId, userId: $localStorage.account.userId});
				};
        
				var output = {};
				var rad = function(x) {
					return x * Math.PI / 180;
				};

			 var getDistance = function(p1, p2) {
				 var R = 3963.190592; // Earth’s mean radius in miles
				 console.log({p1: p1, p2:p2});
				 var dLat = rad(p2.lat - p1.lat);
				 var dLong = rad(p2.long - p1.long);
				 var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
		    Math.sin(dLong / 2) * Math.sin(dLong / 2);
				 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
				 var d = R * c;
				 return d; // returns the distance in miles
			 };


		$scope.gotoFriend = function () {
                    $state.go('tabs.friend');

        };

    interestService.getLeaderUsers($stateParams.activity).then(function(results){
			  $scope.myLocation = $localStorage.account.near;
				delete results[$localStorage.account.userId];
				$scope.users = results;
		});

}).filter('orderByLocation', function() {

  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input, location, order) {
		if(!input){
			return input;
		}

    var output = [];
		var tempObj = {};
		var rad = function(x) {
			return x * Math.PI / 180;
		};

	 var getDistance = function(p1, p2) {
		 var R = 3963.190592; // Earth’s mean radius in miles
		 var dLat = rad(p2.lat - p1.lat);
		 var dLong = rad(p2.long - p1.long);
		 var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
		 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		 var d = R * c;
		 return d; // returns the distance in miles
	 };

	 for(var key in input){
		 tempObj[key] = input[key];
		 tempObj[key].distance = getDistance(location,tempObj[key].location);
	 }

	 var tempArr = Object.keys(tempObj).sort(function(a,b){return tempObj[a].distance - tempObj[b].distance});

	 for(var i = 0; i < tempArr.length; i++){
		 output.push(tempObj[tempArr[i]]);
	 }
    // Do filter work here
    return output;
  }

});

var contactTemplate =
    '<ion-popover-view class="right large">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-avatar item-text-wrap" ng-click="contactPopover.hide($event);"ng-repeat="contact in contacts" ui-sref="tabs.chat({chat: contact})">' +
    '<img ng-src="{{contact.photo}}">' +
    '<h2 class="dark font-thin">{{contact.name}}</h2>' +
    '<p class="dark font-thin">{{contact.subject}}</p>' +
    '</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

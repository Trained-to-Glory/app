angular.module('service.users', [])
 .service('usersService', function($localStorage){
   var table = 'accounts';
   this.get = function (userId) {
       var user = (userId) ? firebase.database().ref(table + '/' + userId) : firebase.database().ref(table);
       return user.once('value').then(function (snapshot) {
             var currentObj = snapshot.val();
             if (currentObj) {
                 return currentObj;
             }
             return undefined;
         });
   };

   this.getPartners = function (userId) {
       var user = (userId) ? firebase.database().ref(['accounts', userId ,'userPartners', 'partners'].join('/')) : firebase.database().ref(table);
       return user.once('value').then(function (snapshot) {
             var currentObj = snapshot.val();
             if (currentObj) {
                 return currentObj;
             }
             return undefined;
         });
   };

   this.getUserPost = function (userId) {
       var posts = (userId) ? firebase.database().ref(['accounts', userId , 'posts'].join('/')) : firebase.database().ref('accounts');
       return posts.once('value').then(function (snapshot) {
             var currentObj = snapshot.val();
             if (currentObj) {
                 return currentObj;
             }
             return undefined;
         });
   };

  //  this.getUserActivities = function function (userId, activityId) {
  //      var myActivitiesPromise = (activityId) ? firebase.database().ref(['engagedActivities', 'interest' , activityId].join('/'));
  //      return myPostsPromise.once('value').then(function (snapshot) {
  //            var obj = {};
  //            var myLocation = snapshot.val();
  //            if (myLocation) {
  //               var accountsPromise = firebase.database().ref('accounts');
  //               return accountsPromise.once('value').then(function(snapshot){
  //                 var accounts = snapshot.val();
  //                 if(posts){
  //                   for(var key in myLocatoin){
  //                     obj[key] = accounts[key];
  //                   }
  //                   return obj;
  //                 }
  //                 return obj;
  //               });
  //                return obj;
  //            }
  //            return obj;
  //        });
  //  };

   this.getUserCommits = function (userId) {
       var myPostsPromise = firebase.database().ref(['accounts', userId , 'engagementCommits', 'post'].join('/'));
       return myPostsPromise.once('value').then(function (snapshot) {
             var obj = {};
             var myPosts = snapshot.val();
             if (myPosts) {
                var postsPromise = firebase.database().ref('posts');
                return postsPromise.once('value').then(function(snapshot){
                  var posts = snapshot.val();
                  if(posts){
                    for(var key in myPosts){
                      obj[key] = posts[key];
                    }
                    return obj;
                  }
                  return obj;
                });
                 return obj;
             }
             return obj;
         });
   };

   this.getUserTotalCommits = function(userId){
    var count = 0;
     return this.getUserCommits(userId).then(function(results){
       for(var key in results){
         count++;
       }
       return count;
     }, function(){
       return count;
     });
   };

   this.getUserTotalPost = function(userId){
    var count = 0;
     return this.getUserPost(userId).then(function(results){
       for(var key in results){
         count++;
       }
       return count;
     }, function(){
       return count;
     });
   };

   this.getClosestUsers = function(userId, category, categoryId){
     //haversine formula
     var obj = {};
     var rad = function(x) {
       return x * Math.PI / 180;
     };

    var getDistance = function(p1, p2) {
      var R = 3963.190592; // Earth’s mean radius in miles
      var dLat = rad(p2.lat() - p1.lat());
      var dLong = rad(p2.lng() - p1.lng());
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d; // returns the distance in miles
    };



    this.getAllAccounts().then(function(results){
      var myLocation = results[userId].location;
        if(myLocation){
          for(var k in results){
            if(results[k].location){

            }
          }
      }
    });


   };

   this.getUserTotalPartners = function(userId){
    var count = 0;
     return this.getPartners(userId).then(function(results){
       for(var key in results){
         count++;
       }
       return count;
     }, function(){
       return count;
     });
   };


   this.getAllAccounts = function () {
     console.log('user hit');
       var users = firebase.database().ref('accounts');
       return users.once('value').then(function (snapshot) {
             var accounts = snapshot.val();
             if (accounts) {
                 return accounts;
             }
             return {};
         });
   };

   this.logo = function(){
     var ttgLogo = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/TTG-Symbol-2015-02.png?alt=media&token=b10c70be-92a1-47af-84c4-ab82500922fb';
     console.log(ttgLogo);
     $localStorage.account.userPhoto = ttgLogo;
     var ref = firebase.database().ref('accounts');
     ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
       firebase.database().ref('/accounts/' + snapshot.key ).update({
         userPhoto: $localStorage.account.userPhoto
       }).then( function() {
         $localStorage.account.userPhoto = userPhoto;
         return;
       });
     });
     $localStorage.account.userPhoto = ttgLogo;

     };


});

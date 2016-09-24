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

   this.getUserCommits = function (userId) {
       var myPostsPromise = (userId) ? firebase.database().ref(['accounts', userId , 'engagementCommits', 'post'].join('/')) : firebase.database().ref('accounts');
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

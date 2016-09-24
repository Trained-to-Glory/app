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

   this.getUserPost = function (userId,postId) {
       var posts = (userId) ? firebase.database().ref(['accounts', userId , postId].join('/')) : firebase.database().ref('accounts');
       return posts.once('value').then(function (snapshot) {
             var currentObj = snapshot.val();
             if (currentObj) {
                 return currentObj;
             }
             return undefined;
         });
   };

   this.getUserCommits = function (userId,postId,engagementCommits,post) {
       var posts = (userId) ? firebase.database().ref(['accounts', userId , engagementCommits, post, postId].join('/')) : firebase.database().ref('accounts');
       return posts.once('value').then(function (snapshot) {
             var currentObj = snapshot.val();
             if (currentObj) {
                 return currentObj;
             }
             return undefined;
         });
   };

   this.getUserNames = function (userId,userName) {
     console.log('user hit');
       var user = (userId) ? firebase.database().ref(table + '/' + userId + userName) : firebase.database().ref(table);
       return user.once('value').then(function (snapshot) {
             var currentObj = snapshot.val();
             if (currentObj) {
                 return currentObj;
             }
             return undefined;
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

angular.module('service.users', [])
 .service('usersService', function($localStorage){
   var table = 'accounts';
   function get(userId) {
       var user = (userId) ? firebase.database().ref(table + '/' + userId) : firebase.database().ref(table);
       return user.once('value').then(function (snapshot) {
             var currentObj = snapshot.val();
             if (currentObj) {
                 return currentObj;
             }
             return undefined;
         });
   };

   this.getInterestDisplay = function(userId) {
       var user = (userId) ? firebase.database().ref(['engagedActivities', 'interest'].join('/')) : firebase.database().ref(table);
       return user.once('value').then(function (snapshot) {
             var currentObj = snapshot.val();
             if (currentObj) {
                 return currentObj;
             }
             return undefined;
         });
   };

   function getPeople(userId) {
       var user = (userId) ? firebase.database().ref(table + '/' + userId) : firebase.database().ref(table);
       return user.once('value').then(function (snapshot) {
             var currentObj = snapshot.val();
             if (currentObj) {
                 return currentObj;
             }
             return undefined;
         });
   };

   this.get = get;


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

   this.getPartnerPosts = function (userId) {
       var myPartnersPromise = firebase.database().ref(['accounts', userId , 'userPartners', 'partners'].join('/'));
       return myPartnersPromise.once('value').then(function (snapshot) {
             var obj = {};
             var myPartners = snapshot.val();
             if (myPartners) {
                var accountsPromise = firebase.database().ref(['accounts'].join('/'));
                return accountsPromise.once('value').then(function(snapshot){
                  var accounts = snapshot.val();
                  if(accounts){
                    for(var key in myPartners){
                      obj[key] = accounts[key].posts;
                    }
                    return obj[key];
                  }
                  return obj[key];
                });
                 return obj[ke];
             }
             return obj;
         });
   };

   this.getUserPlans = function (userId) {
       var posts = (userId) ? firebase.database().ref(['accounts', userId , 'plans'].join('/')) : firebase.database().ref('accounts');
       return posts.once('value').then(function (snapshot) {
             var currentObj = snapshot.val();
             var numberPost = snapshot.numChildren();
             if (currentObj) {
                 return currentObj;
             }
             return undefined;
         });
   };

   this.getMoreUserPost = function (userId) {
       var posts = (userId) ? firebase.database().ref(['accounts', userId , 'posts'].join('/')) : firebase.database().ref('accounts');
       return posts.once('value').then(function (snapshot) {
             var currentObj = snapshot.val();
             var numberPost = snapshot.numChildren();
             if (numberPost => 10 && currentObj) {
                 return currentObj;
             }
             return undefined;
         });
   };

   this.getPartners = function (userId) {
       var myPostsPromise = firebase.database().ref(['userPartners', 'partners', userId].join('/'));
       return myPostsPromise.once('value').then(function (snapshot) {
             var obj = {};
             var myPosts = snapshot.val();
             if (myPosts) {
                var postsPromise = firebase.database().ref('accounts');
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

   this.getInterestName = function (userId) {
       var myPostsPromise = firebase.database().ref(['accounts', userId, 'engagedActivities', 'interest'].join('/'));
       return myPostsPromise.once('value').then(function (snapshot) {
             var obj = {};
             var myPosts = snapshot.val();
             if (myPosts) {
                var postsPromise = firebase.database().ref('category');
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

   this.getMorePartnerPosts = function (userId) {
       var myPartnersPromise = firebase.database().ref(['accounts', userId , 'userPartners', 'partners'].join('/'));
       return myPartnersPromise.once('value').then(function (snapshot) {
             var obj = {};
             var myPartners = snapshot.val();
             if (myPartners) {
                var accountsPromise = firebase.database().ref(['accounts'].join('/'));
                return accountsPromise.once('value').then(function(snapshot){
                  var accounts = snapshot.val();
                  if(accounts){
                    for(var key in myPartners){
                      var numberPost = Object.keys(accounts[key].posts).length;
                      if(numberPost => 10){
                        obj[key] = accounts[key].posts;
                      }
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

   this.getUserPostsLikes = function (userId) {
       var myPostsPromise = firebase.database().ref(['accounts', userId , 'posts'].join('/'));
      //step 1
       return myPostsPromise.once('value').then(function (snapshot) {
             var obj = {};
             var myPosts = snapshot.val();
             if (myPosts) {
                //step 2
                var likesPromise = firebase.database().ref(['engagementLikes', 'post'].join('/'));
                return likesPromise.once('value').then(function(snapshot){
                  var likes = snapshot.val();
                  if(likes){
                    for(var key in myPosts){
                      obj[key] = likes[key];
                    }
                    return get().then(function(results){
                      var finalData = {};
                      for(var key in obj){
                          for(var id in obj[key]){
                            if(id in results){
                              finalData[id] = results[id];
                            }
                          }
                      }
                      return finalData;
                    });
                  }
                  return obj;
                });
                 return obj;
             }
             return obj;
         });
   };

   this.getUserCommitsPlan = function (userId) {
       var myPostsPromise = firebase.database().ref(['accounts', userId , 'plans'].join('/'));
      //step 1
       return myPostsPromise.once('value').then(function (snapshot) {
             var obj = {};
             var myPosts = snapshot.val();
             if (myPosts) {
                //step 2
                var likesPromise = firebase.database().ref(['engagementCommits', 'plan'].join('/'));
                return likesPromise.once('value').then(function(snapshot){
                  var likes = snapshot.val();
                  if(likes){
                    for(var key in myPosts){
                      obj[key] = likes[key];
                    }
                    return get().then(function(results){
                      var finalData = {};
                      for(var key in obj){
                          for(var id in obj[key]){
                            if(id in results){
                              finalData[id] = results[id];
                            }
                          }
                      }
                      return finalData;
                    });
                  }
                  return obj;
                });
                 return obj;
             }
             return obj;
         });
   };

   this.getUserCommitsPost = function (userId) {
       var myPostsPromise = firebase.database().ref(['accounts', userId , 'posts'].join('/'));
      //step 1
       return myPostsPromise.once('value').then(function (snapshot) {
             var obj = {};
             var myPosts = snapshot.val();
             if (myPosts) {
                //step 2
                var likesPromise = firebase.database().ref(['engagementCommits', 'post'].join('/'));
                return likesPromise.once('value').then(function(snapshot){
                  var likes = snapshot.val();
                  if(likes){
                    for(var key in myPosts){
                      obj[key] = likes[key];
                    }
                    return get().then(function(results){
                      var finalData = {};
                      for(var key in obj){
                          for(var id in obj[key]){
                            if(id in results){
                              finalData[id] = results[id];
                            }
                          }
                      }
                      return finalData;
                    });
                  }
                  return obj;
                });
                 return obj;
             }
             return obj;
         });
   };

   this.getUserCommitsAppointment = function (userId) {
       var myPostsPromise = firebase.database().ref(['accounts', userId , 'appointments'].join('/'));
      //step 1
       return myPostsPromise.once('value').then(function (snapshot) {
             var obj = {};
             var myPosts = snapshot.val();
             if (myPosts) {
                //step 2
                var likesPromise = firebase.database().ref(['engagementCommits', 'schedule'].join('/'));
                return likesPromise.once('value').then(function(snapshot){
                  var likes = snapshot.val();
                  if(likes){
                    for(var key in myPosts){
                      obj[key] = likes[key];
                    }
                    return get().then(function(results){
                      var finalData = {};
                      for(var key in obj){
                          for(var id in obj[key]){
                            if(id in results){
                              finalData[id] = results[id];
                            }
                          }
                      }
                      return finalData;
                    });
                  }
                  return obj;
                });
                 return obj;
             }
             return obj;
         });
   };


   this.getUserCommentsPost = function (userId) {
       var myPartnersPromise = firebase.database().ref(['accounts', userId , 'posts'].join('/'));
       return myPartnersPromise.once('value').then(function (snapshot) {
             var obj = {};
             var myPartners = snapshot.val();
             if (myPartners) {
                var accountsPromise = firebase.database().ref(['engagementComments', 'post'].join('/'));
                return accountsPromise.once('value').then(function(snapshot){
                  var accounts = snapshot.val();
                  if(accounts){
                    for(var key in myPartners){
                      obj[key] = accounts[key];
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


   this.getAllUsers = function () {
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
     var ttgLogo = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/blank-profile-picture-973460_1280.png?alt=media&token=8459468a-c1df-41dc-9645-a10582b0656d';
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

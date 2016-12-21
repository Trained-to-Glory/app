angular.module('service.post', [])
    .service('postService',['$localStorage', '$q', function ($localStorage, $q) {

      this.get = function (postId) {
          var posts = firebase.database().ref('posts');
          posts.orderByKey().limitToFirst(10).on("child_added", function(snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    return currentObj;
                }
                return undefined;
            });
      };

      this.getOnePosts = function (postId) {
            var posts = firebase.database().ref('posts/' + postId);
            return posts.once('value').then(function (snapshot) {
                  var currentObj = snapshot.val();
                  if (currentObj) {
                      return currentObj;
                  }
                  return undefined;
              });
        };

        this.getOnePlan = function (postId) {
              var plan = firebase.database().ref('plans/' + postId);
              return plan.once('value').then(function (snapshot) {
                    var currentObj = snapshot.val();
                    if (currentObj) {
                        return currentObj;
                    }
                    return undefined;
                });
          };

          this.createComment = function (data) {
              //create a location in the table
              var obj = {
  								"comment": data.comment,
  								"created": firebase.database.ServerValue.TIMESTAMP,
  								"userPhoto": $localStorage.account.userPhoto,
  								"userName": $localStorage.account.userName,
  								"state": {
  										"actionable": true,
  										"visible": true,
  										"active": true
  								}
              };

              var db = firebase.database().ref(['engagementComments', 'post', data.postId].join('/'));
              var key = db.push(obj).key;
  						return db.child(key).once('value').then(function(snapshot){
  							var data = snapshot.val();
  							if(data){
  								return data;
  							}
  						});
          };

        // this.createComment = function (data) {
        //     //create a location in the table
        //     var obj = {
				// 				"comment": data.comment,
				// 				"created": firebase.database.ServerValue.TIMESTAMP,
				// 				"userPhoto": $localStorage.account.userPhoto,
				// 				"userName": $localStorage.account.userName,
				// 				"state": {
				// 						"actionable": true,
				// 						"visible": true,
				// 						"active": true
				// 				}
        //     };
        //     var db = firebase.database().ref();
        //     var posts = db.child('engagementComments');
        //     var postsKey = posts.push(obj).key;
        //     var userId = firebase.auth().currentUser.uid;
        //     var updates = {};
        //     updates['/engagementComments/' + '/' + 'post'   data.postId + '/' + postsKey] = obj;
        //     return firebase.database().ref().update(updates);
        // };

        this.getPlans = function (plansId) {
            var plans = (plansId) ? firebase.database().ref('plans/' + plansId) : firebase.database().ref('plans');
            return plans.once('value').then(function (snapshot) {
                  var currentObj = snapshot.val();
                  if (currentObj) {
                      return currentObj;
                  }
                  return undefined;
              });
        };

        this.getUserPlans = function (userId) {
            var plans = (userId) ? firebase.database().ref(['accounts', userId , 'plans'].join('/'))  : firebase.database().ref('accounts');
            return plans.once('value').then(function (snapshot) {
                  var currentObj = snapshot.val();
                  if (currentObj) {
                      return currentObj;
                  }
                  return undefined;
              });
        };

        this.getAppointments = function (appointmentsId) {
            var appointments = (appointmentsId) ? firebase.database().ref('appointments/' + appointmentsId) : firebase.database().ref('appointments');
            return appointments.once('value').then(function (snapshot) {
                  var currentObj = snapshot.val();
                  if (currentObj) {
                      return currentObj;
                  }
                  return undefined;
              });
        };

        this.getComments = function (postId,userId) {
            var comments = (postId) ? firebase.database().ref(['engagementComments', 'post', postId].join('/')) : firebase.database().ref('engagementComments');
            return comments.once('value').then(function (snapshot) {
                  var currentObj = snapshot.val();
                  if (currentObj) {
                      return currentObj;
                  }
                  return undefined;
              });
        };

        this.getLikes = function (postId,userId) {
            var comments = (postId) ? firebase.database().ref(['engagementLikes', 'post', postId].join('/')) : firebase.database().ref('engagementComments');
            return comments.once('value').then(function (snapshot) {
                  var currentObj = snapshot.val();
                  if (currentObj) {
                      return currentObj;
                  }
                  return undefined;
              });
        };

        this.getCommits = function (postId,userId) {
            var comments = (postId) ? firebase.database().ref(['engagementCommits', 'post', postId].join('/')) : firebase.database().ref('engagementComments');
            return comments.once('value').then(function (snapshot) {
                  var currentObj = snapshot.val();
                  if (currentObj) {
                      return currentObj;
                  }
                  return undefined;
              });
        };

        // this.getComments = function (postId) {
        //     var comments = firebase.database().ref(['engagementComments', 'posts', postId].join('/'));
        //     return comments.once('value').then(function (snapshot) {
        //           var currentObj = snapshot.val();
        //           if (currentObj) {
        //               return currentObj;
        //           }
        //           return undefined;
        //       });
        // };

        this.getCommentsNumber = function (postId) {
            var comments = (postId) ? firebase.database().ref(['engagementComments', postId].join('/')) : firebase.database().ref('engagementComments');
            return comments.once('value').then(function (snapshot) {
                  var currentObj = snapshot.val();
                  if (currentObj) {
                      return currentObj;
                  }
                  return undefined;
              });
        };

        this.getUserAppointments = function (userId) {
            var appointments = (userId) ? firebase.database().ref(['accounts', userId , 'appointments'].join('/')) : firebase.database().ref('accounts');
            return appointments.once('value').then(function (snapshot) {
                  var currentObj = snapshot.val();
                  if (currentObj) {
                      return currentObj;
                  }
                  return undefined;
              });
        };

        this.getPostComments = function (postId,userId) {
            var comments = (userId) ? firebase.database().ref(['engagementComments', postId , userId].join('/')) : firebase.database().ref('engagementComments');
            return comments.once('value').then(function (snapshot) {
                  var currentObj = snapshot.val();
                  if (currentObj) {
                      return currentObj;
                  }
                  return undefined;
              });
        };

        this.getPostCommits = function (postId) {
            var myPostsPromise = firebase.database().ref(['engagementCommits', 'post', postId].join('/'));
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

        this.getPostLikes = function (postId) {
            var myPostsPromise = firebase.database().ref(['engagementLikes', 'post', postId].join('/'));
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

        this.create = function (data) {
          if(!data || !data.postType ){
            var deferred = $q.defer();
            deferred.reject(false);
            return deferred.promise;
          }
            //create a location in the table
            var obj = {
                // "typeId": data.postTypeId || '',
                // "activityId": data.activityId || '',
                // "imageFilePath": data.filePath || '',
                "photo": data.photo || '',
                "mustHaves": data.mustHaves || '',
                "description": data.description || '',
                "created": firebase.database.ServerValue.TIMESTAMP,
                "createdBy": $localStorage.account.userId,
                "owner": $localStorage.account.userName,
                "avatar": $localStorage.account.userPhoto || '',
                "location": data.location || '',
                "time": data.time || '',
                "date": data.date || '',
                "postType": data.postType,
                "state": {
                    "actionable": true,
                    "visible": true,
                    "active": true
                }
            };
            var db = firebase.database().ref();
            var posts = db.child('posts');
            var postsKey = posts.push(obj).key;
            var userId = firebase.auth().currentUser.uid;

       // Write the new post's data simultaneously in the posts list and the user's post list.
         var updates = {};
         updates['/posts/' + postsKey] = obj;
         updates['/accounts/' + userId + '/posts/' + postsKey] = obj;

         return firebase.database().ref().update(updates);
        };

        this.createPlan = function (data) {
          if(!data){
            var deferred = $q.defer();
            deferred.reject(false);
            return deferred.promise;
          }
              // "typeId": data.postTypeId || '',
              // "activityId": data.activityId || '',
              var obj = {
                  // "typeId": data.postTypeId || '',
                  // "activityId": data.activityId || '',
                  // "imageFilePath": data.filePath || '',
                  "photo": data.photo || '',
                  "goal": data.goal || '',
                  "checklist": data.checklist || '',
                  "private": data.private || '',
                  "title": data.title || '',
                  "point": data.point || '',
                  "forward": data.forward || '',
                  "notes": data.notes || '',
                  "mustHaves": data.mustHaves || '',
                  "description": data.description || '',
                  "created": firebase.database.ServerValue.TIMESTAMP,
                  "createdBy": $localStorage.account.userId,
                  "owner": $localStorage.account.userName,
                  "avatar": $localStorage.account.userPhoto || '',
                  "location": data.location || '',
                  "time": data.time || '',
                  "date": data.date || '',
                  "postType": data.postType,
                  "state": {
                      "actionable": true,
                      "visible": true,
                      "active": true
                  }
          };
            var db = firebase.database().ref('plans');
            var postsKey = db.push(obj).key;
            var userId = firebase.auth().currentUser.uid;

           // Write the new post's data simultaneously in the posts list and the user's post list.
             var updates = {};
             updates['/plans/' + postsKey] = obj;
             updates['/accounts/' + userId +'/plans/' + postsKey] = obj;

             return firebase.database().ref().update(updates);
        };

        this.updatePlan = function (data, planId) {
          if(!data || !data.postType || !data.title || !data.description){
            var deferred = $q.defer();
            deferred.reject(false);
            return deferred.promise;
          }
            var plans = firebase.database().ref('plans/' + planId);
            return plans.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    var obj = {
                        "photo": data.photo ? data.photo : currentObj.photo,
                        "private": data.private ? data.private : currentObj.private,
                        "goal": data.goal ? data.goal : currentObj.goal,
                        "checklist": data.checklist ? data.checklist : currentObj.checklist,
                        "point": data.point ? data.point : currentObj.point,
                        "forward": data.forward ? data.forward : currentObj.forward,
                        "notes": data.notes ? data.notes : currentObj.notes,
                        "description": data.description ? data.description : currentObj.description,
                        "title": data.title ? data.title : currentObj.title,
                        "photo": data.photo ? data.photo : currentObj.photo,
                        "time": data.time ? data.time : currentObj.time,
                        "postType": data.postType ? data.postType : currentObj.postType,
                        "created": data.created ? data.created : currentObj.created,
                        "lastModified": firebase.database.ServerValue.TIMESTAMP,
                        "userPhoto": data.userPhoto ? data.userPhoto : currentObj.userPhoto,
                        "createdBy": data.createdBy ? data.createdBy : currentObj.createdBy
                    };
                    return posts.update(obj);
                }
                return null;
            });
        };

        this.updateComment = function (data, postId) {
            var posts = firebase.database().ref('engagementComments/' + postId);
            return posts.once('value').then(function(snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    var obj = {
                        // "photo": data.photo ? data.photo : currentObj.photo,
                        // "mustHaves": data.mustHaves ? data.mustHaves : currentObj.mustHaves,
                        "comment": data.comment ? data.comment : currentObj.comment,
                        "created": data.created ? data.created : currentObj.created,
                        "lastModified": firebase.database.ServerValue.TIMESTAMP,
                        "createdBy": data.createdBy ? data.createdBy : currentObj.createdBy
                    };
                    return posts.update(obj);
                }
                return null;
            });
        };

        this.createAppointment = function (data) {
          if(!data || !data.type || !data.title){
            var deferred = $q.defer();
            deferred.reject(false);
            return deferred.promise;
          }

            var obj = {
                // "typeId": data.postTypeId || '',
                // "activityId": data.activityId || '',
                "title": data.title || '',
                "phone": data.phone || '',
                "notes": data.notes || '',
                "startAt": data.startAt || '',
                "endAt": data.endAt || '',
                "allDay": data.allDay || '',
                "location": data.location || '',
                "created": firebase.database.ServerValue.TIMESTAMP,
                "createdBy": $localStorage.account.userId,
                "userPhoto": $localStorage.account.userPhoto || '',
                "type": data.type,
                "state": {
                    "actionable": true,
                    "visible": true,
                    "active": true
                }
            };
            var db = firebase.database().ref('appointments');
            var postsKey = db.push(obj).key;
            var userId = firebase.auth().currentUser.uid;

           // Write the new post's data simultaneously in the posts list and the user's post list.
             var updates = {};
             updates['/appointments/' + postsKey] = obj;
             updates['/accounts/' + userId + '/appointments/' + postsKey] = obj;

             return firebase.database().ref().update(updates);
        };

        this.updateAppointment = function (data, postId) {
          if(!data || !data.type || !data.title || !data.description){
            var deferred = $q.defer();
            deferred.reject(false);
            return deferred.promise;
          }
            var posts = firebase.database().ref('posts/' + postId);
            return posts.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    var obj = {
                        // "photo": data.photo ? data.photo : currentObj.photo,
                        // "mustHaves": data.mustHaves ? data.mustHaves : currentObj.mustHaves,
                        "description": data.description ? data.description : currentObj.description,
                        "location": data.location ? data.location : currentObj.location,
                        "title": data.title ? data.title : currentObj.title,
                        "type": data.type ? data.type : currentObj.type,
                        "phone": data.phone ? data.phone : currentObj.phone,
                        "notes": data.notes ? data.notes : currentObj.notes,
                        "startAt": data.startAt ? data.startAt : currentObj.startAt,
                        "endAt": data.endAt ? data.endAt : currentObj.endAt,
                        "allDay": data.allDay ? data.allDay : currentObj.allDay,
                        "created": data.created ? data.created : currentObj.created,
                        "lastModified": firebase.database.ServerValue.TIMESTAMP,
                        "createdBy": data.createdBy ? data.createdBy : currentObj.createdBy
                    };
                    return posts.update(obj);
                }
                return null;
            });
        };

        this.update = function (data, postId) {
          if(!data || !data.postType || !data.description){
            var deferred = $q.defer();
            deferred.reject(false);
            return deferred.promise;
          }
            var posts = firebase.database().ref('posts/' + postId);
            return posts.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    var obj = {
                        // "photo": data.photo ? data.photo : currentObj.photo,
                        // "mustHaves": data.mustHaves ? data.mustHaves : currentObj.mustHaves,
                        "description": data.description ? data.description : currentObj.description,
                        "location": data.location ? data.location : currentObj.location,
                        "owner": data.owner ? data.owner : currentObj.owner,
                        "time": data.time ? data.time : currentObj.time,
                        "date": data.date ? data.date : currentObj.date,
                        "avatar": data.avatar ? data.avatar : currentObj.avatar,
                        "postType": data.postType ? data.postType : currentObj.postType,
                        "userPhoto": data.userPhoto ? data.userPhoto : currentObj.userPhoto,
                        "created": data.created ? data.created : currentObj.created,
                        "userPhoto": data.userPhoto ? data.userPhoto : currentObj.userPhoto,
                        "lastModified": firebase.database.ServerValue.TIMESTAMP,
                        "createdBy": data.createdBy ? data.createdBy : currentObj.createdBy
                    };
                    return posts.update(obj);
                }
                return null;
            });
        };

        this.delete = function (postId) {
            var posts = firebase.database().ref('posts/' + postId + '/state');
            return posts.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    var obj = {
                            "actionable": false,
                            "visible": false,
                            "active": false
                    };
                    return posts.update(obj);
                }
                return null;
            });
        };

        this.deleteAppointment = function (appointmentId) {
            var appointments = firebase.database().ref('appointments/' + appointmentId + '/state');
            return appointments.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    var obj = {
                            "actionable": false,
                            "visible": false,
                            "active": false
                    };
                    return appointments.update(obj);
                }
                return null;
            });
        };

        this.deletePlans = function (planId) {
            var plan = firebase.database().ref('plans/' + planId + '/state');
            return plan.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    var obj = {
                            "actionable": false,
                            "visible": false,
                            "active": false
                    };
                    return plan.update(obj);
                }
                return null;
            });
        };

        this.getNews = function () {
            return this.get();
        };

        this.getSentPlans = function () {
            return this.getPlans();
        };

        this.getUserCalendar = function () {
            return this.getUserAppointments();
        };

        this.getRandomObject = function (arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        };

    }]);

angular.module('service.engagements', [])
    .service('engagementService', function ($localStorage) {
        //check if user has already engaged with this item
        var get = function(type ,category, categoryId, itemId){
          var arr = [type, category, categoryId, itemId];
          var db = firebase.database();
          //check type
          var refId = arr.join('/');
          return db.ref(refId).once('value').then(function (snapshot) {
              var currentObj = snapshot.val();
              if (currentObj){
                return currentObj;
              }
              return null;
        });
      };

        var updateTransaction = function(arr){
          /**
          ** expects object
          ** [{
          **    location: '/posts/-kaadasdasd',
          **    data: {
          **
          **    }
          ** }]
          */
           if(arr instanceof Array){
            // Write the new post's data simultaneously in the posts list and the user's post list.
              var updates = {};
              var len = arr.length;
              for(var i = 0; i < len; i++){
                updates[arr[i].location] = arr[i].data;
              };
              //if no upates don't query db and let user know there is no data
              //to be saved
              if(updates === {}){
                return false;
              }
              var db = firebase.database().ref();
              return db.update(updates);
           }
        };
        var engaged = function (type, category, categoryId, itemId) {
            var arr = [type, category, categoryId, itemId];
            var db = firebase.database();
            //check type
            var refId = arr.slice(0, 1).join('');
            return db.ref(refId).once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    //check type/category
                    var refId = arr.slice(0, 2).join('/');
                    return db.ref(refId).once('value').then(function (snapshot) {
                        var currentObj = snapshot.val();
                        if (currentObj) {
                            //check type/category/categoryId
                            var refId = arr.slice(0, 3).join('/');
                            return db.ref(refId).once('value').then(function (snapshot) {
                                var currentObj = snapshot.val();
                                if (currentObj) {
                                    //check type/category/categoryId/itemId
                                    var refId = arr.slice(0, 4).join('/');
                                    return db.ref(refId).once('value').then(function (snapshot) {
                                        var currentObj = snapshot.val();
                                        if (currentObj) {
                                            return true;
                                        }
                                        //type/category/categoryId exists
                                        return arr.slice(0, 3);
                                    });
                                }
                                //type/category/ exists
                                return arr.slice(0, 2);
                            });
                        }
                        //type exists
                        return arr.slice(0, 1);
                    });
                }
                //nothing exists
                return false;
            });
        };

        //returns true when engagement successfully registers in db, returns false otherwise.
       var updateEngagement = function (type, category, categoryId, itemId, userId, comment, active, visible, actionable) {
           //check if there has been this type of engagement on this item
           //if not create this item for the first time
           return engaged(type, category, categoryId, itemId).then(function (exists) {
               if (exists instanceof Array || exists === false || (userId && typeof (comment) === 'string')) {
                   var len = exists instanceof Array ? exists.length : 0;
                   var final = {};
                   var obj = {
                      // "userPhoto": $localStorage.account.userPhoto,
                      // "userName": $localStorage.account.userName,
                       "created": firebase.database.ServerValue.TIMESTAMP,
                       "lastModified": firebase.database.ServerValue.TIMESTAMP,
                       "state": {
                           "actionable": typeof(actionable) !== 'undefined'? (actionable) : true,
                           "visible": typeof(visible) !== 'undefined'? (visible) : true,
                           "active": typeof (active) !== 'undefined' ? (active) : true
                       }
                   };
                   var ref;

                   //comment type
                   if (typeof (comment) === 'string' && len < 4) {
                       obj.comment = comment;
                       if (userId) {
                           obj.userId = userId;
                       }
                       refId = (len > 1) ? exists.join('/') : null;
                       refId = (len === 1) ? exists.join('') : refId;

                       if (exists === true || len === 3) {
                           refId = [type, category, categoryId].join('/');
                           return firebase.database().ref(refId).push(obj).key;
                       } else if (len === 0) {
                           //push
                           var accountType = ['accounts',$localStorage.account.userId, type].join('/');
                           final[type] = {};
                           final[accountType] = {};
                           final[type][category] = {};
                           final[accountType][category] = {};
                           final[type][category][categoryId] = { 'fakedata': 1 };
                           final[accountType][category][categoryId] = { 'fakedata': 1 };
                       } else if (len == 1) {
                           //update
                           final[category] = {};
                           final[category][categoryId] = { 'fakedata': 1 };
                       } else if (len == 2) {
                           //update
                           final[categoryId] = {
                               'fakedata': 1
                           };
                       }

                       var db = (typeof (exists) === 'boolean' || len === 0) ? firebase.database().ref() : firebase.database().ref(refId);
                       return db.update(final).then(function () {
                           //successfully saved
                           if (len < 3) {
                               var refId = [type, category, categoryId].join('/');
                               return firebase.database().ref(refId).push(obj).key;
                           }
                           return true;

                       }, function () {
                           //failed
                           return false;
                       });

                   } else {
                       var accountType = ['accounts',$localStorage.account.userId, type].join('/');
                       final[[accountType,category,categoryId,itemId].join('/')] = true;
                       final[[type,category,categoryId,itemId].join('/')] = obj;
                   }
                   //set location to firebase record
                   refId = (len > 1) ? exists.join('/') : null;
                   refId = (len === 1) ? exists.join('') : refId;

                   var db = firebase.database().ref();
                   return db.update(final).then(function () {
                       //successfully saved
                       return true;
                   }, function () {
                       //failed
                       return false;
                   });
               }

               //if there is engagement just do an update
               refId = type;
               refId += category ? '/' + category : '';
               refId += categoryId ? '/' + categoryId : '';

               var db = firebase.database().ref(refId);
               return db.once('value').then(function (snapshot) {
                   var prev = snapshot.val();
                   if (prev && itemId in prev) {
                       prev = prev[itemId];
                   }
                   var final = {};
                   final[itemId] = {
                      //  "userPhoto": $localStorage.account.userPhoto,
                      //  "userName": $localStorage.account.userName,
                       "created": prev.created,
                       "lastModified": firebase.database.ServerValue.TIMESTAMP,
                       "state": {
                           "actionable": typeof(actionable)!== 'undefined' ? actionable : prev.state.actionable,
                           "visible": typeof(visible) !== 'undefined'? visible : prev.state.visible,
                           "active": typeof (active) !== 'undefined' ? active : !prev.state.active
                       }
                   };

                   //comment type
                   if (prev.comment && typeof (comment) === 'string') {
                       final[itemId].comment = typeof (comment) === 'string' ? comment : prev.comment;
                   }

                   if (userId && prev.userId) {
                       final[itemId].userId = userId ? userId : prev.userId;
                   }

                   return db.update(final).then(function () {
                       //successfully saved
                       return true;
                   }, function () {
                       //failed
                       return false;
                   });
               });
           });
       };

         this.createComment = function (category, categoryId, itemId, comment) {
            var type = 'engagementComments';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, itemId, comment);
        };

        this.updateComment = function (category, categoryId, itemId, comment) {
            var type = 'engagementComments';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, itemId, undefined, comment);
        };

        this.deleteComment = function (category, categoryId, itemId) {
            var type = 'engagementComments';
            //check if engagement item is already in hash
            return updateEngagement(type, category, categoryId, itemId, undefined, undefined, false, false, false);
        };

        this.getCommentsDynamic = function (data, func) {
           var type = 'engagementComments';
           var refId = data.type;
           //get all comments in category
           refId += (data.category) ? '/' + data.category : '';
           //get all comments for category Id
           refId += (data.categoryId) ? '/' + data.categoryId : '';

           var comments = firebase.database().ref(refId);
           return comments.on('child_changed', func);
       };

        this.create = function (data) {
            var type = 'engagementComments';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, undefined, data.comment);
        };

        this.engagedActivities = function (data) {
            var type = "engagedActivities";
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, true);
        };

        this.disEngagedActivities = function (data) {
            var type = 'engagedActivities';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, false);
        };

        this.engagedLeader = function (data) {
            var type = "engagedLeader";
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, true);
        };

        this.disEngagedLeader = function (data) {
            var type = 'engagedLeader';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, false);
        };

        this.updateComment = function (data) {
            var type = 'engagementComments';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.itemId, undefined, data.comment);
        };

        this.deleteComment = function (data) {
            var type = 'engagementComments';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.itemId, undefined, undefined, false, false, false);
        };

        this.getComments = function (data) {
            var type = 'engagementComments';
            var refId = type;
            //get all comments in category
            refId += (data.category) ? '/' + data.category : '';
            //get all comments for category Id
            refId += (data.categoryId) ? '/' + data.categoryId : '';
            //get all comments for itemId
            refId += (data.itemId) ? '/' + data.itemId : '';

            var comments = firebase.database().ref(refId);
            return comments.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    return currentObj;
                }
                return undefined;
            });
        };

        this.totalComments = function(data){
          return this.getComments(data).then(function(result){
            var count = 0;
            if(result){
              for(var key in result){
                ++count;
              }
            }
            return count;
          });
        };

        this.liked = function (data) {
            var type = 'engagementLikes';
            var data = get(type, data.category, data.categoryId, data.itemId);
            //check if engagement item is already in hash
            return data.then(function(result){
                return (result && result.state)?result.state.active: false;
            });
        };

        this.likes = function(data){
          var type = 'engagementLikes';
          var data = get(type, data.category, data.categoryId);
          //check if engagement item is already in hash
          return data.then(function(result){
              return result;
          });
        };

        this.totalLikes = function(data){
          return this.likes(data).then(function(result){
            var count = 0;
            if(result){
              for(var key in result){
                ++count;
              }
            }
            return count;
          },function(){
            return 0;
          });
        };

        this.like = function (data) {
            var type = 'engagementLikes';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, true);
        };

        this.unlike = function (data) {
            var type = 'engagementLikes';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, false);
        };

        this.addCalendar = function (data) {
            var type = 'engagedCalendar';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, true);
        };

        this.removeCalendar = function (data) {
            var type = 'engagedCalendar';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, false);
        };

        this.partnered = function (data) {
            var type = 'userPartners';
            var data = get(type, data.category, data.categoryId, data.userId);
            //check if engagement item is already in hash
            return data.then(function(result){
                return (result && result.state)?result.state.active: false;
            });
        };

        this.interested = function (data) {
            var type = 'engagedActivities';
            var data = get(type, data.category, data.categoryId, data.userId);
            //check if engagement item is already in hash
            return data.then(function(result){
                return (result && result.state)?result.state.active: false;
            });
        };

        this.posted = function (data) {
            var type = 'userPartners';
            var data = get(type, data.category, data.categoryId, data.userId);
            //check if engagement item is already in hash
            return data.then(function(result){
                return (result && result.state)?result.state.active: false;
            });
        };

        this.partners = function(data){
          var type = 'userPartners';
          var data = get(type, data.category, data.categoryId);
          //check if engagement item is already in hash
          return data.then(function(result){
              return result;
          });
        };

        this.totalPartners = function(data){
          return this.partners(data).then(function(result){
            var count = 0;
            if(result){
              for(var key in result){
                ++count;
              }
            }
            return count;
          });
        };

        this.partner = function (data) {
            var type = 'userPartners';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, true);
        };

        this.unpartner = function (data) {
            var type = 'userPartners';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, false);
        };

        this.selectInterest = function (data) {
            var type = 'engagedActivities';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, true);
        };

        this.unselectInterest = function (data) {
            var type = 'engagedActivities';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, false);
        };

        this.commit = function (data) {
            var type = 'engagementCommits';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, true);
        };

        this.committed = function (data) {
            var type = 'engagementCommits';
            var data = get(type, data.category, data.categoryId, data.userId);
            //check if engagement item is already in hash
            return data.then(function(result){
                return (result && result.state)?result.state.active: false;
            });
        };

        this.commits = function(data){
          var type = 'engagementCommits';
          var data = get(type, data.category, data.categoryId);
          //check if engagement item is already in hash
          return data.then(function(result){
              return result;
          });
        };

        this.totalCommits = function(data){
          return this.commits(data).then(function(result){
            var count = 0;
            if(result){
              for(var key in result){
                ++count;
              }
            }
            return count;
          });
        };

        this.decommit = function (data) {
            var type = 'engagementCommits';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, false);
        };

        this.plan = function (data) {
            var type = 'engagementPlans';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, true);
        };

        this.planned = function (data) {
            var type = 'engagementPlans';
            var data = get(type, data.category, data.categoryId, data.userId);
            //check if engagement item is already in hash
            return data.then(function(result){
                return (result && result.state)?result.state.active: false;
            });
        };

        this.plans = function(data){
          var type = 'engagementPlans';
          var data = get(type, data.category, data.categoryId);
          //check if engagement item is already in hash
          return data.then(function(result){
              return result;
          });
        };

        this.totalPlans = function(data){
          return this.plans(data).then(
            function(result){
            var count = 0;
            if(result){
              for(var key in result){
                ++count;
              }
            }
            return count;
          });
        };

        this.unplan = function (data) {
            var type = 'engagementPlans';
            //check if engagement item is already in hash
            return updateEngagement(type, data.category, data.categoryId, data.userId, false);
        };

    });

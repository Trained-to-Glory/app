angular.module('service.interest', [])
 .service('interestService',function() {

   this.createInterestList = function(userId){
	    var data = {
	           "displayName": "Baseball"
	    };


      //var storageRef = firebase.storage.ref("Activities/baseball.png");

	    var ref = firebase.database().ref('interest');
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var baseballRef = storageRef.child('Activities/baseball.png');

      var baseball = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/baseball-1505036_1280.jpg?alt=media&token=b32ad393-1833-48d9-9798-c0d4e961fa58';
      var basketball = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/basketball-1511298_1280.jpg?alt=media&token=282858f8-6d97-4680-8482-b1f6febace90';
      var climbing = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/mountain-climbing-802099_1280.jpg?alt=media&token=caf3f241-40bb-46cc-889d-2b25d24dc016';
      var cycling = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/cycling-1555983_1280.jpg?alt=media&token=b806879a-9a45-432b-aec8-0a28e24058df';
      var dance = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/dancing-632740_1280.jpg?alt=media&token=3269d896-097d-4abb-9576-b1942bda87e1';
      var football = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/football-1579827_1280.jpg?alt=media&token=3ed027ae-b77f-4aa2-ae67-8d8a1e00ba22';
      var golf = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/golfer-1615609_1280.jpg?alt=media&token=d2a115e4-c150-4375-96fc-436a40f9841b';
      var jumping = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/parachute-1242426_1280.jpg?alt=media&token=330e314c-97ec-41e0-80d1-52a61764b2de';
      var lacrosse = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/Face-off.jpg?alt=media&token=9de877d4-cf6c-40b0-b62d-5e44bfc7ddfd';
      var paintball = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/paintball-918085_1280.jpg?alt=media&token=c84a7d92-eb0c-4802-bae2-9605aefd8b0f';
      var running = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/running-1120606_1280.jpg?alt=media&token=22c1e7dd-18e7-4742-9ebc-ca4a3837faa0';
      var skate = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/skater-1209662_1280.jpg?alt=media&token=e5298822-f5d9-418a-b32c-d66f464347d9';
      var soccer = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/football-1274662_1280.jpg?alt=media&token=fac4f862-f601-4f90-8f90-0408891c6fcc';
      var swimming = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/swimming-pool-830505_1280.jpg?alt=media&token=9a42748a-714c-4ea3-9269-39c6bba01c4a';
      var tennis = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/tennis-926386_1280.jpg?alt=media&token=e280245c-7ae6-4595-9c36-343408dec4b0';
      var ultimate_frisbee = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/ultimate_frisbee.jpg?alt=media&token=30beee46-796b-4bd8-8dde-d1172e15e36e';
      var lifting = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/crossfit-534615_1280.jpg?alt=media&token=134df922-7b6b-4d8e-bef2-a6859e0de452';
      var yoga = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/Acro_Yoga.jpg?alt=media&token=367bd61f-190d-41bd-a2a7-f6111408b43b';

      var key;

      var one = 001;
      var two = 002;
      var three = 003;
      var four = 004;
      var five = 005;
      var six = 006;
      var seven = 007;
      var eight = 008;
      var nine = 009;
      var ten = 10;
      var eleven = 11;
      var twelve = 12;
      var thirteen = 13;
      var fourteen = 14;
      var fifteen = 15;
      var sixteen = 16;
      var seventeen = 17;
      var eightteen = 18;
      var nineteen = 19;

	    var interests = ['Baseball', 'Basketball','Climbing','Cycling','Dance','Football','Golf','Jumping', 'Lacrosee',
	              'Paintball','Running','Skate','Soccer', 'Swimming','Tennis', 'Ultimate Frisbee','Weight Lifting', 'Yoga'];

      var backgroundImg = [baseball,basketball,climbing,cycling,dance,football,golf,jumping,lacrosse,paintball,running,skate,
            soccer,swimming,tennis,ultimate_frisbee,lifting,yoga];

    var numbers =  [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen,fifteen,sixteen,seventeen,eightteen,nineteen];

      for(var i = 0; i < interests.length; i++){
  	      data = {
  	           "displayName": interests[i],
                 "backgroundImg": backgroundImg[i],
                 "numbers": numbers[i]
  	      };
  	      key = ref.push().key;
  	      ref.child(key).set(data);
      }
	    return;
	  };

    this.createTrainersList = function(userId){
 	    var data = {
 	           "displayName": "Baseball"
 	    };

 	    var ref = firebase.database().ref('trainersInterest');
      var baseball = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/baseball-1488004_1280.jpg?alt=media&token=a37a3ea4-0c41-45d4-ab76-f7f2972bd458';
      var basketball = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/basketball-652449_1280.jpg?alt=media&token=342d6be3-3b09-45eb-812e-650910eb772f';
      var dance = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/dancing-1386236_1280.jpg?alt=media&token=429311d2-119b-4144-823c-d9f0dc04bfca';
      var fight = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/box-1514845_1280.jpg?alt=media&token=10a7ccc7-6c0d-4e65-a1b6-dd2921c830c8';
      var football = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/football-coach-1658151_1280.jpg?alt=media&token=96366b37-7987-4c46-b6a6-8763651182b5';
      var golf = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/notice-1353538_1280.jpg?alt=media&token=f86308ff-374b-4011-9dfd-d2cc5efd56aa';
      var lifting = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/weights-646496_1280.jpg?alt=media&token=f535a794-2788-4e44-8c6f-8ad74743396f';
      var nutrition = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/horizontal-1155878_1280.jpg?alt=media&token=194aa726-f7e3-4b08-93f3-70501fa24cc8';
      var running = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/relay-race-655353_1280.jpg?alt=media&token=794eae2b-e0b3-4bdb-8f42-18f72b65dbfd';
      var soccer = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/soccer-1401929_1280.jpg?alt=media&token=e8ccb8dd-a4c8-4130-922c-dc63056f144d';
      var swimming = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/swimmer-659906_1280.jpg?alt=media&token=6217c4d6-3b04-4ab1-b8c5-cb62fc280164';
      var tennis = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/tennis-player-676310_1280.jpg?alt=media&token=34140aba-3772-48af-9662-4c21f7f7b566';
      var weightLoss = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/belly-2354_1280.jpg?alt=media&token=042cc15a-380e-4e7b-a1d8-f8e90ed130a7';
      var yoga = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/yoga-1507398_1280.jpg?alt=media&token=6777d929-1acb-45ec-b42f-e656126b6e5d';

      var one = 001;
      var two = 002;
      var three = 003;
      var four = 004;
      var five = 005;
      var six = 006;
      var seven = 007;
      var eight = 008;
      var nine = 009;
      var ten = 10;
      var eleven = 11;
      var twelve = 12;
      var thirteen = 13;
      var fourteen = 14;

      var key;

 	    var interests = ['Baseball', 'Basketball','Dance','Fight', 'Football','Golf','Lifting', 'Nutrition',
        'Running', 'Soccer', 'Swimming','Tennis', 'Weight Loss', 'Yoga'];

       var backgroundImg = [baseball,basketball,dance,fight,football,golf,lifting,nutrition,running,soccer,swimming,tennis,weightLoss,yoga];

        var numbers =  [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen];

       for(var i = 0; i < interests.length; i++){
   	      data = {
   	           "displayName": interests[i],
                  "backgroundImg": backgroundImg[i],
                  "numbers": numbers[i]
   	      };
   	      key = ref.push().key;
   	      ref.child(key).set(data);
       }
 	    return;
 	  };


	  this.get = function(id){
      var intresets = (id) ? firebase.database().ref('interest/' + id) : firebase.database().ref('interest');
      return intresets.once('value').then(function (snapshot) {
          var currentObj = snapshot.val();
          var numberPost = snapshot.numChildren();
          if (currentObj) {
              return currentObj;
          }
          return undefined;
      });
    };

    this.getMore = function(id){
      var intresets = (id) ? firebase.database().ref('interest/' + id) : firebase.database().ref('interest');
      return intresets.once('value').then(function (snapshot) {
          var currentObj = snapshot.val();
          var numberPost = snapshot.numChildren();
          if (currentObj) {
              return currentObj;
          }
          return undefined;
      });
    };

    this.getLeaderInterest = function(id){
      var intresets = (id) ? firebase.database().ref('trainersInterest/' + id) : firebase.database().ref('trainersInterest');
      return intresets.once('value').then(function (snapshot) {
          var currentObj = snapshot.val();
          if (currentObj) {
              return currentObj;
          }
          return undefined;
      });
    };

    this.getLeaderUsers = function(id){
      var refId = ['engagedActivities','leaderInterest', id].join('/');
      var db = firebase.database().ref(refId);
      var interestedUsers = {};
      return db.once('value').then(function (snapshot) {
          var selectedUsers = snapshot.val();
          if (selectedUsers) {
            var db = firebase.database().ref('accounts');
            return db.once('value').then(function(snapshot){
              var allUsers = snapshot.val();
              if(allUsers){
                for(var user in selectedUsers){
                  interestedUsers[user] = allUsers[user];
                }
                return interestedUsers;
              }
            });
          }
          return undefined;
      });
    };

    this.getInterestUsers = function(id){
      var refId = ['engagedActivities','interest', id].join('/');
      var db = firebase.database().ref(refId);
      var interestedUsers = {};
      return db.once('value').then(function (snapshot) {
          var selectedUsers = snapshot.val();
          if (selectedUsers) {
            var db = firebase.database().ref('accounts');
            return db.once('value').then(function(snapshot){
              var allUsers = snapshot.val();
              if(allUsers){
                for(var user in selectedUsers){
                  interestedUsers[user] = allUsers[user];
                }
                return interestedUsers;
              }
            });
          }
          return undefined;
      });
    };

    this.getTrainers = function(id){
      var intresetTrainer = (id) ? firebase.database().ref('trainersInterest/' + id) : firebase.database().ref('trainersInterest/');
      return intresetTrainer.once('value').then(function (snapshot) {
          var currentObj = snapshot.val();
          var numberPost = snapshot.numChildren();
          if (currentObj) {
              return currentObj;
          }
          return undefined;
      });
    };

    this.getMoreTrainers = function(id){
      var intresets = (id) ? firebase.database().ref('trainersInterest/' + id) : firebase.database().ref('trainersInterest/');
      return intresets.once('value').then(function (snapshot) {
          var currentObj = snapshot.val();
          var numberPost = snapshot.numChildren();
          if (currentObj) {
              return currentObj;
          }
          return undefined;
      });
    };


 });

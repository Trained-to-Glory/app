angular.module('service.interest', [])
 .service('interestService',function() {

   this.createCategoryList = function(userId){
     var data = {
       "displayName": "Animals"
     }

     var animalsExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/animal-explore.jpeg?alt=media&token=f5f7cc33-2a20-4c0d-bb0d-266471deac23';
     var architectureExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/architecture-explore.jpeg?alt=media&token=e533a846-7281-414e-b70c-b3754212c570';
     var artExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/art-explore.jpeg?alt=media&token=29ed663c-8162-48b4-b845-9ed546fe5b02';
     var carExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/car.jpeg?alt=media&token=d7e73a0b-ceb4-4826-9ed8-1a20bcdde841';
     var designExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/design-explore.jpg?alt=media&token=bb3932d1-fdc1-4a91-a872-85d766a7160f';
     var diyExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/diy-explore.jpeg?alt=media&token=0c2a9de7-94c3-4cab-91f2-2aa7918c99d3';
     var educationExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/education-explore.jpg?alt=media&token=5fddfa9c-c235-447b-9714-8f8cd38eff54';
     var eventsExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/events-explore.jpeg?alt=media&token=51d57ceb-6c4f-4088-b973-e3446b7feab5';
     var fashionExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/fashion-explore.jpg?alt=media&token=d40897ee-ab9b-4f51-b8c2-b89e744fb5f3';
     var foodExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/food-explore.jpg?alt=media&token=98ba7c59-6333-41e9-bfde-c7f4455c5c39';
     var gamesExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/games-explore.jpeg?alt=media&token=89eb7748-0e08-4ff0-a30f-64743ec72c77';
     var gardeningExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/gardening-explore.jpg?alt=media&token=3ed326f8-9e39-4a0e-ad59-c37b4b2968a0';
     var hairExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/hair-explore.jpeg?alt=media&token=63eba143-f4cf-485e-8ae9-5026b90ed98d';
     var healthExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/health-explore.jpg?alt=media&token=3ba6033b-422c-4852-8895-082a71e01510';
     var musicExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/music-explore.jpg?alt=media&token=07757d5b-01f0-4229-abb6-0232d4fbc83e';
     var outdoorsExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/outdoors-explore.jpeg?alt=media&token=0a43c67e-cc12-481a-94a7-639618b672ea';
     var technologyExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/technology-explore.jpeg?alt=media&token=03bb5394-81ba-4fba-8b9d-ce4a3237c4e0';

     var animalsMatch  ='https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/bright-animal.jpeg?alt=media&token=978a67ac-ace7-4145-a797-33688a65d998';
     var architectureMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/bright-architecture.jpeg?alt=media&token=58db4f47-9a11-470a-af27-664904cea17a';
     var artMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/bright-art.jpeg?alt=media&token=ae5e49d9-1c03-4faf-a07f-b5ed072c9ef6';
     var carMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/rari-car.jpg?alt=media&token=1dc19291-2faa-4784-95c1-3684367dca2f';
     var designMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/design-match.jpg?alt=media&token=a0a91a8a-27dd-40e3-8086-640f75cdf203';
     var diyMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/diy-match.jpeg?alt=media&token=437f14b9-b6e4-46f2-942a-0460661e927b';
     var educationMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/education-match.jpeg?alt=media&token=1b5465ce-34e6-4544-a9d8-f18c3beb338c';
     var eventsMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/events-match.jpg?alt=media&token=c06cc8bb-8f1a-4c10-b223-50799ede9eae';
     var fashionMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/fashion-match.jpeg?alt=media&token=b6f333bc-b84b-4e95-b969-8d991f7963fc';
     var foodMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/food-match.jpg?alt=media&token=e5e0692b-2fd8-4a0e-b264-e9f1ef5e895c';
     var gamesMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/games-match.jpg?alt=media&token=7cc2876a-43dc-45c7-b854-da18be4944c0';
     var gardeningMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/gardening-match.jpeg?alt=media&token=fd0bbbde-6e5f-4f06-b29c-593183105238';
     var hairMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/hair-match.jpeg?alt=media&token=54432c93-b020-4c87-9b28-d2ebf7b9b8b1';
     var healthMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/health-match.jpg?alt=media&token=7bf910f9-33d1-44fb-a632-688817b38d7a';
     var musicMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/music-match.jpeg?alt=media&token=d4c4739f-7a31-4e61-b3ea-19ff2a05166f';
     var outdoorsMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/new-outdoors.jpg?alt=media&token=d2fa10a5-4049-4f30-bfa0-b8e85ce17a37';
     var technologyMatch = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/new-tech.jpeg?alt=media&token=dce12ecc-5f0c-415c-957b-f06a3d37a91e';

     var ref = firebase.database().ref('interest');

     var animals = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/animal-1072696_1280.jpg?alt=media&token=a213957d-02c7-4c00-886c-46c21cddce0e';
     var architecture = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/architecture-530058_1280.jpg?alt=media&token=3dd1ba33-d511-4977-b2cb-de76ff438e56';
     var art = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/art-100933_1280.jpg?alt=media&token=6664f3ab-30ab-426b-a6ee-842fa6ccf501';
     var beer = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/beer-1732755_1280.jpg?alt=media&token=81cb5925-e675-42d3-94c1-11e47445eadf';
     var cars = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/car-1284641_1280.jpg?alt=media&token=f26bf8c7-d1f4-4ac7-93eb-168e562579eb';
     var design = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/design-998340_1280.jpg?alt=media&token=9b2c8b68-4a4d-4fe2-93c2-14eabcfb3c3b';
     var diy = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/diy-1747889_1280.jpg?alt=media&token=556b685d-8a43-4103-a444-9b70fcc8590e';
     var education = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/education-1760998_1280.jpg?alt=media&token=9c89c4b3-1bd0-4a9a-b6f7-64ded3bd786a';
     var events = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/events-252613_1280.jpg?alt=media&token=7f1b4c52-6f58-4f1b-8af2-c31e063389e6';
     var fashion = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/fashion-906722_1280.jpg?alt=media&token=9cda5bf1-04ab-4d4c-ba2b-a88009898795';
     var food = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/beer-1732755_1280.jpg?alt=media&token=81cb5925-e675-42d3-94c1-11e47445eadf';
     var games = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/video-controller-336657_1280.jpg?alt=media&token=76f02928-0817-4ba6-bf0f-04057e90da17';
     var gardening = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/garden-1754577_1280.jpg?alt=media&token=93a577d6-8a26-4f89-8be4-80bd9b73384c';
     var hair = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/hair-425278_1280.jpg?alt=media&token=7816e3ad-c5e9-4bc7-9e41-b03e2d35b101';
     var health = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/roller-skates-381216_1280.jpg?alt=media&token=e08d5f1d-2aaa-4a6a-a891-85d6321efa4e';
     var music = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/music-616012_1280.jpg?alt=media&token=f7ff82fc-19bd-4a5f-b1be-06f8d8318ee8';
     var outdoors = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/outdoor-1789120_1280.jpg?alt=media&token=3eea4177-0f03-490b-9a87-8c3e090ba0b1';
     var technology = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/technology-1658028_1280.jpg?alt=media&token=edb4f2b1-14d7-4ac2-846a-609ad9b8fad9';

     var key;
     var interests = ['Animals', 'Architecture', 'Art', 'Cars', 'Design', 'DIY', 'Education', 'Events', 'Fashion', 'Food & Drink','Games', 'Gardening', 'Hair & Beauty',
                     'Health & Sports', 'Music', 'Outdoors', 'Technology'];

    var matchImg = [animalsMatch, architectureMatch, artMatch, carMatch, designMatch, diyMatch, educationMatch, eventsMatch, fashionMatch, foodMatch, gamesMatch, gardeningMatch,
                    hairMatch, healthMatch, musicMatch, outdoorsMatch, technologyMatch];

    var exploreImg = [animalsExplore, architectureExplore, artExplore, carExplore, designExplore, diyExplore, educationExplore, eventsExplore, fashionExplore,
                      foodExplore, gamesExplore, gardeningExplore, hairExplore, healthExplore, musicExplore, outdoorsExplore, technologyExplore];

     var backgroundImg = [animals,architecture,art,cars,design,diy,education,events,fashion,food,games,gardening,hair,health,music,
                        outdoors,technology];

     for(var i = 0; i < interests.length; i++){
         data = {
              "displayName": interests[i],
              "backgroundImg": backgroundImg[i],
              "exploreImg": exploreImg[i],
              "matchImg": matchImg[i],
              "state": {
                "actionable": true,
                "visible": true
              }
         };

         key = ref.push().key;
         ref.child(key).set(data);
     }
     return;
   }

    this.createTrainersList = function(userId){
 	    var data = {
 	           "displayName": "Baseball"
 	    };

 	    var ref = firebase.database().ref('trainersInterest');

      var animalsExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/animal-explore.jpeg?alt=media&token=f5f7cc33-2a20-4c0d-bb0d-266471deac23';
      var architectureExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/architecture-explore.jpeg?alt=media&token=e533a846-7281-414e-b70c-b3754212c570';
      var artExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/new-art.jpeg?alt=media&token=c33b10b4-c39d-4fbc-b06d-b9b114c8878c';
      var carExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/car.jpeg?alt=media&token=d7e73a0b-ceb4-4826-9ed8-1a20bcdde841';
      var designExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/design-explore.jpg?alt=media&token=bb3932d1-fdc1-4a91-a872-85d766a7160f';
      var diyExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/diy-explore.jpeg?alt=media&token=0c2a9de7-94c3-4cab-91f2-2aa7918c99d3';
      var educationExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/education-explore.jpg?alt=media&token=5fddfa9c-c235-447b-9714-8f8cd38eff54';
      var eventsExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/new-events.jpeg?alt=media&token=a0026469-5b43-40d3-81b1-64d7b9bff031';
      var fashionExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/fashion-explore.jpg?alt=media&token=d40897ee-ab9b-4f51-b8c2-b89e744fb5f3';
      var foodExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/new-food.jpeg?alt=media&token=7f82937a-38ba-4351-89ee-f5d53f67cb5b';
      var gamesExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/games-explore.jpeg?alt=media&token=89eb7748-0e08-4ff0-a30f-64743ec72c77';
      var gardeningExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/gardening-explore.jpg?alt=media&token=3ed326f8-9e39-4a0e-ad59-c37b4b2968a0';
      var hairExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/hair-explore.jpeg?alt=media&token=63eba143-f4cf-485e-8ae9-5026b90ed98d';
      var healthExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/health-explore.jpg?alt=media&token=3ba6033b-422c-4852-8895-082a71e01510';
      var musicExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/music-explore.jpg?alt=media&token=07757d5b-01f0-4229-abb6-0232d4fbc83e';
      var outdoorsExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/outdoors-explore.jpeg?alt=media&token=0a43c67e-cc12-481a-94a7-639618b672ea';
      var technologyExplore = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/tech-phone.jpeg?alt=media&token=dc7f1164-2515-44e1-9871-0c31cc569033';

      var animalsLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/animals-lead.jpg?alt=media&token=fed29e19-525d-46ac-9466-406e680cb5fb';
      var architectureLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/better-architecture.jpeg?alt=media&token=a366de38-6a02-4b75-89a5-2d656a111b4e';
      var artLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/art-lead.jpg?alt=media&token=86b6ae01-5b25-495b-8d44-c3b74629d810';
      var carsLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/cars-lead.jpg?alt=media&token=3bff43d2-1f3c-4f05-be42-09f42ba9a070';
      var designLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/design-lead.jpg?alt=media&token=19201b2c-2e17-4f34-b027-dec19ea6afdf';
      var diyLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/diy-lead.jpeg?alt=media&token=88311ec7-9a7a-4d22-b95c-3afdbab8fb43';
      var educationLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/education-lead.jpeg?alt=media&token=be3d3ea4-469f-40a4-81c4-b6b3d259fbc1';
      var eventsLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/events-lead.jpg?alt=media&token=c5466c6f-583d-433e-964c-c06395bbb5e3';
      var fashionLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/fashion-lead.jpeg?alt=media&token=b216b86b-646a-48d6-8d4b-253f9130f2f7';
      var foodLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/food-lead.jpeg?alt=media&token=e68e43b9-d0d2-4f1e-aa2e-eb32942852f6';
      var gamesLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/game-lead.jpeg?alt=media&token=06889cf1-7545-45ac-a1c6-d856e453ff7a';
      var gardeningLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/gardening-lead.jpeg?alt=media&token=751b3d70-cf79-4c3a-9881-44f27f6fe937';
      var hairLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/hair-lead.jpg?alt=media&token=6ecc2aff-d2e4-4a4b-97d1-d6de3978ee1d';
      var healthLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/health-lead.jpeg?alt=media&token=5d13ef19-1c8e-4b13-9b29-2d3ab5d05fc9';
      var musicLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/music-lead.jpeg?alt=media&token=3044fbf4-4585-479d-87d3-db528a860b38';
      var outdoorsLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/outdoors-lead.jpg?alt=media&token=17281b98-63ab-42c6-93d1-783fa8a89b9e';
      var technologyLead = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/technology-explore.jpeg?alt=media&token=03bb5394-81ba-4fba-8b9d-ce4a3237c4e0';
      var key;

      var interests = ['Animals', 'Architecture', 'Art', 'Cars', 'Design', 'DIY', 'Education', 'Events', 'Fashion', 'Food & Drink','Games', 'Gardening', 'Hair & Beauty',
                      'Health & Sports', 'Music', 'Outdoors', 'Technology'];

        var backgroundImg = [animalsExplore, architectureExplore, artExplore, carExplore, designExplore, diyExplore, educationExplore, eventsExplore, fashionExplore,
                          foodExplore, gamesExplore, gardeningExplore, hairExplore, healthExplore, musicExplore, outdoorsExplore, technologyExplore];

        var leadImg = [animalsLead, architectureLead,artLead,carsLead,designLead,diyLead,educationLead,eventsLead,fashionLead,foodLead,gamesLead,
                        gardeningLead,hairLead,healthLead,musicLead,outdoorsLead,technologyLead];

       for(var i = 0; i < interests.length; i++){
         //each category data
          data = {
   	           "displayName": interests[i],
                  "backgroundImg": backgroundImg[i],
                  "leadImg": leadImg[i]
   	      };
   	      key = ref.push().key;
   	      ref.child(key).set(data);
       }
 	    return;
 	  };

    this.createPictures = function(userId){
 	    var data = {
 	           "displayName": "Photo"
 	    };

 	    var ref = firebase.database().ref('signupPicture');
      var signin = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/jump-water.jpg?alt=media&token=22759f44-8cd3-49d4-9c43-76e597320345';
      var key;
       var backgroundImg = [signin];
       var label = ['signin'];


       for(var i = 0; i < backgroundImg.length; i++){
   	      data = {
                  "displayName": backgroundImg[i],
                    "label": label[i]
   	      };
   	      key = ref.push().key;
   	      ref.child(key).set(data);
       }
 	    return;
 	  };

    this.createLogin = function(userId){
 	    var data = {
 	           "displayName": "Photo"
 	    };

 	    var ref = firebase.database().ref('loginPicture');
      var login = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/juggler.jpg?alt=media&token=0ddff85c-0df3-4dfd-bed6-11b7ec47711d';
      var key;
       var backgroundImg = [login];
       var label = ['login'];


       for(var i = 0; i < backgroundImg.length; i++){
   	      data = {
                  "displayName": backgroundImg[i],
                    "label": label[i]
   	      };
   	      key = ref.push().key;
   	      ref.child(key).set(data);
       }
 	    return;
 	  };

    this.createPost = function(userId){
 	    var data = {
 	           "displayName": "Photo"
 	    };

 	    var ref = firebase.database().ref('post');
      var login = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/blonde.jpg?alt=media&token=0ad7be04-c390-450d-ad5e-f96f0dbba6bf';
      var key;
       var backgroundImg = [login];


       for(var i = 0; i < backgroundImg.length; i++){
   	      data = {
                  "photo": backgroundImg[i]
   	      };
   	      key = ref.push().key;
   	      ref.child(key).set(data);
       }
 	    return;
 	  };

	  this.get = function(id){
      var intresets = (id) ? firebase.database().ref('interest/') : firebase.database().ref('interest');
      return intresets.once('value').then(function (snapshot) {
          var currentObj = snapshot.val();
          var numberPost = snapshot.numChildren();
          if (currentObj) {
              return currentObj;
          }
          return undefined;
      });
    };

    this.getPictures = function(id){
      var intresets = (id) ? firebase.database().ref('signupPicture/' + id) : firebase.database().ref('signupPicture');
      return intresets.once('value').then(function (snapshot) {
          var currentObj = snapshot.val();
          var numberPost = snapshot.numChildren();
          if (currentObj) {
              return currentObj;
          }
          return undefined;
      });
    };

    this.getStablePost = function(id){
      var intresets = (id) ? firebase.database().ref('post/' + id) : firebase.database().ref('post');
      return intresets.once('value').then(function (snapshot) {
          var currentObj = snapshot.val();
          var numberPost = snapshot.numChildren();
          if (currentObj) {
              return currentObj;
          }
          return undefined;
      });
    };

    this.getLogin = function(id){
      var intresets = (id) ? firebase.database().ref('loginPicture/' + id) : firebase.database().ref('loginPicture');
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

    this.getCategoryList = function(id){
      var intresets = (id) ? firebase.database().ref('category/' + id) : firebase.database().ref('category');
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

    this.getInterestName = function(userId){
      var refId = ['accounts', 'userId','engagedActivities','interest'].join('/');
      var db = firebase.database().ref(refId);
      var interestedUsers = {};
      return db.once('value').then(function (snapshot) {
          var selectedUsers = snapshot.val();
          if (selectedUsers) {
            var db = firebase.database().ref('category');
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
      return db.once('value').then(function (snapshot) {
          var selectedUsers = snapshot.val();
          if (selectedUsers) {
            var db = firebase.database().ref('accounts');
            return db.once('value').then(function(snapshot){
              var allUsers = snapshot.val();
              if(allUsers){
                for(var user in selectedUsers){
                  var interestedUsers = {};
                  interestedUsers[user] = allUsers[user];
                }
                return interestedUsers;
              }
            });
          }
          return undefined;
      });
    };

    this.getLeaderInterestUsers = function(id){
      var refId = ['engagedActivities','leaderInterest','interest', id].join('/');
      var db = firebase.database().ref(refId);
      return db.once('value').then(function (snapshot) {
          var selectedUsers = snapshot.val();
          if (selectedUsers) {
            var db = firebase.database().ref('accounts');
            return db.once('value').then(function(snapshot){
              var allUsers = snapshot.val();
              if(allUsers){
                for(var user in selectedUsers){
                  var interestedUsers = {};
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

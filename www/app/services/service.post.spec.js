describe('Service: postService', function () {
    beforeEach(module('ngMock'));
    beforeEach(module('service.post', function($provide){
      $provide.provider("$localStorage", function () {
      return {
        '$get': function () {
                    var store = {};
          return {
            getItem: function(key){
              return store[key];
            },
            setItem: function(key, value){
              return store[key] = value + '';
            },
            clear: function(){
              store = {};
            }
          };
        }
      };
    });
  }));
    beforeEach(inject(function (postService, $httpBackend) {
        this.postService = postService;
        this.$httpBackend = $httpBackend;
      }));
    afterEach(function () {
        this.$httpBackend.verifyNoOutstandingRequest();
    });

    it('postService should be defined', function () {
        expect(this.postService).toBeDefined();
    });

    it('this.get should be defined', function () {
        expect(this.postService.get).toBeDefined();
    });

    it('this.getPlans should be defined', function () {
        expect(this.postService.getPlans).toBeDefined();
    });

    it('this.getUserPlans should be defined', function () {
        expect(this.postService.getUserPlans).toBeDefined();
    });

    it('this.getAppointments should be defined', function () {
        expect(this.postService.getAppointments).toBeDefined();
    });

    it('this.getUserAppointments should be defined', function () {
        expect(this.postService.getUserAppointments).toBeDefined();
    });

    it('this.create should be defined', function () {
        expect(this.postService.create).toBeDefined();
    });

    it('this.createPlan should be defined', function () {
        expect(this.postService.createPlan).toBeDefined();
    });

    it('this.updatePlan should be defined', function () {
        expect(this.postService.updatePlan).toBeDefined();
    });

    it('this.createAppointment should be defined', function () {
        expect(this.postService.createAppointment).toBeDefined();
    });

    it('this.updateAppointment should be defined', function () {
        expect(this.postService.updateAppointment).toBeDefined();
    });

    it('this.update should be defined', function () {
        expect(this.postService.update).toBeDefined();
    });

    it('this.delete should be defined', function () {
        expect(this.postService.delete).toBeDefined();
    });

    it('this.deleteAppointment should be defined', function () {
        expect(this.postService.deleteAppointment).toBeDefined();
    });

    it('this.deletePlans should be defined', function () {
        expect(this.postService.deletePlans).toBeDefined();
    });

    it('this.getNews should be defined', function () {
        expect(this.postService.getNews).toBeDefined();
    });

    it('this.getSentPlans should be defined', function () {
        expect(this.postService.getSentPlans).toBeDefined();
    });

    it('this.getUserCalendar should be defined', function () {
        expect(this.postService.getUserCalendar).toBeDefined();
    });

    it('this.getRandomObject should be defined', function () {
        expect(this.postService.getRandomObject).toBeDefined();
    });

});

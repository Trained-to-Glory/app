describe('Service: appointmentsService', function () {
    beforeEach(module('ngMock'));
    beforeEach(module('service.appointments', function($provide){
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
    beforeEach(inject(function (appointmentsService, $httpBackend) {
        this.appointmentsService = appointmentsService;
        this.$httpBackend = $httpBackend;
      }));
    afterEach(function () {
        this.$httpBackend.verifyNoOutstandingRequest();
    });

    it('appointmentsService should be defined', function () {
        expect(this.appointmentsService).toBeDefined();
    });

    it('this.create should be defined', function () {
        expect(this.appointmentsService.create).toBeDefined();
    });

    it('this.update should be defined', function () {
        expect(this.appointmentsService.update).toBeDefined();
    });

    it('remove should be defined', function () {
        expect(this.appointmentsService.remove).toBeDefined();
    });

    it('get should be defined', function () {
        expect(this.appointmentsService.get).toBeDefined();
    });

    it('this.create should return', function () {
      var data;
      this.appointmentsService.create(data).then(function(results){
        expect(results).toBeDefined();
      }, function(){
        failure('did not expect the failure call back to be called');
      }).catch(function(){
        failure('did not expect the catch method to be called');
      })
    });

    it('this.update should return', function () {
      var data;
      this.appointmentsService.update(data).then(function(results){
        expect(results).toBeDefined();
      }, function(){
        failure('did not expect the failure call back to be called');
      }).catch(function(){
        failure('did not expect the catch method to be called');
      })
    });

});

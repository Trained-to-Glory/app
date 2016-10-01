describe('Service: usersService', function () {
    beforeEach(module('ngMock'));
    beforeEach(module('service.users', function($provide){
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
    beforeEach(inject(function (usersService, $httpBackend) {
        this.usersService = usersService;
        this.$httpBackend = $httpBackend;
      }));
    afterEach(function () {
        this.$httpBackend.verifyNoOutstandingRequest();
    });

    it('usersService should be defined', function () {
        expect(this.usersService).toBeDefined();
    });

    it('this.get should be defined', function () {
        expect(this.usersService.get).toBeDefined();
    });

    it('this.getPartners should be defined', function () {
        expect(this.usersService.getPartners).toBeDefined();
    });

    it('this.getUserPost should be defined', function () {
        expect(this.usersService.getUserPost).toBeDefined();
    });

    it('this.getUserCommits should be defined', function () {
        expect(this.usersService.getUserCommits).toBeDefined();
    });

    it('this.getPartnerPosts should be defined', function () {
        expect(this.usersService.getPartnerPosts).toBeDefined();
    });

    it('this.getUserTotalCommits should be defined', function () {
        expect(this.usersService.getUserTotalCommits).toBeDefined();
    });

    it('this.getUserTotalPost should be defined', function () {
        expect(this.usersService.getUserTotalPost).toBeDefined();
    });

    it('this.getClosestUsers hould be defined', function () {
        expect(this.usersService.getClosestUsers).toBeDefined();
    });

    it('this.getAllAccounts should be defined', function () {
        expect(this.usersService.getAllAccounts).toBeDefined();
    });

    it('this.getUserTotalPartners should be defined', function () {
        expect(this.usersService.getUserTotalPartners).toBeDefined();
    });

    it('this.logo should be defined', function () {
        expect(this.usersService.logo).toBeDefined();
    });

});

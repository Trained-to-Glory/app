describe('Service: engagementService', function () {
    beforeEach(module('ngMock'));
    beforeEach(module('service.engagements', function($provide){
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
    beforeEach(inject(function (engagementService, $httpBackend) {
        this.engagementService = engagementService;
        this.$httpBackend = $httpBackend;
      }));
    afterEach(function () {
        this.$httpBackend.verifyNoOutstandingRequest();
    });

    it('engagementService should be defined', function () {
        expect(this.engagementService).toBeDefined();
    });

    it('createComment should be defined', function () {
        expect(this.engagementService.createComment).toBeDefined();
    });

    it('create should be defined', function () {
        expect(this.engagementService.create).toBeDefined();
    });

    it('engagedActivities should be defined', function () {
        expect(this.engagementService.engagedActivities).toBeDefined();
    });

    it('disEngagedActivities should be defined', function () {
        expect(this.engagementService.disEngagedActivities).toBeDefined();
    });

    it('updateComment should be defined', function () {
        expect(this.engagementService.updateComment).toBeDefined();
    });

    it('deleteComment should be defined', function () {
        expect(this.engagementService.deleteComment).toBeDefined();
    });

    it('getComments should be defined', function () {
        expect(this.engagementService.getComments).toBeDefined();
    });

    it('totalComments should be defined', function () {
        expect(this.engagementService.totalComments).toBeDefined();
    });

    it('liked should be defined', function () {
        expect(this.engagementService.liked).toBeDefined();
    });

    it('likes should be defined', function () {
        expect(this.engagementService.likes).toBeDefined();
    });

    it('totalLikes should be defined', function () {
        expect(this.engagementService.totalLikes).toBeDefined();
    });

    it('like should be defined', function () {
        expect(this.engagementService.like).toBeDefined();
    });

    it('unlike should be defined', function () {
        expect(this.engagementService.unlike).toBeDefined();
    });

    it('partnered should be defined', function () {
        expect(this.engagementService.partnered).toBeDefined();
    });

    it('posted should be defined', function () {
        expect(this.engagementService.posted).toBeDefined();
    });

    it('partners should be defined', function () {
        expect(this.engagementService.partners).toBeDefined();
    });

    it('totalPartners should be defined', function () {
        expect(this.engagementService.totalPartners).toBeDefined();
    });

    it('partner should be defined', function () {
        expect(this.engagementService.partner).toBeDefined();
    });

    it('unpartner should be defined', function () {
        expect(this.engagementService.unpartner).toBeDefined();
    });

    it('commit should be defined', function () {
        expect(this.engagementService.commit).toBeDefined();
    });

    it('committed should be defined', function () {
        expect(this.engagementService.committed).toBeDefined();
    });

    it('commits should be defined', function () {
        expect(this.engagementService.commits).toBeDefined();
    });

    it('totalCommits should be defined', function () {
        expect(this.engagementService.totalCommits).toBeDefined();
    });

    it('decommit should be defined', function () {
        expect(this.engagementService.decommit).toBeDefined();
    });

});

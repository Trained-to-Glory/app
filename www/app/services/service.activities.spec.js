describe('Service: activitiesServices', function () {
    beforeEach(module('ngMock'));
    beforeEach(module('service.activities'));
    beforeEach(inject(function (activitiesService, $httpBackend) {
        this.activitiesService = activitiesService;
        this.$httpBackend = $httpBackend;
    }));
    afterEach(function () {
        this.$httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function () {
        expect(this.activitiesService).toBeDefined();
    });
});

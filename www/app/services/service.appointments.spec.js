describe('Service: appointmentsServices', function () {
    beforeEach(module('ngMock'));
    beforeEach(module('service.appointments'));
    beforeEach(inject(function (appointmentsService, $httpBackend) {
        this.activitiesService = appointmentsService;
        this.$httpBackend = $httpBackend;
    }));
    afterEach(function () {
        this.$httpBackend.verifyNoOutstandingRequest();
    });

    it('appointmentsService should be defined', function () {
        expect(this.appointmentsService).toBeDefined();
    });

});

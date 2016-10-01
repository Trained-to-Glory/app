describe('Service: interestService', function () {
    beforeEach(module('ngMock'));
    beforeEach(module('service.interest'));
    beforeEach(inject(function (interestService, $httpBackend) {
        this.interestService = interestService;
        this.$httpBackend = $httpBackend;
    }));
    afterEach(function () {
        this.$httpBackend.verifyNoOutstandingRequest();
    });

    it('interestService should be defined', function () {
        expect(this.interestService).toBeDefined();
    });

    it('this.createInterestList should be defined', function () {
        expect(this.interestService.createInterestList).toBeDefined();
    });

    it('this.createTrainersList should be defined', function () {
        expect(this.interestService.createTrainersList).toBeDefined();
    });

    it('this.get should be defined', function () {
        expect(this.interestService.get).toBeDefined();
    });

    it('this.getInterestUsers should be defined', function () {
        expect(this.interestService.getInterestUsers).toBeDefined();
    });

    it('this.getTrainers should be defined', function () {
        expect(this.interestService.getTrainers).toBeDefined();
    });

});

const request = require('supertest');
const calendarificService = require('../services/calendarServices');
const server = require('../server');

jest.mock('../services/calendarServices');

describe('Calendar API', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('GET /api/holidays', () => {
        it('should return holidays for a given country and year', async () => {
            const mockHolidays = [{ name: 'New Year', date: '2024-01-01' }];
            calendarificService.getHolidays.mockResolvedValue(mockHolidays);

            const response = await request(server)
                .get('/api/holidays')
                .query({ country: 'PAK', year: '2024' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockHolidays);
        });

        it('should return 400 if country or year is missing', async () => {
            const response = await request(server).get('/api/holidays');

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /api/countries', () => {
        it('should return a list of supported countries', async () => {
            const mockCountries = [{ code: 'PAK', name: 'Pakistan' }];
            calendarificService.getCountries.mockResolvedValue(mockCountries);

            const response = await request(server).get('/api/countries');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCountries);
        });
    });
});

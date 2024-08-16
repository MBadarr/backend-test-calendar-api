const request = require('supertest');
const app = require('../app');
const calendarServices = require('../services/calendarServices');
const axios = require('axios');
const config = require('../config/config');

jest.mock('axios');
jest.mock('../services/calendarServices');

describe('API Endpoints', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch holidays from cache', async () => {
        const holidayData = { message: 'Task List', holidays: [] };
        calendarServices.getHolidays.mockResolvedValue(holidayData);

        const response = await request(app).get('/api/holidays?country=PK&year=2024');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(holidayData);
        expect(calendarServices.getHolidays).toHaveBeenCalledWith('PK', '2024');
    });

    it('should fetch holidays from Calendarific API', async () => {
        const holidayData = { message: 'Task List', holidays: [] };
        axios.get.mockResolvedValue({ data: { response: { holidays: holidayData } } });

        calendarServices.getHolidays.mockImplementation(async (country, year) => {
            const response = await axios.get(`${config.apiUrl}/holidays`, {
                params: {
                    api_key: config.apiKey,
                    country,
                    year,
                }
            });
            return response.data.response.holidays;
        });

        const response = await request(app).get('/api/holidays?country=PK&year=2024');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(holidayData);
        expect(axios.get).toHaveBeenCalledWith(`${config.apiUrl}/holidays`, {
            params: {
                api_key: config.apiKey,
                country: 'PK',
                year: '2024',
            }
        });
    });

    it('should handle API errors', async () => {
        calendarServices.getHolidays.mockRejectedValue(new Error('Failed to fetch holidays'));

        axios.get.mockRejectedValue(new Error('API Error'));

        const response = await request(app).get('/api/holidays?country=PK&year=2024');

        expect(response.status).toBe(500);

        expect(calendarServices.getHolidays).toHaveBeenCalledWith('PK', '2024');
    });


    it('should fetch countries from cache', async () => {
        const countriesData = { message: 'Countries List', countries: [] };
        calendarServices.getCountries.mockResolvedValue(countriesData);

        const response = await request(app).get('/api/countries');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(countriesData);
        expect(calendarServices.getCountries).toHaveBeenCalled();
    });

    it('should fetch countries from Calendarific API', async () => {
        const countriesData = { message: 'Countries List', countries: [] };
        axios.get.mockResolvedValue({ data: { response: { countries: countriesData } } });

        calendarServices.getCountries.mockImplementation(async () => {
            const response = await axios.get(`${config.apiUrl}/countries`, {
                params: {
                    api_key: config.apiKey,
                },
            });
            return response.data.response.countries;
        });

        const response = await request(app).get('/api/countries');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(countriesData);
        expect(axios.get).toHaveBeenCalledWith(`${config.apiUrl}/countries`, {
            params: {
                api_key: config.apiKey,
            }
        });
    });
});

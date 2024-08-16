const axios = require('axios');
const NodeCache = require('node-cache');
const config = require('../config/config');

const cache = new NodeCache({stdTTL: config.cacheTtl});

const getHolidays = async (country, year) => {
    const cacheKey = `holidays_${country}_${year}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return cachedData;
    }
    try {
        const response = await axios.get(`${config.calendarificApiUrl}/holidays`, {
            params: {
                api_key: config.calendarificApiKey,
                country,
                year
            }
        });

        const holidays = response.data.response.holidays;
        cache.set(cacheKey, holidays);

        return holidays;
    } catch (error) {
        throw new Error('Failed to fetch holidays');
    }
};

const getCountries = async () => {
    const cacheKey = 'countries';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await axios.get(`${config.calendarificApiUrl}/countries`, {
            params: {
                api_key: config.calendarificApiKey,
            },
        });

        const countries = response.data.response.countries;
        cache.set(cacheKey, countries);

        return countries;

    } catch (error) {
        throw new Error('Failed to fetch countries');
    }
};

module.exports = {
    getHolidays,
    getCountries,
};
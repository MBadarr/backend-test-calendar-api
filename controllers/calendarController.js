const calendarificService = require('../services/calendarServices');

const getHolidays = async (req, res) => {
    try {
        const { country, year } = req.query;

        if (!country || !year) {
            return res.status(400).json({ error: 'Country and year are required' });
        }

        const holidays = await calendarificService.getHolidays(country, year);
        console.log('holidays', holidays)
        res.json(holidays);

    } catch (error) {
        console.error('Error fetching holidays:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCountries = async (req, res) => {
    try {
        const countries = await calendarificService.getCountries();
        res.json(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getHolidays,
    getCountries,
};
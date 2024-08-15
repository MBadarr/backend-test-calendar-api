require('dotenv').config();

module.exports = {
    calendarificApiKey: process.env.CALENDARIFIC_API_KEY,
    calendarificApiUrl: process.env.CALENDARIFIC_API_URL,
    cacheTtl: parseInt(process.env.CACHE_TTL, 10) || 3600,
};
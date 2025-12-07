const { normalizeGoogleEvent } = require('../utils/normalizer');

class GoogleService {
  async getEvents(userId) {
    try {
      const mockData = require('../mock/googleEvents.json');
      return mockData.map(normalizeGoogleEvent);
    } catch (error) {
      console.error('Google Service Error:', error);
      return [];
    }
  }
}

module.exports = new GoogleService();


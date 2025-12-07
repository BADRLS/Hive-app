const { normalizeOutlookEvent } = require('../utils/normalizer');

class OutlookService {
  async getEvents(userId) {
    try {
      const mockData = require('../mock/outlookEvents.json');
      return mockData.map(normalizeOutlookEvent);
    } catch (error) {
      console.error('Outlook Service Error:', error);
      return [];
    }
  }
}

module.exports = new OutlookService();


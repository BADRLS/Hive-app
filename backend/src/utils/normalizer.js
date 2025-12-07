// Normalize Canvas assignment data (REAL API version)
const normalizeCanvasAssignment = (canvasData) => {
  // Handle both mock data and real API data
  const item = canvasData.plannable || canvasData;
  
  return {
    id: String(canvasData.plannable_id || canvasData.id || Math.random()),
    source_platform: 'Canvas',
    type: 'assignment',
    title: item?.title || canvasData.title || 'Untitled',
    description: item?.details || canvasData.description || 'No description provided',
    course: canvasData.context_name || canvasData.course_code || 'Unknown Course',
    due_date: canvasData.plannable_date || canvasData.due_at || item?.due_at || null,
    status: canvasData.submissions?.submitted ? 'submitted' : 'pending',
    link: canvasData.html_url || item?.html_url || '#',
    priority: 'Medium'
  };
};

// Normalize Outlook event data
const normalizeOutlookEvent = (outlookData) => {
  return {
    id: `outlook-${outlookData.id}`,
    source_platform: 'Outlook',
    type: 'event',
    title: outlookData.subject,
    description: outlookData.bodyPreview || 'No description',
    start_time: outlookData.start.dateTime,
    end_time: outlookData.end.dateTime,
    event_type: 'meeting',
    status: 'upcoming',
    priority: 'Medium'
  };
};

// Normalize Google Calendar event data
const normalizeGoogleEvent = (googleData) => {
  return {
    id: `google-${googleData.id}`,
    source_platform: 'Google',
    type: 'event',
    title: googleData.summary,
    description: googleData.description || 'No description',
    start_time: googleData.start.dateTime,
    end_time: googleData.end.dateTime,
    event_type: 'exam',
    status: 'upcoming',
    priority: 'Medium'
  };
};

module.exports = {
  normalizeCanvasAssignment,
  normalizeOutlookEvent,
  normalizeGoogleEvent
};

const express = require('express');
const router = express.Router();

// Submit assignment
router.post('/submit/:assignmentId', async (req, res) => {
  const { assignmentId } = req.params;
  const { submission_text, file_url } = req.body;
  
  try {
    console.log(`Submission received for assignment \${assignmentId}`);
    
    // For now, mock success response
    res.json({
      success: true,
      message: 'Assignment submitted successfully!',
      assignment_id: assignmentId,
      submitted_at: new Date().toISOString(),
      submission_type: file_url ? 'file' : 'text',
      content: submission_text || file_url
    });
    
  } catch (error) {
    console.error('Submission Error:', error);
    res.status(500).json({
      success: false,
      error: 'Submission failed'
    });
  }
});

module.exports = router;


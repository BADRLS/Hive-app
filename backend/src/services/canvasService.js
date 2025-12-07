const axios = require('axios');
const { normalizeCanvasAssignment } = require('../utils/normalizer');
require('dotenv').config();

class CanvasService {
  async getAssignments(userId) {
    try {
      console.log("🔗 Connecting to REAL Canvas API...");
      
      // Test token
      if (!process.env.CANVAS_API_TOKEN) {
        throw new Error('No Canvas API token in .env file');
      }
      
      // 1. Get user's courses first
      console.log("📚 Fetching enrolled courses...");
      const coursesResponse = await axios.get(
        `${process.env.CANVAS_BASE_URL}/courses?enrollment_state=active`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CANVAS_API_TOKEN}`
          },
          timeout: 10000
        }
      );
      
      const courses = coursesResponse.data;
      console.log(`✅ Found ${courses.length} courses`);
      
      // 2. Get assignments for each course
      let allAssignments = [];
      
      for (const course of courses.slice(0, 3)) { // Limit to 3 courses for speed
        try {
          console.log(`   Fetching assignments for: ${course.name}`);
          
          const assignmentsResponse = await axios.get(
            `${process.env.CANVAS_BASE_URL}/courses/${course.id}/assignments`,
            {
              headers: {
                Authorization: `Bearer ${process.env.CANVAS_API_TOKEN}`
              },
              params: {
                bucket: 'future' // Get upcoming assignments
              }
            }
          );
          
          // Add course info to each assignment
          const assignmentsWithCourse = assignmentsResponse.data.map(assignment => ({
            ...assignment,
            course_name: course.name,
            course_code: course.course_code
          }));
          
          allAssignments = [...allAssignments, ...assignmentsWithCourse];
          
        } catch (courseError) {
          console.error(`   Skipping course ${course.name}:`, courseError.message);
          continue;
        }
      }
      
      console.log(`📊 Total assignments found: ${allAssignments.length}`);
      
      // 3. Normalize the data
      const normalizedData = allAssignments.map(assignment => {
        return {
          assignment_id: String(assignment.id),
          source_platform: 'Canvas',
          type: 'assignment',
          title: assignment.name || 'Untitled Assignment',
          description: assignment.description || 'No description',
          course: assignment.course_name || assignment.course_code || 'Unknown Course',
          due_date: assignment.due_at || null,
          status: assignment.has_submitted_submissions ? 'submitted' : 'pending',
          link: assignment.html_url || `https://aui.instructure.com/courses/${assignment.course_id}/assignments/${assignment.id}`,
          priority: 'Medium',
          raw_assignment: assignment // Keep for debugging
        };
      });
      
      // Sort by due date
      normalizedData.sort((a, b) => {
        const dateA = a.due_date ? new Date(a.due_date) : new Date('9999-12-31');
        const dateB = b.due_date ? new Date(b.due_date) : new Date('9999-12-31');
        return dateA - dateB;
      });
      
      return normalizedData;
      
    } catch (error) {
      console.error("❌ Canvas API Error:", error.message);
      
      if (error.response) {
        console.error("Status:", error.response.status);
        
        // Return mock data for demo purposes
        console.log("⚠️ Falling back to mock data for demo");
        const mockData = require('../mock/canvasAssignments.json');
        return mockData.map(normalizeCanvasAssignment);
      }
      
      throw error;
    }
  }
  
  // New method: Get user profile
  async getUserProfile() {
    try {
      const response = await axios.get(
        `${process.env.CANVAS_BASE_URL}/users/self/profile`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CANVAS_API_TOKEN}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Profile fetch error:", error.message);
      return null;
    }
  }
}

module.exports = new CanvasService();

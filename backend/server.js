const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Import Member 3's Service (The Real Fetcher)
// Note: We are pointing to the 'real' one based on your file structure
const { fetchCanvasAssignments } = require('./src/services/canvasService.real.js');

const app = express();
const PORT = process.env.PORT || 3000;
const AI_SERVICE_URL = 'http://127.0.0.1:5001/predict-priority';

app.use(cors()); // Allow Frontend to connect
app.use(express.json());

// The Main API Route
app.get('/api/feed', async (req, res) => {
    console.log("📥 Feed requested by Frontend...");
    
    try {
        // 1. GET REAL DATA (Member 3)
        // If this fails (e.g. no token), we catch the error below
        const rawAssignments = await fetchCanvasAssignments();
        console.log(`✅ Retrieved ${rawAssignments.length} assignments from Canvas.`);

        // 2. ENRICH WITH AI (Member 4 - You)
        // We assume your Python server is running on Port 5001
        const enrichedAssignments = await Promise.all(rawAssignments.map(async (task) => {
            try {
                // Ask Python: "What priority is this due date?"
                const aiResponse = await axios.post(AI_SERVICE_URL, {
                    due_date: task.due_date 
                });
                return { ...task, priority: aiResponse.data.priority };
            } catch (err) {
                // Fallback if Python is off
                return { ...task, priority: 'Medium' };
            }
        }));

        // 3. Send final data to Frontend
        res.json(enrichedAssignments);

    } catch (error) {
        console.error("❌ Error in feed pipeline:", error.message);
        // Fallback: Send empty array or mock data so app doesn't crash
        res.json([]); 
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend is running on http://localhost:${PORT}`);
});
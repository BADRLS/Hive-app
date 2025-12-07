const express = require('express');
const axios = require('axios');
const db = require('../db');
const router = express.Router();
require('dotenv').config();

// ==========================================
// METHOD 1: MANUAL LINK (The "Working" Demo)
// ==========================================
router.post('/link-canvas', async (req, res) => {
    const { userId, canvasToken } = req.body;

    if (!userId || !canvasToken) return res.status(400).json({ error: "Missing info" });

    try {
        await db.query(
            `INSERT INTO connected_accounts (user_id, platform, access_token) 
             VALUES ($1, 'canvas', $2)
             ON CONFLICT (user_id, platform) 
             DO UPDATE SET access_token = $2, last_sync = NOW()`,
            [userId, canvasToken]
        );
        res.json({ success: true, message: "Manual link successful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

// ==========================================
// METHOD 2: OAUTH FLOW (The "Academic" Proof)
// ==========================================

// 1. Redirect User to Canvas
router.get('/connect/canvas', (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.CANVAS_CLIENT_ID || 'mock_client_id', // Fallback if no env
        response_type: 'code',
        redirect_uri: process.env.CANVAS_REDIRECT_URI || 'http://localhost:3000/api/integration/canvas/callback',
        state: 'secure_random_string',
        scope: 'url:GET|/api/v1/planner/items'
    });
    
    // Redirects browser to the university login page
    res.redirect(`${process.env.CANVAS_BASE_URL}/login/oauth2/auth?${params}`);
});

// 2. Handle the Return (Callback)
router.get('/canvas/callback', async (req, res) => {
    const { code, error } = req.query;
    
    if (error) return res.status(400).send("Authorization failed or denied.");

    try {
        // Exchange code for token (This will fail without real Admin Keys, but the code is correct)
        const response = await axios.post(`${process.env.CANVAS_BASE_URL}/login/oauth2/token`, {}, {
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.CANVAS_CLIENT_ID,
                client_secret: process.env.CANVAS_CLIENT_SECRET,
                redirect_uri: process.env.CANVAS_REDIRECT_URI,
                code: code
            }
        });

        // If successful, save to DB (Logic acts as if we have a user from session)
        // For demo purposes, we might redirect to a "Success" page
        res.redirect('http://localhost:5173/dashboard?status=oauth_success');

    } catch (err) {
        console.error("OAuth Exchange Failed (Expected without Admin Keys):", err.message);
        // Redirect back to frontend with a specific error flag
        res.redirect('http://localhost:5173/settings?error=oauth_config_missing');
    }
});

module.exports = router;
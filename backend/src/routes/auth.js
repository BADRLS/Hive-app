// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../db'); // Import the connection we just made
const router = express.Router();

// 1. SIGN UP
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save to DB
    const result = await db.query(
      "INSERT INTO users (email, password_hash, display_name) VALUES ($1, $2, $3) RETURNING user_id, email",
      [email, hashedPassword, name]
    );
    
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "User already exists or DB error" });
  }
});

// 2. LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(400).json({ error: "User not found" });

    const user = result.rows[0];

    // Check password
    const validPass = await bcrypt.compare(password, user.password_hash);
    if (!validPass) return res.status(400).json({ error: "Invalid password" });

    // Create Token (The "Passport" for the app)
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { id: user.user_id, name: user.display_name } });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
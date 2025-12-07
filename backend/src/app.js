const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock authentication middleware
app.use((req, res, next) => {
  req.userId = "user-123"; // Mock user ID for testing
  next();
});

// Routes
const integrationRoutes = require("./routes/integrationRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");

app.use("/api/integration", integrationRoutes);
app.use("/api/assignments", assignmentRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ 
    message: "Hive Integration API is running",
    version: "1.0.0",
    status: "active",
    endpoints: [
      "GET /api/integration/feed",
      "GET /api/integration/test",
      "POST /api/assignments/submit/:id"
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Hive Integration API running on http://localhost:${PORT}`);
  console.log(`📡 Feed endpoint: http://localhost:${PORT}/api/integration/feed`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/integration/test`);
});

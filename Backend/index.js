// Import required modules
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db"); // Import the connectDB function
const signup = require("./routes/signup.routes");
const login = require("./routes/login.routes");
const taskRoutes = require("./routes/task.routes");
const dotenv = require("dotenv"); // Import dotenv

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware - CORS setup
app.use((req, res, next) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');
    
    // Preflight CORS handler
    if(req.method === 'OPTIONS') {
        return res.status(200).json({ body: "OK" });
    }
    
    next(); // Move to the next middleware
});

// Middleware - Parse JSON bodies
app.use(express.json());

// Routes
app.use("/api", signup);
app.use("/api", login);
app.use("/api/task", taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

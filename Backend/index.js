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

// Middleware
app.use(express.json());
app.use(cors(
  {
    origin: ["https://todoing-frontend.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  }
));

// Routes
app.use("/api", signup);
app.use("/api", login);
app.use("/api/task", taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
const PORT = process.env.PORT || 3000; // Use the port specified in .env file or default to 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

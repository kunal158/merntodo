// Import required modules
const { connect } = require("mongoose");
const dotenv = require("dotenv"); // Import dotenv

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI); // Use the connection string from .env file
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

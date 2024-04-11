// Import required modules
const { connect } = require("mongoose");
const dotenv = require("dotenv"); // Import dotenv

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    await connect("mongodb+srv://kunalg0815:kunal1111@cluster0.ufddxqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"); 
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

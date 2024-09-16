import mongoose from "mongoose";

const DbCon = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL); // No need for additional options
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process if connection fails
  }
};

export default DbCon;


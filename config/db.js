const mongoose = require("mongoose");
const config = require("config");
const db = "mongodb+srv://akash:root@cluster0-546bh.mongodb.net/test";

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(`MongoDB Connection Error ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;

// db.js (hoặc config/db.js)
const mongoose = require('mongoose');

module.exports.connect = async () => {
  const MONGODB_URL = process.env.MONGODB_URL;
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('✅ MongoDB Atlas connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
};

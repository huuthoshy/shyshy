const { MongoClient } = require("mongodb");

// Kết nối tới MongoDB (thay <your_connection_string> bằng connection string của bạn)
const uri = "mongodb://localhost:27017/jetjet";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log(" Kết nối MongoDB thành công!");
  } catch (err) {
    console.error(" Lỗi kết nối MongoDB:", err);
  }
}

connectDB();

module.exports = client;  // Export client để xài ở file khác

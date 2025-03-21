require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/jetjet", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  account: { type: String, unique: true },
  password: String,
  avatar: String,
  role: { type: String, default: "user" },
});

const songSchema = new mongoose.Schema({
  id: Number,
  title: String,
  artist: String,
  audioUrl: String,
  imgUrl: String,
  duration: String,
  favorite: { type: Boolean, default: false } 
});

//Lấy thông tin bài hát
const Song = mongoose.model("Song", songSchema);

//Lấy thông tin User
const User = mongoose.model("User", userSchema);

// Đăng ký
app.post("/register", async (req, res) => {
  const { name, account, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, account, password: hashedPassword });
    await newUser.save();
    res.json({ message: "Đăng ký thành công!" });
  } catch (error) {
    res.status(400).json({ message: "Tài khoản đã tồn tại!" });
  }
});

// Đăng nhập
app.post("/login", async (req, res) => {
  const { account, password } = req.body;
  try {
    const user = await User.findOne({ account });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
    }
    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
    res.json({ message: "Đăng nhập thành công!", token });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!" });
  }
});

// Đăng nhập với Google
app.post("/google-login", async (req, res) => {
  const { name, account, avatar } = req.body;
  try {
    let user = await User.findOne({ account });
    if (!user) {
      user = new User({ name, account, avatar });
      await user.save();
    }
    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
    res.json({ message: "Đăng nhập Google thành công!", token });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!" });
  }
});


// Lấy tất cả bài hát
app.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find({});
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!" });
  }
});

app.put("/songs/:id/favorite", async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const updatedSong = await Song.findOneAndUpdate(
      { id: Number(id) }, // tìm theo trường "id"
      { favorite },
      { new: true }
    );

    if (!updatedSong) {
      return res.status(404).json({ message: "Không tìm thấy bài hát" });
    }

    res.json({
      message: "Cập nhật favorite thành công!",
      song: updatedSong
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật favorite:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật favorite!" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));
import React, { useState } from "react";
import "../Style/Login.css";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import backgroundVideo from "../img/background.mp4";
import { sendPasswordResetEmail } from "firebase/auth";

export const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Thêm state hiển thị message
  const [registerMessage, setRegisterMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const navigate = useNavigate();
  const API_URL = "http://127.0.0.1:5000";

  const toggleForm = () => {
    setIsRegister(!isRegister);
    // Reset thông báo khi đổi form
    setRegisterMessage("");
    setLoginMessage("");
  };

  const handleRegister = async () => {
    if (!name || !account || !password) {
      setRegisterMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const emailInput = document.getElementById("register-email");
    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    setLoading(true);
    setRegisterMessage(""); // reset trước khi xử lý

    try {
      const response = await axios.post(`${API_URL}/register`, { name, account, password });
      setRegisterMessage(response.data.message || "Đăng ký thành công!");
      setName("");
      setAccount("");
      setPassword("");
      setIsRegister(false);
    } catch (error) {
      setRegisterMessage(error.response?.data?.message || "Đăng ký thất bại!");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    if (!account || !password) {
      setLoginMessage("Vui lòng nhập tài khoản & mật khẩu!");
      return;
    }

    const emailInput = document.getElementById("login-email");
    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    setLoading(true);
    setLoginMessage("");

    try {
      const response = await axios.post(`${API_URL}/login`, { account, password });
      // Đăng nhập thành công, không cần hiện message nữa
      window.location.href = "/app";
    } catch (error) {
      setLoginMessage(error.response?.data?.message || "Đăng nhập thất bại!");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const response = await axios.post(`${API_URL}/google-login`, {
        name: user.displayName,
        account: user.email,
        avatar: user.photoURL,
      });
      window.location.href = "/app";
    } catch (error) {
      setLoginMessage("Google Login thất bại: " + error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!account) {
      setLoginMessage("Vui lòng nhập email để đặt lại mật khẩu!");
      return;
    }

    const emailInput = document.getElementById("login-email");
    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    try {
      await sendPasswordResetEmail(auth, account);
      setLoginMessage("Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư!");
    } catch (error) {
      setLoginMessage("Lỗi đặt lại mật khẩu: " + error.message);
    }
  };

  return (
    <>
      <video autoPlay loop muted preload="auto" className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className={`container ${isRegister ? "right-panel-active" : ""}`} id="container">

        {/* Form đăng ký */}
        <div className="form-container sign-up-container">
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            <h1>Đăng ký</h1>
            <input
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              id="register-email"
              type="email"
              placeholder="Email"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              onBlur={(e) => e.target.reportValidity()}
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="button" onClick={handleRegister} disabled={loading}>
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </button>

            {/* Thông báo đăng ký */}
            {registerMessage && (
              <div className={`message ${registerMessage.includes("thành công") ? "success" : "error"}`}>
                {registerMessage}
              </div>
            )}
          </form>
        </div>

        {/* Form đăng nhập */}
        <div className="form-container sign-in-container">
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            <h1>Đăng nhập</h1>
            <input
              id="login-email"
              type="email"
              placeholder="Email"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              onBlur={(e) => e.target.reportValidity()}
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <a href="#" className="forgot-password" onClick={handleForgotPassword}>Quên mật khẩu?</a>
            <button type="button" onClick={handleLogin} disabled={loading}>
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            {/* Thông báo đăng nhập */}
            {loginMessage && (
              <div className={`message ${loginMessage.includes("thành công") || loginMessage.includes("gửi") ? "success" : "error"}`}>
                {loginMessage}
              </div>
            )}

            <div className="social-container">
              <span>Hoặc đăng nhập bằng</span>
              <FcGoogle size={30} className="google-icon" onClick={handleGoogleLogin} />
            </div>
          </form>
        </div>

        {/* Overlay chuyển đổi */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Chào mừng!</h1>
              <p>Nếu bạn đã có tài khoản, hãy đăng nhập tại đây.</p>
              <button className="ghost" onClick={toggleForm}>Đăng nhập</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Chào bạn mới!</h1>
              <p>Hãy tạo tài khoản để trải nghiệm ngay.</p>
              <button className="ghost" onClick={toggleForm}>Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

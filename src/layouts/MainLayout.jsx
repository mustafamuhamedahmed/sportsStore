import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate من react-router-dom
import InputField from "../components/InputField";
import Button from "../components/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);

  const navigate = useNavigate(); // لاستخدام التوجيه بين الصفحات

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleRegister = async () => {
    setError("");
    setIsEmailValid(true);
    setIsPasswordValid(true);
    setIsConfirmPasswordValid(true);
    setIsNameValid(true);

    // التحقق من أن جميع الحقول مدخلة
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    // التحقق من صحة البريد الإلكتروني
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      setError("Please enter a valid email.");
      return;
    }

    // التحقق من طول كلمة المرور
    if (!validatePassword(password)) {
      setIsPasswordValid(false);
      setError("Password must be at least 6 characters.");
      return;
    }

    // التحقق من تطابق كلمتي المرور
    if (password !== confirmPassword) {
      setIsConfirmPasswordValid(false);
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // إرسال طلب POST إلى الـ API للتسجيل
      const response = await fetch("https://your-api-url.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json(); // تحويل الاستجابة إلى JSON

      if (response.ok && data.success) {
        // إذا كانت الاستجابة ناجحة
        console.log("Registration successful:", data);
        navigate("/login"); // التوجيه إلى صفحة تسجيل الدخول بعد التسجيل الناجح
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>Register</h1>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <InputField
        label="Name"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        required
        isValid={isNameValid}
      />

      <InputField
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        isValid={isEmailValid}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
        isValid={isPasswordValid}
      />

      <InputField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        required
        isValid={isConfirmPasswordValid}
      />

      <Button
        label={loading ? "Registering..." : "Register"}
        onClick={handleRegister}
        disabled={loading}
      />

      {/* عرض رسالة تأكيد التسجيل أو الخطأ */}
      {error && !loading && (
        <div style={{ color: "red", marginTop: "20px" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Register;

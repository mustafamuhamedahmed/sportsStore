import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate من react-router-dom
import InputField from "../components/InputField";
import Button from "../components/Button";

const Register = () => {
  const [name, setName] = useState(""); // إضافة حقل الاسم
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isNameValid, setIsNameValid] = useState(true); // التحقق من صحة الاسم
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  const navigate = useNavigate(); // استخدام useNavigate للتنقل بين الصفحات

  // دالة التحقق من البريد الإلكتروني
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // دالة التحقق من كلمة المرور
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // دالة التحقق من الاسم
  const validateName = (name) => {
    return name.trim().length > 0; // الاسم يجب ألا يكون فارغًا
  };

  // دالة التسجيل
  const handleRegister = () => {
    setError("");
    setIsNameValid(true);
    setIsEmailValid(true);
    setIsPasswordValid(true);
    setIsConfirmPasswordValid(true);

    // التحقق من وجود جميع البيانات
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    // التحقق من صحة الاسم
    if (!validateName(name)) {
      setIsNameValid(false);
      setError("Name is required.");
      return;
    }

    // التحقق من صحة البريد الإلكتروني
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      setError("Please enter a valid email.");
      return;
    }

    // التحقق من كلمة المرور
    if (!validatePassword(password)) {
      setIsPasswordValid(false);
      setError("Password must be at least 6 characters.");
      return;
    }

    // التحقق من تطابق كلمة المرور
    if (password !== confirmPassword) {
      setIsConfirmPasswordValid(false);
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log("Registering with:", name, email, password);

      setLoading(false);
      setIsRegistered(true);
      console.log("Registration successful!");

      // التوجيه إلى صفحة تسجيل الدخول بعد التسجيل الناجح
      navigate("/login");
    }, 1000);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>Register</h1>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      {/* حقل الاسم */}
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

      {/* حقل البريد الإلكتروني */}
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

      {/* حقل كلمة المرور */}
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

      {/* حقل تأكيد كلمة المرور */}
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

      {/* زر التسجيل */}
      <Button
        label={loading ? "Registering..." : "Register"}
        onClick={handleRegister}
        disabled={loading}
      />

      {/* رسالة التحقق بعد التسجيل */}
      {isRegistered && (
        <div style={{ color: "green", marginTop: "20px" }}>
          Registration successful! Redirecting to login page...
        </div>
      )}
    </div>
  );
};

export default Register;

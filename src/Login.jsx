import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  let loginLogics = (loginData) => {

    // Get users from localStorage
    const registeredUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    // Check email & password
    const validUser = registeredUsers.find(
      (user) =>
        user.email === loginData.email &&
        user.password === loginData.password
    );

    if (validUser) {

      // Store logged in user
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(validUser)
      );

      alert("Login Successful ✅");

      // Reset form
      reset();

      // Navigate Home
      navigate("/home");

      // Refresh page
      window.location.reload();

    } else {

      alert("Invalid Email or Password ❌");

    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Login</h2>

        <form
          className="login-form"
          onSubmit={handleSubmit(loginLogics)}
        >

          {/* Email */}
          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="error">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Password */}
          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message:
                    "Password must be at least 6 characters",
                },
              })}
            />

            {errors.password && (
              <p className="error">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* Remember Me */}
          <div className="checkbox-group">

            <input
              type="checkbox"
              id="remember"
            />

            <label htmlFor="remember">
              Remember Me
            </label>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="register-text">

            Don't have an account?{" "}

            <Link to="/register">
              Register
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;
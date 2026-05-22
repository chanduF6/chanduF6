import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const registerLogics = (userdata) => {

    // Get existing users
    let users =
      JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate email
    const userExists = users.find(
      (user) => user.email === userdata.email
    );

    if (userExists) {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email already registered!",
      });

      return;
    }

    // Add new user
    users.push(userdata);

    // Save to localStorage
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "User registered successfully",
      timer: 2000,
      showConfirmButton: false,
    });

    reset();

    // Navigate Login Page
    navigate("/login");
  };

  return (
    <div className="register-container">

      <div className="register-box">

        <h2>Register</h2>

        <form
          className="register-form"
          onSubmit={handleSubmit(registerLogics)}
        >

          {/* Full Name */}
          <div className="input-group">

            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter Full Name"
              {...register("name", {
                required: "Name is required",
              })}
            />

            <p className="error">
              {errors.name?.message}
            </p>

          </div>

          {/* Email */}
          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter Email Address"
              {...register("email", {
                required: "Email is required",
              })}
            />

            <p className="error">
              {errors.email?.message}
            </p>

          </div>

          {/* Phone */}
          <div className="input-group">

            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="Enter Phone Number"
              {...register("phone", {
                required:
                  "Phone number is required",

                pattern: {
                  value: /^[0-9]{10}$/,
                  message:
                    "Phone number must be exactly 10 digits",
                },
              })}
            />

            <p className="error">
              {errors.phone?.message}
            </p>

          </div>

          {/* Password */}
          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", {
                required:
                  "Password is required",

                minLength: {
                  value: 6,
                  message:
                    "Minimum 6 characters",
                },
              })}
            />

            <p className="error">
              {errors.password?.message}
            </p>

          </div>

          {/* Terms Checkbox */}
          <div className="checkbox-group">

            <input
              type="checkbox"
              id="terms"
              required
            />

            <label htmlFor="terms">
              I agree to Terms & Conditions
            </label>

          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="login-text">

            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;
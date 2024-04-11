import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate(); // Using useNavigate instead of useHistory
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://todoing-ten.vercel.app/api/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Registration successful, navigate to home page
        const result = await response.json();
        console.log("Registration successful:", result);
        navigate("/signin"); // Using navigate instead of history.push
      } else {
        // Registration failed, log the error message
        const errorMessage = await response.text();
        console.error("Registration failed:", errorMessage);
      }
    } catch (error) {
      // Log any unexpected errors
      console.error("Error:", error);
    } finally {
      // Reset form data regardless of the outcome
      setFormData({
        email: "",
        name: "",
        password: "",
      });
    }
  };
  

  return (
    <div className="center">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="txt_field">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="txt_field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="txt_field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <input type="submit" value="Register" />
        <div className="signup_link">
          Already a member? <Link to="/signin">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;

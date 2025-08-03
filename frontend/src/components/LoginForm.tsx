
import '../LoginForm.css'
import axios from "axios";
import { useState } from "react";

function RegisterForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  console.log(password, email);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalData = {
      password,
      email
    }
    axios.post("http://localhost:3000/users/login", finalData).
    then((response) => {
      const token = response.data.accessToken;
      localStorage.setItem("accessToken", token);
      alert("Logged in successfully:");
    }).catch((error) => {
      const errors = error.response?.data?.message || "An error occurred";
      alert(errors);
    });
  };
  return (
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        
        <div className='row'>
          <label htmlFor="email" className='col'>Email:</label>
          <input
            type="email"
            name="search_email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className='row'>
          <label htmlFor="password" className='col'>Password:</label>
          <input
            type="password"
            name="search_password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </form>
    </div>
  );
}
export default RegisterForm;
import '../css/RegisterForm.css';
import axios from "axios";
import { useState } from "react";

function RegisterForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  console.log(name, password, email);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalData = {
      name, 
      password,
      email
    }
    axios.post("http://localhost:3000/users/create", finalData).then((response) => {
      alert("Data registered successfully:");
    }).catch((error) => {
      const errors = error.response?.data?.message || "An error occurred";
      alert(errors);
    });
  };
  return (
    <div className="register-form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <label htmlFor="name" className='col'>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
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
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </form>
    </div>
  );
}
export default RegisterForm;
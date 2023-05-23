import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from '../../libraries/axiosClient';

const Login = (props) => {
  const { setIsLogin } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = {
      email,
      password,
    };

    try {
      const response = await axios.post("/employees/login", token);
      console.log(response);

      localStorage.setItem('isLogin', 'true', response.data.token);
      alert("Login successfully!!!");
      setIsLogin(true);
      //   window.location.href = "/home";
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit" className={styles.submitButton}>Login</button>
    </form>
  );
};

export default Login;

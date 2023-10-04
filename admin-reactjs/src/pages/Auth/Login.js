import React, { useState } from 'react';
import Styles from './Login.module.css';
import axios from '../../libraries/axiosClient';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const { setIsLogin } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const redirectToManageProducts = () => {
    navigate('/manageProducts')
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const account = {
      email,
      password,
    };

    try {
      const response = await axios.post("/employees/login", account);
      const { token } = response.data;

      localStorage.setItem('token', token);

      axios.defaults.headers.Authorization = `Bearer ${token}`;

      const payload = response.data.payload;
      localStorage.setItem("payload", JSON.stringify(payload));

      setIsLogin(true);

      message.success("Login successfully!!!");

    } catch (error) {
      console.error(error);
      message.error("Login failed");
    }
  };

  return (
    <div className={Styles.login_box}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={Styles.user_box}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <label>Email</label>
        </div>
        <div className={Styles.user_box}>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <label>Password</label>
        </div>
        <div className={Styles.btn_login}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <button type="submit" onClick={redirectToManageProducts}>L O G I N</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
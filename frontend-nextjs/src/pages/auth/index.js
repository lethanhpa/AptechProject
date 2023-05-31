import React, { useState } from 'react';
import { Form, Button } from 'antd';
import Styles from "../../styles/auth.module.css"
const Index = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleLogin = (e) => {
        e.preventDefault();

        if (email === "user@gmail.com" && password === "123456") {
            window.location = "/cart";
        } else {
            alert("Enter the wrong email or password");
        }
    }
    return (
        <>
            <div className={Styles.page_section}>
                <div className={Styles.container}>
                    <div className={Styles.row}>
                        <div className={`${Styles.col_sm_12} ${Styles.col_md_12} ${Styles.col_lg_6}`}>
                            <form >
                                <div className={Styles.login_form}>
                                    <h4 className={Styles.login_title}>Sign In</h4>
                                    <div className={Styles.row}>
                                        <div className={`${Styles.col_md_12} ${Styles.col_12}`}>
                                            <label>Email Address</label>
                                            <input className={Styles.mb_2} type="email" placeholder="Email Address" value={email} onChange={handleEmailChange} />
                                        </div>
                                        <div className={`${Styles.col_12} ${Styles.mt_2}`}>
                                            <label>Password</label>
                                            <input className={Styles.mb_2} type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                                        </div>
                                        <div className={Styles.mt_3}>
                                            <Form.Item
                                                wrapperCol={{
                                                    offset: 8,
                                                    span: 16,
                                                }}>
                                                <Button type="primary" htmlType="submit" onClick={handleLogin}>
                                                    Login
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={`${Styles.col_sm_12} ${Styles.col_md_12} ${Styles.col_lg_6}`}>
                            <form >
                                <div className={Styles.login_form}>
                                    <h4 className={Styles.login_title}>Sign Up</h4>
                                    <div className={Styles.row}>
                                        <div className={`${Styles.col_md_6} ${Styles.col_12}`}>
                                            <label>First Name</label>
                                            <input className={Styles.mb_2} type="text" placeholder="First Name" />
                                        </div>
                                        <div className={`${Styles.col_md_6} ${Styles.col_12}`}>
                                            <label>Last Name</label>
                                            <input className={Styles.mb_2} type="text" placeholder="Last Name" />
                                        </div>
                                        <div className={Styles.col_md_12}>
                                            <label>Email Address</label>
                                            <input className={Styles.mb_2} type="email" placeholder="Email Address" required />
                                        </div>
                                        <div className={Styles.col_md_6}>
                                            <label>Password</label>
                                            <input className={Styles.mb_2} type="password" placeholder="Password" required />
                                        </div>
                                        <div className={Styles.col_md_6}>
                                            <label>Confirm Password</label>
                                            <input className={Styles.mb_2} type="password" placeholder="Confirm Password" required />
                                        </div>
                                        <div className={Styles.col_md_6}>
                                            <label>Captcha</label>
                                            <input className={Styles.mb_2} type="password" />
                                        </div>
                                        <div className={`${Styles.col_12} ${Styles.text_left} ${Styles.mt_3}`}>
                                            <Form.Item
                                                wrapperCol={{
                                                    offset: 0,
                                                    span: 16,
                                                }}>
                                                <Button type="primary" htmlType="submit">
                                                    Sign Up
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
import React, { useState } from 'react';
import Styles from "../../styles/auth.module.css"
const Index = (props) => {
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
            const response = await axios.post("/customers/login", token);
            console.log(response);
            localStorage.setItem('isLogin', 'true', response.data.token);
            alert("Login successfully!!!");
            setIsLogin(true);
        } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };

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
                                            <input
                                                className={Styles.mb_2}
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={handleEmailChange}
                                            />
                                        </div>
                                        <div className={`${Styles.col_12} ${Styles.mt_2}`}>
                                            <label>Password</label>
                                            <input
                                                className={Styles.mb_2}
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                            />
                                        </div>
                                        <div className={Styles.mt_3}>
                                            <button onClick={handleSubmit} className={Styles.btn_signup}>
                                                Sign In
                                            </button>
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
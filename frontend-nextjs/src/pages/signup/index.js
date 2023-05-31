import React, { useState } from 'react';
import Styles from "../../styles/auth.module.css"
const Index = () => {
    return (
        <>
            <div className={Styles.page_section}>
                <div className={Styles.container}>
                    <div className={Styles.row}>
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
                                            <button className={Styles.btn_signup}>
                                                Sign Up
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
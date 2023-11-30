import React, { memo } from "react";

import UseCountDown from "../../components/useCountDown";
import styles from '../../styles/usecountdown.module.css'


function FlashSale() {
  const [days, hours, minutes, seconds] = UseCountDown();

  return (
    <div className={styles.container}>
        <div className={styles.flex}>
            <p className={styles.fontSize}>Days</p>
            <p className={styles.font}> {days} </p>
        </div>
        <p className={styles.color_Red}>:</p>
        <div>
        <p className={styles.fontSize}>Hours</p>
            <p className={styles.font}> {hours} </p>
        </div>
        <p className={styles.color_Red}>:</p>
        <div>
        <p className={styles.fontSize}>Minutes</p>
            <p className={styles.font}>  {minutes} </p>
        </div>
        <p className={styles.color_Red}>:</p>
        <div>
        <p className={styles.fontSize}>Seconds</p>
            <p className={styles.font}>  {seconds} </p>
        </div>
        </div>
       
   
  );
}
export default memo(FlashSale);

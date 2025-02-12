import React from 'react';
import styles from './button.module.css';
import Image from "next/image";

const Button = ({ backgroundColor, color, border, icon, content, onClick }) => {

    return (
        <button className={styles.button} style={{backgroundColor: backgroundColor, color: color, border: border}} onClick={onClick}>
            <p style={{fontSize: "1rem"}}>{content}</p>
            <div className={styles.icon}>
                {icon && <Image className={styles.buttonImg} src={icon} width={30} height={30} alt="icon"/>}
            </div>
        </button>
    );
};

export default Button;

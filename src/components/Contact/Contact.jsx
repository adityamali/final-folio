import styles from "@/app/page.module.css";
import {Button} from "@/components";
import Image from "next/image";
import React from "react";
import {retry} from "next/dist/compiled/@next/font/dist/google/retry";

export default function Contact() {
    return(
    <div className={styles.contact}>
        <div className={styles.sectionHead}>
            <p>Contact</p>
        </div>
        <div className={styles.contactContainer}>
            <a href={"mailto:adityamali2003@icloud.com"} id={styles.mail}>
                <div className={styles.blackbox} id={styles.mail}>
                    <p><b>Let's work together</b> — To get started, have a 1:1 chat with me!</p>
                    <Button content={"Mail Me"} backgroundColor={"var(--white)"} color={"var(--black)"}
                            border={"none"}/>
                </div>
            </a>
            <a href={"https://medium.com/@theadityamali"}>
                <div className={styles.blackbox} id={styles.medium}>
                    <Image src={"/assets/medium.png"} alt={"Medium"} height={50} width={50}/>
                </div>
            </a>
            <a href={"https://www.linkedin.com/in/adityamali2003/"}>
                <div className={styles.blackbox} id={styles.linkedin}>
                    <Image src={"/assets/linkedin.png"} alt={"Medium"} height={50} width={50}/>
                </div>
            </a>
            <a href={"https://github.com/adityamali"}>
                <div className={styles.blackbox} id={styles.github}>
                    <Image src={"/assets/github.png"} alt={"Medium"} height={50} width={50}/>
                </div>
            </a>
        </div>
        <p>
            Made using Next.JS & SupaBase
        </p>
    </div>
    )
}


import React from "react";
import styles from "./page.module.css";
import "./globals.css";
import Image from "next/image";
import {Button, Menu} from "@/components";

export default function Home() {
  return (
      <main className={styles.main}>
          <Menu/>
          <div className={styles.hero}>
              <h1 className={styles.title}>
                  Aditya Mali
              </h1>
              <Image className={styles.meimg} src={'/images/me.jpg'} alt={"My Photo"} width={400} height={600}/>
              <div className={styles.tasks}>
                    <ul>
                        <li>Web Developer</li>
                        <li>Entrepreneur</li>
                        <li>AI/ML Developer</li>
                    </ul>
              </div>
              <a href={"mailto:adityamali2003@icloud.com"}>
              <Button content={"Work With Me"} backgroundColor={"var(--primary)"} color={"var(--white)"} border={"none"}/>
              </a>
          </div>
      </main>
  );
}

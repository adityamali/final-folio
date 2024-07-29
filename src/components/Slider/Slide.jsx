import React from "react";
import styles from "./slider.module.css";
import Image from "next/image";
import {Button} from "@/components";
import Link from "next/link";

export default function Slide({image, alt, title, description}) {
    return (
        <div className={styles.slide}>
            <Image className={styles.projectImg} src={image} alt={alt} objectFit={"cover"} width={200} height={300} />
            <div className={styles.projectContent}>
            <div className={styles.projectInfo}>
                <p>{description}</p>
            </div>
            <div className={styles.projectLinks}>
                <Link href="https://netgarage.in">
                    <Button content={"View Live"} icon={"/assets/arrow.svg"} backgroundColor={"var(--primary)"} color={"var(--white)"} border={"none"}/>
                </Link>
                <Button content={"View Code"} icon={"/assets/arrow.svg"} backgroundColor={"var(--black)"} color={"var(--white)"} border={"none"}/>
            </div>
            </div>
        </div>
    )
}
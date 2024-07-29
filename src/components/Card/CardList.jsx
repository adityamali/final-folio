"use client"
import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import {connectToDatabase} from "@/utils/mongodb/connectToDatabase";

const blogs = [
    {
        title: "Working with Computer Vision; My experience interning at Industry.AI",
        image: "/images/industryai.png",
        link: "https://medium.com/@theadityamali/is-nextjs-really-better-than-the-good-old-react-d2a0da5470ed"
    },
    {
        title: "Is Next.js really better than the good old React?",
        image: "/images/nvr.png",
        link: "https://medium.com/@theadityamali/is-nextjs-really-better-than-the-good-old-react-d2a0da5470ed"
    },
    {
        title: "Riding the Dream: Why I Built “NetGarage”",
        image: "/images/ng.png",
        link: "https://medium.com/@theadityamali/riding-the-dream-why-i-built-the-superbike-project-3538154a35b8"
    }
];

export function Card({children, image, link}) {
    return (
        <div className={styles.card} onClick={()=>{window.location.href=link}}>
            <Image src={image} className={styles.img} alt="card image" width={300} height={100}/>
            <div className={styles.cardContent}>
                <h3 className={styles.content}>
                    {children}
                </h3>
            </div>
        </div>
    );
}

export default function Slide() {

    return (
        <div className={styles.listWrapper}>
            <div className={styles.CardList}>
                {blogs.map((blog, index) => (
                    <Card key={index} image={blog.image} link={blog.link}>
                        {blog.title}
                    </Card>
                ))}
            </div>
        </div>
    )
}

// export async function getServerSideProps() {
//     const { db } = await connectToDatabase();
//
//     const posts = await db
//         .collection("blogs")
// .find({})
//         .limit(20)
//         .toArray();
//
//     return {
//         props: {
//             posts: JSON.parse(JSON.stringify(blogs)),
//         },
//     };
// }
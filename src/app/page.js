import React from "react";
import { createClient} from "@supabase/supabase-js";
import { cookies } from 'next/headers'
import styles from "./page.module.css";
import "./globals.css";
import Image from "next/image";
import {Button, CardList, Menu} from "@/components";
import {Slide, Slider} from "@/components/Slider";
import Contact from "@/components/Contact/Contact";

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
          <div className={styles.netgarage}>
              <Image src={'/images/ngbike.png'} alt={"Photo of MV Augusta Superveloce"} width={500} height={400}/>
              <div className={styles.netgarageText}>
                  <h3>Redefining Motorcycle Lifestyle with Netgarage</h3>
                  <p>NetGarage is a platform to buy and sell preowned cars and bikes. Netgarage is a community of automobile enthusiasts building a lifestyle. </p>
                  <a href={"https://netgarage.in"} style={{cursor:"pointer"}}><Button content={"Learn More"} backgroundColor={"var(--primary)"} color={"var(--white)"} border={"none"}/></a>
              </div>
            </div>
          <div className={styles.ngVideo}>
                <video src={"/videos/test.mp4"} autoPlay loop muted playsInline={true} controls={false}/>
          </div>
          <div className={styles.stack}>
                <p className={styles.sectionHead}>My Stack</p>
              <div className={styles.stackItems}>
                  <div className={styles.itemsWrapper}>
                        <div className={styles.stackItem}>
                            <Image src={'/images/stack/react.svg'} alt={"Next.js Logo"} width={60} height={60}/>
                            <p>React</p>
                        </div>
                        <div className={styles.stackItem}>
                            <Image src={'/images/stack/spring.svg'} alt={"Next.js Logo"} width={60} height={60}/>
                            <p>Spring</p>
                        </div>
                        <div className={styles.stackItem}>
                            <Image src={'/images/stack/react.svg'} alt={"Next.js Logo"} width={60} height={60}/>
                            <p>Next.js</p>
                        </div>
                        <div className={styles.stackItem}>
                            <Image src={'/images/stack/arc.svg'} alt={"Next.js Logo"} width={60} height={60}/>
                            <p>Arc</p>
                        </div>
                        <div className={styles.stackItem}>
                            <Image src={'/images/stack/react.svg'} alt={"Next.js Logo"} width={60} height={60}/>
                            <p>React</p>
                        </div>
                        <div className={styles.stackItem}>
                            <Image src={'/images/stack/spring.svg'} alt={"Next.js Logo"} width={60} height={60}/>
                            <p>Spring</p>
                        </div>
                        <div className={styles.stackItem}>
                            <Image src={'/images/stack/react.svg'} alt={"Next.js Logo"} width={60} height={60}/>
                            <p>Next.js</p>
                        </div>
                        <div className={styles.stackItem}>
                            <Image src={'/images/stack/arc.svg'} alt={"Next.js Logo"} width={60} height={60}/>
                            <p>Arc</p>
                        </div>
                        <div className={styles.stackItem}>
                            <Image src={'/images/stack/react.svg'} alt={"Next.js Logo"} width={60} height={60}/>
                            <p>React</p>
                        </div>
                        <div className={styles.stackItem}>
                            <Image src={'/images/stack/spring.svg'} alt={"Next.js Logo"} width={60} height={60}/>
                            <p>Spring</p>
                        </div>
                        <div className={styles.stackItem}>
                            <Image src={'/images/stack/react.svg'} alt={"Next.js Logo"} width={60} height={60}/>
                            <p>Next.js</p>
                        </div>
                  </div>
              </div>
          </div>
          <div className={styles.projects}>
              <div className={styles.sectionHead}>
                  <p>Projects</p>
                  <div className={styles.navBtns}>
                  </div>
              </div>
              <div className={styles.projectSlider}>
                  <Slider>
                      <Slide image={'/images/projects/movies.jpg'} alt={"MV Augusta Superveloce"} title={"The Movie Project"}
                             description={"The Movie Project is a movie database website providing data about various movies it fetches from the TMDB database"}/>
                      <Slide image={'/images/cv.jpg'} alt={"MV Augusta Superveloce"} title={"The Movie Project"}
                             description={"Computer Vision based Image Segmentation"}/>
                  </Slider>
              </div>
          </div>
          <div className={styles.blogs}>
              <div className={styles.sectionHead}>
                  <p>Blogs</p>
                  <div className={styles.navBtns}>
                  </div>
              </div>
              <CardList/>
          </div>
          <Contact />
      </main>
  );
}

'use client'
import React from "react";
import Slide from "@/components/Slider/Slide";
import styles from "./slider.module.css";
import { useState } from "react";

const projects = [
    {
        title: "Project 1",
        description: "This is a project description for project 1, Lets make this a little bit longer",
        image: "/images/ng.png",
        link: "https://github.com"
    },
    {
        title: "Project 2",
        description: "This is a project description",
        image: "/images/industryai.png",
        link: "https://github.com"
    },
];

export default function ProjectSlider() {
    // create a carousel slider for the projects present in the projects array
    const [currentProject, setCurrentProject] = useState(0);
    const length = projects.length;
    const nextProject = () => {
        setCurrentProject(currentProject === length - 1 ? 0 : currentProject + 1);
    };
    const prevProject = () => {
        setCurrentProject(currentProject === 0 ? length - 1 : currentProject - 1);
    };
    const project = projects[currentProject];
    return (
        <div className={styles.sliderWrapper}>
                <div className={styles.navBtns}>
                    <button onClick={prevProject} className={styles.navBtn}>{" < "}</button>
                    <button onClick={nextProject} className={styles.navBtn}>{" > "}</button>
                </div>
                <Slide image={project.image} title={project.title} description={project.description} />
        </div>
    );

}
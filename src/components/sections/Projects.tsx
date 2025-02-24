"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ProjectType } from "@/types";
import ProjectCard from "../ui/ProjectCard";
import { AnimatePresence, motion } from "framer-motion";

function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) {
        console.error(error);
      } else {
        const shuffledProjects = [...(data || [])].sort(
          () => Math.random() - 0.5
        );

        // Determine number of projects to show based on initial viewport width
        let numProjects = 2;
        const initialWidth = window.innerWidth;
        if (initialWidth >= 1536) {
          // 2xl breakpoint
          numProjects = 4;
        } else if (initialWidth >= 1280) {
          // xl breakpoint
          numProjects = 3;
        }

        // Set the limited number of random projects
        setProjects(shuffledProjects.slice(0, numProjects));
      }
    }
    fetchProjects();
  }, []); // Only fetch once on component mount

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Projects</h2>
        <button
          onClick={() => (window.location.href = "/projects")}
          className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors duration-300"
          data-cursor="block"
        >
          See All Projects
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 w-full">
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <div data-cursor="block" key={project.id}>
              <motion.div
                // key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <ProjectCard {...project} />
              </motion.div>
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Projects;

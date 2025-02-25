"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { SkillType } from "@/types";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

function Skills() {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      const { data, error } = await supabase.from("skills").select("*");
      if (error) {
        console.error(error);
      } else {
        setSkills(data || []);
      }
    }
    fetchSkills();
  }, []);

  const categories = ["all", ...new Set(skills.map((skill) => skill.category))];
  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-12 w-full"
    >
      <div className="flex flex-col items-start gap-4">
        <h2 className="text-4xl font-bold relative group">
          Skills & Technologies
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary/20 rounded-full origin-left"
          />
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-foreground/60 max-w-2xl"
        >
          A collection of technologies I&apos;ve worked with throughout my
          journey
        </motion.p>
      </div>

      <div className="flex flex-col gap-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex gap-3 overflow-x-auto p-4 scrollbar-hide"
        >
          {categories.map((category, index) => (
            <Button key={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {activeCategory === category && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <ChevronRight className="inline-block w-4 h-4 ml-2" />
                </motion.span>
              )}
            </Button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="group relative p-6 rounded-full border border-border 
                  bg-background backdrop-blur-sm hover:bg-primary/5
                  transition-all duration-300 hover:shadow-xl hover:border-primary/50"
                data-cursor="block"
              >
                <div className="flex items-center gap-3">
                  <motion.span
                    animate={{
                      scale: hoveredSkill === skill.id ? [1, 1.5, 1] : 1,
                    }}
                    transition={{
                      repeat: hoveredSkill === skill.id ? Infinity : 0,
                      duration: 1,
                    }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Skills;

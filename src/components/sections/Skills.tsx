"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

import { SkillType } from "@/types";

function Skills() {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

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
    <div className="flex flex-col gap-8 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Skills</h2>
      </div>

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
              ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-background dark:bg-foreground/10 text-foreground hover:bg-primary-light dark:hover:bg-primary-dark"
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="group relative bg-background-100 dark:bg-background p-4 rounded-xl border border-foreground-200/10 hover:border-primary-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary group-hover:animate-pulse" />
              <span className="text-sm font-medium text-foreground dark:text-foreground">
                {skill.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;

"use client";
import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { SkillType } from "@/types";

function Skills() {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchSkills() {
      setLoading(true);
      const { data, error } = await supabase.from("skills").select("*");
      if (!mounted) return;
      if (error) {
        console.error(error);
        setError("Failed to load skills.");
        setSkills([]);
      } else {
        const ordered = (data || []).slice().sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setSkills(ordered);
      }
      setLoading(false);
    }
    fetchSkills();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    skills.forEach((s) => set.add(s.category));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [skills]);

  const categoryColors = [
    { bg: 'bg-mustard', text: 'text-charcoal', border: 'border-charcoal' },
    { bg: 'bg-teal', text: 'text-cream', border: 'border-charcoal' },
    { bg: 'bg-orange', text: 'text-cream', border: 'border-charcoal' },
    { bg: 'bg-charcoal', text: 'text-cream', border: 'border-mustard' },
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full">
      <div className="border-b-2 md:border-b-4 border-charcoal pb-3 md:pb-4">
        <h2 className="font-display text-3xl md:text-4xl uppercase text-charcoal drop-shadow-md">Technical Arsenal</h2>
        <p className="font-body text-base md:text-lg text-charcoal/70 mt-2">Tools & Technologies I Work With</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((k) => (
            <div key={k} className="h-48 bg-cream/50 border-2 md:border-4 border-charcoal animate-pulse shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro" />
          ))}
        </div>
      ) : error ? (
        <div className="px-4 md:px-6 py-3 md:py-4 bg-orange text-cream font-body border-2 md:border-4 border-charcoal shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro text-sm md:text-base">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 md:gap-6">
          {categories.map((category, idx) => {
            const colorScheme = categoryColors[idx % categoryColors.length];
            return (
              <div
                key={category}
                className={`${colorScheme.bg} ${colorScheme.text} border-2 md:border-4 ${colorScheme.border} p-4 md:p-6 shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
              >
                <h3 className="font-display text-xl md:text-2xl uppercase tracking-wide mb-3 md:mb-4 pb-2 border-b-2 border-current">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.filter(s => s.category === category).map(skill => (
                    <div
                      key={skill.id}
                      className="px-2.5 md:px-3 py-1 md:py-1.5 bg-cream/20 backdrop-blur-sm font-body text-xs md:text-sm border-2 border-current hover:bg-cream/40 transition-colors"
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Skills;

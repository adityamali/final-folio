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

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="border-b border-border pb-4">
        <h2 className="text-2xl font-bold">Skills</h2>
      </div>

      {loading ? (
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
            <div key={k} className="h-8 w-24 rounded-md bg-muted/30 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-sm text-destructive">{error}</div>
      ) : (
        <div className="flex flex-col gap-8">
          {categories.map(category => (
            <div key={category} className="flex flex-col gap-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.filter(s => s.category === category).map(skill => (
                  <div
                    key={skill.id}
                    className="px-3 py-1.5 rounded-md bg-secondary/50 text-secondary-foreground text-sm border border-transparent hover:border-border transition-colors"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Skills;

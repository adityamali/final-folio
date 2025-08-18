"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { SkillType } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

function Skills() {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(20);
  const [expanded, setExpanded] = useState(false);

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

  // Responsive visible count unless expanded
  useEffect(() => {
    const compute = (w: number) => {
      if (w >= 1536) return 36; // 2xl
      if (w >= 1280) return 32; // xl
      if (w >= 1024) return 28; // lg
      if (w >= 768) return 24; // md
      return 18; // sm
    };
    const apply = () => {
      if (!expanded) setVisibleCount(compute(window.innerWidth));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [expanded]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    skills.forEach((s) => set.add(s.category));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [skills]);

  const filtered = useMemo(() => {
    return activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);
  }, [skills, activeCategory]);

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const canLoadMore = filtered.length > visible.length;

  const skeletonKeys = useMemo(() => [
    "s1","s2","s3","s4","s5","s6","s7","s8","s9","s10","s11","s12",
  ], []);

  let gridContent: React.ReactNode;
  if (loading) {
    gridContent = (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skeletonKeys.map((k) => (
          <div key={k} className="h-10 rounded-xl border border-border bg-background/60 animate-pulse" />
        ))}
      </div>
    );
  } else if (error) {
    gridContent = <div className="text-sm text-red-500">{error}</div>;
  } else if (filtered.length === 0) {
    gridContent = <div className="text-sm text-foreground/60">No skills found.</div>;
  } else {
    gridContent = (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((skill) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              whileHover={{ y: -2 }}
              className="rounded-xl border border-border bg-background/60 px-3 py-2.5 flex items-center justify-center text-sm hover:border-primary/50 hover:bg-primary/5"
            >
              {skill.name}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-3 py-1 text-xs text-foreground/70 w-fit">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" /> Core stack
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Skills & Technologies</h2>
            <p className="text-sm md:text-base text-foreground/60 mt-1 max-w-2xl">
              Tools I use to design, build, and ship performant products across the stack.
            </p>
          </div>
        </div>

        <Link
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 hover:border-primary/60 hover:bg-primary/5 transition-all text-sm"
          data-cursor="block"
        >
          Contact me
        </Link>
      </div>

      {/* Filters */}
      {categories.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpanded(false);
                }}
                aria-pressed={active}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs md:text-sm transition-all ${
                  active
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Highlight */}
      {/* <AnimatePresence mode="wait">
        {filtered.length > 0 && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-background/60 backdrop-blur p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-xs text-foreground/60">Category</div>
                <div className="text-xl font-semibold">{highlight.label}</div>
              </div>
              <div className="text-sm text-foreground/60">{highlight.count} skills</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {highlight.sample.map((name) => (
                <span key={name} className="px-2.5 py-1 rounded-full text-xs border border-border bg-background">
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Grid */}
      {gridContent}

      {/* Load more */}
      {!loading && !error && canLoadMore && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              setVisibleCount((c) => c + 12);
              setExpanded(true);
            }}
            className="rounded-full border border-border px-5 py-2 text-sm hover:border-primary/60 hover:bg-primary/5 transition"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}

export default Skills;

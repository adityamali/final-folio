"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ProjectType } from "@/types";
import ProjectCard from "../ui/ProjectCard";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [expanded, setExpanded] = useState(false);

  // Fetch projects once
  useEffect(() => {
    let mounted = true;
    async function fetchProjects() {
      setLoading(true);
      const { data, error } = await supabase.from("projects").select("*");
      if (!mounted) return;
      if (error) {
        console.error(error);
        setError("Failed to load projects.");
        setProjects([]);
      } else {
        // Keep original order (or sort by name); shuffle can look uncurated
        const ordered = (data || []).slice();
        setProjects(ordered);
      }
      setLoading(false);
    }
    fetchProjects();
    return () => {
      mounted = false;
    };
  }, []);

  // Compute visible count by viewport width, unless user expanded
  useEffect(() => {
    const computeCount = (w: number) => {
      if (w >= 1536) return 4; // 2xl
      if (w >= 1280) return 4; // xl
      if (w >= 1024) return 4; // lg
      if (w >= 768) return 3; // md
      return 3; // sm
    };
    const apply = () => {
      if (!expanded) setVisibleCount(computeCount(window.innerWidth));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [expanded]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [projects]);

  const filtered = useMemo(() => {
    return activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags?.includes(activeTag));
  }, [projects, activeTag]);

  // Pick a featured project if any tagged 'featured', else first
  const featured = useMemo(() => {
    if (!filtered.length) return null;
    const tagged = filtered.find((p) => p.tags?.includes("featured"));
    return tagged || filtered[0];
  }, [filtered]);

  const visible = useMemo(() => {
    const items = filtered.slice(0, visibleCount);
    // Avoid duplicating featured in the grid below
    if (featured) {
      return items.filter((p) => p.id !== featured.id);
    }
    return items;
  }, [filtered, visibleCount, featured]);

  const canLoadMore = filtered.length > (featured ? 1 : 0) + visible.length;

  const skeletonKeys = useMemo(() => [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
  ], []);

  let gridContent: React.ReactNode;
  if (loading) {
    gridContent = (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {skeletonKeys.map((k) => (
          <div key={k} className="h-80 rounded-2xl border border-border bg-background/60 animate-pulse" />
        ))}
      </div>
    );
  } else if (error) {
    gridContent = <div className="text-sm text-red-500">{error}</div>;
  } else {
    gridContent = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -4 }}
            >
              <ProjectCard {...project} />
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
            <span className="inline-block h-2 w-2 rounded-full bg-primary" /> Selected work
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Projects</h2>
            <p className="text-sm md:text-base text-foreground/60 mt-1 max-w-2xl">
              Recent builds and case studies. Thoughtful design, clean code, and measurable impact.
            </p>
          </div>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 hover:border-primary/60 hover:bg-primary/5 transition-all text-sm"
          data-cursor="block"
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Filters */}
      {tags.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {tags.map((tag) => {
            const active = tag === activeTag;
            return (
              <button
                key={tag}
                onClick={() => {
                  setActiveTag(tag);
                  setExpanded(false);
                }}
                aria-pressed={active}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs md:text-sm transition-all ${
                  active
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}

      {/* Featured */}
      <AnimatePresence mode="wait">
        {featured && (
          <motion.div
            key={featured.id + activeTag}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="relative grid grid-cols-1 md:grid-cols-7 gap-6 items-stretch rounded-2xl border border-border bg-background/60 backdrop-blur overflow-hidden"
          >
            {/* Image side */}
            <div className="relative md:col-span-3 h-52 md:h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.image_url}
                alt={featured.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent md:hidden" />
            </div>

            {/* Content side */}
            <div className="relative md:col-span-4 p-6 md:p-8 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-3">
                {featured.tags?.slice(0, 4).map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-xs border border-border bg-background/70">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">{featured.name}</h3>
              <p className="text-foreground/70 mt-2 line-clamp-3">
                {featured.description}
              </p>
              <div className="mt-4 flex items-center gap-3">
                {featured.live_url && (
                  <a
                    href={featured.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-primary text-white px-4 py-2 text-sm hover:brightness-110 transition"
                  >
                    Visit site
                  </a>
                )}
                {featured.github_url && (
                  <a
                    href={featured.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary/60 hover:bg-primary/5 transition"
                  >
                    Source code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
  {gridContent}

      {/* Load more */}
      {!loading && !error && canLoadMore && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              setVisibleCount((c) => c + 4);
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

export default Projects;

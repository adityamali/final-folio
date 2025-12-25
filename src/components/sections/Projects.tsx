"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ProjectType } from "@/types";
import ProjectCard from "../ui/ProjectCard";
import { ArrowRight } from "lucide-react";

function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

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

  const visible = useMemo(() => projects.slice(0, visibleCount), [projects, visibleCount]);
  const canLoadMore = projects.length > visible.length;

  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b-2 md:border-b-4 border-charcoal pb-3 md:pb-4">
        <h2 className="font-display text-3xl md:text-4xl uppercase text-charcoal drop-shadow-md">Featured Work</h2>
        <Link
          href="/cafe"
          className="font-display uppercase text-sm md:text-lg text-teal hover:text-orange flex items-center gap-1 md:gap-2 transition-colors"
        >
          View Portfolio
          <ArrowRight size={16} strokeWidth={2.5} className="md:w-5 md:h-5" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3].map((k) => (
            <div key={k} className="aspect-[4/3] rounded-lg bg-muted/30 border-2 md:border-4 border-charcoal/20 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-sm text-destructive">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {visible.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      )}

      {!loading && !error && canLoadMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setVisibleCount((c) => c + 6)}
            className="text-sm font-semibold text-charcoal border-b-2 border-dashed border-charcoal/50 hover:text-orange"
          >
            Load more projects
          </button>
        </div>
      )}
    </div>
  );
}

export default Projects;

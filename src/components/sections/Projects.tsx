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
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-end justify-between border-b border-border pb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Link
          href="/projects"
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((k) => (
            <div key={k} className="aspect-video rounded-xl bg-muted/30 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-sm text-destructive">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      )}

      {!loading && !error && canLoadMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setVisibleCount((c) => c + 6)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Load more projects
          </button>
        </div>
      )}
    </div>
  );
}

export default Projects;

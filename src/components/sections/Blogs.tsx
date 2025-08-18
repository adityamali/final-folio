"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { BlogType } from "@/types";
import BlogCard from "../ui/BlogCard";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

type Filter = "All" | "Internal" | "External";

function Blogs() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchBlogs() {
      setLoading(true);
      const [{ data: internalBlogs, error: internalError }, { data: externalBlogs, error: externalError }] = await Promise.all([
        supabase.from("blogs").select("*"),
        supabase.from("external_blogs").select("*"),
      ]);
      if (!mounted) return;
      if (internalError || externalError) {
        console.error("Error fetching blogs:", internalError || externalError);
        setError("Failed to load blogs.");
        setBlogs([]);
      } else {
        const all: BlogType[] = [
          ...(internalBlogs || []).map((b) => ({ ...b, type: "internal" as const })),
          ...(externalBlogs || []).map((b) => ({ ...b, type: "external" as const })),
        ];
        const ordered = all
          .filter((b) => !!b.date)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setBlogs(ordered);
      }
      setLoading(false);
    }
    fetchBlogs();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const compute = (w: number) => {
      if (w >= 1536) return 12;
      if (w >= 1280) return 12;
      if (w >= 1024) return 9;
      if (w >= 768) return 8;
      return 6;
    };
    const apply = () => {
      if (!expanded) setVisibleCount(compute(window.innerWidth));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [expanded]);

  const filters: Filter[] = ["All", "Internal", "External"];

  const filtered = useMemo(() => {
    switch (filter) {
      case "Internal":
        return blogs.filter((b) => b.type === "internal");
      case "External":
        return blogs.filter((b) => b.type === "external");
      default:
        return blogs;
    }
  }, [blogs, filter]);

  const featured = useMemo(() => (filtered.length ? filtered[0] : null), [filtered]);

  const visible = useMemo(() => {
    const items = filtered.slice(0, visibleCount);
    return featured ? items.filter((b) => b.id !== featured.id) : items;
  }, [filtered, visibleCount, featured]);

  const canLoadMore = filtered.length > (featured ? 1 : 0) + visible.length;

  const skeletonKeys = useMemo(() => [
    "b1","b2","b3","b4","b5","b6","b7","b8","b9","b10","b11","b12",
  ], []);

  let gridContent: React.ReactNode;
  if (loading) {
    gridContent = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {skeletonKeys.map((k) => (
          <div key={k} className="h-64 rounded-2xl border border-border bg-background/60 animate-pulse" />
        ))}
      </div>
    );
  } else if (error) {
    gridContent = <div className="text-sm text-red-500">{error}</div>;
  } else if (!filtered.length) {
    gridContent = <div className="text-sm text-foreground/60">No posts found.</div>;
  } else {
    gridContent = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((blog) => (
            <motion.div
              key={blog.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -4 }}
              data-cursor="block"
            >
              <BlogCard {...blog} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-3 py-1 text-xs text-foreground/70 w-fit">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" /> Insights & writing
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Blog Posts</h2>
            <p className="text-sm md:text-base text-foreground/60 mt-1 max-w-2xl">
              Notes on building, design, and the craft of software.
            </p>
          </div>
        </div>

        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 hover:border-primary/60 hover:bg-primary/5 transition-all text-sm"
          data-cursor="block"
        >
          Read all
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Featured */}
      <AnimatePresence mode="wait">
        {featured && (
          <motion.div
            key={featured.id + filter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="relative grid grid-cols-1 md:grid-cols-7 gap-6 items-stretch rounded-2xl border border-border bg-background/60 backdrop-blur overflow-hidden"
          >
            {/* Image */}
            <div className="relative md:col-span-3 h-48 md:h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.image_url} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent md:hidden" />
            </div>
            {/* Content */}
            <div className="relative md:col-span-4 p-6 md:p-8 flex flex-col justify-center">
              {featured.type === "external" && featured.platform && (
                <div className="mb-2 text-xs text-foreground/60">{featured.platform}</div>
              )}
              <h3 className="text-2xl md:text-3xl font-bold">{featured.title}</h3>
              <p className="text-foreground/70 mt-2 line-clamp-3">{featured.description}</p>
              <div className="mt-4">
                {(() => {
                  if (featured.type === "external" && featured.url) {
                    return (
                      <a
                        href={featured.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-primary text-white px-4 py-2 text-sm hover:brightness-110 transition"
                      >
                        Read article
                      </a>
                    );
                  }
                  if (featured.type === "internal" && featured.slug) {
                    return (
                      <Link
                        href={`/blog/${featured.slug}`}
                        className="rounded-full bg-primary text-white px-4 py-2 text-sm hover:brightness-110 transition"
                      >
                        Read article
                      </Link>
                    );
                  }
                  return null;
                })()}
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
              setVisibleCount((c) => c + 6);
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

export default Blogs;

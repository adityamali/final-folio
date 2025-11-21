"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { BlogType } from "@/types";
import BlogCard from "../ui/BlogCard";
import { ArrowRight } from "lucide-react";

function Blogs() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let mounted = true;
    async function fetchBlogs() {
      setLoading(true);
      const [{ data: internalPosts, error: internalError }, { data: externalBlogs, error: externalError }] = await Promise.all([
        supabase.from("posts").select("*").eq("published", true),
        supabase.from("external_blogs").select("*"),
      ]);
      if (!mounted) return;
      if (internalError || externalError) {
        console.error("Error fetching blogs:", internalError || externalError);
        setError("Failed to load blogs.");
        setBlogs([]);
      } else {
        // Map internal posts to BlogType
        const internalBlogsMapped: BlogType[] = (internalPosts || []).map((post) => ({
          id: post.id,
          title: post.title,
          description: post.excerpt || "",
          image_url: post.cover_image || "/placeholder-blog.jpg", // Fallback image
          date: post.created_at,
          type: "internal",
          slug: post.slug,
          content: post.content,
        }));

        const all: BlogType[] = [
          ...internalBlogsMapped,
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

  const visible = useMemo(() => blogs.slice(0, visibleCount), [blogs, visibleCount]);
  const canLoadMore = blogs.length > visible.length;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* <div className="flex items-end justify-between border-b border-border pb-4">
        <h2 className="text-2xl font-bold">Writing</h2>
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
        >
          Read all <ArrowRight size={14} />
        </Link>
      </div> */}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((k) => (
            <div key={k} className="h-40 rounded-xl bg-muted/30 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-sm text-destructive">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      )}

      {!loading && !error && canLoadMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setVisibleCount((c) => c + 6)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Load more posts
          </button>
        </div>
      )}
    </div>
  );
}

export default Blogs;

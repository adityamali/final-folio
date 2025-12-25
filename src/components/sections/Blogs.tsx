"use client";
import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { BlogType } from "@/types";
import BlogCard from "../ui/BlogCard";

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
    <div className="flex flex-col gap-8 md:gap-10 w-full">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6].map((k) => (
            <div key={k} className="h-48 md:h-64 rounded-lg border-2 md:border-4 border-charcoal/20 bg-muted/40 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-900">
          {error}
        </div>
      ) : visible.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {visible.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      )}

      {!loading && !error && canLoadMore && (
        <div className="flex justify-center pt-6">
          <button
            onClick={() => setVisibleCount((c) => c + 6)}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-charcoal border-2 border-charcoal hover:bg-teal hover:text-cream transition-all"
          >
            Load More Posts
          </button>
        </div>
      )}
    </div>
  );
}

export default Blogs;

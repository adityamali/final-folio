"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { BlogType } from "@/types";
import BlogCard from "../ui/BlogCard";
import { AnimatePresence, motion } from "framer-motion";

function Blogs() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchBlogs() {
      // Fetch internal blogs from Supabase
      const { data: internalBlogs, error: internalError } = await supabase
        .from("blogs")
        .select("*");

      // Fetch external blogs from Supabase (assuming they're in a separate table)
      const { data: externalBlogs, error: externalError } = await supabase
        .from("external_blogs")
        .select("*");

      if (internalError || externalError) {
        console.error("Error fetching blogs:", internalError || externalError);
        return;
      }

      // Combine and format blogs
      const allBlogs = [
        ...(internalBlogs || []).map((blog) => ({ ...blog, type: "internal" })),
        ...(externalBlogs || []).map((blog) => ({ ...blog, type: "external" })),
      ];

      // Shuffle and limit based on viewport
      const shuffledBlogs = allBlogs.sort(() => Math.random() - 0.5);
      let displayCount = 2;
      if (windowWidth >= 1536) displayCount = 4; // 2xl
      else if (windowWidth >= 1280) displayCount = 4; // xl

      setBlogs(shuffledBlogs.slice(0, displayCount));
    }

    fetchBlogs();
  }, [windowWidth]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Blog Posts</h2>
        <button
          onClick={() => (window.location.href = "/blogs")}
          className="px-6 py-3 rounded-full bg-primar text-white font-medium hover:bg-primary transition-colors duration-300"
        >
          See All Posts
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
            >
              <BlogCard {...blog} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Blogs;

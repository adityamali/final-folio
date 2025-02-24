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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8"
    >
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-3xl font-bold relative">
          Blog Posts
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary/20 rounded-full origin-left"
          />
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (window.location.href = "/blogs")}
          className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-light transition-all duration-300 hover:shadow-lg"
          data-cursor="block"
        >
          See All Posts
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{ y: -5 }}
              data-cursor="block"
            >
              <BlogCard {...blog} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Blogs;

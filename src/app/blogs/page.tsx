"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { BlogType } from "@/types";
import BlogCard from "@/components/ui/BlogCard";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      // Fetch both internal and external blogs
      const [internalResponse, externalResponse] = await Promise.all([
        supabase.from("blogs").select("*"),
        supabase.from("external_blogs").select("*"),
      ]);

      if (internalResponse.error || externalResponse.error) {
        console.error(
          "Error fetching blogs:",
          internalResponse.error || externalResponse.error
        );
        return;
      }

      // Combine and format blogs
      const allBlogs = [
        ...(internalResponse.data || []).map((blog) => ({
          ...blog,
          type: "internal",
        })),
        ...(externalResponse.data || []).map((blog) => ({
          ...blog,
          type: "external",
        })),
      ];

      setBlogs(allBlogs);
    }
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-12"
      >
        <div className="flex flex-col gap-4">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl font-bold relative"
          >
            Blog Posts
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary/20 rounded-full origin-left"
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-2xl"
          >
            Thoughts, tutorials, and insights about software development and
            design.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                data-cursor="block"
              >
                <BlogCard {...blog} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

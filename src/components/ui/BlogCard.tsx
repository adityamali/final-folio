import { ExternalLink } from "lucide-react";

import { BlogType } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BlogCard(blog: Readonly<BlogType>) {
  const handleClick = () => {
    if (blog.type === "external" && blog.url) {
      window.open(blog.url, "_blank");
    } else if (blog.type === "internal" && blog.slug) {
      window.location.href = `/blog/${blog.slug}`;
    }
  };

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-border bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <button
        type="button"
        onClick={handleClick}
        className="relative w-full overflow-hidden rounded-2xl border border-border bg-background/60 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        {/* Image Container */}
        <div className="relative h-64 w-full overflow-hidden bg-foreground-100/10">
          <Image
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-full object-cover dark:brightness-75"
            width={400}
            height={256}
            unoptimized
          />
  </div>

        {/* Content Container */}
        <div className="p-6">
          {/* Platform Badge (for external blogs) */}
          {blog.type === "external" && blog.platform && (
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-800/80 text-primary-800 dark:text-primary-100 rounded-full text-xs font-medium">
                {blog.platform}
                <ExternalLink className="inline-block w-3 h-3 ml-1" />
              </span>
            </div>
          )}

          {/* Date */}
          <p className="text-sm text-foreground-500 mb-2">{formattedDate}</p>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground-900 dark:text-foreground-100 mb-3">
            {blog.title}
          </h3>

          {/* Description */}
          <p className="text-foreground-600 dark:text-foreground-300 text-sm line-clamp-3 mb-4">
            {blog.description}
          </p>

          {/* Read More Link */}
          <div className="flex items-center text-primary-500 text-sm font-medium">
            Read More
            <ExternalLink className="w-4 h-4 ml-1" />
          </div>
        </div>
      </button>
    </motion.div>
  );
}

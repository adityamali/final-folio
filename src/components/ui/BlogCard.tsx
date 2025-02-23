import { useState } from "react";
import { Heart, Share2, ExternalLink } from "lucide-react";

import { BlogType } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard(blog: BlogType) {
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
    <div
      onClick={handleClick}
      className="relative w-full overflow-hidden rounded-2xl border border-border bg-background dark:bg-foreground/10 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-foreground/5">
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
        {blog.type === "external" && blog.platform && (
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-primary-light dark:bg-primary-dark text-primary rounded-full text-xs font-medium">
              {blog.platform}
              <ExternalLink className="inline-block w-3 h-3 ml-1" />
            </span>
          </div>
        )}

        <p className="text-sm text-foreground mb-2">{formattedDate}</p>
        <h3 className="text-xl font-bold text-foreground mb-3">{blog.title}</h3>
        <p className="text-foreground/60 text-sm line-clamp-3 mb-4">
          {blog.description}
        </p>

        {/* Read More Link */}
        <div className="flex items-center text-primary-500 text-sm font-medium">
          Read More
          <ExternalLink className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
}

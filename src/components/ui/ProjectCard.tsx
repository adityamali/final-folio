import { useState } from "react";
import { Heart, Share2, ExternalLink } from "lucide-react";
import { ProjectType } from "@/types";
import Image from "next/image";

export default function ProjectCard(project: ProjectType) {
  const handleClick = () => {
    if (project.live_url) {
      window.open(project.live_url, "_blank");
    } else if (project.github_url) {
      window.open(project.github_url, "_blank");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative w-full sm:max-w-md overflow-hidden rounded-2xl border border-border bg-background dark:bg-foreground/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="relative h-80 w-full overflow-hidden bg-foreground-100/10">
        <Image
          src={project.image_url}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-sm group-hover:brightness-50 dark:brightness-75"
          width={400}
          height={320}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-900/90 via-background-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
        {/* Dark gradient background for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent" />

        <div className="relative z-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-background dark:bg-primary-dark text-foreground backdrop-blur-sm rounded-full text-xs font-medium border border-border"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white ">{project.name}</h3>

          {/* Description */}
          <p className="text-gray-200 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex gap-4 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            {project.live_url && (
              <ExternalLink className="w-5 h-5 text-white hover:text-primary transition-colors" />
            )}
            {project.github_url && (
              <Share2 className="w-5 h-5 text-white hover:text-primary transition-colors" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

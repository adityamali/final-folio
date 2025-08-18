import { Share2, ExternalLink } from "lucide-react";
import { ProjectType } from "@/types";
import Image from "next/image";

export default function ProjectCard(project: Readonly<ProjectType>) {
  const handleClick = () => {
    if (project.live_url) {
      window.open(project.live_url, "_blank");
    } else if (project.github_url) {
      window.open(project.github_url, "_blank");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group text-left relative w-full overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      data-cursor="block"
    >
      {/* Image Container */}
      <div
        className="relative h-64 md:h-72 lg:h-80 w-full overflow-hidden"
        data-cursor="block"
      >
        <Image
          src={project.image_url}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          width={400}
          height={320}
          unoptimized
          data-cursor="block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </div>

      {/* Content Container */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-16 group-hover:translate-y-0 transition-transform duration-500"
        data-cursor="block"
      >
        {/* Dark gradient background for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/70 to-transparent" />

        <div className="relative z-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-white/10 text-white rounded-full text-[10px] md:text-xs font-medium border border-white/20 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white">{project.name}</h3>

          {/* Description */}
          <p className="text-gray-200 text-sm md:text-[15px] mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex gap-4 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            {project.live_url && (
              <ExternalLink aria-label="Open live site" className="w-5 h-5 text-white hover:text-primary transition-colors" />
            )}
            {project.github_url && (
              <Share2 aria-label="Open source code" className="w-5 h-5 text-white hover:text-primary transition-colors" />
            )}
          </div>
        </div>
      </div>
  </button>
  );
}

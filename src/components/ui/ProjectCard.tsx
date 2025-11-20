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
    <div className="group flex flex-col gap-4">
      <button
        type="button"
        onClick={handleClick}
        className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-muted/20 transition-all hover:border-primary/50 hover:shadow-lg"
      >
        <Image
          src={project.image_url}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={600}
          height={400}
          unoptimized
        />

        {/* Hover Overlay with Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.live_url && (
            <div className="flex items-center gap-2 text-white font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition-colors">
              <ExternalLink size={16} />
              <span>Visit</span>
            </div>
          )}
          {project.github_url && (
            <div className="flex items-center gap-2 text-white font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition-colors">
              <Share2 size={16} />
              <span>Code</span>
            </div>
          )}
        </div>
      </button>

      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
            {project.name}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-1">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

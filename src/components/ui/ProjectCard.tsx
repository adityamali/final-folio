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
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all hover:shadow-lg hover:border-border/80 hover:-translate-y-1">
      <button
        type="button"
        onClick={handleClick}
        className="relative aspect-[16/10] w-full overflow-hidden bg-muted"
      >
        <Image
          src={project.image_url}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={600}
          height={400}
          unoptimized
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-8">
          <div className="flex items-center gap-3">
            {project.live_url && (
              <div className="flex items-center gap-2 text-foreground font-semibold px-5 py-2.5 rounded-lg bg-foreground/10 backdrop-blur-sm border border-border hover:bg-foreground/20 transition-colors">
                <ExternalLink size={16} />
                <span>View Live</span>
              </div>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-foreground font-semibold px-5 py-2.5 rounded-lg bg-foreground/10 backdrop-blur-sm border border-border hover:bg-foreground/20 transition-colors"
              >
                <Share2 size={16} />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </button>

      <div className="flex flex-col gap-3 p-5">
        <h3 className="text-xl font-semibold leading-tight text-foreground">
          {project.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-md bg-muted text-foreground text-xs font-medium border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

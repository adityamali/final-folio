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
    <div className="group flex flex-col overflow-hidden bg-cream border-2 md:border-4 border-charcoal shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro transition-all hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_#E05228] md:hover:shadow-[8px_8px_0px_0px_#E05228]">
      <button
        type="button"
        onClick={handleClick}
        className="relative aspect-[16/10] w-full overflow-hidden border-b-2 md:border-b-4 border-charcoal bg-charcoal/10"
      >
        <Image
          src={project.image_url}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
          width={600}
          height={400}
          unoptimized
        />

        {/* Hover Overlay - Vintage Tint */}
        <div className="absolute inset-0 bg-orange/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="bg-cream border-2 border-charcoal px-3 py-2 shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro transform rotate-3">
              <span className="font-display uppercase text-base md:text-xl text-charcoal">View Project</span>
            </div>
        </div>
      </button>

          <div className="flex flex-col gap-3 md:gap-4 p-4 md:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <h3 className="text-xl md:text-2xl font-display uppercase leading-tight text-charcoal group-hover:text-orange transition-colors">
            {project.name}
            </h3>
            <div className="flex gap-2 text-charcoal">
                {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-charcoal hover:text-teal transition-colors">
                        <ExternalLink size={20} strokeWidth={2.5} />
                    </a>
                )}
                {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-charcoal hover:text-teal transition-colors">
                        <Share2 size={20} strokeWidth={2.5} />
                    </a>
                )}
            </div>
        </div>

        <p className="text-sm md:text-base font-medium text-charcoal/80 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-3 md:pt-4 border-t border-charcoal/10">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 md:px-3 py-1 bg-teal text-cream text-[10px] md:text-xs font-bold uppercase tracking-wider border border-charcoal shadow-[2px_2px_0px_0px_#2D2D2D]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

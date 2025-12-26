import { ExternalLink } from "lucide-react";
import { BlogType } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function BlogCard(blog: Readonly<BlogType>) {
  const isExternal = blog.type === "external";
  const href = isExternal ? blog.url : `/blog/${blog.slug}`;

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={href || "#"}
      target={isExternal ? "_blank" : undefined}
      className="group flex flex-col overflow-hidden bg-cream border-2 md:border-4 border-charcoal shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro transition-all hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_#E6A32E] md:hover:shadow-[8px_8px_0px_0px_#E6A32E]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b-2 md:border-b-4 border-charcoal bg-charcoal/10">
        {blog.image_url ? (
          <Image
            src={blog.image_url}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-mustard/20 text-charcoal">
            <span className="font-display uppercase text-xl">No Image</span>
          </div>
        )}

        {/* External indicator */}
        {isExternal && (
          <div className="absolute top-3 right-3 bg-teal text-cream p-2 border-2 border-charcoal shadow-retro">
            <ExternalLink size={16} strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 md:gap-4 p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-charcoal/60">
          <time dateTime={blog.date}>{formattedDate}</time>
          <span>•</span>
          <span>{Math.ceil(blog.description.length / 200)} min read</span>
        </div>

        <h3 className="font-display text-xl md:text-2xl uppercase leading-tight text-charcoal transition-colors line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-sm md:text-base font-medium text-charcoal/80 line-clamp-3 leading-relaxed">
          {blog.description}
        </p>
        
        <div className="mt-auto pt-3 md:pt-4 border-t border-charcoal/10 flex justify-end">
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-teal group-hover:underline decoration-2 underline-offset-4">
                Read Article &rarr;
            </span>
        </div>
      </div>
    </Link>
  );
}

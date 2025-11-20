import { ExternalLink, ArrowRight } from "lucide-react";
import { BlogType } from "@/types";
import Link from "next/link";

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
      className="group flex flex-col gap-3 rounded-xl transition-all"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
        {blog.image_url ? (
          <img
            src={blog.image_url}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            <span className="text-xs">No Thumbnail</span>
          </div>
        )}

        {/* Duration/Platform Badge (Optional overlay like YouTube duration) */}
        {isExternal && blog.platform && (
          <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {blog.platform}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 pr-4">
        <h3 className="font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {blog.title}
        </h3>

        <div className="flex flex-col text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Aditya Mali</span>
            {isExternal && <ExternalLink size={12} className="ml-1" />}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <time dateTime={blog.date}>{formattedDate}</time>
            <span>•</span>
            <span>{Math.ceil(blog.description.length / 200)} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

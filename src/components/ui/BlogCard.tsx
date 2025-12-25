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
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all hover:shadow-lg hover:border-border/80 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {blog.image_url ? (
          <Image
            src={blog.image_url}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}

        {/* External indicator */}
        {isExternal && (
          <div className="absolute top-3 right-3 rounded-full bg-background/90 backdrop-blur-sm p-1.5 border border-border">
            <ExternalLink size={14} className="text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={blog.date}>{formattedDate}</time>
          <span>•</span>
          <span>{Math.ceil(blog.description.length / 200)} min read</span>
        </div>

        <h3 className="font-semibold text-lg leading-snug line-clamp-2 text-foreground group-hover:text-foreground/80 transition-colors">
          {blog.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {blog.description}
        </p>
      </div>
    </Link>
  );
}

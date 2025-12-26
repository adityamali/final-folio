"use client";

import { motion } from "framer-motion";
import { Software } from "@/types/software";
import Link from "next/link";
import Image from "next/image";
import { Star, Download } from "lucide-react";

interface AppStoreCardProps {
  app: Software;
  index: number;
}

export default function AppStoreCard({ app, index }: AppStoreCardProps) {
  const fileSize = app.platforms.length * 150 + app.name.length * 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex-shrink-0 w-[240px] md:w-[280px]"
    >
      <Link
        href={`/cafe/${app.id}`}
        className="flex flex-col group bg-cream border-2 md:border-4 border-charcoal shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-[4px_4px_0px_0px_#2D2D2D] hover:shadow-[4px_4px_0px_0px_#E05228] md:hover:shadow-[6px_6px_0px_0px_#E05228] hover:-translate-y-1 transition-all duration-300"
      >
        {/* App Icon with Overlay */}
        <div className="relative bg-gradient-to-br from-cream to-cream/80 p-6 md:p-8 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <Image
            src={app.icon}
            alt={`${app.name} icon`}
            width={96}
            height={96}
            className="relative z-10 group-hover:scale-110 transition-transform duration-300"
          />

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 md:gap-1.5 bg-teal backdrop-blur-sm border-2 border-charcoal px-2 py-0.5 md:px-2.5 md:py-1 shadow-[2px_2px_0px_0px_#2D2D2D]">
            <Star className="w-3.5 h-3.5 fill-cream text-cream" />
            <span className="text-cream text-xs font-bold">4.9</span>
          </div>
        </div>

        {/* App Info Section */}
        <div className="flex flex-col flex-1 p-4 md:p-5 space-y-3 bg-cream">
          <div className="space-y-1.5">
            <h3 className="font-display uppercase text-base md:text-lg text-charcoal line-clamp-1 group-hover:text-orange transition-colors">
              {app.name}
            </h3>
            <p className="text-xs md:text-sm font-medium text-charcoal/70 line-clamp-2 leading-relaxed">
              {app.tagline}
            </p>
          </div>

          {/* Footer with size and button */}
          <div className="flex items-center justify-between pt-2 border-t-2 border-charcoal/10">
            <div className="flex items-center gap-1.5 text-charcoal/60">
              <Download className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span className="text-xs font-bold uppercase">{fileSize}MB</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 md:px-5 py-1.5 bg-charcoal hover:bg-orange text-cream border-2 border-charcoal font-display uppercase text-xs md:text-sm transition-colors shadow-[2px_2px_0px_0px_#2D2D2D]"
            >
              {app.price === 0 ? "Get" : `$${app.price}`}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

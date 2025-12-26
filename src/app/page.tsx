import { Blogs } from "@/components/sections";
import { Hero } from "@/components/home/Hero";
import { NextPage } from "next";
import Subscribe from "@/components/forms/Subscribe";
import Link from "next/link";
import AppStoreCard from '@/components/cafe/AppStoreCard';
import { ArrowRight } from 'lucide-react';
import { getFeaturedSoftware } from "@/lib/actions/software";

// Fetch featured tools for Software Café
const featuredSoftware = await getFeaturedSoftware();

const Page: NextPage = () => {
  return (
    <div className="flex flex-col w-full bg-cream text-charcoal">
      <Hero />

      {/* Developer Toolbox Section */}
      <section className="w-full px-4 md:px-12 lg:px-20 py-12 md:py-20 border-b-2 md:border-b-4 border-charcoal">
        <div className="mx-auto max-w-7xl overflow-hidden">
          <div className="flex items-end justify-between border-b-2 md:border-b-4 border-charcoal pb-3 md:pb-4 mb-6 md:mb-8">
            <h2 className="font-display text-2xl md:text-4xl uppercase text-charcoal drop-shadow-md">Software Café</h2>
            <Link
              href="/cafe"
              className="font-display uppercase text-sm md:text-lg text-teal hover:text-orange flex items-center gap-1 md:gap-2 transition-colors"
            >
              <span className="hidden sm:inline">View All Projects</span>
              <span className="sm:hidden">View All</span>
              <ArrowRight size={16} strokeWidth={2.5} className="md:w-5 md:h-5" />
            </Link>
          </div>
          <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-4 md:px-0 snap-x snap-mandatory">
            {featuredSoftware.map((app, index) => (
              <AppStoreCard key={app.id} app={app} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Intermission */}
      <section className="w-full px-4 md:px-12 lg:px-20 py-12 md:py-20 bg-teal text-cream border-b-2 md:border-b-4 border-charcoal">
        <div className="mx-auto max-w-3xl text-center space-y-6 md:space-y-8">
          <h2 className="font-display text-3xl md:text-5xl uppercase drop-shadow-md">Stay Updated</h2>
          <p className="font-medium text-base md:text-xl max-w-xl mx-auto opacity-90 px-2">
            Subscribe for insights on modern development, design patterns, and industry best practices.
          </p>
          <div className="bg-cream p-4 md:p-8 border-2 md:border-4 border-charcoal shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro rotate-1">
             <Subscribe />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="w-full px-4 md:px-12 lg:px-20 py-12 md:py-20">
        <div className="mx-auto max-w-7xl space-y-8 md:space-y-12">
          <div className="space-y-3 md:space-y-4 text-center md:text-left border-b-2 md:border-b-4 border-charcoal pb-4 md:pb-6">
            <h2 className="font-display text-3xl md:text-5xl uppercase text-charcoal drop-shadow-md">
                Latest Insights
            </h2>
            <p className="font-medium text-base md:text-xl text-charcoal/70 max-w-2xl mx-auto md:mx-0 px-2 md:px-0">
              Thoughts on software architecture, design systems, and building scalable products.
            </p>
          </div>
          <Blogs />
        </div>
      </section>
    </div>
  );
};

export default Page;

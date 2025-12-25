import { Blogs } from "@/components/sections";
import { Hero } from "@/components/home/Hero";
import { NextPage } from "next";
import Subscribe from "@/components/forms/Subscribe";

const Page: NextPage = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      
      {/* Newsletter Section */}
      <section className="w-full px-6 md:px-12 lg:px-16 py-16 bg-muted/30">
        <div className="mx-auto max-w-3xl">
          <Subscribe />
        </div>
      </section>

      {/* Blog Section */}
      <section className="w-full px-6 md:px-12 lg:px-16 py-20">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Latest Writing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Thoughts on software development, design, and building products that matter.
            </p>
          </div>
          <Blogs />
        </div>
      </section>
    </div>
  );
};

export default Page;

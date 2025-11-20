"use client";
import { Blogs } from "@/components/sections";
import { Hero } from "@/components/home/Hero";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />

      <section className="w-full px-6 md:px-12 py-24">
        <div className="mx-auto max-w-7xl">
          <Blogs />
        </div>
      </section>
    </div>
  );
};

export default Page;
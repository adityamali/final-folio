"use client";
import { useEffect, useState } from "react";

import { Blogs } from "@/components/sections";
import { Hero } from "@/components/home/Hero";
import { NextPage } from "next";
import { usePathname } from "next/dist/client/components/navigation";

const Page: NextPage = () => {

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <section className="w-full px-6 md:px-12 py-6">
        <div className="mx-auto max-w-7xl px-8 py-8 bg-primary-light rounded-3xl">
          <div className="flexflex-col">
            <h1 className="text-white text-xl font-bold pb-3">
              Subscribe to{" "}
              <span className="mono bg-primary-light py-2 pl-1 pr-2 rounded-md">
                .paged
              </span>
            </h1>
            <div className="flex">
              <p className="text-muted-foreground max-w-lg text-sm">
                Stay updated with the latest articles, tutorials, and insights
                from my blog. Subscribe to receive notifications directly to
                your inbox.
              </p>
              <form
                action="https://buttondown.email/api/emails/embed-subscribe/noted"
                method="post"
                target="popupwindow"
                onSubmit={() =>
                  window.open("https://buttondown.email/noted", "popupwindow")
                }
                className="ml-8 bg-background rounded-full w-full sm:max-w-lg"
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    required
                    className="w-full px-4 py-3 rounded-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:bg-black"
                  />
                  <button
                    type="submit"
                    className="group relative inline-flex items-center justify-center rounded-full p-[1px] transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-80 group-hover:opacity-100 transition-opacity rounded-full" />
                    <div className="relative flex h-full w-full items-center justify-center rounded-full bg-background px-6 py-3 transition-colors group-hover:bg-background/90">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-semibold text-sm whitespace-nowrap">
                        Subscribe
                      </span>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 md:px-12 py-24">
        <div className="mx-auto max-w-7xl">
          <Blogs />
        </div>
      </section>
    </div>
  );
};

export default Page;

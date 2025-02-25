import { Blogs, Contact, Projects, Skills } from "@/components/sections";
import { NextPage } from "next";
import Image from "next/image";

const Page: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Background Glow Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-blue-400/30 dark:bg-blue-500/30 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-blue-400/20 dark:bg-blue-500/30 rounded-full blur-[96px] animate-pulse-slower" />
        <div className="absolute top-[40%] right-[25%] w-[300px] h-[300px] bg-pink-400/20 dark:bg-purple-500/30 rounded-full blur-[64px] animate-float" />
      </div>

      <section className="relative flex flex-col items-center justify-center gap-4 w-full pb-40">
        <Image
          src="/me.jpeg"
          alt="Profile Picture"
          width={200}
          height={200}
          className="aspect-square object-cover rounded-full shadow-xl"
          style={{
            boxShadow:
              "inset 0px -4px 5px rgba(256, 256, 256, 0.4), -4px 4px 10px rgba(0, 0, 0, 0.3), inset -4px 4px 5px rgba(256, 256, 256, 0.5)",
          }}
          data-cursor="block"
        />
        <h1 className="text-3xl mt-8">Aditya Mali</h1>
        <p className="text-center w-full sm:w-[25rem] text-foreground/60">
          I am a Full Stack Developer who loves to build web applications and
          solve problems. I am a self-taught developer and I love to learn new
          technologies. Freelancer.
        </p>
      </section>

      <section className="flex flex-col gap-4 w-full 2lg:w-[75vw] px-4 md:px-20 pb-40">
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <Projects />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-4 w-full 2lg:w-[50vw] px-4 md:px-20 pb-40">
        <Skills />
      </section>

      <section className="flex flex-col items-center justify-center gap-4 w-full 2lg:w-[75vw] px-4 py-16 md:p-20 bg-gray-100 dark:bg-[#111111]">
        <Blogs />
      </section>

      <section className="flex flex-col items-center justify-center gap-4 w-full bg-gray-200 dark:bg-[#1e1e1e] px-4 py-16 md:p-20">
        <Contact />
      </section>
    </div>
  );
};

export default Page;

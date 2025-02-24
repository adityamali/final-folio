import { Blogs, Contact, Projects, Skills } from "@/components/sections";
import { NextPage } from "next";
import Image from "next/image";

const Page: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="relative flex flex-col items-center justify-center gap-4 w-full pb-40">
        <Image
          src="/me.jpeg"
          alt="Profile Picture"
          width={200}
          height={200}
          className="aspect-square object-cover rounded-full shadow-xl"
          data-cursor="block"
        />
        <h1 className="text-3xl mt-8">Aditya Mali</h1>
        <p className="text-center w-full sm:w-[25rem] text-foreground/60">
          I am a Full Stack Developer who loves to build web applications and
          solve problems. I am a self-taught developer and I love to learn new
          technologies. Freelancer.
        </p>
      </section>

      <section className="flex flex-col gap-4 w-full 2lg:w-[75vw] px-20 pb-40">
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <Projects />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-4 w-full 2lg:w-[50vw] px-20 pb-40">
        <Skills />
      </section>

      <section className="flex flex-col items-center justify-center gap-4 w-full 2lg:w-[75vw] p-20 bg-gray-100 dark:bg-[#111111]">
        <Blogs />
      </section>

      <section className="flex flex-col items-center justify-center gap-4 w-full bg-gray-200 dark:bg-[#1e1e1e]">
        <Contact />
      </section>
    </div>
  );
};

export default Page;

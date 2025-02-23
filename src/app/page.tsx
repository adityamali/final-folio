import { Blogs, Contact, Projects, Skills } from "@/components/sections";
import { NextPage } from "next";
import Image from "next/image";
import DoodleBackground from "@/components/ui/DoodleBackground";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="relative flex flex-col items-center justify-center gap-4 w-full pb-40">
        {/* <DoodleBackground /> */}
        <Image
          src="/me.jpeg"
          alt="Next.js"
          width={200}
          height={200}
          className="aspect-square object-cover rounded-full shadow-xl"
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

      <section className="flex flex-col items-center justify-center gap-4 w-full 2lg:w-[75vw] px-20 pb-40">
        <Blogs />
      </section>

      <section className="flex flex-col items-center justify-center gap-4 w-full 2lg:w-[50vw] px-20 pb-40">
        <Skills />
      </section>

      <section className="flex flex-col items-center justify-center gap-4 w-full pb-40">
        <Contact />
      </section>
    </div>
  );
};

export default Page;

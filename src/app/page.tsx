import { Blogs, Contact, Projects, Skills } from "@/components/sections";
import { NextPage } from "next";
import Image from "next/image";

const Page: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-36">
      {/* Background Glow Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <style>
            {`
              @keyframes revolve1 {
                0% { transform: rotate(0deg) translateX(35vw) rotate(0deg); }
                100% { transform: rotate(360deg) translateX(35vw) rotate(-360deg); }
              }
              @keyframes revolve2 {
                0% { transform: rotate(120deg) translateX(25vw) rotate(-120deg); }
                100% { transform: rotate(480deg) translateX(25vw) rotate(-480deg); }
              }
              @keyframes revolve3 {
                0% { transform: rotate(240deg) translateX(15vw) rotate(-240deg); }
                100% { transform: rotate(600deg) translateX(15vw) rotate(-600deg); }
              }
              @keyframes vibgyor {
                0% { background: rgba(148,0,211,0.3); }
                25% { background: rgba(75,0,130,0.3); }
                50% { background: rgba(0,0,255,0.3); }
                75% { background: rgba(255,105,180,0.3); }
                100% { background: rgba(148,0,211,0.3); }
              }
            `}
        </style>
        <div
          style={{
        position: "absolute",
        top: "40%",
        left: "40%",
        width: 300,
        height: 300,
        borderRadius: "50%",
        filter: "blur(128px)",
        animation: "revolve1 20s linear infinite, vibgyor 8s linear infinite",
        transformOrigin: "center center",
        zIndex: -1,
          }}
        />
        <div
          style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        width: 220,
        height: 220,
        borderRadius: "50%",
        filter: "blur(96px)",
        animation: "revolve2 50s linear infinite, vibgyor 10s linear infinite reverse",
        transformOrigin: "center center",
        zIndex: -1,
          }}
        />
        <div
          style={{
        position: "absolute",
        top: "40%",
        left: "20%",
        width: 140,
        height: 140,
        borderRadius: "50%",
        filter: "blur(64px)",
        animation: "revolve3 90s linear infinite, vibgyor 12s linear infinite",
        transformOrigin: "center center",
        zIndex: -1,
          }}
        />
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
          I am a Full Stack Developer specializing in building modern web applications for clients and businesses. If you need a website or web app, I am available for freelance projects—let&#39;s work together to bring your ideas to life!
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
import Image from 'next/image';
import Link from 'next/link';
import { Download, Github, ArrowLeft } from 'lucide-react';
import { Software } from '@/types/software';
import { kill9, kill9Faqs } from '@/lib/kill9';

const heading = 'font-display text-3xl uppercase border-b-4 border-charcoal pb-2 mb-6';
const panel = 'border-2 border-charcoal bg-cream p-6 shadow-retro';
const button = 'inline-flex items-center justify-center gap-2 border-2 border-charcoal px-6 py-4 font-display uppercase shadow-retro transition-colors focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-teal';

// Server-rendered product information stays readable with JavaScript disabled.
export default function Kill9Page({ app }: { app: Software }) {
  const screenshots = app.images.filter((url) => url !== app.icon && !/kill9_icon|placeholder-app/.test(url));

  return (
    <article className="min-h-screen bg-cream text-charcoal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <Link href="/cafe" className="inline-flex items-center gap-2 border-2 border-charcoal px-4 py-2 mb-8 font-display uppercase hover:text-orange focus-visible:outline-teal">
          <ArrowLeft aria-hidden="true" className="w-5 h-5" /> Back to Café
        </Link>

        <header className="mb-16">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <Image src={app.icon} alt="Kill9 macOS app icon" width={144} height={144} priority unoptimized className="shrink-0 w-28 h-28 md:w-36 md:h-36 object-contain rounded-2xl border-4 border-charcoal shadow-retro p-3" />
            <div className="flex-1 min-w-0">
              <p className="font-mono text-sm font-bold uppercase mb-3">macOS developer utility · macOS 13+</p>
              <h1 className="font-display text-5xl md:text-6xl uppercase text-orange drop-shadow-md mb-4">Kill9 for macOS</h1>
              <p className="font-accent text-2xl text-teal mb-6 -rotate-1">Find the port. Know the project. Stop the process.</p>
              <div className="flex flex-wrap gap-4 mb-4">
                {app.downloadUrl && <a href={app.downloadUrl} className={`${button} bg-orange text-charcoal hover:bg-mustard`}><Download aria-hidden="true" className="w-5 h-5" /> Download Kill9 for macOS</a>}
                <a href={kill9.sourceUrl} className={`${button} hover:bg-mustard`}><Github aria-hidden="true" className="w-5 h-5" /> View source on GitHub</a>
              </div>
              <p className="text-sm font-medium mb-6">macOS 13.0 or later · Apple silicon and Intel · ZIP download</p>
              <p className="text-lg font-medium leading-relaxed mb-6 border-l-4 border-mustard pl-4">{kill9.summary}</p>
              <p className="mb-6 leading-relaxed">Port 3000 already in use? Another server holding port 8080? Inspect the listener and free an occupied development port without remembering Terminal commands.</p>
              <p className="text-sm mt-2">Developed by <Link href="/about" className="underline decoration-teal underline-offset-4">Aditya Mali</Link> using SwiftUI and AppKit.</p>
              <dl className="flex flex-wrap gap-x-8 gap-y-4 border-4 border-charcoal p-6 mt-6 shadow-retro">
                <div><dt className="font-mono text-xs uppercase">Version</dt><dd className="font-display text-lg">{app.version}</dd></div>
                <div><dt className="font-mono text-xs uppercase">Platform</dt><dd className="font-display text-lg">macOS</dd></div>
                <div><dt className="font-mono text-xs uppercase">Category</dt><dd className="font-display text-lg">Developer utility</dd></div>
              </dl>
            </div>
          </div>
          <nav aria-label="Kill9 page sections" className="flex flex-wrap gap-x-6 gap-y-3 mt-10 font-bold underline decoration-teal underline-offset-4">
            <a href="#how-it-works">How it works</a><a href="#installation">Installation</a><a href="#terminal-guide">Terminal guide</a><a href="#faq">FAQ</a>
          </nav>
        </header>

        <section className="mb-16" aria-labelledby="who-heading">
          <h2 id="who-heading" className={heading}>A menu bar tool for local development</h2>
          <p className="text-lg leading-relaxed mb-6">Kill9 is for developers running local web apps, APIs, and other development servers on a Mac. When a port conflict interrupts a restart, Kill9 helps you see which process is listening and which project it belongs to. You can then decide whether to stop it or run your new server on a different port.</p>
          <ul className="grid md:grid-cols-2 gap-4">{kill9.features.map((feature) => <li key={feature} className={`${panel} flex items-start gap-3`}><span aria-hidden="true" className="font-bold text-teal">✓</span><span>{feature}</span></li>)}</ul>
        </section>

        <section id="how-it-works" className="mb-16" aria-labelledby="workflow-heading">
          <h2 id="workflow-heading" className={heading}>How to free a port with Kill9</h2>
          <ol className="grid md:grid-cols-3 gap-6 list-inside list-decimal">
            <li className={panel}><h3 className="inline font-display text-xl uppercase">Open the menu bar panel</h3><p className="mt-3 leading-relaxed">Click the KILL9 status item to scan local TCP listeners. Kill9 focuses on development servers owned by your macOS user.</p></li>
            <li className={panel}><h3 className="inline font-display text-xl uppercase">Check the port and project</h3><p className="mt-3 leading-relaxed">Find the occupied port, such as 3000, 5173, or 8080. Review the project name, runtime, and PID before taking action. Project names depend on available metadata.</p></li>
            <li className={panel}><h3 className="inline font-display text-xl uppercase">Stop the selected process</h3><p className="mt-3 leading-relaxed">Click Stop to request shutdown with SIGTERM. If the process remains unresponsive, Force becomes available for an explicit SIGKILL. Restart your development server after the port is released.</p></li>
          </ol>
          <p className="mt-6 leading-relaxed">Kill9 stops a process, which can release multiple ports it owns. It cannot close just one port of an arbitrary application. A supervised service may restart automatically.</p>
        </section>

        <section id="installation" className="mb-16" aria-labelledby="installation-heading">
          <h2 id="installation-heading" className={heading}>Download and install on macOS</h2>
          <ol className="list-decimal pl-6 space-y-3 leading-relaxed">
            <li>{app.downloadUrl ? <a href={app.downloadUrl} className="underline decoration-teal underline-offset-4 font-bold">Download the Kill9 macOS ZIP</a> : 'Download Kill9 from its official distribution link.'} on a Mac running macOS 13.0 or later.</li>
            <li>Double-click the ZIP in Finder to extract <code>Kill9.app</code>.</li>
            <li>Move <code>Kill9.app</code> to your Applications folder and open it.</li>
            <li>Look for KILL9 in the macOS menu bar. Kill9 has no conventional app window or Dock icon.</li>
          </ol>
          <p className="mt-5 leading-relaxed">The download supports Apple silicon and Intel Macs. If macOS blocks the app, review its source and distribution information before proceeding. See <a href="https://support.apple.com/en-us/102445" className="underline decoration-teal underline-offset-4">Apple’s guidance on opening apps safely</a>.</p>
          <p className="mt-3">Kill9 is available for macOS; there is no Windows or Linux version.</p>
        </section>

        {screenshots.length > 0 && <section className="mb-16" aria-labelledby="screenshots-heading">
          <h2 id="screenshots-heading" className={heading}>Kill9 screenshots</h2>
          <div className="grid md:grid-cols-2 gap-6">{screenshots.map((url, index) => <figure key={url} className={`${panel} min-w-0`}><Image src={url} alt={`Kill9 macOS utility interface, view ${index + 1}`} width={960} height={720} sizes="(max-width: 768px) 100vw, 50vw" unoptimized className="w-full h-auto object-contain" /><figcaption className="mt-4 font-bold">Kill9 for macOS — interface view {index + 1}</figcaption></figure>)}</div>
        </section>}
        {app.demoUrl && <section className="mb-16" aria-labelledby="demo-heading"><h2 id="demo-heading" className={heading}>See Kill9 in action</h2><a href={app.demoUrl} className={`${button} bg-mustard`}>Watch the Kill9 demonstration</a></section>}

        <section id="terminal-guide" className="mb-16" aria-labelledby="terminal-heading">
          <h2 id="terminal-heading" className={heading}>Find and stop a process on port 3000 in Terminal</h2>
          <p className="mb-4 leading-relaxed">For a TCP port conflict on macOS, inspect the listener first. This command shows the process using port 3000; replace 3000 with 8080 or another port as needed.</p>
          <pre className="bg-charcoal text-cream p-4 overflow-x-auto mb-4 text-sm"><code>lsof -nP -iTCP:3000 -sTCP:LISTEN</code></pre>
          <p className="mb-4 leading-relaxed">Check the command and PID in the output. If it is the process you want to stop, replace <code>&lt;PID&gt;</code> below with that numeric process ID. SIGTERM requests a graceful shutdown.</p>
          <pre className="bg-charcoal text-cream p-4 overflow-x-auto mb-4 text-sm"><code>{'kill -TERM <PID>'}</code></pre>
          <p className="mb-4 leading-relaxed">Run the inspection command again to check whether the port is free. If the same verified process is unresponsive, <code>kill -KILL &lt;PID&gt;</code> (also written <code>kill -9 &lt;PID&gt;</code>) forces termination without cleanup.</p>
          <h3 className="font-display text-2xl uppercase mt-8 mb-4">Why use Kill9 instead of manual commands?</h3>
          <p className="leading-relaxed mb-4">Kill9 brings listener discovery, available project context, and Stop controls into one menu bar panel. It helps when several projects run as the same runtime, such as Node.js. Terminal offers a flexible workflow for scripting and broader process inspection; Kill9 provides a graphical alternative for everyday development port conflicts.</p>
          <p className="leading-relaxed">An <code>EADDRINUSE</code> error means the requested address and port are already in use. The existing process may be working normally. Identify it before stopping it, or choose another port if you need both servers.</p>
        </section>

        <section id="faq" className="mb-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className={heading}>Frequently asked questions</h2>
          <div className="space-y-6">{kill9Faqs.map((faq) => <section id={faq.id} key={faq.id} className={panel} aria-labelledby={`${faq.id}-heading`}><h3 id={`${faq.id}-heading`} className="font-display text-xl uppercase mb-3">{faq.question}</h3><p className="leading-relaxed">{faq.answer}</p></section>)}</div>
        </section>

        <footer className="border-4 border-charcoal p-6 md:p-8 shadow-retro bg-mustard">
          <h2 className="font-display text-3xl uppercase mb-4">Get back to building</h2>
          <p className="mb-6 text-lg">Inspect occupied development ports from your macOS menu bar.</p>
          {app.downloadUrl && <a href={app.downloadUrl} className={`${button} bg-cream hover:bg-orange`}><Download aria-hidden="true" className="w-5 h-5" /> Download Kill9 for macOS</a>}
          <p className="mt-6">Built by <Link href="/about" className="underline font-bold">Aditya Mali</Link>. Explore more tools in <Link href="/cafe" className="underline font-bold">Software Café</Link>.{app.buyMeACoffeeUrl && <> <a href={app.buyMeACoffeeUrl} className="underline font-bold">Support the developer</a>.</>}</p>
        </footer>
      </div>
    </article>
  );
}

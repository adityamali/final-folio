'use client';

function Subscribe() {
  return (
    <div className="w-full">
      <div className="mx-auto px-8 md:px-12 py-12 md:py-16 bg-muted rounded-2xl border border-border">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Subscribe to <span className="font-mono text-foreground/80">.paged</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              Stay updated with the latest articles, tutorials, and insights.
              Get notifications delivered directly to your inbox.
            </p>
          </div>
          
          <form
            action="https://buttondown.email/api/emails/embed-subscribe/noted"
            method="post"
            target="popupwindow"
            onSubmit={() =>
              window.open("https://buttondown.email/noted", "popupwindow")
            }
            className="flex-1 w-full lg:max-w-md"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-muted transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
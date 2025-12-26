'use client';

function Subscribe() {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1 space-y-3 text-left">
            <h2 className="font-display text-3xl uppercase text-charcoal">
              Join the Club
            </h2>
            <p className="font-medium text-charcoal leading-relaxed">
             Stay updated with email newsletter and notifications.
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
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                name="email"
                placeholder="YOUR@EMAIL.COM"
                required
                className="flex-1 px-4 py-3 bg-cream border-2 border-charcoal text-charcoal placeholder:text-charcoal/40 font-mono focus:outline-none focus:shadow-retro transition-all uppercase"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-orange text-cream font-display uppercase tracking-wider border-2 border-charcoal hover:shadow-retro hover:-translate-y-1 transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default Subscribe;
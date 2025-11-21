'use client'
import { Search } from "lucide-react";


export default function TopSearch() {
  
    const triggerSearch = () => {
      window.dispatchEvent(new Event("open-command-bar"));
    };

    return (
    <div>

        <div className="mt-auto pt-6 px-6 md:px-16 flex justify-end">
                <button
                  onClick={triggerSearch}
                  className="flex items-center w-96 gap-3 px-4 py-3 rounded-lg text-muted-foreground bg-white/5 text-sm font-medium text-left"
                >
                  <Search size={20} />
                  Search...
                  <span className="ml-auto text-xs bg-white/10 px-1.5 py-0.5 rounded text-muted-foreground">
                    ⌘K
                  </span>
                </button>
              </div>

    </div>
  )
};
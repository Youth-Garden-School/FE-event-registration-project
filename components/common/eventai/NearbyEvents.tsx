"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function NearbyEvents() {
  return (
    <section className="w-full py-8 px-6 bg-background ">
      <div className="max-w-4xl mx-auto border-t border-border pt-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Map & Events */}
          <div className="w-full md:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Nearby Events</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" aria-label="Search">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </Button>
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-4 h-[400px] relative">
              <div
                className="w-full h-full rounded-md opacity-70 bg-repeat"
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2NjY2NjYyIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMiIvPjwvZz48L3N2Zz4=')",
                }}
              >
                {/* Map Location Indicators */}
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-muted-foreground/30 rounded-full" />
                <div className="absolute top-2/3 right-1/5 w-4 h-4 bg-muted-foreground/30 rounded-full" />
                <div className="absolute bottom-1/4 left-1/5 w-4 h-4 bg-muted-foreground/30 rounded-full" />
                <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-muted-foreground/30 rounded-full" />
                <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-muted-foreground/30 rounded-full" />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-lg font-medium">No Events Nearby</h3>
                <p className="text-tertiary-alpha mt-2 max-w-md">
                  There are currently no relevant events near you. You can
                  explore all events on the map.
                </p>
                <Button variant="secondary" size="sm" className="mt-4" asChild>
                  <Link href="/category/ai/map">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      className="mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      <path d="M2 12h20" />
                    </svg>
                    Explore Events
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Subscribe */}
          <div className="w-full md:w-1/3 bg-card rounded-lg p-6 h-fit">
            <div className="flex items-start mb-4">
              <div className="bg-pink-100 p-2 rounded-full">
                <Image
                  src="https://ext.same-assets.com/2185237885/3671249817.png"
                  alt="AI Icon"
                  width={28}
                  height={28}
                  unoptimized
                />
              </div>
            </div>

            <h3 className="text-lg font-bold mt-3 mb-1">AI</h3>
            <p className="fs-sm text-secondary-alpha mb-4">
              Subscribe to stay up-to-date with the latest events, calendars and
              other updates.
            </p>

            <div className="space-y-3">
              <Input
                type="email"
                placeholder="me@email.com"
                className="bg-white"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

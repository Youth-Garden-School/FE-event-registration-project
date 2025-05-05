"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

// Sample calendar data
const calendars = [
  {
    id: "airstreet",
    title: "Air Street events",
    description:
      "AI events around the world organized by Air Street Capital and Nathan Benaich.",
    image: "https://ext.same-assets.com/2185237885/316268860.jpeg",
  },
  {
    id: "latentspace",
    title: "Latent.Space (Paper Club, AI in Action, Meetups & Confs)",
    description:
      "Latent.Space events. youtu.be/@LatentSpaceTV. PLEASE CLICK THE RSS LOGO ABOVE CALENDAR ON THE RIGHT TO ADD TO YOUR CAL.",
    image: "https://ext.same-assets.com/2185237885/953380270.jpeg",
  },
  {
    id: "genai-collective",
    title: "The GenAI Collective",
    description:
      "The US's largest AI community: 25,000+ founders, researchers, operators, & investors with a shared curiosity for AI.",
    image: "https://ext.same-assets.com/2185237885/3105287308.jpeg",
  },
];

export default function PopularCalendars() {
  return (
    <section className="w-full py-12 px-4 md:px-6 bg-background">
      <div className="max-w-4xl mx-auto px-2 md:px-0 border-t border-border">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-center md:text-left">
            Lịch phổ biến
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {calendars.map((calendar) => (
            <Card
              key={calendar.id}
              className="overflow-hidden border border-border hover:shadow-sm transition-shadow duration-200"
            >
              <Link href={`/${calendar.id}`} className="block pt-0 px-4 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={calendar.image}
                      alt={`Avatar for ${calendar.title}`}
                      width={40}
                      height={40}
                      className="rounded bg-secondary"
                      unoptimized
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 px-3 rounded-full"
                  >
                    Theo dõi
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-primary text-base">
                    {calendar.title}
                  </h3>
                  <p className="text-sm text-tertiary-alpha line-clamp-2">
                    {calendar.description}
                  </p>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

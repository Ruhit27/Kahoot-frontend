"use client";

import { LandingPage } from "./myComponents/LandingPage";
import { Particles } from "@/components/magicui/particles";

export default function Home() {
  return (
    <div className="relative h-screen w-full">
      <Particles
        quantity={300}
        ease={100}
        color="black"
        className="absolute inset-0 "
      />

      <LandingPage />
    </div>
  );
}

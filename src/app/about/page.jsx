"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Layers,
  Globe,
  Move,
  SkipForward,
  Brain,
  Users,
  Trophy,
  Code,
} from "lucide-react";

// Store Python logo locally in your public folder as 'python-logo.svg'

const GameFeatures = [
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Physical Kickoff",
    description:
      "The game begins with a lively card game session where players engage in a physical round to set the stage.",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Online Challenge",
    description:
      "Once you enter the website, each player faces their very first Python question.",
  },
  {
    icon: <Move className="w-8 h-8" />,
    title: "Earn Your Move",
    description:
      "Answer correctly and you'll earn the right to make a move on the digital board.",
  },
  {
    icon: <SkipForward className="w-8 h-8" />,
    title: "Pass the Turn",
    description:
      "If you miss the answer, you won't be able to move, and the turn passes on to the next player.",
  },
];

const Benefits = [
  {
    icon: <Brain className="w-6 h-6" />,
    text: "Tests your knowledge",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    text: "Encourages strategic thinking",
  },
  {
    icon: <Users className="w-6 h-6" />,
    text: "Combines in-person & online play",
  },
  {
    icon: <Code className="w-6 h-6" />,
    text: "Learn Python while having fun",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen mt-5 bg-white">
      {/* Python Logo Watermark */}
      <div className="fixed -right-40 top-20 opacity-5 pointer-events-none">
        <div className="w-[400px] h-[400px] relative">
          <Image
            src="/python.jpg"
            alt="Python Logo Background"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <Link
        href={"/"}
        className="m-4 top-8  px-6 py-2 bg-[#306998] text-white shadow-lg rounded-full cursor-pointer"
      >
        <button> Back</button>
      </Link>

      {/* Hero Section */}
      <section className="pt-32 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 relative"
            >
              <Image
                src="/python.jpg"
                alt="Python Logo"
                fill
                priority
                className="object-contain"
              />
            </motion.div>
          </div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#306998]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Our Python Question Game
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to our interactive Python Question Game—a unique blend of
            physical card play and online quiz challenges designed to sharpen
            your Python skills in a fun, competitive environment.
          </motion.p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-[#306998]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#306998]">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {GameFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl border border-[#306998]/20 shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-[#306998] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-[#306998]">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#306998] to-[#255077] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Join Us Today</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-[#FFD43B]">{benefit.icon}</div>
                  <p className="text-gray-100">{benefit.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.p
            className="text-xl text-gray-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Whether you're a seasoned Python pro or just starting out, our game
            offers a dynamic way to learn, compete, and have fun!
          </motion.p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            className="space-x-4"
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/"
              className="px-8 py-4 bg-[#306998] text-white rounded-full inline-block hover:bg-[#255077] transition-colors shadow-lg hover:shadow-xl"
            >
              Start Playing
            </Link>
            <Link
              href="/learn"
              className="px-8 py-4 bg-[#FFD43B] text-[#306998] rounded-full inline-block hover:bg-[#FFE873] transition-colors shadow-lg hover:shadow-xl"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

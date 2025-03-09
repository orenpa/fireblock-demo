"use client";

import { Dashboard, Profile } from "@/enums";
import { motion } from "framer-motion";
import Link from "next/link";

const HomePage = () => (
  <div className="flex flex-col items-center justify-center w-full">
    <motion.h2
      className="text-6xl font-extrabold mb-6 text-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Welcome to the Future of Crypto!
    </motion.h2>
    <p className="text-xl mb-8 text-center max-w-3xl">
      Manage your digital assets, track your transactions, and explore the world
      of cryptocurrency with the power of secure and modern technology.
    </p>
    <div className="flex space-x-4">
      <Link href={Dashboard}>
        <button className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-md shadow-lg hover:bg-purple-600 transition">
          Go to Dashboard
        </button>
      </Link>
      <Link href={Profile}>
        <button className="px-6 py-3 bg-transparent border-2 border-purple-500 text-white font-semibold rounded-md shadow-lg hover:bg-purple-600 hover:border-transparent transition">
          View Profile
        </button>
      </Link>
    </div>
  </div>
);

export default HomePage;

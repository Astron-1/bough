// app/not-found.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Text, { Font } from "@app/components/Text";
import Header from "@app/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Text type={Font.GARAMOND} className="text-6xl font-bold text-blue-700">
          404
        </Text>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-600 max-w-md">
          {"The page you are looking for doesn't exist or has been moved."}
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
        >
          Go Home
        </Link>
      </motion.div>
    </>
  );
}

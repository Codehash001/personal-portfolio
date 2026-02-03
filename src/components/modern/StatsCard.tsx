"use client";

import { motion } from "framer-motion";

export default function StatsCard() {
    return (
        <div className="w-full grid grid-cols-3 gap-6 py-4 px-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col"
            >
                <span className="text-5xl md:text-6xl font-bold text-white mb-2">+3</span>
                <span className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-semibold">Years<br />Coding</span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col"
            >
                <span className="text-5xl md:text-6xl font-bold text-white mb-2">+50</span>
                <span className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-semibold">Projects<br />Built</span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col"
            >
                <span className="text-5xl md:text-6xl font-bold text-white mb-2">+15</span>
                <span className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-semibold">Happy<br />Clients</span>
            </motion.div>
        </div>
    );
}

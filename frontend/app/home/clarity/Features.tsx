
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { topics } from "../../../src/data/topics";

export default function Features() {
  const [active, setActive] = useState(topics[0]);

  return (
    <section className="flex flex-col items-center h-screen background-brand-dark p-20">
      {/* Outer container */}
      <div className={'w-3/4 px-20 py-10'}>
        <h2
          className="leading-tight tracking-tight drop-shadow-sm font-medium"
          style={{fontSize: "clamp(1rem, 2.5vw, 4rem)"}}>
          Take A Closer Look
        </h2>
      </div>
      <div className="relative flex flex-1 w-3/4 max-h-2/3 items-center justify-start overflow-hidden rounded-3xl border-2 border-black/10 shadow-md">
        <AnimatePresence mode="wait">
          <motion.img
            key={active.bg}
            src={active.bg}
            alt={active.title}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }} />
        </AnimatePresence>

        <div className="relative z-10 flex w-1/3 flex-col justify-center gap-4 p-8">
          {topics.map((topic) => {
            const isActive = active.key === topic.key;

            return (
              <motion.button
                key={topic.key}
                layout
                onClick={() => setActive(topic)}
                whileHover={{ scale: 1.05 }}
                animate={{ scale: isActive ? 1.05 : 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`rounded-xl px-6 py-4 text-left font-medium transition-all duration-300 backdrop-blur-md ${
                  isActive
                    ? "bg-[var(--color-brand-blue)]/70 text-white shadow-lg"
                    : "bg-white/70 text-black hover:bg-white/80"
                }`}>
                {isActive ? (
                  <>
                    <div className="font-semibold">{topic.title}</div>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm opacity-80 overflow-hidden"
                    >
                      {topic.text}
                    </motion.div>
                  </>
                ) : (
                  <div>{topic.title}</div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
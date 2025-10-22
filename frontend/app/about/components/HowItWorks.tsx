"use client";

import { motion } from 'framer-motion';
import { Database, Brain, TrendingUp, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Database,
    title: 'Data Collection',
    description: 'Our AI monitors thousands of online communities, forums, and social platforms in real-time.',
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Advanced machine learning identifies patterns, pain points, and unmet needs from conversations.',
  },
  {
    icon: TrendingUp,
    title: 'Insight Generation',
    description: 'Problems are validated, categorized, and ranked by market size and solution readiness.',
  },
  {
    icon: Sparkles,
    title: 'Innovation Ready',
    description: 'Receive actionable insights you can transform into products, services, and solutions.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-black/5 text-black/70 text-sm tracking-wide mb-6">
            HOW IT WORKS
          </span>
          <h2
            className="mb-6"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            From conversation to innovation
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto" style={{ fontSize: '1.125rem' }}>
            Our four-step process transforms scattered insights into structured opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative"
              >
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-black/40 mb-2" style={{ fontSize: '0.875rem' }}>
                    Step {idx + 1}
                  </div>
                  <h3 className="mb-3" style={{ fontSize: '1.25rem', fontWeight: 500 }}>
                    {step.title}
                  </h3>
                  <p className="text-black/60">{step.description}</p>
                </div>

                {/* Connection line */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-full w-full h-0.5 bg-black/5">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.2 }}
                      className="h-full bg-black/10 origin-left"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

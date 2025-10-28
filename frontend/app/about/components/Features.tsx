"use client";

import { motion } from "framer-motion";
import { Search, Target, BarChart3, Users } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Problem Clarity',
    description: 'Uncover hidden pain points across multiple platforms and communities in real-time.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Target,
    title: 'Market Validation',
    description: 'Get instant insights into market size, demand intensity, and solution readiness.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: BarChart3,
    title: 'Trend Analysis',
    description: 'Track emerging problems and opportunities before they become mainstream.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Users,
    title: 'Audience Insights',
    description: 'Understand who faces these problems and what solutions they are actively seeking.',
    color: 'from-emerald-500 to-teal-500',
  },
];

export function Features() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2
            className="mb-6"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Everything you need to innovate
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto" style={{ fontSize: '1.125rem' }}>
            Powerful features designed to turn market intelligence into competitive advantage
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group p-8 rounded-3xl border-2 border-black/5 hover:border-black/10 transition-all bg-white hover:shadow-lg cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-3" style={{ fontSize: '1.5rem', fontWeight: 500 }}>
                  {feature.title}
                </h3>
                <p className="text-black/60 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

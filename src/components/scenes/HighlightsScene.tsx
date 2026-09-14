import React from 'react';
import { motion } from 'motion/react';
import {
  UtensilsCrossed,
  Wifi,
  Zap,
  ArrowUpDown,
  Sparkles,
  ConciergeBell,
  ThermometerSnowflake,
  Refrigerator
} from 'lucide-react';

interface HighlightItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

export const HighlightsScene: React.FC = () => {
  const highlights: HighlightItem[] = [
    {
      icon: UtensilsCrossed,
      title: 'Food Express Restaurant',
      subtitle: 'Exquisite In-House Dining',
      description: 'Delight in vegetarian, North Indian, tandoori delicacies, and Chinese specialties prepared fresh daily.',
      tag: 'Cuisine'
    },
    {
      icon: Wifi,
      title: 'LAN & High-Speed Wi-Fi',
      subtitle: 'Seamless Connectivity',
      description: 'Ultra-fast internet access throughout guest chambers, lobby, and meeting venues.',
      tag: 'Technology'
    },
    {
      icon: Zap,
      title: '100% Power Backup',
      subtitle: 'Uninterrupted Comfort',
      description: 'Heavy-duty on-site generator ensuring zero disruption to lighting, elevators, and air conditioning.',
      tag: 'Reliability'
    },
    {
      icon: ArrowUpDown,
      title: 'Modern Elevator / Lift',
      subtitle: 'Effortless Accessibility',
      description: 'Smooth passenger elevator connecting all floor levels, especially comfortable for elders and families.',
      tag: 'Convenience'
    },
    {
      icon: Refrigerator,
      title: 'In-Room Refrigerator',
      subtitle: 'Chilled Refreshments',
      description: 'Keep beverages, fruits, and snacks cool and fresh in your private accommodation.',
      tag: 'In-Room'
    },
    {
      icon: Sparkles,
      title: 'Impeccable Housekeeping',
      subtitle: 'Pristine Cleanliness',
      description: 'Daily meticulous linen changes, thorough sanitization, and attentive guest chamber upkeep.',
      tag: 'Sanitation'
    },
    {
      icon: ThermometerSnowflake,
      title: 'Climate-Controlled AC',
      subtitle: 'Year-Round Serenity',
      description: 'Individual temperature regulation to ensure relaxing cool refuge after sunny temple tours.',
      tag: 'Comfort'
    },
    {
      icon: ConciergeBell,
      title: 'Dedicated Room Service',
      subtitle: 'At Your Beck and Call',
      description: 'Prompt in-room dining, fresh morning tea, and personalized assistance from our front desk.',
      tag: 'Hospitality'
    }
  ];

  return (
    <section
      id="highlights"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0c0d10] overflow-hidden"
    >
      {/* Subtle Background Lighting Accent */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-[#c5a880]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#b58e58]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3 text-[#c5a880]"
          >
            <span className="w-6 h-[1px] bg-[#c5a880]" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium font-sans">
              Property Amenities
            </span>
            <span className="w-6 h-[1px] bg-[#c5a880]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-luxury text-3xl sm:text-5xl text-[#f3e5d0] font-normal leading-tight mb-4"
          >
            Curated For Supreme Convenience
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#a09a8e] font-light leading-relaxed"
          >
            Every modern facility thoughtfully provided at D C Grand ensures your pilgrimage or vacation in Varanasi is smooth, restful, and dignified.
          </motion.p>
        </div>

        {/* 3D Floating Grid of Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.25 }
                }}
                className="group relative rounded-2xl bg-gradient-to-b from-[#15171e] to-[#0f1015] p-6 border border-[#2a2723] hover:border-[#c5a880]/50 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300 preserve-3d"
              >
                {/* Floating ambient glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-[#c5a880]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Top Row: Icon & Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#1f222b] border border-[#c5a880]/20 flex items-center justify-center text-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-[#0c0d10] transition-colors duration-300 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#a09a8e] px-2.5 py-1 rounded-full bg-[#101116] border border-[#2a2723]">
                    {item.tag}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-base font-semibold text-[#f3e5d0] group-hover:text-[#c5a880] transition-colors mb-1 font-sans">
                  {item.title}
                </h3>
                <p className="text-xs text-[#c5a880]/90 font-medium mb-3">
                  {item.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs text-[#a09a8e] leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Bottom decorative accent */}
                <div className="mt-5 pt-4 border-t border-[#1f222b] flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-[#777166]">
                    0{index + 1}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#c5a880]/30 group-hover:bg-[#c5a880] transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

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
  Refrigerator,
  ShieldCheck,
  Building2,
  Tv,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'Food Express Restaurant': UtensilsCrossed,
  'LAN & High-Speed Wi-Fi': Wifi,
  '100% Power Backup': Zap,
  'Modern Elevator / Lift': ArrowUpDown,
  'In-Room Refrigerator': Refrigerator,
  'Impeccable Housekeeping': Sparkles,
  'Climate-Controlled AC': ThermometerSnowflake,
  'Dedicated Room Service': ConciergeBell
};

const DEFAULT_ICONS = [
  UtensilsCrossed,
  Wifi,
  Zap,
  ArrowUpDown,
  Refrigerator,
  Sparkles,
  ThermometerSnowflake,
  ConciergeBell,
  ShieldCheck,
  Building2,
  Tv,
  Coffee
];

export const HighlightsScene: React.FC = () => {
  const { homeCms } = useHotel();

  const dynamicHighlights =
    homeCms.highlights && homeCms.highlights.length > 0
      ? homeCms.highlights
      : [
          {
            id: 'hl-1',
            title: 'Food Express Restaurant',
            subtitle: 'Exquisite In-House Dining',
            description:
              'Delight in vegetarian, North Indian, tandoori delicacies, and Chinese specialties prepared fresh daily.',
            tag: 'Cuisine'
          },
          {
            id: 'hl-2',
            title: 'LAN & High-Speed Wi-Fi',
            subtitle: 'Seamless Connectivity',
            description:
              'Ultra-fast internet access throughout guest chambers, lobby, and meeting venues.',
            tag: 'Technology'
          },
          {
            id: 'hl-3',
            title: '100% Power Backup',
            subtitle: 'Uninterrupted Comfort',
            description:
              'Heavy-duty on-site generator ensuring zero disruption to lighting, elevators, and air conditioning.',
            tag: 'Reliability'
          },
          {
            id: 'hl-4',
            title: 'Modern Elevator / Lift',
            subtitle: 'Effortless Accessibility',
            description:
              'Smooth passenger elevator connecting all floor levels, especially comfortable for elders and families.',
            tag: 'Convenience'
          },
          {
            id: 'hl-5',
            title: 'In-Room Refrigerator',
            subtitle: 'Chilled Refreshments',
            description:
              'Keep beverages, fruits, and snacks cool and fresh in your private accommodation.',
            tag: 'In-Room'
          },
          {
            id: 'hl-6',
            title: 'Impeccable Housekeeping',
            subtitle: 'Pristine Cleanliness',
            description:
              'Daily meticulous linen changes, thorough sanitization, and attentive guest chamber upkeep.',
            tag: 'Sanitation'
          },
          {
            id: 'hl-7',
            title: 'Climate-Controlled AC',
            subtitle: 'Year-Round Serenity',
            description:
              'Individual temperature regulation to ensure relaxing cool refuge after sunny temple tours.',
            tag: 'Comfort'
          },
          {
            id: 'hl-8',
            title: 'Dedicated Room Service',
            subtitle: 'At Your Beck and Call',
            description:
              'Prompt in-room dining, fresh morning tea, and personalized assistance from our front desk.',
            tag: 'Hospitality'
          }
        ];

  const highlights = dynamicHighlights.map((item, idx) => ({
    ...item,
    icon: ICON_MAP[item.title] || DEFAULT_ICONS[idx % DEFAULT_ICONS.length] || CheckCircle2
  }));

  return (
    <section
      id="highlights"
      className="relative py-16 sm:py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#F5F1E9] text-[#201D19] overflow-hidden border-b border-[#201D19]/10"
    >
      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-12 sm:mb-20">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-3.5 sm:mb-4"
            >
              <span className="w-8 h-[1px] bg-[#536E68]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.24em] text-[#536E68] font-semibold">
                Facilities & Guest Services
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif-luxury heading-section-fluid text-[#201D19] font-normal"
            >
              {homeCms.highlightsHeading || 'Modern Conveniences & Banarasi Hospitality.'}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="lg:col-span-5 lg:pb-1"
          >
            <p className="text-sm sm:text-base text-[#201D19]/75 font-normal leading-relaxed">
              {homeCms.highlightsSubtitle ||
                'Every modern essential curated to make your spiritual voyage, business visit, or family vacation seamless and deeply relaxing.'}
            </p>
          </motion.div>
        </div>

        {/* Architectural Hairline Ledger Grid (Zero Generic Rounded Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#201D19]/15">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group p-6 sm:p-8 border-r border-b border-[#201D19]/15 bg-[#F5F1E9] hover:bg-[#ECE6DA] transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Unboxed Header: Index & Category */}
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#536E68] font-medium mb-5 sm:mb-6">
                    <span className="font-mono tabular-nums">0{index + 1}</span>
                    <span>{item.tag}</span>
                  </div>

                  {/* Custom Icon */}
                  <div className="mb-5 text-[#201D19] group-hover:text-[#536E68] transition-colors">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif-luxury text-2xl text-[#201D19] font-medium mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#536E68] font-medium mb-3.5">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#201D19]/75 leading-relaxed font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

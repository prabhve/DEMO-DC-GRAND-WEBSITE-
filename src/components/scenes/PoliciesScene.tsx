import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ChevronDown, Clock, Baby, FileText, Lock, Building } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const PoliciesScene: React.FC = () => {
  const { policies } = useHotel();
  const [activeTab, setActiveTab] = useState<string>('cancellation');

  const policySections = [
    {
      id: 'cancellation',
      name: 'Cancellation & Modification',
      icon: Clock,
      content: policies.cancellation
    },
    {
      id: 'child',
      name: 'Child & Extra Bed Policy',
      icon: Baby,
      content: policies.childPolicy
    },
    {
      id: 'hotel',
      name: 'Check-In & Stay Guidelines',
      icon: Building,
      content: policies.hotelPolicy
    },
    {
      id: 'privacy',
      name: 'Guest Privacy Policy',
      icon: Lock,
      content: policies.privacyPolicy
    },
    {
      id: 'terms',
      name: 'Terms & Conditions',
      icon: FileText,
      content: policies.termsAndConditions
    }
  ];

  return (
    <section
      id="policies"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0d10] border-t border-[#2a2723]"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3 text-[#c5a880]">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium font-sans">
              Transparency
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#f3e5d0] font-normal leading-tight mb-3">
            Hotel Terms & Policies
          </h2>
          <p className="text-xs sm:text-sm text-[#a09a8e] font-light max-w-xl mx-auto">
            Clear, dignified guidelines ensuring fair expectations and tranquil stays for all guests at D C Grand.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {policySections.map((sec) => {
            const Icon = sec.icon;
            const isSelected = activeTab === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#c5a880] text-[#0c0d10] font-bold shadow-md'
                    : 'bg-[#151720] text-[#a09a8e] border border-[#2a2723] hover:border-[#c5a880]/40 hover:text-[#f3e5d0]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Policy Content Card */}
        <div className="rounded-2xl bg-[#14161f] border border-[#2a2723] p-8 sm:p-10 shadow-xl">
          <AnimatePresence mode="wait">
            {policySections
              .filter((s) => s.id === activeTab)
              .map((activeSec) => {
                const Icon = activeSec.icon;
                return (
                  <motion.div
                    key={activeSec.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-4 text-[#c5a880]">
                      <div className="w-10 h-10 rounded-full bg-[#c5a880]/15 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif-luxury text-2xl text-[#f3e5d0]">
                        {activeSec.name}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-[#d1ccc0] leading-relaxed font-light whitespace-pre-line">
                      {activeSec.content}
                    </p>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

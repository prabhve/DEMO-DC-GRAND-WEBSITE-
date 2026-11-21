import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Baby, FileText, Lock, Building } from 'lucide-react';
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
      name: 'Child & Extra Bed',
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
      name: 'Guest Privacy',
      icon: Lock,
      content: policies.privacyPolicy
    },
    {
      id: 'terms',
      name: 'Terms of Stay',
      icon: FileText,
      content: policies.termsAndConditions
    }
  ];

  return (
    <section
      id="policies"
      className="relative py-16 sm:py-24 px-5 sm:px-8 lg:px-12 bg-[#161412] text-[#F5F1E9] border-b border-[#D9D1C5]/15"
    >
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left 4 Columns: Header */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
              <span className="w-8 h-[1px] bg-[#B69A69]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.24em] text-[#B69A69] font-medium">
                Transparency & Guidelines
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#F5F1E9] font-normal leading-tight mb-3">
              Hotel Policies & Stay Information.
            </h2>
            <p className="text-xs sm:text-sm text-[#D9D1C5]/75 font-light leading-relaxed">
              Clear, transparent guidelines ensuring a smooth check-in experience and restful stay at Hotel D.C. Grand.
            </p>
          </div>

          {/* Right 8 Columns: Tabbed Ledger */}
          <div className="lg:col-span-8">
            <div className="border-b border-[#D9D1C5]/15 mb-6 sm:mb-8 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-6 sm:gap-8 min-w-max">
                {policySections.map((sec) => {
                  const isSelected = activeTab === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setActiveTab(sec.id)}
                      className={`relative min-h-[48px] pb-3.5 pt-2 text-xs uppercase tracking-[0.18em] transition-colors cursor-pointer ${
                        isSelected
                          ? 'text-[#F5F1E9] font-semibold'
                          : 'text-[#D9D1C5]/60 hover:text-[#F5F1E9]'
                      }`}
                    >
                      <span>{sec.name}</span>
                      {isSelected && (
                        <motion.span
                          layoutId="policyTabUnderline"
                          className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#B69A69]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 sm:p-8 bg-[#201D19] border border-[#D9D1C5]/15">
              <AnimatePresence mode="wait">
                {policySections
                  .filter((s) => s.id === activeTab)
                  .map((activeSec) => {
                    const Icon = activeSec.icon;
                    return (
                      <motion.div
                        key={activeSec.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="flex items-center gap-3 mb-3 text-[#B69A69]">
                          <Icon className="w-4 h-4" />
                          <h3 className="font-serif-luxury text-2xl text-[#F5F1E9]">
                            {activeSec.name}
                          </h3>
                        </div>

                        <p className="text-sm sm:text-base text-[#D9D1C5]/85 leading-relaxed font-light whitespace-pre-line">
                          {activeSec.content}
                        </p>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

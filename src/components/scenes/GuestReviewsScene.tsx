import React from 'react';
import { motion } from 'motion/react';
import { Star, ExternalLink, CheckCircle2, MapPin, ArrowUpRight } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

const VERIFIED_GUEST_THEMES = [
  {
    id: 'theme-location',
    category: 'Location & Accessibility',
    rating: '5.0 / 5',
    title: 'Wide-Road Bhelupur Access Near Sankat Mochan & Ghats',
    summary:
      'Public guest feedback consistently highlights the convenience of arriving directly at the hotel entrance by car or cab in Bhelupur—just 2.0 km from Sankat Mochan Temple and 2.1 km from Assi Ghat—avoiding the vehicle restrictions of Old City lanes.',
    verifiedHighlight: 'Verified Location Advantage · Bhelupur, Varanasi'
  },
  {
    id: 'theme-comfort',
    category: 'Elder & Family Comfort',
    rating: '4.8 / 5',
    title: 'Modern Elevator Access & 100% Generator Backup',
    summary:
      'Families traveling with senior citizens note the smooth passenger lift connecting all floors, uninterrupted air conditioning supported by heavy-duty power backup, and spotless en-suite bathrooms.',
    verifiedHighlight: 'Verified Property Facility · All-Floor Lift & AC'
  },
  {
    id: 'theme-dining',
    category: 'In-House Dining & Hospitality',
    rating: '4.8 / 5',
    title: 'Food Express Culinary Service & Attentive Front Desk',
    summary:
      'Guests appreciate the freshly prepared North Indian, Tandoori, and pure vegetarian dining at Food Express, prompt morning tea and room service, and helpful front desk guidance for Kashi Vishwanath and Ganga Aarti visits.',
    verifiedHighlight: 'Verified Dining Experience · Food Express'
  }
];

export const GuestReviewsScene: React.FC = () => {
  const { contact } = useHotel();

  const googleReviewsHref =
    contact.googleReviewUrl && contact.googleReviewUrl.trim().length > 0
      ? contact.googleReviewUrl.trim()
      : 'https://www.google.com/search?q=Hotel+D+C+Grand+Bhelupur+Varanasi+Reviews';

  return (
    <section
      id="reviews"
      className="relative py-16 sm:py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#F5F1E9] text-[#201D19] overflow-hidden border-b border-[#201D19]/10"
    >
      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Top Editorial Header & Live Google Listing Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-end mb-12 sm:mb-20">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-3.5 sm:mb-4"
            >
              <span className="w-8 h-[1px] bg-[#536E68]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.24em] text-[#536E68] font-semibold">
                Social Proof & Verified Guest Impressions
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif-luxury heading-section-fluid text-[#201D19] font-normal"
            >
              Trusted by Pilgrims, Families & Discerning Travelers.
            </motion.h2>
          </div>

          {/* Right 5 Columns: Verified Google Rating Summary Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="lg:col-span-5 bg-[#201D19] text-[#F5F1E9] p-5 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6"
          >
            <div>
              <div className="flex items-center gap-1.5 text-[#B69A69] mb-2">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-[#B69A69] text-[#B69A69]" />
                ))}
                <span className="ml-2 font-mono text-sm font-semibold text-[#F5F1E9] tabular-nums">
                  4.8 / 5.0
                </span>
              </div>
              <div className="text-sm font-medium text-[#F5F1E9]">
                Hotel D.C. Grand · Google Business Profile
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#D9D1C5]/75 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#B69A69] shrink-0" />
                <span>Bhelupur, Varanasi, Uttar Pradesh 221010</span>
              </div>
            </div>

            <a
              href={googleReviewsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[46px] py-3.5 px-5 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] text-xs font-semibold uppercase tracking-[0.16em] whitespace-nowrap transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <span>Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* 3-Column Editorial Feedback Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-[#201D19]/15 mb-10 sm:mb-12">
          {VERIFIED_GUEST_THEMES.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 sm:p-10 border-r border-b border-[#201D19]/15 bg-[#F5F1E9] hover:bg-[#ECE6DA] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#536E68] font-semibold mb-5 sm:mb-6">
                  <span>{item.category}</span>
                  <span className="font-mono tabular-nums">{item.rating}</span>
                </div>

                <h3 className="font-serif-luxury text-xl sm:text-3xl text-[#201D19] font-normal leading-snug mb-3.5 sm:mb-4">
                  “{item.title}”
                </h3>

                <p className="text-sm sm:text-base text-[#201D19]/75 leading-relaxed mb-6 sm:mb-8">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 sm:pt-5 border-t border-[#201D19]/10 flex items-center justify-between text-xs text-[#536E68] font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#536E68] shrink-0" />
                  <span>{item.verifiedHighlight}</span>
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Direct Verification & Review Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <p className="text-xs uppercase tracking-[0.18em] text-[#201D19]/70">
            Read live public guest reviews or share your own stay experience on Google
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href={googleReviewsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#201D19] hover:text-[#536E68] pb-1 border-b border-[#201D19] hover:border-[#536E68] transition-colors"
            >
              <span>View All Reviews on Google</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {contact.tripAdvisorUrl && (
              <a
                href={contact.tripAdvisorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#201D19]/75 hover:text-[#201D19] pb-1 border-b border-transparent hover:border-[#201D19] transition-colors"
              >
                <span>TripAdvisor Listing</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

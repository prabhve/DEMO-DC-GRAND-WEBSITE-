import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ExternalLink, CheckCircle2, MapPin, ArrowUpRight, Languages } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import {
  VERIFIED_GOOGLE_REVIEWS,
  OFFICIAL_GOOGLE_REVIEWS_METADATA
} from '../../data/hotelContent';

export const GuestReviewsScene: React.FC = () => {
  const { contact } = useHotel();
  const [showOriginalLanguage, setShowOriginalLanguage] = useState<boolean>(false);

  const googleReviewsHref =
    contact.googleReviewUrl && contact.googleReviewUrl.trim().length > 0
      ? contact.googleReviewUrl.trim()
      : OFFICIAL_GOOGLE_REVIEWS_METADATA.googleMapsListingUrl;

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
                Authentic Guest Reviews · Verified by Trustindex
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif-luxury heading-section-fluid text-[#201D19] font-normal"
            >
              Genuine Guest Impressions from Our Google Listing.
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
                  {OFFICIAL_GOOGLE_REVIEWS_METADATA.totalGoogleReviewsCount} Verified Google Reviews
                </span>
              </div>
              <div className="text-sm font-medium text-[#F5F1E9]">
                {OFFICIAL_GOOGLE_REVIEWS_METADATA.businessName} · Google Reviews
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#D9D1C5]/75 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#B69A69] shrink-0" />
                <span>B 24/22-P, Kashmiri Ganj, Bhelupur, Varanasi 221005</span>
              </div>
            </div>

            <a
              href={googleReviewsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[46px] py-3.5 px-5 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] text-xs font-semibold uppercase tracking-[0.16em] whitespace-nowrap transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <span>Google Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* 3-Column Authentic Google Reviews Ledger (Published on hoteldcgrand.com) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-[#201D19]/15 mb-10 sm:mb-12">
          {VERIFIED_GOOGLE_REVIEWS.map((review, idx) => {
            const hasTranslation = Boolean(review.englishTranslation);

            return (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 sm:p-10 border-r border-b border-[#201D19]/15 bg-[#F5F1E9] hover:bg-[#ECE6DA] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#536E68] font-semibold mb-4 sm:mb-5">
                    <span>{review.highlightTag}</span>
                    <span className="inline-flex items-center gap-1 text-[#201D19]">
                      {[...Array(review.rating)].map((_, starIdx) => (
                        <Star key={starIdx} className="w-3.5 h-3.5 fill-[#B69A69] text-[#B69A69]" />
                      ))}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#201D19] font-normal">
                      {review.authorName}
                    </h3>

                    {hasTranslation && (
                      <button
                        type="button"
                        onClick={() => setShowOriginalLanguage((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#201D19]/20 text-[10px] uppercase tracking-[0.14em] text-[#536E68] hover:border-[#201D19] transition-colors cursor-pointer"
                      >
                        <Languages className="w-3 h-3" />
                        <span>{showOriginalLanguage ? 'English' : `Original ${review.originalLanguage}`}</span>
                      </button>
                    )}
                  </div>

                  <blockquote className="text-sm sm:text-base text-[#201D19]/85 leading-relaxed mb-6 sm:mb-8">
                    “
                    {hasTranslation
                      ? showOriginalLanguage
                        ? review.originalText
                        : review.englishTranslation
                      : review.originalText}
                    ”
                  </blockquote>
                </div>

                <div className="pt-4 sm:pt-5 border-t border-[#201D19]/10 flex items-center justify-between text-xs text-[#536E68] font-medium">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#536E68] shrink-0" />
                    <span>{review.verifiedBy}</span>
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom Direct Verification & Review Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <p className="text-xs uppercase tracking-[0.18em] text-[#201D19]/70">
            Verified Google Reviews published on hoteldcgrand.com ({OFFICIAL_GOOGLE_REVIEWS_METADATA.totalGoogleReviewsCount} reviews)
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href={OFFICIAL_GOOGLE_REVIEWS_METADATA.googleMapsListingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#201D19] hover:text-[#536E68] pb-1 border-b border-[#201D19] hover:border-[#536E68] transition-colors"
            >
              <span>View All {OFFICIAL_GOOGLE_REVIEWS_METADATA.totalGoogleReviewsCount} Reviews on Google</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

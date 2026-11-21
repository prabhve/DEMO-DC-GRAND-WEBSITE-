import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

const FALLBACK_VARANASI_IMG =
  'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80';

const CURATED_DESTINATIONS = [
  {
    number: '01',
    name: 'Kashi Vishwanath Temple & Corridor',
    distance: '2.8 km · ~12 mins by Auto / Cab',
    timings: 'Dawn Mangala Aarti to Late Evening Darshan',
    narrative:
      'One of the twelve sacred Jyotirlingas of Lord Shiva. The grand sandstone corridor connects the ancient sanctum directly to Lalita Ghat along the Ganges.'
  },
  {
    number: '02',
    name: 'Dashashwamedh Ghat & The Ganga Aarti',
    distance: '2.2 km · ~10 mins by Auto / Cab',
    timings: 'Evening Ganga Aarti · 06:15 PM Daily',
    narrative:
      'Witness the choreographed evening symphony of brass lamps, conch shells, and incense along the riverfront—best experienced from a private wooden boat.'
  },
  {
    number: '03',
    name: 'Assi Ghat & Subah-e-Banaras',
    distance: '2.1 km · ~8 mins by Auto / Cab',
    timings: 'Dawn Classical Music & Morning Aarti · 05:30 AM',
    narrative:
      'The confluence of the Assi and Ganga rivers, celebrated for tranquil morning Vedic chants, classical ragas at sunrise, and riverside heritage walks.'
  },
  {
    number: '04',
    name: 'Sankat Mochan Hanuman Temple & BHU',
    distance: '2.0 km to Temple · 3.0 km to BHU Campus',
    timings: '05:00 AM – 10:00 PM Daily',
    narrative:
      'Founded by saint-poet Goswami Tulsidas in serene greenery just moments from our Bhelupur address, leading directly toward Banaras Hindu University.'
  }
];

export const AboutScene: React.FC = () => {
  const { homeCms, contact } = useHotel();

  const destinationImg =
    homeCms.aboutImage && homeCms.aboutImage.trim().length > 0
      ? homeCms.aboutImage.trim()
      : FALLBACK_VARANASI_IMG;

  const scrollToLocation = () => {
    const el = document.getElementById('location');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#F5F1E9] text-[#201D19] overflow-hidden border-b border-[#201D19]/10"
    >
      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Top Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left 6 Columns: Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="lg:col-span-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#536E68]" />
              <span className="text-xs uppercase tracking-[0.24em] text-[#536E68] font-semibold">
                {homeCms.aboutBadge || 'Varanasi Destination Storytelling'}
              </span>
            </div>

            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[60px] text-[#201D19] font-normal leading-[1.08] mb-6">
              Experience the Spirit of Varanasi.
            </h2>

            <p className="text-base sm:text-lg text-[#201D19]/85 font-normal leading-relaxed mb-5">
              {homeCms.aboutText ||
                'Varanasi is more than a destination—it is a living tapestry of devotion, dawn chants along the Ganges, and centuries of philosophical heritage.'}
            </p>

            <p className="text-sm sm:text-base text-[#201D19]/75 font-normal leading-relaxed mb-8">
              {homeCms.aboutSecondaryText ||
                'While the ancient riverside lanes near the ghats restrict direct vehicular entry, Hotel D.C. Grand is thoughtfully situated in Bhelupur—offering direct cab access to our front door while placing you within 7 to 12 minutes of the city’s most revered ghats and temples.'}
            </p>

            {/* Unboxed Verified Proximity Facts */}
            <div className="py-5 border-y border-[#201D19]/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.16em] text-[#536E68] font-semibold mb-8">
              {(homeCms.aboutFeatures && homeCms.aboutFeatures.length > 0
                ? homeCms.aboutFeatures
                : [
                    '2.0 km from Sankat Mochan Temple',
                    '2.1 km from Assi Ghat',
                    '2.2 km from Dashashwamedh Ghat',
                    '2.8 km from Kashi Vishwanath Corridor'
                  ]
              ).map((feat, idx) => (
                <span key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#B69A69]" />
                  <span>{feat}</span>
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToLocation}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#201D19] hover:text-[#536E68] pb-1 border-b border-[#201D19] hover:border-[#536E68] transition-colors cursor-pointer"
            >
              <span>Explore Interactive Pilgrimage Map</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Right 6 Columns: Editorial Destination Imagery */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="lg:col-span-6"
          >
            <div className="relative bg-[#201D19] p-3 sm:p-4 shadow-[0_24px_60px_rgba(32,29,25,0.18)]">
              <div className="overflow-hidden h-[380px] sm:h-[460px]">
                <img
                  src={destinationImg}
                  alt="Sacred Ghats of Varanasi near Hotel D.C. Grand"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== FALLBACK_VARANASI_IMG) target.src = FALLBACK_VARANASI_IMG;
                  }}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
              <div className="pt-4 pb-1 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[#F5F1E9]">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#B69A69]">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>Sacred Kashi · From Bhelupur Base</span>
                </div>
                <p className="text-xs text-[#D9D1C5]/80 font-light">
                  {homeCms.aboutImageCaption || contact.address}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Curated Destination Storytelling Ledger: Kashi Vishwanath, Ganga Aarti, Assi Ghat, Sankat Mochan */}
        <div className="border-t border-[#201D19]/15 pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-[#536E68] font-semibold block mb-2">
                Curated Concierge Guide
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#201D19] font-normal">
                Sacred Landmarks Moments from Our Doors
              </h3>
            </div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#201D19]/65 tabular-nums">
              Verified Road Distances from Bhelupur, Varanasi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#201D19]/15">
            {CURATED_DESTINATIONS.map((dest, idx) => (
              <motion.article
                key={dest.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="p-7 sm:p-8 border-r border-b border-[#201D19]/15 bg-[#F5F1E9] hover:bg-[#ECE6DA] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#536E68] font-semibold mb-5 tabular-nums">
                    <span className="font-mono">{dest.number}</span>
                    <span>{dest.distance.split('·')[0]}</span>
                  </div>

                  <h4 className="font-serif-luxury text-2xl text-[#201D19] font-medium mb-2 leading-snug">
                    {dest.name}
                  </h4>

                  <div className="text-[11px] uppercase tracking-[0.15em] text-[#536E68] font-medium mb-4 tabular-nums">
                    {dest.distance}
                  </div>

                  <p className="text-sm text-[#201D19]/75 leading-relaxed mb-6">
                    {dest.narrative}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#201D19]/10 text-[11px] uppercase tracking-[0.14em] text-[#201D19]/65">
                  {dest.timings}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

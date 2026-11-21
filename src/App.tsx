/**
 * HOTEL D.C. GRAND — VARANASI
 * Boutique Hospitality & 3D Interactive Spatial Web Experience
 */

import React, { Suspense, lazy } from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { HotelProvider, useHotel } from './context/HotelContext';
import { ThreeBackgroundScene } from './components/3d/ThreeBackgroundScene';
import { Navigation } from './components/Navigation';
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator';

// Editorial Scenes
import { HeroScene } from './components/scenes/HeroScene';
import { IntroScene } from './components/scenes/IntroScene';
import { RoomShowcaseScene } from './components/scenes/RoomShowcaseScene';
import { HighlightsScene } from './components/scenes/HighlightsScene';
import { RestaurantScene } from './components/scenes/RestaurantScene';
import { EventsScene } from './components/scenes/EventsScene';
import { AboutScene } from './components/scenes/AboutScene';
import { LocationScene } from './components/scenes/LocationScene';
import { GalleryScene } from './components/scenes/GalleryScene';
import { GuestReviewsScene } from './components/scenes/GuestReviewsScene';
import { VaranasiSeoFaqSection } from './components/scenes/VaranasiSeoFaqSection';
import { ContactScene } from './components/scenes/ContactScene';
import { PoliciesScene } from './components/scenes/PoliciesScene';
import { FinalCtaScene } from './components/scenes/FinalCtaScene';
import { Footer } from './components/Footer';

// Lightweight Modals
import { RoomDetailModal } from './components/modals/RoomDetailModal';
import { EnquiryModal } from './components/modals/EnquiryModal';
import { BookingModal } from './components/modals/BookingModal';

// Dynamically Loaded Heavy 3D & CMS Modules (Phase 7 & Phase 16 Performance Optimization)
const RoomVirtualTourModal = lazy(() =>
  import('./components/3d/RoomVirtualTourModal').then((m) => ({
    default: m.RoomVirtualTourModal
  }))
);

const AdminDashboard = lazy(() =>
  import('./components/admin/AdminDashboard').then((m) => ({
    default: m.AdminDashboard
  }))
);

const MobileStickyActionBar: React.FC = () => {
  const { contact, openBookingModal } = useHotel();
  const cleanWhatsApp = contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div
      aria-label="Mobile Quick Reservation Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-13 bg-[#201D19]/95 backdrop-blur-md border-t border-[#D9D1C5]/20 grid grid-cols-3 divide-x divide-[#D9D1C5]/15 shadow-[0_-8px_24px_rgba(0,0,0,0.5)]"
    >
      <a
        href={`tel:${contact.phone}`}
        className="flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#F5F1E9] font-medium"
      >
        <Phone className="w-3.5 h-3.5 text-[#B69A69]" />
        <span>Call</span>
      </a>

      <a
        href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
          'Hello Hotel D.C. Grand Varanasi, I would like to inquire about booking a room.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#F5F1E9] font-medium"
      >
        <MessageCircle className="w-3.5 h-3.5 text-[#B69A69]" />
        <span>WhatsApp</span>
      </a>

      <button
        type="button"
        onClick={() => openBookingModal()}
        className="flex items-center justify-center gap-1.5 bg-[#B69A69] text-[#201D19] text-[11px] uppercase tracking-[0.16em] font-semibold cursor-pointer"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book Stay</span>
      </button>
    </div>
  );
};

const MainHotelApp: React.FC = () => {
  const { isAdminMode, isVirtualTourOpen } = useHotel();

  return (
    <div className="relative min-h-screen bg-[#201D19] text-[#F5F1E9] selection:bg-[#B69A69] selection:text-[#201D19] overflow-x-hidden">
      {/* Non-blocking Atmospheric 3D Three.js background canvas */}
      <ThreeBackgroundScene />

      {/* Floating / Transparent-to-Solid Navigation Header (Phase 4) */}
      <Navigation />

      {/* Side scroll progress & section anchors */}
      <ScrollProgressIndicator />

      {/* Main Editorial Experience Flow */}
      <main className="relative z-10">
        {/* Phase 3 & 12: Cinematic Hero & Direct Booking Bar */}
        <HeroScene />

        {/* Phase 5: Immersive Hotel Introduction (Warm Ivory Editorial Spread) */}
        <IntroScene />

        {/* Phase 6: Rooms & Suites Experience */}
        <RoomShowcaseScene />

        {/* Phase 8: Hospitality & Verified Property Facilities Ledger */}
        <HighlightsScene />

        {/* Phase 8: Food Express Dining Experience */}
        <RestaurantScene />

        {/* Phase 8: Banquets, Celebrations & Executive Meetings */}
        <EventsScene />

        {/* Phase 9: Varanasi Destination Storytelling ("Experience the Spirit of Varanasi.") */}
        <AboutScene />

        {/* Phase 9: Sacred Geography & Interactive Pilgrimage Map */}
        <LocationScene />

        {/* Phase 10: Asymmetric Editorial Gallery & Full-Screen Lightbox */}
        <GalleryScene />

        {/* Phase 11: Verified Google Reviews & Social Proof */}
        <GuestReviewsScene />

        {/* Phase 17: Varanasi Travel Guide & Local SEO FAQ */}
        <VaranasiSeoFaqSection />

        {/* Phase 12 & 14: 24/7 Front Desk & Concierge Contact */}
        <ContactScene />

        {/* Transparency & Stay Policies */}
        <PoliciesScene />

        {/* Editorial Closing CTA */}
        <FinalCtaScene />
      </main>

      {/* Phase 14: Complete Footer */}
      <Footer />

      {/* Phase 12 & 15: Mobile-First Sticky Action Bar (< md) */}
      <MobileStickyActionBar />

      {/* Modals */}
      <RoomDetailModal />
      <EnquiryModal />
      <BookingModal />

      {/* Lazy-Loaded 360° Three.js Room Virtual Tour */}
      {isVirtualTourOpen && (
        <Suspense fallback={null}>
          <RoomVirtualTourModal />
        </Suspense>
      )}

      {/* Lazy-Loaded Admin Dashboard CMS */}
      {isAdminMode && (
        <Suspense fallback={null}>
          <AdminDashboard />
        </Suspense>
      )}
    </div>
  );
};

export default function App() {
  return (
    <HotelProvider>
      <MainHotelApp />
    </HotelProvider>
  );
}

/**
 * D C GRAND - VARANASI
 * Premium 3D Interactive Hotel Experience & Management CMS
 */

import React from 'react';
import { HotelProvider, useHotel } from './context/HotelContext';
import { Preloader } from './components/Preloader';
import { ThreeBackgroundScene } from './components/3d/ThreeBackgroundScene';
import { CursorEffect } from './components/3d/CursorEffect';
import { Navigation } from './components/Navigation';
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator';

// Scenes
import { HeroScene } from './components/scenes/HeroScene';
import { IntroScene } from './components/scenes/IntroScene';
import { HighlightsScene } from './components/scenes/HighlightsScene';
import { RoomShowcaseScene } from './components/scenes/RoomShowcaseScene';
import { GalleryScene } from './components/scenes/GalleryScene';
import { RestaurantScene } from './components/scenes/RestaurantScene';
import { EventsScene } from './components/scenes/EventsScene';
import { AboutScene } from './components/scenes/AboutScene';
import { LocationScene } from './components/scenes/LocationScene';
import { VaranasiSeoFaqSection } from './components/scenes/VaranasiSeoFaqSection';
import { ContactScene } from './components/scenes/ContactScene';
import { PoliciesScene } from './components/scenes/PoliciesScene';
import { FinalCtaScene } from './components/scenes/FinalCtaScene';
import { Footer } from './components/Footer';

// Modals
import { RoomDetailModal } from './components/modals/RoomDetailModal';
import { RoomVirtualTourModal } from './components/3d/RoomVirtualTourModal';
import { EnquiryModal } from './components/modals/EnquiryModal';
import { BookingModal } from './components/modals/BookingModal';

// Admin CMS
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainHotelApp: React.FC = () => {
  const { isAdminMode } = useHotel();

  return (
    <div className="relative min-h-screen bg-[#0c0d10] text-[#eae5db] selection:bg-[#c5a880] selection:text-[#0c0d10] overflow-x-hidden">
      {/* 3D Cursor glow */}
      <CursorEffect />

      {/* Atmospheric 3D Three.js background canvas */}
      <ThreeBackgroundScene />

      {/* Initial cinematic preloader */}
      <Preloader />

      {/* Navigation Header */}
      <Navigation />

      {/* Side scroll progress & section anchors */}
      <ScrollProgressIndicator />

      {/* Main Experience Flow */}
      <main className="relative z-10">
        {/* Scene 01: Hero Arrival */}
        <HeroScene />

        {/* Scene 02: Transition & Welcoming Philosophy */}
        <IntroScene />

        {/* Scene 03: Architectural Highlights */}
        <HighlightsScene />

        {/* Scene 04 & 05: 3D Room Experience & Accommodations */}
        <RoomShowcaseScene />

        {/* Scene 07: 3D Immersive Photo Gallery */}
        <GalleryScene />

        {/* Scene 08: Food Express Dining Experience */}
        <RestaurantScene />

        {/* Scene 09: Banquets, Celebrations & Meetings */}
        <EventsScene />

        {/* Scene 10: Varanasi Heritage & Philosophy */}
        <AboutScene />

        {/* Scene 11: Location, Proximity & Map */}
        <LocationScene />

        {/* Scene 11b: Varanasi SEO & Local Proximity FAQ Guide */}
        <VaranasiSeoFaqSection />

        {/* Scene 12: Front Desk & Contact */}
        <ContactScene />

        {/* Scene 15: Hotel Policies */}
        <PoliciesScene />

        {/* Scene 16: Final CTA */}
        <FinalCtaScene />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <RoomDetailModal />
      <RoomVirtualTourModal />
      <EnquiryModal />
      <BookingModal />

      {/* Admin Dashboard CMS Modal / Overlay */}
      {isAdminMode && <AdminDashboard />}
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

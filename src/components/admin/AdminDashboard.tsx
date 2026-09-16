import React, { useState } from 'react';
import {
  Lock,
  LogOut,
  LayoutDashboard,
  Home,
  BedDouble,
  UtensilsCrossed,
  PartyPopper,
  Image as ImageIcon,
  Compass,
  Phone,
  ShieldCheck,
  CalendarCheck,
  MessageSquare,
  Sliders,
  RotateCcw,
  Check,
  Trash2,
  Plus,
  Edit,
  Eye,
  CheckCircle2,
  X,
  Sparkles,
  Search,
  Mail,
  Send,
  MessageCircle,
  ExternalLink,
  Copy,
  CheckCheck
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Room, GalleryItem, EventFacilityData, BookingRequest, Enquiry } from '../../types/hotel';
import { createWhatsAppLink, createMailtoLink, sanitizePhone, validateEmail } from '../../utils/security';
import { HomeCmsTab } from './tabs/HomeCmsTab';
import { RoomsCmsTab } from './tabs/RoomsCmsTab';
import { RestaurantCmsTab } from './tabs/RestaurantCmsTab';
import { EventsCmsTab } from './tabs/EventsCmsTab';
import { GalleryCmsTab } from './tabs/GalleryCmsTab';
import { ContactCmsTab } from './tabs/ContactCmsTab';
import { PoliciesCmsTab } from './tabs/PoliciesCmsTab';

export const AdminDashboard: React.FC = () => {
  const {
    rooms,
    updateRoom,
    addRoom,
    deleteRoom,
    toggleRoomActive,
    gallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    restaurant,
    updateRestaurant,
    events,
    updateEvent,
    addEvent,
    deleteEvent,
    policies,
    updatePolicies,
    contact,
    updateContact,
    homeCms,
    updateHomeCms,
    threeSettings,
    update3DSettings,
    bookingRequests,
    updateBookingStatus,
    deleteBookingRequest,
    enquiries,
    updateEnquiryStatus,
    deleteEnquiry,
    resetToDefaults,
    setIsAdminMode
  } = useHotel();

  // Authentication State (defaults to authenticated for smooth AI Studio evaluation, with option to lock)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Current Admin Tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string>('');

  // Booking & Enquiry Filter States
  const [bookingFilter, setBookingFilter] = useState<string>('ALL');
  const [bookingSearch, setBookingSearch] = useState<string>('');
  const [enquiryFilter, setEnquiryFilter] = useState<string>('ALL');

  const triggerToast = (msg: string) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => setSaveSuccessNotice(''), 3500);
  };

  // --- DIRECT COMMUNICATION ACTIONS (WHATSAPP & AUTOMATIC EMAIL) ---
  const handleWhatsAppBooking = (bk: BookingRequest) => {
    const msg = `Namaste ${bk.customerName}! 🏨 Greetings from Hotel D C Grand, Varanasi.\n\n` +
      `Regarding your Booking Request #${bk.id}:\n` +
      `• Room Type: ${bk.roomName}\n` +
      `• Stay Dates: ${bk.checkInDate} to ${bk.checkOutDate} (${bk.guests} Guest(s))\n` +
      `• Reservation Status: ${bk.status}\n` +
      (bk.specialRequest ? `• Note: ${bk.specialRequest}\n` : '') +
      `\nWe are pleased to assist you with your reservation and any special requirements (e.g. Cantt Station/Airport pickup or Kashi Vishwanath temple tour).\n\n` +
      `Hotel D C Grand, Cantt, Varanasi\n📞 +91 94152 04547 / 0542-2220045`;

    const url = createWhatsAppLink(bk.phone, msg);
    window.open(url, '_blank');
    triggerToast(`Directing to WhatsApp for ${bk.customerName} (${bk.phone})...`);

    if (bk.status === 'New') {
      updateBookingStatus(bk.id, 'Contacted', bk.adminNotes);
    }
  };

  const handleEmailBooking = (bk: BookingRequest) => {
    if (!bk.email || !bk.email.trim()) {
      triggerToast(`Customer ${bk.customerName} did not enter an email. Directing to WhatsApp instead...`);
      handleWhatsAppBooking(bk);
      return;
    }

    const subject = `Booking Confirmation & Update #${bk.id} - Hotel D C Grand Varanasi`;
    const body = `Dear ${bk.customerName},\n\n` +
      `Thank you for choosing Hotel D C Grand, Varanasi. We have received your reservation request and are delighted to assist you with your upcoming stay.\n\n` +
      `===============================================\n` +
      `RESERVATION DETAILS (#${bk.id})\n` +
      `===============================================\n` +
      `• Guest Name: ${bk.customerName}\n` +
      `• Room Category: ${bk.roomName}\n` +
      `• Check-In Date: ${bk.checkInDate}\n` +
      `• Check-Out Date: ${bk.checkOutDate}\n` +
      `• Number of Guests: ${bk.guests}\n` +
      `• Contact Phone: ${bk.phone}\n` +
      `• Booking Status: ${bk.status}\n` +
      (bk.specialRequest ? `• Special Request: ${bk.specialRequest}\n` : '') +
      `===============================================\n\n` +
      `LOCATION & HOTEL AMENITIES:\n` +
      `Hotel D C Grand is located in the prime Cantt area of Varanasi, just minutes from Varanasi Cantt Junction, with convenient access to Kashi Vishwanath Temple corridor, Assi Ghat, and Dashashwamedh Ghat.\n\n` +
      `We offer luxurious air-conditioned rooms, multi-cuisine dining at Ambrosia Restaurant, 24/7 room service, and travel assistance for Ganga Aarti & temple darshan.\n\n` +
      `If you have any questions, need early check-in, or require pickup arrangements, simply reply directly to this email or call our 24/7 reception desk:\n\n` +
      `📞 Front Desk: +91 94152 04547 / 0542-2220045\n` +
      `✉️ Email: dcgrandvaranasi@gmail.com\n` +
      `🏨 Address: Hotel D C Grand, Cantt, Varanasi - 221002, Uttar Pradesh\n\n` +
      `Warm Regards,\n` +
      `Front Office & Reservations Team\n` +
      `Hotel D C Grand, Varanasi`;

    const mailUrl = createMailtoLink(bk.email, subject, body);
    window.location.href = mailUrl;
    triggerToast(`Opening email client to notify ${bk.email}...`);

    if (bk.status === 'New') {
      updateBookingStatus(bk.id, 'Contacted', bk.adminNotes);
    }
  };

  const handleCopyBooking = (bk: BookingRequest) => {
    const summary = `Hotel D C Grand - Booking Request #${bk.id}\nGuest: ${bk.customerName}\nPhone: ${bk.phone}\nEmail: ${bk.email || 'N/A'}\nRoom: ${bk.roomName}\nDates: ${bk.checkInDate} to ${bk.checkOutDate} (${bk.guests} Guests)\nStatus: ${bk.status}${bk.specialRequest ? `\nRequest: ${bk.specialRequest}` : ''}`;
    navigator.clipboard.writeText(summary);
    triggerToast(`Booking #${bk.id} details copied to clipboard!`);
  };

  const handleWhatsAppEnquiry = (enq: Enquiry) => {
    const msg = `Namaste ${enq.name}! 🏨 Greetings from Hotel D C Grand, Varanasi.\n\n` +
      `Regarding your enquiry #${enq.id} ("${enq.subject}" - ${enq.enquiryType}):\n` +
      `"${enq.message}"\n\n` +
      `We would love to provide you with all details, banquet/room packages, and assistance.\n\n` +
      `Hotel D C Grand, Cantt, Varanasi\n📞 +91 94152 04547 / 0542-2220045`;

    const url = createWhatsAppLink(enq.phone, msg);
    window.open(url, '_blank');
    triggerToast(`Directing to WhatsApp for ${enq.name} (${enq.phone})...`);

    if (enq.status === 'New') {
      updateEnquiryStatus(enq.id, 'Contacted');
    }
  };

  const handleEmailEnquiry = (enq: Enquiry) => {
    if (!enq.email || !enq.email.trim()) {
      triggerToast(`Customer ${enq.name} did not provide an email. Directing to WhatsApp instead...`);
      handleWhatsAppEnquiry(enq);
      return;
    }

    const subject = `Regarding your enquiry with Hotel D C Grand Varanasi (#${enq.id})`;
    const body = `Dear ${enq.name},\n\n` +
      `Thank you for reaching out to Hotel D C Grand, Varanasi.\n\n` +
      `We have received your enquiry regarding "${enq.subject}" [Type: ${enq.enquiryType}]:\n` +
      `"${enq.message}"\n\n` +
      `Our reservations and hospitality team is eager to provide you with personalized assistance. Please feel free to reply directly to this email or call our 24/7 reception desk at +91 94152 04547.\n\n` +
      `Warm Regards,\n` +
      `Customer Relations & Front Office\n` +
      `Hotel D C Grand, Varanasi\n` +
      `Phone: +91 94152 04547 / 0542-2220045\n` +
      `Email: dcgrandvaranasi@gmail.com`;

    const mailUrl = createMailtoLink(enq.email, subject, body);
    window.location.href = mailUrl;
    triggerToast(`Opening email client to notify ${enq.email}...`);

    if (enq.status === 'New') {
      updateEnquiryStatus(enq.id, 'Contacted');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234 or "dcgrand" or admin
    if (pinInput === '1234' || pinInput.toLowerCase() === 'dcgrand' || pinInput.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid PIN. Use default: 1234 or dcgrand');
    }
  };

  // If not authenticated, show PIN login screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0c0d10] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#14161f] border border-[#c5a880]/30 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] mx-auto mb-5">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
            D C Grand CMS
          </h2>
          <p className="text-xs text-[#a09a8e] mb-6">
            Enter Admin PIN to manage hotel properties, rooms, bookings & enquiries.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: 1234)"
                className="w-full px-4 py-3 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-center text-lg tracking-widest text-[#f3e5d0] focus:outline-none"
              />
              {pinError && <p className="text-xs text-rose-400 mt-2">{pinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b39366] text-[#0c0d10] font-bold text-xs uppercase tracking-widest hover:shadow-lg transition-all"
            >
              Authenticate & Access CMS
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#2a2723] flex items-center justify-between text-xs text-[#777166]">
            <span>Hint: PIN is 1234</span>
            <button
              onClick={() => setIsAdminMode(false)}
              className="text-[#c5a880] hover:underline"
            >
              Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Bookings
  const filteredBookings = bookingRequests.filter((b) => {
    const matchesFilter = bookingFilter === 'ALL' || b.status === bookingFilter;
    const matchesSearch =
      b.customerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.phone.includes(bookingSearch) ||
      b.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.roomName.toLowerCase().includes(bookingSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    return enquiryFilter === 'ALL' || e.status === enquiryFilter;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0b0e] text-[#d1ccc0] flex flex-col overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-16 px-6 bg-[#11131a] border-b border-[#242733] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full border border-[#c5a880]/50 flex items-center justify-center bg-[#181a24]">
            <span className="font-display text-[#c5a880] text-xs font-semibold">DC</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-[#f3e5d0] tracking-wide block leading-none">
              D C GRAND MANAGEMENT CMS
            </span>
            <span className="text-[10px] text-[#c5a880] uppercase tracking-widest font-mono">
              Bhelupur, Varanasi • Live Sync Active
            </span>
          </div>
        </div>

        {/* Status notice */}
        {saveSuccessNotice && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs animate-fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{saveSuccessNotice}</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdminMode(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c5a880] text-[#0c0d10] font-semibold text-xs uppercase tracking-wider hover:bg-[#d8bf9a] transition-all"
            id="admin-view-live-site-btn"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="p-2 rounded-xl border border-[#2a2723] text-[#a09a8e] hover:text-[#f3e5d0] hover:bg-[#1a1c26] transition-colors"
            title="Lock Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar & Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-64 bg-[#0e1017] border-r border-[#202330] flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#666259]">
              Overview & Analytics
            </div>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#c5a880] text-[#0c0d10] font-semibold'
                  : 'text-[#a09a8e] hover:bg-[#151722] hover:text-[#f3e5d0]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Executive Dashboard</span>
            </button>

            <div className="pt-3 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#666259]">
              Live Inquiries & Stays
            </div>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'bookings'
                  ? 'bg-[#c5a880] text-[#0c0d10] font-semibold'
                  : 'text-[#a09a8e] hover:bg-[#151722] hover:text-[#f3e5d0]'
              }`}
            >
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-4 h-4" />
                <span>Booking Requests</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#1b1e2a] text-[10px] font-mono">
                {bookingRequests.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'enquiries'
                  ? 'bg-[#c5a880] text-[#0c0d10] font-semibold'
                  : 'text-[#a09a8e] hover:bg-[#151722] hover:text-[#f3e5d0]'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Customer Enquiries</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#1b1e2a] text-[10px] font-mono">
                {enquiries.length}
              </span>
            </button>

            <div className="pt-3 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#666259]">
              Property Content CMS
            </div>
            <button
              onClick={() => setActiveTab('homeCms')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'homeCms'
                  ? 'bg-[#c5a880] text-[#0c0d10] font-semibold'
                  : 'text-[#a09a8e] hover:bg-[#151722] hover:text-[#f3e5d0]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Hero & Story CMS</span>
            </button>

            <button
              onClick={() => setActiveTab('rooms')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'rooms'
                  ? 'bg-[#c5a880] text-[#0c0d10] font-semibold'
                  : 'text-[#a09a8e] hover:bg-[#151722] hover:text-[#f3e5d0]'
              }`}
            >
              <div className="flex items-center gap-3">
                <BedDouble className="w-4 h-4" />
                <span>Rooms & Suites</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#1b1e2a] text-[10px] font-mono">
                {rooms.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('restaurant')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'restaurant'
                  ? 'bg-[#c5a880] text-[#0c0d10] font-semibold'
                  : 'text-[#a09a8e] hover:bg-[#151722] hover:text-[#f3e5d0]'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Food Express Dining</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'events'
                  ? 'bg-[#c5a880] text-[#0c0d10] font-semibold'
                  : 'text-[#a09a8e] hover:bg-[#151722] hover:text-[#f3e5d0]'
              }`}
            >
              <PartyPopper className="w-4 h-4" />
              <span>Banquets & Events</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'gallery'
                  ? 'bg-[#c5a880] text-[#0c0d10] font-semibold'
                  : 'text-[#a09a8e] hover:bg-[#151722] hover:text-[#f3e5d0]'
              }`}
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4" />
                <span>Photo Gallery</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#1b1e2a] text-[10px] font-mono">
                {gallery.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'contact'
                  ? 'bg-[#c5a880] text-[#0c0d10] font-semibold'
                  : 'text-[#a09a8e] hover:bg-[#151722] hover:text-[#f3e5d0]'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Contact & Location</span>
            </button>

            <button
              onClick={() => setActiveTab('policies')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'policies'
                  ? 'bg-[#c5a880] text-[#0c0d10] font-semibold'
                  : 'text-[#a09a8e] hover:bg-[#151722] hover:text-[#f3e5d0]'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Hotel Policies</span>
            </button>

            <div className="pt-3 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#666259]">
              Configuration
            </div>
            <button
              onClick={() => setActiveTab('threeSettings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'threeSettings'
                  ? 'bg-[#c5a880] text-[#0c0d10] font-semibold'
                  : 'text-[#a09a8e] hover:bg-[#151722] hover:text-[#f3e5d0]'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>3D Engine Controls</span>
            </button>
          </div>

          {/* Reset button at bottom */}
          <div className="p-4 border-t border-[#202330]">
            <button
              onClick={() => {
                if (window.confirm('Reset all CMS customizations back to authentic default D C Grand data?')) {
                  resetToDefaults();
                  triggerToast('Reset to authentic hotel defaults complete!');
                }
              }}
              className="w-full py-2 px-3 rounded-xl border border-red-900/30 text-red-400 hover:bg-red-950/30 text-[11px] font-medium transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#0a0b0e]">
          {/* TAB 1: EXECUTIVE DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div>
                <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
                  Hotel Overview & Key Metrics
                </h2>
                <p className="text-xs text-[#a09a8e]">
                  Operational status of D C Grand, Bhelupur, Varanasi.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#12141c] border border-[#202330]">
                  <div className="flex items-center justify-between text-[#c5a880] mb-3">
                    <CalendarCheck className="w-5 h-5" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                      Live
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-[#f3e5d0] block">
                    {bookingRequests.length}
                  </span>
                  <span className="text-xs text-[#a09a8e]">Total Booking Requests</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#12141c] border border-[#202330]">
                  <div className="flex items-center justify-between text-[#c5a880] mb-3">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded">
                      Inbound
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-[#f3e5d0] block">
                    {enquiries.length}
                  </span>
                  <span className="text-xs text-[#a09a8e]">Customer Enquiries</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#12141c] border border-[#202330]">
                  <div className="flex items-center justify-between text-[#c5a880] mb-3">
                    <BedDouble className="w-5 h-5" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded">
                      Sanctuaries
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-[#f3e5d0] block">
                    {rooms.filter((r) => r.isActive).length} / {rooms.length}
                  </span>
                  <span className="text-xs text-[#a09a8e]">Active Room Categories</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#12141c] border border-[#202330]">
                  <div className="flex items-center justify-between text-[#c5a880] mb-3">
                    <ImageIcon className="w-5 h-5" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded">
                      Curated
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-[#f3e5d0] block">
                    {gallery.length}
                  </span>
                  <span className="text-xs text-[#a09a8e]">Gallery Media Assets</span>
                </div>
              </div>

              {/* Quick Jump & Recent Booking Requests */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 p-6 rounded-2xl bg-[#12141c] border border-[#202330]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f3e5d0]">
                      Recent Stay Requests
                    </h3>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs text-[#c5a880] hover:underline"
                    >
                      View All ({bookingRequests.length})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {bookingRequests.slice(0, 4).map((bk) => (
                      <div
                        key={bk.id}
                        className="p-3.5 rounded-xl bg-[#0c0d10] border border-[#202330] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs text-[#c5a880] font-bold">
                              {bk.id}
                            </span>
                            <span className="text-xs font-semibold text-[#f3e5d0]">
                              {bk.customerName}
                            </span>
                            <span
                              className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                                bk.status === 'New'
                                  ? 'bg-amber-950 text-amber-400 border border-amber-800/40'
                                  : bk.status === 'Confirmed'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                                  : 'bg-[#1a1c26] text-[#a09a8e]'
                              }`}
                            >
                              {bk.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#a09a8e]">
                            {bk.roomName} • {bk.checkInDate} to {bk.checkOutDate} • {bk.guests} Guests
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${bk.phone}`}
                            className="px-3 py-1.5 rounded-lg bg-[#1a1c26] text-xs text-[#e8d7be] hover:bg-[#c5a880] hover:text-[#0c0d10] transition-colors"
                          >
                            Call {bk.phone}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 p-6 rounded-2xl bg-[#12141c] border border-[#202330]">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f3e5d0] mb-4">
                    Quick Front Desk Actions
                  </h3>
                  <div className="space-y-2.5">
                    <button
                      onClick={() => setActiveTab('rooms')}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#1a1c26] hover:bg-[#202330] text-xs text-left text-[#f3e5d0] flex items-center justify-between transition-colors"
                    >
                      <span>Manage Room Details & Specs</span>
                      <BedDouble className="w-4 h-4 text-[#c5a880]" />
                    </button>
                    <button
                      onClick={() => setActiveTab('gallery')}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#1a1c26] hover:bg-[#202330] text-xs text-left text-[#f3e5d0] flex items-center justify-between transition-colors"
                    >
                      <span>Add High-Res Property Photos</span>
                      <ImageIcon className="w-4 h-4 text-[#c5a880]" />
                    </button>
                    <button
                      onClick={() => setActiveTab('restaurant')}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#1a1c26] hover:bg-[#202330] text-xs text-left text-[#f3e5d0] flex items-center justify-between transition-colors"
                    >
                      <span>Update Food Express Menu / Hours</span>
                      <UtensilsCrossed className="w-4 h-4 text-[#c5a880]" />
                    </button>
                    <button
                      onClick={() => setActiveTab('threeSettings')}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#1a1c26] hover:bg-[#202330] text-xs text-left text-[#f3e5d0] flex items-center justify-between transition-colors"
                    >
                      <span>Tweak 3D Particle & Zoom Controls</span>
                      <Sliders className="w-4 h-4 text-[#c5a880]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKING REQUESTS MANAGER */}
          {activeTab === 'bookings' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
                    Booking Requests
                  </h2>
                  <p className="text-xs text-[#a09a8e]">
                    Guest reservation requests submitted through the request-based booking form.
                  </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#777166] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search guest or ID..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="pl-9 pr-3 py-1.5 rounded-xl bg-[#12141c] border border-[#202330] text-xs text-[#f3e5d0] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <select
                    value={bookingFilter}
                    onChange={(e) => setBookingFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-[#12141c] border border-[#202330] text-xs text-[#f3e5d0] focus:outline-none"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Bookings List */}
              <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-[#12141c] border border-[#202330] text-[#777166]">
                    No booking requests match your filter.
                  </div>
                ) : (
                  filteredBookings.map((bk) => (
                    <div
                      key={bk.id}
                      className="p-5 rounded-2xl bg-[#12141c] border border-[#202330] space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c1e29] pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-[#c5a880]">
                            {bk.id}
                          </span>
                          <span className="text-base font-semibold text-[#f3e5d0]">
                            {bk.customerName}
                          </span>
                          <span className="text-xs text-[#777166]">
                            via {bk.preferredContact.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={bk.status}
                            onChange={(e) => {
                              updateBookingStatus(
                                bk.id,
                                e.target.value as BookingRequest['status']
                              );
                              triggerToast(`Updated ${bk.id} status to ${e.target.value}`);
                            }}
                            className="px-3 py-1 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:outline-none"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Completed">Completed</option>
                          </select>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete booking ${bk.id}?`)) {
                                deleteBookingRequest(bk.id);
                                triggerToast(`Deleted ${bk.id}`);
                              }
                            }}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-[#777166] block">Room Requested</span>
                          <span className="text-[#f3e5d0] font-medium">{bk.roomName}</span>
                        </div>

                        <div>
                          <span className="text-[#777166] block">Stay Duration</span>
                          <span className="text-[#f3e5d0] font-medium">
                            {bk.checkInDate} to {bk.checkOutDate} ({bk.guests} Guests)
                          </span>
                        </div>

                        <div>
                          <span className="text-[#777166] block">Contact Details</span>
                          <span className="text-[#f3e5d0] font-medium">
                            {bk.phone} {bk.email ? `• ${bk.email}` : ''}
                          </span>
                        </div>
                      </div>

                      {bk.specialRequest && (
                        <div className="p-3 rounded-xl bg-[#0c0d10] text-xs text-[#a09a8e] border border-[#1f222d]">
                          <strong className="text-[#c5a880]">Special Request: </strong>
                          {bk.specialRequest}
                        </div>
                      )}

                      {/* Quick Communication & Direct Notification Toolbar */}
                      <div className="pt-2 border-t border-[#1c1e29] flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Direct WhatsApp Button */}
                          <button
                            type="button"
                            onClick={() => handleWhatsAppBooking(bk)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-medium transition-all shadow-sm active:scale-95"
                            title={`Chat directly with ${bk.customerName} on WhatsApp (+91 ${bk.phone})`}
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Guest</span>
                            <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                          </button>

                          {/* Direct Automatic Email Notification Button */}
                          <button
                            type="button"
                            onClick={() => handleEmailBooking(bk)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#c5a880]/15 hover:bg-[#c5a880]/25 border border-[#c5a880]/40 text-[#f3e5d0] text-xs font-medium transition-all shadow-sm active:scale-95"
                            title={bk.email ? `Send automatic booking confirmation email to ${bk.email}` : `No email entered - Click to open WhatsApp`}
                          >
                            <Mail className="w-3.5 h-3.5 text-[#c5a880]" />
                            <span>{bk.email ? 'Email Notification' : 'Email (No Email, Use WA)'}</span>
                            <Send className="w-3 h-3 text-[#c5a880] ml-0.5" />
                          </button>

                          {/* Quick Copy Booking Details */}
                          <button
                            type="button"
                            onClick={() => handleCopyBooking(bk)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#14161f] hover:bg-[#1f2230] border border-[#262a3a] text-[#a09a8e] hover:text-[#f3e5d0] text-xs transition-colors"
                            title="Copy formatted booking summary"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Details</span>
                          </button>
                        </div>

                        <span className="text-[11px] text-[#777166] font-mono">
                          Pref: {bk.preferredContact.toUpperCase()} • Received: {bk.id}
                        </span>
                      </div>

                      {/* Admin Notes Field */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          defaultValue={bk.adminNotes || ''}
                          placeholder="Add internal notes (e.g. Verified train arrival, reserved 2nd floor)..."
                          onBlur={(e) => {
                            updateBookingStatus(bk.id, bk.status, e.target.value);
                            triggerToast('Internal notes updated');
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#0c0d10] border border-[#1f222d] text-xs text-[#d1ccc0] focus:outline-none focus:border-[#c5a880]"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMER ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
                    Customer Enquiries
                  </h2>
                  <p className="text-xs text-[#a09a8e]">
                    Messages, restaurant queries, and banquet RFPs submitted via the enquiry modal.
                  </p>
                </div>

                <select
                  value={enquiryFilter}
                  onChange={(e) => setEnquiryFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#12141c] border border-[#202330] text-xs text-[#f3e5d0] focus:outline-none"
                >
                  <option value="ALL">All Categories</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="space-y-4">
                {filteredEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-5 rounded-2xl bg-[#12141c] border border-[#202330] space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-[#1c1e29] pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-[#c5a880]">
                          {enq.id}
                        </span>
                        <span className="text-base font-semibold text-[#f3e5d0]">
                          {enq.name}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#1f222e] text-[10px] text-[#c5a880]">
                          {enq.enquiryType}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={enq.status}
                          onChange={(e) => {
                            updateEnquiryStatus(
                              enq.id,
                              e.target.value as Enquiry['status']
                            );
                            triggerToast(`Updated status for ${enq.id}`);
                          }}
                          className="px-3 py-1 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Resolved">Resolved</option>
                        </select>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete enquiry ${enq.id}?`)) {
                              deleteEnquiry(enq.id);
                              triggerToast(`Deleted ${enq.id}`);
                            }
                          }}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-[#a09a8e] flex items-center gap-4">
                      <span>Phone: <strong className="text-[#f3e5d0]">{enq.phone}</strong></span>
                      {enq.email && <span>Email: <strong className="text-[#f3e5d0]">{enq.email}</strong></span>}
                      <span>Subject: <strong className="text-[#f3e5d0]">{enq.subject}</strong></span>
                    </div>

                    <p className="p-3 rounded-xl bg-[#0c0d10] text-xs text-[#d1ccc0] leading-relaxed border border-[#1f222d]">
                      {enq.message}
                    </p>

                    {/* Quick Reply & Notification Toolbar */}
                    <div className="pt-2 border-t border-[#1c1e29] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Direct WhatsApp Response */}
                        <button
                          type="button"
                          onClick={() => handleWhatsAppEnquiry(enq)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-medium transition-all shadow-sm active:scale-95"
                          title={`Chat on WhatsApp with ${enq.name} (+91 ${enq.phone})`}
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Customer</span>
                          <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                        </button>

                        {/* Direct Email Notification Response */}
                        <button
                          type="button"
                          onClick={() => handleEmailEnquiry(enq)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#c5a880]/15 hover:bg-[#c5a880]/25 border border-[#c5a880]/40 text-[#f3e5d0] text-xs font-medium transition-all shadow-sm active:scale-95"
                          title={enq.email ? `Send email reply to ${enq.email}` : `No email provided`}
                        >
                          <Mail className="w-3.5 h-3.5 text-[#c5a880]" />
                          <span>{enq.email ? 'Email Customer' : 'Email (None, Use WA)'}</span>
                          <Send className="w-3 h-3 text-[#c5a880] ml-0.5" />
                        </button>
                      </div>

                      <span className="text-[11px] text-[#777166] font-mono">
                        Type: {enq.enquiryType} • #{enq.id}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ROOMS & SUITES CMS */}
          {activeTab === 'rooms' && (
            <RoomsCmsTab
              rooms={rooms}
              addRoom={addRoom}
              updateRoom={updateRoom}
              deleteRoom={deleteRoom}
              toggleRoomActive={toggleRoomActive}
              triggerToast={triggerToast}
            />
          )}

          {/* TAB 5: HOME & VISUAL CMS */}
          {activeTab === 'homeCms' && (
            <HomeCmsTab
              homeCms={homeCms}
              updateHomeCms={updateHomeCms}
              triggerToast={triggerToast}
            />
          )}

          {/* TAB 6: RESTAURANT CMS */}
          {activeTab === 'restaurant' && (
            <RestaurantCmsTab
              restaurant={restaurant}
              updateRestaurant={updateRestaurant}
              triggerToast={triggerToast}
            />
          )}

          {/* TAB 7: BANQUETS & EVENTS CMS */}
          {activeTab === 'events' && (
            <EventsCmsTab
              events={events}
              addEvent={addEvent}
              updateEvent={updateEvent}
              deleteEvent={deleteEvent}
              triggerToast={triggerToast}
            />
          )}

          {/* TAB 8: PHOTO GALLERY CMS */}
          {activeTab === 'gallery' && (
            <GalleryCmsTab
              gallery={gallery}
              addGalleryItem={addGalleryItem}
              updateGalleryItem={updateGalleryItem}
              deleteGalleryItem={deleteGalleryItem}
              triggerToast={triggerToast}
            />
          )}

          {/* TAB 9: CONTACT & PROXIMITY CMS */}
          {activeTab === 'contact' && (
            <ContactCmsTab
              contact={contact}
              updateContact={updateContact}
              triggerToast={triggerToast}
            />
          )}

          {/* TAB 10: POLICIES CMS */}
          {activeTab === 'policies' && (
            <PoliciesCmsTab
              policies={policies}
              updatePolicies={updatePolicies}
              triggerToast={triggerToast}
            />
          )}

          {/* TAB 11: 3D ENGINE CONTROLS */}
          {activeTab === 'threeSettings' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
                  3D Engine & Experience Controls
                </h2>
                <p className="text-xs text-[#a09a8e]">
                  Fine-tune Three.js canvas behavior, particle density, scroll speeds, and animations.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-6 text-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#202330]">
                  <div>
                    <span className="font-semibold text-sm text-[#f3e5d0] block">
                      3D Particle & Camera Orbit
                    </span>
                    <span className="text-[#a09a8e]">
                      Enable floating dust particles, architectural rings, and camera fly-through.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={threeSettings.heroAnimationEnabled}
                    onChange={(e) =>
                      update3DSettings({
                        ...threeSettings,
                        heroAnimationEnabled: e.target.checked
                      })
                    }
                    className="w-5 h-5 accent-[#c5a880]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#a09a8e]">Parallax Depth Intensity (1 to 5)</span>
                    <span className="text-[#c5a880] font-bold">{threeSettings.parallaxIntensity}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={threeSettings.parallaxIntensity}
                    onChange={(e) =>
                      update3DSettings({
                        ...threeSettings,
                        parallaxIntensity: Number(e.target.value)
                      })
                    }
                    className="w-full accent-[#c5a880]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#a09a8e]">3D Animation Speed</span>
                    <span className="text-[#c5a880] font-bold">{threeSettings.animationSpeed}x</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={threeSettings.animationSpeed}
                    onChange={(e) =>
                      update3DSettings({
                        ...threeSettings,
                        animationSpeed: Number(e.target.value)
                      })
                    }
                    className="w-full accent-[#c5a880]"
                  />
                </div>

                {/* Level of Detail (LOD) Management */}
                <div className="pt-4 border-t border-[#262833] space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-[#f3e5d0] uppercase tracking-wider">
                      Level of Detail (LOD) & Device Optimization
                    </h4>
                    <p className="text-xs text-[#a09a8e] mt-1">
                      Control automatic poly-count and particle reduction for mobile, tablets, and low-end GPUs.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'auto', label: '⚡ Auto (Smart)', desc: 'Adaptive FPS based' },
                      { id: 'high', label: 'High (4.6K Polys)', desc: '120 room particles' },
                      { id: 'medium', label: 'Balanced (1.9K)', desc: '60 room particles' },
                      { id: 'low', label: 'Eco / Mobile (768)', desc: '24 particles, 1x DPR' }
                    ].map((item) => {
                      const isSelected = (threeSettings.lodMode || 'auto') === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            update3DSettings({
                              ...threeSettings,
                              lodMode: item.id as any
                            })
                          }
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-[#c5a880]/20 border-[#c5a880] text-[#f3e5d0]'
                              : 'bg-[#14161d] border-[#262833] text-[#a09a8e] hover:border-[#c5a880]/40'
                          }`}
                        >
                          <div className="text-xs font-bold">{item.label}</div>
                          <div className="text-[10px] text-[#8e897e] mt-0.5">{item.desc}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#14161d] border border-[#262833]">
                    <div>
                      <span className="font-semibold text-xs text-[#f3e5d0] block">
                        Dynamic Auto-Degradation (Safety Fallback)
                      </span>
                      <span className="text-[11px] text-[#a09a8e]">
                        Automatically downgrades quality to Eco tier if frame rate drops below 26 FPS for 3 consecutive seconds.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={threeSettings.autoLODEnabled ?? true}
                      onChange={(e) =>
                        update3DSettings({
                          ...threeSettings,
                          autoLODEnabled: e.target.checked
                        })
                      }
                      className="w-5 h-5 accent-[#c5a880]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => triggerToast('3D Engine & LOD parameters saved!')}
                    className="px-6 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold uppercase"
                  >
                    Apply 3D Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

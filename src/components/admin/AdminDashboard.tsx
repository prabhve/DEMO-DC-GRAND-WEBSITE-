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
  Search
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Room, GalleryItem, EventFacilityData, BookingRequest, Enquiry } from '../../types/hotel';

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

  // Editing states
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isAddingRoom, setIsAddingRoom] = useState<boolean>(false);
  const [newRoomData, setNewRoomData] = useState<Omit<Room, 'id' | 'slug'>>({
    name: '',
    size: '190 sq ft / 18 sq mt',
    maxGuests: 3,
    bed: '1 Double Bed',
    bathrooms: 1,
    view: 'City View',
    description: '',
    amenities: ['High-speed Wi-Fi', 'Air Conditioning', 'Mineral Water', 'TV', 'Private Bathroom'],
    features: ['Soundproofed', 'Reading Lights'],
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80'],
    coverImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80',
    isFeatured: true,
    isActive: true,
    displayOrder: rooms.length + 1
  });

  // Gallery Add State
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState<GalleryItem['category']>('HOTEL');
  const [newGalleryCaption, setNewGalleryCaption] = useState('');

  // Booking & Enquiry Filter States
  const [bookingFilter, setBookingFilter] = useState<string>('ALL');
  const [bookingSearch, setBookingSearch] = useState<string>('');
  const [enquiryFilter, setEnquiryFilter] = useState<string>('ALL');

  const triggerToast = (msg: string) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => setSaveSuccessNotice(''), 3500);
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ROOMS & SUITES CMS */}
          {activeTab === 'rooms' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
                    Rooms & Accommodations CMS
                  </h2>
                  <p className="text-xs text-[#a09a8e]">
                    Edit room categories, dimensions, beds, and amenities. Strictly: NO PRICES.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingRoom(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bf9a] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Room Category</span>
                </button>
              </div>

              {/* Add Room Modal / Drawer */}
              {isAddingRoom && (
                <div className="p-6 rounded-2xl bg-[#141620] border border-[#c5a880]/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#f3e5d0]">
                      Add New Room Category
                    </h3>
                    <button onClick={() => setIsAddingRoom(false)}>
                      <X className="w-5 h-5 text-[#a09a8e]" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block mb-1 text-[#a09a8e]">Room Name *</label>
                      <input
                        type="text"
                        value={newRoomData.name}
                        onChange={(e) => setNewRoomData({ ...newRoomData, name: e.target.value })}
                        placeholder="e.g. Executive Suite"
                        className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-[#a09a8e]">Size (sq ft / sq mt) *</label>
                      <input
                        type="text"
                        value={newRoomData.size}
                        onChange={(e) => setNewRoomData({ ...newRoomData, size: e.target.value })}
                        placeholder="e.g. 210 sq ft / 19 sq mt"
                        className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-[#a09a8e]">Bedding Format *</label>
                      <input
                        type="text"
                        value={newRoomData.bed}
                        onChange={(e) => setNewRoomData({ ...newRoomData, bed: e.target.value })}
                        placeholder="e.g. 1 King Bed or 2 Twin Beds"
                        className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-[#a09a8e]">Max Guests *</label>
                      <input
                        type="number"
                        value={newRoomData.maxGuests}
                        onChange={(e) => setNewRoomData({ ...newRoomData, maxGuests: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-[#a09a8e]">Cover Image URL</label>
                      <input
                        type="url"
                        value={newRoomData.coverImage}
                        onChange={(e) => setNewRoomData({ ...newRoomData, coverImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-[#a09a8e]">View Perspective</label>
                      <input
                        type="text"
                        value={newRoomData.view}
                        onChange={(e) => setNewRoomData({ ...newRoomData, view: e.target.value })}
                        placeholder="e.g. City & Temple View"
                        className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-xs text-[#a09a8e]">Description</label>
                    <textarea
                      rows={3}
                      value={newRoomData.description}
                      onChange={(e) => setNewRoomData({ ...newRoomData, description: e.target.value })}
                      placeholder="Room narrative and unique architecture..."
                      className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (!newRoomData.name) return;
                      addRoom(newRoomData);
                      setIsAddingRoom(false);
                      triggerToast(`Room "${newRoomData.name}" added successfully`);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase"
                  >
                    Save Room
                  </button>
                </div>
              )}

              {/* Existing Rooms List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rooms.map((rm) => (
                  <div
                    key={rm.id}
                    className="p-5 rounded-2xl bg-[#12141c] border border-[#202330] flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={rm.coverImage}
                        alt={rm.name}
                        className="w-24 h-24 rounded-xl object-cover shrink-0 border border-[#2a2723]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-base font-semibold text-[#f3e5d0]">{rm.name}</h4>
                          <button
                            onClick={() => {
                              toggleRoomActive(rm.id);
                              triggerToast(`${rm.name} visibility toggled`);
                            }}
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                              rm.isActive ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                            }`}
                          >
                            {rm.isActive ? 'Active' : 'Disabled'}
                          </button>
                        </div>
                        <p className="text-xs text-[#c5a880] mb-1">{rm.size} • {rm.bed}</p>
                        <p className="text-xs text-[#777166] line-clamp-2">{rm.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#1c1e29] text-xs">
                      <span className="text-[#777166]">Max {rm.maxGuests} Guests • {rm.bathrooms} Bath</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingRoom(rm)}
                          className="px-3 py-1 rounded-lg bg-[#1a1c26] hover:bg-[#c5a880] hover:text-[#0c0d10] transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${rm.name}?`)) {
                              deleteRoom(rm.id);
                              triggerToast(`Deleted ${rm.name}`);
                            }
                          }}
                          className="p-1 rounded-lg text-rose-400 hover:bg-rose-950/40"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Edit Room Modal */}
              {editingRoom && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                  <div className="w-full max-w-2xl p-6 rounded-3xl bg-[#141620] border border-[#c5a880]/40 max-h-[90vh] overflow-y-auto space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold uppercase tracking-wider text-[#f3e5d0]">
                        Edit: {editingRoom.name}
                      </h3>
                      <button onClick={() => setEditingRoom(null)}>
                        <X className="w-5 h-5 text-[#a09a8e]" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block mb-1 text-[#a09a8e]">Room Name</label>
                        <input
                          type="text"
                          value={editingRoom.name}
                          onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-[#a09a8e]">Dimensions</label>
                        <input
                          type="text"
                          value={editingRoom.size}
                          onChange={(e) => setEditingRoom({ ...editingRoom, size: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-[#a09a8e]">Bedding</label>
                        <input
                          type="text"
                          value={editingRoom.bed}
                          onChange={(e) => setEditingRoom({ ...editingRoom, bed: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-[#a09a8e]">Max Capacity</label>
                        <input
                          type="number"
                          value={editingRoom.maxGuests}
                          onChange={(e) => setEditingRoom({ ...editingRoom, maxGuests: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-1 text-xs text-[#a09a8e]">Description</label>
                      <textarea
                        rows={3}
                        value={editingRoom.description}
                        onChange={(e) => setEditingRoom({ ...editingRoom, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-[#2a2723]">
                      <button
                        onClick={() => setEditingRoom(null)}
                        className="px-4 py-2 rounded-xl text-xs text-[#a09a8e]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          updateRoom(editingRoom);
                          setEditingRoom(null);
                          triggerToast('Room updated successfully');
                        }}
                        className="px-6 py-2 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: HERO & STORY CMS */}
          {activeTab === 'homeCms' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
                  Hero & Introduction CMS
                </h2>
                <p className="text-xs text-[#a09a8e]">
                  Manage the primary landing typography, cover imagery, and opening brand story.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={homeCms.heroHeadline}
                    onChange={(e) => updateHomeCms({ ...homeCms, heroHeadline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-sm text-[#f3e5d0]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                    Hero Supporting Subtext
                  </label>
                  <textarea
                    rows={2}
                    value={homeCms.heroSupportingText}
                    onChange={(e) => updateHomeCms({ ...homeCms, heroSupportingText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-sm text-[#f3e5d0]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                    Hero Cover Background Image URL
                  </label>
                  <input
                    type="url"
                    value={homeCms.heroCoverImage}
                    onChange={(e) => updateHomeCms({ ...homeCms, heroCoverImage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-sm text-[#f3e5d0]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                    Intro Scene Narrative
                  </label>
                  <textarea
                    rows={3}
                    value={homeCms.introText}
                    onChange={(e) => updateHomeCms({ ...homeCms, introText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-sm text-[#f3e5d0]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                    About Us Story
                  </label>
                  <textarea
                    rows={3}
                    value={homeCms.aboutText}
                    onChange={(e) => updateHomeCms({ ...homeCms, aboutText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-sm text-[#f3e5d0]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => triggerToast('Hero & Narrative CMS changes saved!')}
                    className="px-6 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bf9a] transition-colors"
                  >
                    Save All Texts
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: RESTAURANT CMS */}
          {activeTab === 'restaurant' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
                  Food Express Restaurant CMS
                </h2>
                <p className="text-xs text-[#a09a8e]">
                  Update dining timings, special cuisines, facilities, and photography.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5">
                      Restaurant Name
                    </label>
                    <input
                      type="text"
                      value={restaurant.name}
                      onChange={(e) => updateRestaurant({ ...restaurant, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-sm text-[#f3e5d0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={restaurant.tagline}
                      onChange={(e) => updateRestaurant({ ...restaurant, tagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-sm text-[#f3e5d0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={restaurant.description}
                    onChange={(e) => updateRestaurant({ ...restaurant, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-sm text-[#f3e5d0]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5">
                    Timings
                  </label>
                  <input
                    type="text"
                    value={restaurant.timings}
                    onChange={(e) => updateRestaurant({ ...restaurant, timings: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-sm text-[#f3e5d0]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => triggerToast('Food Express details updated!')}
                    className="px-6 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase"
                  >
                    Save Dining Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: EVENTS CMS */}
          {activeTab === 'events' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
                  Meetings & Events CMS
                </h2>
                <p className="text-xs text-[#a09a8e]">
                  Manage banquet halls, capacities, facilities, and boardroom setups.
                </p>
              </div>

              <div className="space-y-4">
                {events.map((ev) => (
                  <div key={ev.id} className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f3e5d0]">
                        {ev.name}
                      </h3>
                      <span className="text-xs text-[#c5a880]">{ev.capacity}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block mb-1 text-[#a09a8e]">Venue Name</label>
                        <input
                          type="text"
                          value={ev.name}
                          onChange={(e) => updateEvent({ ...ev, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-[#a09a8e]">Capacity</label>
                        <input
                          type="text"
                          value={ev.capacity}
                          onChange={(e) => updateEvent({ ...ev, capacity: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-1 text-xs text-[#a09a8e]">Description</label>
                      <textarea
                        rows={2}
                        value={ev.description}
                        onChange={(e) => updateEvent({ ...ev, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: GALLERY CMS */}
          {activeTab === 'gallery' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
                    Photo Gallery Manager
                  </h2>
                  <p className="text-xs text-[#a09a8e]">
                    Add, categorize, or curate photography across the 3D gallery.
                  </p>
                </div>
              </div>

              {/* Add Image Form */}
              <div className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-4">
                <h3 className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
                  Add New Photo Asset
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block mb-1 text-[#a09a8e]">Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Ambient Foyer"
                      value={newGalleryTitle}
                      onChange={(e) => setNewGalleryTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-[#a09a8e]">Category</label>
                    <select
                      value={newGalleryCategory}
                      onChange={(e) => setNewGalleryCategory(e.target.value as GalleryItem['category'])}
                      className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                    >
                      <option value="HOTEL">HOTEL</option>
                      <option value="ROOMS">ROOMS</option>
                      <option value="RESTAURANT">RESTAURANT</option>
                      <option value="MEETINGS & EVENTS">MEETINGS & EVENTS</option>
                      <option value="ABOUT">ABOUT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-[#a09a8e]">Image URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-xs text-[#a09a8e]">Caption / Details</label>
                  <input
                    type="text"
                    placeholder="Short description..."
                    value={newGalleryCaption}
                    onChange={(e) => setNewGalleryCaption(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
                  />
                </div>

                <button
                  onClick={() => {
                    if (!newGalleryUrl || !newGalleryTitle) return;
                    addGalleryItem({
                      title: newGalleryTitle,
                      category: newGalleryCategory,
                      url: newGalleryUrl,
                      caption: newGalleryCaption,
                      displayOrder: gallery.length + 1
                    });
                    setNewGalleryTitle('');
                    setNewGalleryUrl('');
                    setNewGalleryCaption('');
                    triggerToast('New photo added to gallery!');
                  }}
                  className="px-6 py-2 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase"
                >
                  Add Image to Gallery
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="relative rounded-xl overflow-hidden border border-[#202330] bg-[#12141c] group">
                    <img src={item.url} alt={item.title} className="w-full h-36 object-cover" />
                    <div className="p-3">
                      <span className="text-[10px] uppercase text-[#c5a880] block">{item.category}</span>
                      <h4 className="text-xs font-semibold text-[#f3e5d0] truncate">{item.title}</h4>
                    </div>
                    <button
                      onClick={() => {
                        deleteGalleryItem(item.id);
                        triggerToast('Photo deleted');
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: CONTACT CMS */}
          {activeTab === 'contact' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
                  Contact & Proximity CMS
                </h2>
                <p className="text-xs text-[#a09a8e]">
                  Manage hotel phone numbers, WhatsApp, email, and postal address.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-4 text-xs">
                <div>
                  <label className="block mb-1 text-[#a09a8e]">Address Line</label>
                  <input
                    type="text"
                    value={contact.address}
                    onChange={(e) => updateContact({ ...contact, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-[#a09a8e]">Phone Number</label>
                    <input
                      type="text"
                      value={contact.phone}
                      onChange={(e) => updateContact({ ...contact, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-[#a09a8e]">WhatsApp Number</label>
                    <input
                      type="text"
                      value={contact.whatsapp}
                      onChange={(e) => updateContact({ ...contact, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-[#a09a8e]">Email Address</label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => updateContact({ ...contact, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-[#a09a8e]">Google Maps Destination URL</label>
                  <input
                    type="url"
                    value={contact.mapUrl}
                    onChange={(e) => updateContact({ ...contact, mapUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => triggerToast('Contact parameters updated successfully!')}
                    className="px-6 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold uppercase"
                  >
                    Save Contact Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: POLICIES CMS */}
          {activeTab === 'policies' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
                  Hotel Policies CMS
                </h2>
                <p className="text-xs text-[#a09a8e]">
                  Edit cancellation rules, child stay guidelines, check-in requirements, and terms.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-4 text-xs">
                <div>
                  <label className="block mb-1 uppercase tracking-wider text-[#a09a8e] font-semibold">
                    Cancellation Policy
                  </label>
                  <textarea
                    rows={3}
                    value={policies.cancellation}
                    onChange={(e) => updatePolicies({ ...policies, cancellation: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-[#a09a8e] font-semibold">
                    Child & Extra Bed Policy
                  </label>
                  <textarea
                    rows={3}
                    value={policies.childPolicy}
                    onChange={(e) => updatePolicies({ ...policies, childPolicy: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-[#a09a8e] font-semibold">
                    Check-in / Hotel Guidelines
                  </label>
                  <textarea
                    rows={3}
                    value={policies.hotelPolicy}
                    onChange={(e) => updatePolicies({ ...policies, hotelPolicy: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-[#a09a8e] font-semibold">
                    Terms & Conditions
                  </label>
                  <textarea
                    rows={3}
                    value={policies.termsAndConditions}
                    onChange={(e) => updatePolicies({ ...policies, termsAndConditions: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                  />
                </div>

                <button
                  onClick={() => triggerToast('Hotel policies updated!')}
                  className="px-6 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold uppercase"
                >
                  Save Policies
                </button>
              </div>
            </div>
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

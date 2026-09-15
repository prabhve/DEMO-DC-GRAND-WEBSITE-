import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Calendar,
  User,
  Phone,
  Mail,
  Users,
  BedDouble,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  MessageSquareText,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useHotel } from '../../context/HotelContext';
import { BookingRequest } from '../../types/hotel';
import {
  sanitizeHtml,
  sanitizePhone,
  createWhatsAppLink,
  createMailtoLink,
  validateEmail
} from '../../utils/security';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    preselectedRoomId,
    rooms,
    addBookingRequest,
    contact
  } = useHotel();
  const activeRooms = rooms.filter((r) => r.isActive);

  // Today and Tomorrow default dates
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    roomId: preselectedRoomId || activeRooms[0]?.id || '',
    checkInDate: todayStr,
    checkOutDate: tomorrowStr,
    guests: 2,
    preferredContact: 'whatsapp' as BookingRequest['preferredContact'],
    specialRequest: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string>('');

  useEffect(() => {
    if (preselectedRoomId) {
      setFormData((prev) => ({ ...prev, roomId: preselectedRoomId }));
    } else if (activeRooms.length > 0 && !formData.roomId) {
      setFormData((prev) => ({ ...prev, roomId: activeRooms[0].id }));
    }
  }, [preselectedRoomId, activeRooms]);

  if (!isBookingModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Security Sanitization & Validation
    const cleanName = sanitizeHtml(formData.customerName);
    const cleanPhone = sanitizePhone(formData.phone);
    const cleanEmail = sanitizeHtml(formData.email);
    const cleanSpecialReq = sanitizeHtml(formData.specialRequest);

    if (!cleanName || cleanName.length < 2) {
      setValidationError('Please enter a valid guest name.');
      return;
    }

    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 8) {
      setValidationError('Please provide a valid contact phone number.');
      return;
    }

    if (cleanEmail && !validateEmail(cleanEmail)) {
      setValidationError('Please provide a valid email address.');
      return;
    }

    if (formData.checkOutDate <= formData.checkInDate) {
      setValidationError('Check-out date must be strictly after check-in date.');
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedRoom = activeRooms.find((r) => r.id === formData.roomId);
      const roomName = selectedRoom ? selectedRoom.name : 'Super Deluxe Room';

      const newId = await addBookingRequest({
        customerName: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        roomId: formData.roomId,
        roomName,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        guests: Number(formData.guests),
        specialRequest: cleanSpecialReq,
        preferredContact: formData.preferredContact
      });

      setConfirmedId(newId);

      // Trigger luxury celebration confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#c5a880', '#e8d7be', '#f3e5d0']
        });
      } catch (err) {
        // Safe fallback if confetti canvas fails in iframe
      }
    } catch (err) {
      console.error(err);
      setValidationError('An error occurred while submitting your request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setConfirmedId(null);
    setValidationError('');
    setFormData({
      customerName: '',
      phone: '',
      email: '',
      roomId: activeRooms[0]?.id || '',
      checkInDate: todayStr,
      checkOutDate: tomorrowStr,
      guests: 2,
      preferredContact: 'whatsapp',
      specialRequest: ''
    });
  };

  const selectedRoomObj = activeRooms.find((r) => r.id === formData.roomId);

  // WhatsApp and Email message builders for the customer
  const hotelWhatsAppPhone = contact.whatsapp || '+919415204991';
  const customerWhatsAppMessage = `*New Stay Request - Hotel D C Grand, Varanasi*%0A%0A*Reference:* ${confirmedId}%0A*Guest Name:* ${formData.customerName}%0A*Room Sanctuary:* ${selectedRoomObj?.name}%0A*Stay Dates:* ${formData.checkInDate} to ${formData.checkOutDate}%0A*Guests:* ${formData.guests}%0A*Special Requests:* ${formData.specialRequest || 'None'}%0A%0ANamaste! I have submitted this booking request on your website. Kindly confirm room availability and tariff.`;

  const customerEmailSubject = `Booking Request [Ref: ${confirmedId}] - ${formData.customerName}`;
  const customerEmailBody = `Dear Hotel D C Grand Team,

I have submitted a stay reservation request through your website. Here are my booking details:

Reference ID: ${confirmedId}
Guest Name: ${formData.customerName}
Room Category: ${selectedRoomObj?.name}
Check-In: ${formData.checkInDate}
Check-Out: ${formData.checkOutDate}
Guests: ${formData.guests}
Contact: ${formData.phone}
Special Request: ${formData.specialRequest || 'None'}

Please confirm availability and share advance payment instructions or arrival guidelines.

Warm regards,
${formData.customerName}`;

  const customerWhatsAppLink = createWhatsAppLink(hotelWhatsAppPhone, decodeURIComponent(customerWhatsAppMessage));
  const customerEmailLink = createMailtoLink(contact.email || 'info@hoteldcgrand.com', customerEmailSubject, customerEmailBody);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#08090b]/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-2xl bg-[#12141d] rounded-3xl border border-[#c5a880]/40 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-b from-[#181b28] to-[#12141d] border-b border-[#2a2723] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c5a880]/20 flex items-center justify-center text-[#c5a880]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a880] block font-semibold">
                  Reservation Desk
                </span>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#f3e5d0]">
                  Request Your Stay
                </h2>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-[#0c0d10]/60 text-[#a09a8e] hover:text-[#f3e5d0] flex items-center justify-center transition-colors"
              aria-label="Close dialog"
              id="close-booking-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            {confirmedId ? (
              /* Success Confirmation */
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#c5a880]/20 border border-[#c5a880] text-[#c5a880] flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-2">
                  Reservation Request Submitted!
                </h3>

                <p className="text-xs sm:text-sm text-[#a09a8e] max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong className="text-[#f3e5d0]">{formData.customerName}</strong>. Our front desk manager will contact you via {formData.preferredContact.toUpperCase()} to confirm room availability and finalize arrival arrangements.
                </p>

                <div className="p-5 rounded-2xl bg-[#0c0d10] border border-[#c5a880]/30 max-w-sm mx-auto mb-6 text-left">
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-[#1f222d]">
                    <span className="text-[10px] uppercase tracking-wider text-[#777166]">Request Reference</span>
                    <span className="font-mono font-bold text-sm text-[#c5a880]">{confirmedId}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="text-[#a09a8e]">Room:</span>
                    <span className="text-[#f3e5d0] font-medium">{selectedRoomObj?.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#a09a8e]">Dates:</span>
                    <span className="text-[#f3e5d0] font-medium">{formData.checkInDate} to {formData.checkOutDate}</span>
                  </div>
                </div>

                <div className="space-y-3 max-w-md mx-auto mb-6">
                  <div className="text-xs text-[#c5a880] font-semibold uppercase tracking-wider text-center">
                    Instant Connect with Front Desk
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Direct WhatsApp Button */}
                    <a
                      href={customerWhatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0c0d10] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all"
                      id="customer-confirm-whatsapp-btn"
                    >
                      <MessageCircle className="w-4 h-4 text-[#0c0d10]" />
                      <span>Chat on WhatsApp</span>
                    </a>

                    {/* Direct Email Button */}
                    <a
                      href={customerEmailLink}
                      className="py-3 px-4 rounded-xl bg-[#1e2333] hover:bg-[#262c40] text-[#f3e5d0] border border-[#3b435c] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                      id="customer-confirm-email-btn"
                    >
                      <Mail className="w-4 h-4 text-[#c5a880]" />
                      <span>Email Front Desk</span>
                    </a>
                  </div>

                  <div className="text-center pt-2">
                    <a
                      href={`tel:${hotelWhatsAppPhone}`}
                      className="text-xs text-[#a09a8e] hover:text-[#f3e5d0] transition-colors inline-flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>Or Call Direct: <strong>{contact.phone}</strong></span>
                    </a>
                  </div>
                </div>

                <div className="flex justify-center gap-3 pt-2 border-t border-[#1c1f2b]">
                  <button
                    onClick={handleClose}
                    className="px-8 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bf9a] transition-colors"
                  >
                    Done / Close
                  </button>
                </div>
              </div>
            ) : (
              /* Request Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {validationError && (
                  <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
                    <X className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Notice banner */}
                <div className="p-3.5 rounded-xl bg-[#0c0d10] border border-[#c5a880]/20 flex items-center gap-3 text-xs text-[#d1ccc0]">
                  <ShieldCheck className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>
                    No advance payment required. We will verify dates and contact you directly with confirmation.
                  </span>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-[#777166]" />
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        placeholder="e.g. Vikrant Singhania"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                      Mobile / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#777166]" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Room Select */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#777166]" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vikrant@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                      Room Sanctuary *
                    </label>
                    <div className="relative">
                      <BedDouble className="absolute left-3.5 top-3 w-4 h-4 text-[#777166]" />
                      <select
                        value={formData.roomId}
                        onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none transition-colors"
                      >
                        {activeRooms.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name} ({r.bed})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Dates & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                      Check-In Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.checkInDate}
                      onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                      Check-Out Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={formData.checkInDate || todayStr}
                      value={formData.checkOutDate}
                      onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                      Total Guests *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-3 w-4 h-4 text-[#777166]" />
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none transition-colors"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4+ Guests (Group)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                    Preferred Mode of Confirmation *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['whatsapp', 'phone', 'email'] as const).map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setFormData({ ...formData, preferredContact: method })}
                        className={`py-2 rounded-xl text-xs uppercase tracking-wider transition-all ${
                          formData.preferredContact === method
                            ? 'bg-[#c5a880] text-[#0c0d10] font-bold shadow-md'
                            : 'bg-[#0c0d10] text-[#a09a8e] border border-[#2a2723] hover:border-[#c5a880]/30'
                        }`}
                      >
                        {method === 'whatsapp' ? 'WhatsApp' : method === 'phone' ? 'Phone Call' : 'Email'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                    Special Requests / Temple Itinerary Notes
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialRequest}
                    onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                    placeholder="e.g., Arriving early morning from Cantonment Station; need ground floor for elderly parents..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] via-[#dfcaaa] to-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(197,168,128,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    id="submit-booking-request-btn"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Request...' : 'Send Booking Request'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

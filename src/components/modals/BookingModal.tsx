import React, { useState, useEffect, useMemo } from 'react';
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
  ShieldCheck,
  MessageCircle
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
    bookingDraft,
    rooms,
    addBookingRequest,
    contact
  } = useHotel();

  const activeRooms = useMemo(() => rooms.filter((r) => r.isActive), [rooms]);
  const firstActiveRoomId = activeRooms[0]?.id || '';

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    roomId: preselectedRoomId || firstActiveRoomId,
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
    if (!isBookingModalOpen) return;
    setFormData((prev) => ({
      ...prev,
      roomId:
        bookingDraft?.roomId ||
        preselectedRoomId ||
        prev.roomId ||
        firstActiveRoomId,
      checkInDate: bookingDraft?.checkInDate || prev.checkInDate || todayStr,
      checkOutDate: bookingDraft?.checkOutDate || prev.checkOutDate || tomorrowStr,
      guests: bookingDraft?.guests || prev.guests || 2
    }));
  }, [isBookingModalOpen, preselectedRoomId, bookingDraft, firstActiveRoomId, todayStr, tomorrowStr]);

  useEffect(() => {
    if (!isBookingModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsBookingModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBookingModalOpen, setIsBookingModalOpen]);

  if (!isBookingModalOpen) return null;

  const handleCheckInChange = (newCheckIn: string) => {
    const updated = { ...formData, checkInDate: newCheckIn };
    if (newCheckIn && formData.checkOutDate <= newCheckIn) {
      const nextDay = new Date(new Date(newCheckIn).getTime() + 86400000)
        .toISOString()
        .split('T')[0];
      updated.checkOutDate = nextDay;
    }
    setFormData(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

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
      setValidationError('Check-out date must be after check-in date.');
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

      try {
        confetti({
          particleCount: 55,
          spread: 55,
          origin: { y: 0.6 },
          colors: ['#B69A69', '#DFC9A1', '#F5F1E9']
        });
      } catch {
        // Safe fallback in restricted iframe environments
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
      roomId: firstActiveRoomId,
      checkInDate: todayStr,
      checkOutDate: tomorrowStr,
      guests: 2,
      preferredContact: 'whatsapp',
      specialRequest: ''
    });
  };

  const selectedRoomObj = activeRooms.find((r) => r.id === formData.roomId);

  const hotelWhatsAppPhone = contact.whatsapp || '+919415204991';
  const customerWhatsAppMessage = `*New Stay Request - Hotel D.C. Grand, Varanasi*%0A%0A*Reference:* ${confirmedId}%0A*Guest Name:* ${formData.customerName}%0A*Room Sanctuary:* ${selectedRoomObj?.name}%0A*Stay Dates:* ${formData.checkInDate} to ${formData.checkOutDate}%0A*Guests:* ${formData.guests}%0A*Special Requests:* ${formData.specialRequest || 'None'}%0A%0ANamaste! I have submitted this booking request on your website. Kindly confirm room availability and tariff.`;

  const customerEmailSubject = `Booking Request [Ref: ${confirmedId}] - ${formData.customerName}`;
  const customerEmailBody = `Dear Hotel D.C. Grand Team,

I have submitted a stay reservation request through your website. Here are my booking details:

Reference ID: ${confirmedId}
Guest Name: ${formData.customerName}
Room Category: ${selectedRoomObj?.name}
Check-In: ${formData.checkInDate}
Check-Out: ${formData.checkOutDate}
Guests: ${formData.guests}
Contact: ${formData.phone}
Special Request: ${formData.specialRequest || 'None'}

Please confirm availability and share arrival guidelines.

Warm regards,
${formData.customerName}`;

  const customerWhatsAppLink = createWhatsAppLink(hotelWhatsAppPhone, decodeURIComponent(customerWhatsAppMessage));
  const customerEmailLink = createMailtoLink(contact.email || 'stay@dcgrandvaranasi.com', customerEmailSubject, customerEmailBody);

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Request Your Stay at Hotel D.C. Grand"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#161412]/92 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl bg-[#201D19] text-[#F5F1E9] border border-[#D9D1C5]/25 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="p-6 bg-[#161412] border-b border-[#D9D1C5]/15 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#B69A69] block font-medium mb-1">
                Direct Front Desk Reservation
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#F5F1E9]">
                Reserve Your Stay at D.C. Grand
              </h2>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-10 h-10 bg-[#201D19] border border-[#D9D1C5]/20 text-[#D9D1C5] hover:text-[#B69A69] hover:border-[#B69A69] flex items-center justify-center transition-colors cursor-pointer"
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
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-[#B69A69]/15 border border-[#B69A69] text-[#B69A69] flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <h3 className="font-serif-luxury text-3xl text-[#F5F1E9] mb-2">
                  Reservation Request Registered
                </h3>

                <p className="text-xs sm:text-sm text-[#D9D1C5]/80 max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong className="text-[#F5F1E9] font-medium">{formData.customerName}</strong>. Our reservations manager will contact you via {formData.preferredContact.toUpperCase()} to confirm room availability and assist with your arrival.
                </p>

                <div className="p-5 bg-[#161412] border border-[#D9D1C5]/20 max-w-sm mx-auto mb-6 text-left">
                  <div className="flex justify-between items-center mb-2.5 pb-2.5 border-b border-[#D9D1C5]/15">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#D9D1C5]/60">Reference ID</span>
                    <span className="font-mono font-semibold text-sm text-[#B69A69] tabular-nums">{confirmedId}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1.5 text-xs">
                    <span className="text-[#D9D1C5]/70">Accommodation:</span>
                    <span className="text-[#F5F1E9] font-medium">{selectedRoomObj?.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs tabular-nums">
                    <span className="text-[#D9D1C5]/70">Dates:</span>
                    <span className="text-[#F5F1E9] font-medium">{formData.checkInDate} → {formData.checkOutDate}</span>
                  </div>
                </div>

                <div className="space-y-3 max-w-md mx-auto mb-6">
                  <div className="text-[11px] text-[#B69A69] font-medium uppercase tracking-[0.2em] text-center">
                    Instant Connect with Front Desk
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={customerWhatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3.5 px-4 bg-[#536E68] hover:bg-[#617f78] text-[#F5F1E9] font-semibold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors"
                      id="customer-confirm-whatsapp-btn"
                    >
                      <MessageCircle className="w-4 h-4 text-[#B69A69]" />
                      <span>Send via WhatsApp</span>
                    </a>

                    <a
                      href={customerEmailLink}
                      className="py-3.5 px-4 bg-[#161412] hover:border-[#B69A69] text-[#F5F1E9] border border-[#D9D1C5]/25 font-semibold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors"
                      id="customer-confirm-email-btn"
                    >
                      <Mail className="w-4 h-4 text-[#B69A69]" />
                      <span>Email Front Desk</span>
                    </a>
                  </div>

                  <div className="text-center pt-2">
                    <a
                      href={`tel:${hotelWhatsAppPhone}`}
                      className="text-xs text-[#D9D1C5]/80 hover:text-[#F5F1E9] transition-colors inline-flex items-center gap-1.5 tabular-nums"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#B69A69]" />
                      <span>Or Call Direct: <strong>{contact.phone}</strong></span>
                    </a>
                  </div>
                </div>

                <div className="flex justify-center pt-4 border-t border-[#D9D1C5]/15">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-8 py-3 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] font-semibold text-xs uppercase tracking-[0.18em] transition-colors cursor-pointer"
                  >
                    Done / Close
                  </button>
                </div>
              </div>
            ) : (
              /* Request Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {validationError && (
                  <div className="p-3.5 bg-rose-950/70 border border-rose-800 text-xs text-rose-200 flex items-center gap-2">
                    <X className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="p-3.5 bg-[#161412] border border-[#D9D1C5]/15 flex items-center gap-3 text-xs text-[#D9D1C5]/85">
                  <ShieldCheck className="w-4 h-4 text-[#B69A69] shrink-0" />
                  <span>
                    Direct hotel reservation inquiry. No advance online payment required—our front desk confirms availability directly.
                  </span>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-[#B69A69]/70" />
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        placeholder="e.g. Vikrant Singhania"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#161412] border border-[#D9D1C5]/20 focus:border-[#B69A69] text-sm text-[#F5F1E9] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                      Mobile / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#B69A69]/70" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#161412] border border-[#D9D1C5]/20 focus:border-[#B69A69] text-sm text-[#F5F1E9] focus:outline-none transition-colors tabular-nums"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Room Select */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#B69A69]/70" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="guest@example.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#161412] border border-[#D9D1C5]/20 focus:border-[#B69A69] text-sm text-[#F5F1E9] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                      Accommodation *
                    </label>
                    <div className="relative">
                      <BedDouble className="absolute left-3.5 top-3 w-4 h-4 text-[#B69A69]/70" />
                      <select
                        value={formData.roomId}
                        onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#161412] border border-[#D9D1C5]/20 focus:border-[#B69A69] text-sm text-[#F5F1E9] focus:outline-none transition-colors cursor-pointer"
                      >
                        {activeRooms.map((r) => (
                          <option key={r.id} value={r.id} className="bg-[#201D19]">
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
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                      Check-In Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.checkInDate}
                      onChange={(e) => handleCheckInChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#161412] border border-[#D9D1C5]/20 focus:border-[#B69A69] text-sm text-[#F5F1E9] focus:outline-none transition-colors tabular-nums [color-scheme:dark]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                      Check-Out Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={
                        formData.checkInDate
                          ? new Date(new Date(formData.checkInDate).getTime() + 86400000)
                              .toISOString()
                              .split('T')[0]
                          : tomorrowStr
                      }
                      value={formData.checkOutDate}
                      onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#161412] border border-[#D9D1C5]/20 focus:border-[#B69A69] text-sm text-[#F5F1E9] focus:outline-none transition-colors tabular-nums [color-scheme:dark]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                      Total Guests *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-3 w-4 h-4 text-[#B69A69]/70" />
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#161412] border border-[#D9D1C5]/20 focus:border-[#B69A69] text-sm text-[#F5F1E9] focus:outline-none transition-colors cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num} className="bg-[#201D19]">
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                    Preferred Mode of Confirmation *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['whatsapp', 'phone', 'email'] as const).map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setFormData({ ...formData, preferredContact: method })}
                        className={`py-2.5 text-xs uppercase tracking-[0.16em] transition-colors cursor-pointer ${
                          formData.preferredContact === method
                            ? 'bg-[#B69A69] text-[#201D19] font-semibold'
                            : 'bg-[#161412] text-[#D9D1C5]/75 border border-[#D9D1C5]/20 hover:border-[#B69A69]'
                        }`}
                      >
                        {method === 'whatsapp' ? 'WhatsApp' : method === 'phone' ? 'Phone Call' : 'Email'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                    Special Requests / Arrival Notes
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialRequest}
                    onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                    placeholder="e.g., Arriving early morning from Varanasi Cantt Station; travelling with senior citizens..."
                    className="w-full px-4 py-2.5 bg-[#161412] border border-[#D9D1C5]/20 focus:border-[#B69A69] text-sm text-[#F5F1E9] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    id="submit-booking-request-btn"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{isSubmitting ? 'Registering Request...' : 'Confirm Booking Inquiry'}</span>
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

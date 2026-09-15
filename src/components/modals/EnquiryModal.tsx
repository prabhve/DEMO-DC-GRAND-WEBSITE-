import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  MessageCircle,
  Mail,
  Phone
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Enquiry } from '../../types/hotel';
import {
  sanitizeHtml,
  sanitizePhone,
  validateEmail,
  createWhatsAppLink,
  createMailtoLink
} from '../../utils/security';

export const EnquiryModal: React.FC = () => {
  const { isEnquiryModalOpen, setIsEnquiryModalOpen, initialEnquiryType, addEnquiry, contact } = useHotel();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    enquiryType: initialEnquiryType || 'General Enquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string>('');

  useEffect(() => {
    if (initialEnquiryType) {
      setFormData((prev) => ({ ...prev, enquiryType: initialEnquiryType }));
    }
  }, [initialEnquiryType]);

  if (!isEnquiryModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const cleanName = sanitizeHtml(formData.name);
    const cleanPhone = sanitizePhone(formData.phone);
    const cleanEmail = sanitizeHtml(formData.email);
    const cleanSubject = sanitizeHtml(formData.subject);
    const cleanMessage = sanitizeHtml(formData.message);

    if (!cleanName || cleanName.length < 2) {
      setValidationError('Please provide a valid name.');
      return;
    }

    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 8) {
      setValidationError('Please provide a valid phone number.');
      return;
    }

    if (cleanEmail && !validateEmail(cleanEmail)) {
      setValidationError('Please provide a valid email address.');
      return;
    }

    if (!cleanMessage || cleanMessage.length < 5) {
      setValidationError('Please write a brief message or enquiry description.');
      return;
    }

    setIsSubmitting(true);
    try {
      const id = await addEnquiry({
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        subject: cleanSubject || `${formData.enquiryType} from ${cleanName}`,
        enquiryType: formData.enquiryType as Enquiry['enquiryType'],
        message: cleanMessage
      });
      setGeneratedId(id);
    } catch (err) {
      console.error(err);
      setValidationError('An error occurred while submitting your enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsEnquiryModalOpen(false);
    setGeneratedId(null);
    setValidationError('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      enquiryType: 'General Enquiry',
      message: ''
    });
  };

  const hotelWhatsAppPhone = contact.whatsapp || '+919415204991';
  const customerWhatsAppMessage = `*New Customer Enquiry - Hotel D C Grand*%0A%0A*Reference:* ${generatedId}%0A*Name:* ${formData.name}%0A*Type:* ${formData.enquiryType}%0A*Subject:* ${formData.subject || 'General Enquiry'}%0A*Message:* ${formData.message}%0A%0ANamaste! I submitted this enquiry on your website. Please advise.`;

  const customerEmailSubject = `Customer Enquiry [Ref: ${generatedId}] - ${formData.name}`;
  const customerEmailBody = `Dear Hotel D C Grand Management,

Reference ID: ${generatedId}
Name: ${formData.name}
Phone: ${formData.phone}
Type: ${formData.enquiryType}
Subject: ${formData.subject || 'General Enquiry'}

Message:
${formData.message}

Please get back to me at your earliest convenience.

Warm regards,
${formData.name}`;

  const customerWhatsAppLink = createWhatsAppLink(hotelWhatsAppPhone, decodeURIComponent(customerWhatsAppMessage));
  const customerEmailLink = createMailtoLink(contact.email || 'info@hoteldcgrand.com', customerEmailSubject, customerEmailBody);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#08090b]/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-xl bg-[#13151f] rounded-3xl border border-[#c5a880]/40 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-b from-[#181b27] to-[#13151f] border-b border-[#2a2723] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c5a880]/20 flex items-center justify-center text-[#c5a880]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a880] block font-semibold">
                  D C Grand Front Office
                </span>
                <h2 className="font-serif-luxury text-2xl text-[#f3e5d0]">
                  Send an Enquiry
                </h2>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-[#0c0d10]/60 text-[#a09a8e] hover:text-[#f3e5d0] flex items-center justify-center transition-colors"
              aria-label="Close modal"
              id="close-enquiry-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {generatedId ? (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#c5a880]/20 border border-[#c5a880] text-[#c5a880] flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-2">
                  Enquiry Received
                </h3>
                <p className="text-xs text-[#a09a8e] max-w-md mx-auto mb-6">
                  Thank you for reaching out to D C Grand. Your enquiry has been registered and assigned to our guest relations team.
                </p>

                <div className="p-4 rounded-xl bg-[#0c0d10] border border-[#c5a880]/30 max-w-sm mx-auto mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#777166] block">
                    Your Reference ID
                  </span>
                  <span className="text-lg font-mono font-bold text-[#c5a880]">
                    {generatedId}
                  </span>
                </div>

                <div className="space-y-3 max-w-sm mx-auto mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Direct WhatsApp */}
                    <a
                      href={customerWhatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0c0d10] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-colors"
                      id="enquiry-confirm-whatsapp-btn"
                    >
                      <MessageCircle className="w-4 h-4 text-[#0c0d10]" />
                      <span>WhatsApp Us</span>
                    </a>

                    {/* Direct Email */}
                    <a
                      href={customerEmailLink}
                      className="py-2.5 px-3 rounded-xl bg-[#1d2232] hover:bg-[#262c40] text-[#f3e5d0] border border-[#3b435c] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                      id="enquiry-confirm-email-btn"
                    >
                      <Mail className="w-4 h-4 text-[#c5a880]" />
                      <span>Email Us</span>
                    </a>
                  </div>

                  <div className="text-center pt-1">
                    <a
                      href={`tel:${hotelWhatsAppPhone}`}
                      className="text-xs text-[#a09a8e] hover:text-[#f3e5d0] transition-colors inline-flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>Call Front Desk: <strong>{contact.phone}</strong></span>
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="px-8 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bf9a] transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {validationError && (
                  <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-800 text-xs text-rose-300">
                    {validationError}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                      Enquiry Category *
                    </label>
                    <select
                      value={formData.enquiryType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          enquiryType: e.target.value as Enquiry['enquiryType']
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none transition-colors"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Room Enquiry">Room Enquiry</option>
                      <option value="Restaurant Enquiry">Food Express Restaurant</option>
                      <option value="Meeting / Event Enquiry">Meeting / Banquet Event</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief description of your request"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                    Detailed Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify dates, number of guests, or specific requirements..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] focus:border-[#c5a880] text-sm text-[#f3e5d0] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b39366] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    id="submit-enquiry-form-btn"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Enquiry'}</span>
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

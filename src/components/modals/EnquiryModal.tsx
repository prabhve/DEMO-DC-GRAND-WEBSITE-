import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  CheckCircle2,
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

  useEffect(() => {
    if (!isEnquiryModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsEnquiryModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnquiryModalOpen, setIsEnquiryModalOpen]);

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

  const hotelWhatsAppPhone = contact.whatsapp || '+917084003000';
  const customerWhatsAppMessage = `*New Customer Enquiry - Hotel D.C. Grand*%0A%0A*Reference:* ${generatedId}%0A*Name:* ${formData.name}%0A*Type:* ${formData.enquiryType}%0A*Subject:* ${formData.subject || 'General Enquiry'}%0A*Message:* ${formData.message}%0A%0ANamaste! I submitted this enquiry on your website. Please advise.`;

  const customerEmailSubject = `Customer Enquiry [Ref: ${generatedId}] - ${formData.name}`;
  const customerEmailBody = `Dear Hotel D.C. Grand Management,

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
  const customerEmailLink = createMailtoLink(contact.email || 'hoteldcgrand@gmail.com', customerEmailSubject, customerEmailBody);

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Send an Enquiry to Hotel D.C. Grand"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#161412]/92 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-xl bg-[#201D19] text-[#F5F1E9] border border-[#D9D1C5]/25 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="p-6 bg-[#161412] border-b border-[#D9D1C5]/15 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#B69A69] block font-medium mb-1">
                D.C. Grand Concierge & Events Desk
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#F5F1E9]">
                Submit a Custom Inquiry
              </h2>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-10 h-10 bg-[#201D19] border border-[#D9D1C5]/20 text-[#D9D1C5] hover:text-[#B69A69] hover:border-[#B69A69] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
              id="close-enquiry-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            {generatedId ? (
              /* Success State */
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-[#B69A69]/15 border border-[#B69A69] text-[#B69A69] flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif-luxury text-3xl text-[#F5F1E9] mb-2">
                  Inquiry Registered
                </h3>
                <p className="text-xs sm:text-sm text-[#D9D1C5]/80 max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you for reaching out to Hotel D.C. Grand. Your inquiry has been assigned to our guest relations team.
                </p>

                <div className="p-4 bg-[#161412] border border-[#D9D1C5]/20 max-w-sm mx-auto mb-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D9D1C5]/60 block mb-1">
                    Reference ID
                  </span>
                  <span className="text-lg font-mono font-semibold text-[#B69A69] tabular-nums">
                    {generatedId}
                  </span>
                </div>

                <div className="space-y-3 max-w-sm mx-auto mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={customerWhatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 bg-[#536E68] hover:bg-[#617f78] text-[#F5F1E9] font-semibold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors"
                      id="enquiry-confirm-whatsapp-btn"
                    >
                      <MessageCircle className="w-4 h-4 text-[#B69A69]" />
                      <span>WhatsApp Us</span>
                    </a>

                    <a
                      href={customerEmailLink}
                      className="py-3 px-4 bg-[#161412] hover:border-[#B69A69] text-[#F5F1E9] border border-[#D9D1C5]/25 font-semibold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors"
                      id="enquiry-confirm-email-btn"
                    >
                      <Mail className="w-4 h-4 text-[#B69A69]" />
                      <span>Email Us</span>
                    </a>
                  </div>

                  <div className="text-center pt-1">
                    <a
                      href={`tel:${hotelWhatsAppPhone}`}
                      className="text-xs text-[#D9D1C5]/80 hover:text-[#F5F1E9] transition-colors inline-flex items-center gap-1.5 tabular-nums"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#B69A69]" />
                      <span>Call Front Desk: <strong>{contact.phone}</strong></span>
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="px-8 py-3 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] font-semibold text-xs uppercase tracking-[0.18em] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {validationError && (
                  <div className="p-3.5 bg-rose-950/70 border border-rose-800 text-xs text-rose-200">
                    {validationError}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-4 py-2.5 bg-[#161412] border border-[#D9D1C5]/20 focus:border-[#B69A69] text-sm text-[#F5F1E9] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 bg-[#161412] border border-[#D9D1C5]/20 focus:border-[#B69A69] text-sm text-[#F5F1E9] focus:outline-none transition-colors tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 bg-[#161412] border border-[#D9D1C5]/20 focus:border-[#B69A69] text-sm text-[#F5F1E9] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                      Inquiry Category *
                    </label>
                    <select
                      value={formData.enquiryType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          enquiryType: e.target.value as Enquiry['enquiryType']
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#161412] border border-[#D9D1C5]/20 focus:border-[#B69A69] text-sm text-[#F5F1E9] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="General Enquiry" className="bg-[#201D19]">General Enquiry</option>
                      <option value="Room Enquiry" className="bg-[#201D19]">Room Enquiry</option>
                      <option value="Restaurant Enquiry" className="bg-[#201D19]">Food Express Restaurant</option>
                      <option value="Meeting / Event Enquiry" className="bg-[#201D19]">Meeting / Banquet Event</option>
                      <option value="Other" className="bg-[#201D19]">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief description of your request"
                    className="w-full px-4 py-2.5 bg-[#161412] border border-[#D9D1C5]/20 focus:border-[#B69A69] text-sm text-[#F5F1E9] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/75 mb-1.5 font-medium">
                    Detailed Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify dates, number of guests, or catering/banquet requirements..."
                    className="w-full px-4 py-2.5 bg-[#161412] border border-[#D9D1C5]/20 focus:border-[#B69A69] text-sm text-[#F5F1E9] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    id="submit-enquiry-form-btn"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
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

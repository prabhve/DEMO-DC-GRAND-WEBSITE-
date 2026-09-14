import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Enquiry } from '../../types/hotel';

export const EnquiryModal: React.FC = () => {
  const { isEnquiryModalOpen, setIsEnquiryModalOpen, initialEnquiryType, addEnquiry } = useHotel();

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

  useEffect(() => {
    if (initialEnquiryType) {
      setFormData((prev) => ({ ...prev, enquiryType: initialEnquiryType }));
    }
  }, [initialEnquiryType]);

  if (!isEnquiryModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    setIsSubmitting(true);
    try {
      const id = await addEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject || `${formData.enquiryType} from ${formData.name}`,
        enquiryType: formData.enquiryType as Enquiry['enquiryType'],
        message: formData.message
      });
      setGeneratedId(id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsEnquiryModalOpen(false);
    setGeneratedId(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      enquiryType: 'General Enquiry',
      message: ''
    });
  };

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

                <div className="p-4 rounded-xl bg-[#0c0d10] border border-[#c5a880]/30 max-w-sm mx-auto mb-8">
                  <span className="text-[10px] uppercase tracking-widest text-[#777166] block">
                    Your Reference ID
                  </span>
                  <span className="text-lg font-mono font-bold text-[#c5a880]">
                    {generatedId}
                  </span>
                </div>

                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bf9a] transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-4">
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

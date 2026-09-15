import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { HotelPolicies } from '../../../types/hotel';

interface PoliciesCmsTabProps {
  policies: HotelPolicies;
  updatePolicies: (data: Partial<HotelPolicies>) => void;
  triggerToast: (msg: string) => void;
}

export const PoliciesCmsTab: React.FC<PoliciesCmsTabProps> = ({
  policies,
  updatePolicies,
  triggerToast
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#202330] pb-4">
        <div>
          <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
            Hotel Policies CMS
          </h2>
          <p className="text-xs text-[#a09a8e]">
            Edit cancellation rules, child stay guidelines, check-in requirements, and legal terms.
          </p>
        </div>

        <button
          onClick={() => triggerToast('Hotel policies updated successfully!')}
          className="px-5 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bf9a] transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Policies</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-5 text-xs">
        <div>
          <label className="block mb-1.5 uppercase tracking-wider text-[#a09a8e] font-semibold">
            Cancellation & Refund Policy
          </label>
          <textarea
            rows={4}
            value={policies.cancellation}
            onChange={(e) => updatePolicies({ cancellation: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0] leading-relaxed"
          />
        </div>

        <div>
          <label className="block mb-1.5 uppercase tracking-wider text-[#a09a8e] font-semibold">
            Child & Extra Bed Policy
          </label>
          <textarea
            rows={4}
            value={policies.childPolicy}
            onChange={(e) => updatePolicies({ childPolicy: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0] leading-relaxed"
          />
        </div>

        <div>
          <label className="block mb-1.5 uppercase tracking-wider text-[#a09a8e] font-semibold">
            Check-In & Hotel Guidelines
          </label>
          <textarea
            rows={4}
            value={policies.hotelPolicy}
            onChange={(e) => updatePolicies({ hotelPolicy: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0] leading-relaxed"
          />
        </div>

        <div>
          <label className="block mb-1.5 uppercase tracking-wider text-[#a09a8e] font-semibold">
            Terms & Conditions
          </label>
          <textarea
            rows={4}
            value={policies.termsAndConditions}
            onChange={(e) => updatePolicies({ termsAndConditions: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0] leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};

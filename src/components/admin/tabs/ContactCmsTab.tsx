import React, { useState } from 'react';
import { Phone, Plus, Trash2, CheckCircle2, MapPin, ExternalLink, Compass } from 'lucide-react';
import { ContactData, LandmarkItem } from '../../../types/hotel';

interface ContactCmsTabProps {
  contact: ContactData;
  updateContact: (data: Partial<ContactData>) => void;
  triggerToast: (msg: string) => void;
}

export const ContactCmsTab: React.FC<ContactCmsTabProps> = ({
  contact,
  updateContact,
  triggerToast
}) => {
  const [newLandmark, setNewLandmark] = useState<Omit<LandmarkItem, 'id'>>({
    name: '',
    distance: '',
    duration: '',
    category: 'Temple',
    description: ''
  });
  const [isAddingLandmark, setIsAddingLandmark] = useState(false);

  const landmarks = contact.landmarks || [];

  const handleAddLandmark = () => {
    if (!newLandmark.name.trim()) return;
    const newItem: LandmarkItem = {
      ...newLandmark,
      id: `lm-${Date.now()}`
    };
    updateContact({ landmarks: [...landmarks, newItem] });
    setNewLandmark({
      name: '',
      distance: '',
      duration: '',
      category: 'Temple',
      description: ''
    });
    setIsAddingLandmark(false);
    triggerToast('Added landmark to proximity list');
  };

  const handleRemoveLandmark = (id: string) => {
    updateContact({ landmarks: landmarks.filter((l) => l.id !== id) });
    triggerToast('Removed landmark');
  };

  const handleUpdateLandmark = (index: number, updated: LandmarkItem) => {
    const list = [...landmarks];
    list[index] = updated;
    updateContact({ landmarks: list });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#202330] pb-4">
        <div>
          <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
            Contact & Proximity CMS
          </h2>
          <p className="text-xs text-[#a09a8e]">
            Manage hotel phone numbers, WhatsApp, email, street address, operating check-in hours, and temple distances.
          </p>
        </div>

        <button
          onClick={() => triggerToast('Contact parameters updated successfully!')}
          className="px-5 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bf9a] transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Contact Details</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-6 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-[#a09a8e] font-medium uppercase tracking-wider">
              Hotel Title / Display Name
            </label>
            <input
              type="text"
              value={contact.hotelName || 'D C Grand'}
              onChange={(e) => updateContact({ hotelName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
            />
          </div>

          <div>
            <label className="block mb-1 text-[#a09a8e] font-medium uppercase tracking-wider">
              Tagline / Subheading
            </label>
            <input
              type="text"
              value={contact.hotelTagline || 'Bhelupur, Varanasi'}
              onChange={(e) => updateContact({ hotelTagline: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-[#a09a8e] font-medium uppercase tracking-wider">
            Full Postal Address Line
          </label>
          <input
            type="text"
            value={contact.address}
            onChange={(e) => updateContact({ address: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-[#a09a8e] font-medium uppercase tracking-wider">
              Primary Phone Number
            </label>
            <input
              type="text"
              value={contact.phone}
              onChange={(e) => updateContact({ phone: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
            />
          </div>

          <div>
            <label className="block mb-1 text-[#a09a8e] font-medium uppercase tracking-wider">
              WhatsApp Support Number
            </label>
            <input
              type="text"
              value={contact.whatsapp}
              onChange={(e) => updateContact({ whatsapp: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-[#a09a8e] font-medium uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => updateContact({ email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
            />
          </div>

          <div>
            <label className="block mb-1 text-[#a09a8e] font-medium uppercase tracking-wider">
              Standard Check-In Time
            </label>
            <input
              type="text"
              value={contact.checkInTime || '12:00 PM'}
              onChange={(e) => updateContact({ checkInTime: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
            />
          </div>

          <div>
            <label className="block mb-1 text-[#a09a8e] font-medium uppercase tracking-wider">
              Standard Check-Out Time
            </label>
            <input
              type="text"
              value={contact.checkOutTime || '11:00 AM'}
              onChange={(e) => updateContact({ checkOutTime: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-[#a09a8e] font-medium uppercase tracking-wider">
            Google Maps Direct Destination URL
          </label>
          <input
            type="url"
            value={contact.mapUrl}
            onChange={(e) => updateContact({ mapUrl: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-[#a09a8e] font-medium uppercase tracking-wider">
              Google Review Profile Link
            </label>
            <input
              type="url"
              value={contact.googleReviewUrl || ''}
              onChange={(e) => updateContact({ googleReviewUrl: e.target.value })}
              placeholder="https://g.page/r/..."
              className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
            />
          </div>

          <div>
            <label className="block mb-1 text-[#a09a8e] font-medium uppercase tracking-wider">
              TripAdvisor Profile Link
            </label>
            <input
              type="url"
              value={contact.tripAdvisorUrl || ''}
              onChange={(e) => updateContact({ tripAdvisorUrl: e.target.value })}
              placeholder="https://tripadvisor.in/..."
              className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
            />
          </div>
        </div>

        {/* Landmarks / Proximity Manager */}
        <div className="p-4 rounded-xl bg-[#090a0e] border border-[#1f222e] space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#c5a880] flex items-center gap-2">
                <Compass className="w-4 h-4" />
                <span>Nearby Landmarks & Transit Proximity ({landmarks.length})</span>
              </span>
              <p className="text-[11px] text-[#716d64] mt-0.5">
                Displays distances from D C Grand to Ghats, Temples, Railway Stations, and Airports.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddingLandmark(!isAddingLandmark)}
              className="px-3 py-1.5 rounded-lg bg-[#c5a880] text-[#0c0d10] font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Landmark</span>
            </button>
          </div>

          {/* New Landmark Form */}
          {isAddingLandmark && (
            <div className="p-4 rounded-xl bg-[#141620] border border-[#c5a880]/30 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-[#a09a8e] mb-1">Landmark Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Kashi Vishwanath Temple"
                    value={newLandmark.name}
                    onChange={(e) => setNewLandmark({ ...newLandmark, name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                  />
                </div>

                <div>
                  <label className="block text-[#a09a8e] mb-1">Distance</label>
                  <input
                    type="text"
                    placeholder="e.g. 3.5 km"
                    value={newLandmark.distance}
                    onChange={(e) => setNewLandmark({ ...newLandmark, distance: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                  />
                </div>

                <div>
                  <label className="block text-[#a09a8e] mb-1">Estimated Drive Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 15 mins"
                    value={newLandmark.duration}
                    onChange={(e) => setNewLandmark({ ...newLandmark, duration: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                  />
                </div>

                <div>
                  <label className="block text-[#a09a8e] mb-1">Category</label>
                  <select
                    value={newLandmark.category}
                    onChange={(e) => setNewLandmark({ ...newLandmark, category: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                  >
                    <option value="Temple">Temple / Spiritual</option>
                    <option value="Ghat">Ghat / Riverfront</option>
                    <option value="Transit">Transit / Station</option>
                    <option value="Education">University / Culture</option>
                    <option value="Heritage">Heritage & Sightseeing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#a09a8e] mb-1 text-xs">Optional Description</label>
                <input
                  type="text"
                  placeholder="e.g. Sacred jyotirlinga temple in Varanasi"
                  value={newLandmark.description}
                  onChange={(e) => setNewLandmark({ ...newLandmark, description: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingLandmark(false)}
                  className="px-3 py-1 rounded text-xs text-[#a09a8e]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddLandmark}
                  className="px-4 py-1.5 rounded-lg bg-[#c5a880] text-[#0c0d10] font-bold text-xs"
                >
                  Save Landmark
                </button>
              </div>
            </div>
          )}

          {/* Landmarks List */}
          <div className="space-y-2">
            {landmarks.map((lm, index) => (
              <div
                key={lm.id || index}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-[#141620] border border-[#202330]"
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                  <input
                    type="text"
                    value={lm.name}
                    onChange={(e) =>
                      handleUpdateLandmark(index, { ...lm, name: e.target.value })
                    }
                    className="px-2 py-1 rounded bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={lm.distance}
                    onChange={(e) =>
                      handleUpdateLandmark(index, { ...lm, distance: e.target.value })
                    }
                    className="px-2 py-1 rounded bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                    placeholder="Distance"
                  />
                  <input
                    type="text"
                    value={lm.duration}
                    onChange={(e) =>
                      handleUpdateLandmark(index, { ...lm, duration: e.target.value })
                    }
                    className="px-2 py-1 rounded bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                    placeholder="Duration"
                  />
                  <input
                    type="text"
                    value={lm.category}
                    onChange={(e) =>
                      handleUpdateLandmark(index, { ...lm, category: e.target.value })
                    }
                    className="px-2 py-1 rounded bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                    placeholder="Category"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveLandmark(lm.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 self-end sm:self-auto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

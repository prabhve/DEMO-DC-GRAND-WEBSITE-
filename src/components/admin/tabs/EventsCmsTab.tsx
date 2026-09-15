import React, { useState } from 'react';
import { PartyPopper, Plus, Trash2, Edit, X, Sparkles } from 'lucide-react';
import { EventFacilityData } from '../../../types/hotel';
import { MediaUploadInput } from '../MediaUploadInput';

interface EventsCmsTabProps {
  events: EventFacilityData[];
  addEvent: (event: Omit<EventFacilityData, 'id'>) => void;
  updateEvent: (event: EventFacilityData) => void;
  deleteEvent: (id: string) => void;
  triggerToast: (msg: string) => void;
}

export const EventsCmsTab: React.FC<EventsCmsTabProps> = ({
  events,
  addEvent,
  updateEvent,
  deleteEvent,
  triggerToast
}) => {
  const [editingEvent, setEditingEvent] = useState<EventFacilityData | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState<boolean>(false);

  const [newEventData, setNewEventData] = useState<Omit<EventFacilityData, 'id'>>({
    name: '',
    subtitle: 'Contemporary Celebrations & Corporate Events',
    capacity: '150 - 200 Guests',
    area: '2,200 sq ft',
    description: 'A versatile hall equipped with high-definition projection, acoustic ceiling treatment, and customizable banquet seating for wedding receptions, family functions, and business conferences.',
    timings: 'Flexible Slot Bookings (Morning, Evening, Full Day)',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80'
    ],
    facilities: [
      'State-of-the-art Sound System',
      'Dual HD Projectors & Screens',
      'High-Speed Wi-Fi',
      'Customized Catering Buffets'
    ],
    seatingFormats: [
      { name: 'Theater Style', capacity: '180 Guests' },
      { name: 'Banquet Round', capacity: '120 Guests' },
      { name: 'U-Shape Boardroom', capacity: '45 Guests' }
    ]
  });

  const [newFacilityInput, setNewFacilityInput] = useState('');
  const [newFormatName, setNewFormatName] = useState('');
  const [newFormatCapacity, setNewFormatCapacity] = useState('');
  const [newPhotoInput, setNewPhotoInput] = useState('');

  const handleAddFacilityToEditing = (fac: string) => {
    if (!editingEvent || !fac.trim()) return;
    setEditingEvent({
      ...editingEvent,
      facilities: [...(editingEvent.facilities || []), fac.trim()]
    });
    setNewFacilityInput('');
  };

  const handleRemoveFacilityFromEditing = (idx: number) => {
    if (!editingEvent) return;
    setEditingEvent({
      ...editingEvent,
      facilities: editingEvent.facilities.filter((_, i) => i !== idx)
    });
  };

  const handleAddFormatToEditing = () => {
    if (!editingEvent || !newFormatName.trim()) return;
    setEditingEvent({
      ...editingEvent,
      seatingFormats: [
        ...(editingEvent.seatingFormats || []),
        { name: newFormatName.trim(), capacity: newFormatCapacity.trim() || 'Custom' }
      ]
    });
    setNewFormatName('');
    setNewFormatCapacity('');
  };

  const handleRemoveFormatFromEditing = (idx: number) => {
    if (!editingEvent) return;
    setEditingEvent({
      ...editingEvent,
      seatingFormats: (editingEvent.seatingFormats || []).filter((_, i) => i !== idx)
    });
  };

  const handleAddPhotoToEditing = (url: string) => {
    if (!editingEvent || !url.trim()) return;
    setEditingEvent({
      ...editingEvent,
      images: [...(editingEvent.images || []), url.trim()]
    });
    setNewPhotoInput('');
    triggerToast('Added photo to venue');
  };

  const handleRemovePhotoFromEditing = (idx: number) => {
    if (!editingEvent) return;
    setEditingEvent({
      ...editingEvent,
      images: editingEvent.images.filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#202330] pb-4">
        <div>
          <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
            Banquets & Meeting Spaces CMS
          </h2>
          <p className="text-xs text-[#a09a8e]">
            Manage celebration halls, boardrooms, capacity limits, seating charts, and photography.
          </p>
        </div>

        <button
          onClick={() => setIsAddingEvent(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bf9a] transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Venue Space</span>
        </button>
      </div>

      {/* ADD NEW EVENT SPACE */}
      {isAddingEvent && (
        <div className="p-6 rounded-2xl bg-[#141620] border border-[#c5a880]/40 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#242838] pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#f3e5d0] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c5a880]" />
              <span>Create New Event Space</span>
            </h3>
            <button
              onClick={() => setIsAddingEvent(false)}
              className="text-[#a09a8e] hover:text-[#f3e5d0]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block mb-1 text-[#a09a8e]">Hall / Room Name *</label>
              <input
                type="text"
                placeholder="e.g. Ganga Ballroom"
                value={newEventData.name}
                onChange={(e) => setNewEventData({ ...newEventData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
              />
            </div>

            <div>
              <label className="block mb-1 text-[#a09a8e]">Capacity</label>
              <input
                type="text"
                placeholder="e.g. Up to 150 Guests"
                value={newEventData.capacity}
                onChange={(e) => setNewEventData({ ...newEventData, capacity: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
              />
            </div>

            <div>
              <label className="block mb-1 text-[#a09a8e]">Floor Area</label>
              <input
                type="text"
                placeholder="e.g. 1,800 sq ft"
                value={newEventData.area}
                onChange={(e) => setNewEventData({ ...newEventData, area: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-xs text-[#a09a8e]">Venue Description</label>
            <textarea
              rows={3}
              value={newEventData.description}
              onChange={(e) => setNewEventData({ ...newEventData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
            />
          </div>

          <MediaUploadInput
            label="Initial Venue Photo"
            value={newEventData.images?.[0] || ''}
            onChange={(url) => setNewEventData({ ...newEventData, images: [url] })}
            placeholder="Paste URL, upload photo, or pick curated events photo"
            previewHeightClass="h-36"
          />

          <div className="flex justify-end gap-3 pt-3 border-t border-[#242838]">
            <button
              onClick={() => setIsAddingEvent(false)}
              className="px-4 py-2 rounded-xl text-xs text-[#a09a8e] hover:text-[#f3e5d0]"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!newEventData.name) return;
                addEvent(newEventData);
                setIsAddingEvent(false);
                triggerToast(`Venue "${newEventData.name}" created!`);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase"
            >
              Save Venue
            </button>
          </div>
        </div>
      )}

      {/* VENUES LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((evt) => (
          <div key={evt.id} className="rounded-2xl overflow-hidden border border-[#202330] bg-[#12141c]">
            <div className="relative h-44 bg-[#0c0d10]">
              <img src={evt.images?.[0]} alt={evt.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-serif-luxury text-xl text-[#f3e5d0]">{evt.name}</h3>
                <p className="text-xs text-[#a09a8e]">{evt.capacity} • {evt.area}</p>
              </div>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <p className="text-[#a09a8e] line-clamp-2 leading-relaxed">{evt.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-[#1c1e29]">
                <span className="text-[11px] text-[#716d64]">
                  {evt.images?.length || 0} Photos • {evt.seatingFormats?.length || 0} Formats
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingEvent(evt)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#c5a880]/15 text-[#c5a880] font-semibold hover:bg-[#c5a880] hover:text-[#0c0d10] transition-all"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Space</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete venue "${evt.name}"?`)) {
                        deleteEvent(evt.id);
                        triggerToast(`Deleted ${evt.name}`);
                      }
                    }}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT VENUE MODAL */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-3xl my-auto p-6 sm:p-8 rounded-3xl bg-[#141620] border border-[#c5a880]/40 max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#26293a] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold block">
                  Editing Venue Space
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#f3e5d0]">
                  {editingEvent.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingEvent(null)}
                className="p-2 rounded-xl bg-[#0c0d10] text-[#a09a8e] hover:text-[#f3e5d0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block mb-1 text-[#a09a8e]">Space Name</label>
                <input
                  type="text"
                  value={editingEvent.name}
                  onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                />
              </div>

              <div>
                <label className="block mb-1 text-[#a09a8e]">Capacity</label>
                <input
                  type="text"
                  value={editingEvent.capacity}
                  onChange={(e) => setEditingEvent({ ...editingEvent, capacity: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                />
              </div>

              <div>
                <label className="block mb-1 text-[#a09a8e]">Floor Area</label>
                <input
                  type="text"
                  value={editingEvent.area}
                  onChange={(e) => setEditingEvent({ ...editingEvent, area: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-xs text-[#a09a8e]">Description</label>
              <textarea
                rows={3}
                value={editingEvent.description}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
              />
            </div>

            {/* Photos Manager */}
            <div className="p-4 rounded-xl bg-[#0c0d10] border border-[#202330] space-y-3">
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#c5a880]">
                Venue Photos ({editingEvent.images?.length || 0})
              </label>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {editingEvent.images?.map((url, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden group border border-[#252838]">
                    <img src={url} alt={`Venue photo ${i + 1}`} className="w-full h-20 object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhotoFromEditing(i)}
                      className="absolute top-1 right-1 p-1 rounded bg-black/80 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#1a1d28]">
                <MediaUploadInput
                  label="Add Photo to Venue"
                  value={newPhotoInput}
                  onChange={(url) => handleAddPhotoToEditing(url)}
                  placeholder="Paste URL, upload photo, or pick curated photo"
                  previewHeightClass="h-28"
                />
              </div>
            </div>

            {/* Facilities Tags */}
            <div className="p-4 rounded-xl bg-[#0c0d10] border border-[#202330] space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#c5a880] block">
                Venue Equipment & Features
              </span>

              <div className="flex flex-wrap gap-2">
                {editingEvent.facilities?.map((fac, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141620] border border-[#2a2e3f] text-xs text-[#f3e5d0]"
                  >
                    <span>{fac}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFacilityFromEditing(idx)}
                      className="text-[#716d64] hover:text-rose-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newFacilityInput}
                  onChange={(e) => setNewFacilityInput(e.target.value)}
                  placeholder="Add feature (e.g. Stage lighting, Podium, Live streaming)..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#141620] border border-[#2a2723] text-xs text-[#f3e5d0]"
                />
                <button
                  type="button"
                  onClick={() => handleAddFacilityToEditing(newFacilityInput)}
                  className="px-3 py-1.5 rounded-lg bg-[#c5a880] text-[#0c0d10] font-bold text-xs"
                >
                  Add Feature
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3 pt-3 border-t border-[#26293a]">
              <button
                onClick={() => setEditingEvent(null)}
                className="px-4 py-2 rounded-xl text-xs text-[#a09a8e]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateEvent(editingEvent);
                  setEditingEvent(null);
                  triggerToast(`Updated ${editingEvent.name}!`);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase"
              >
                Save Venue Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

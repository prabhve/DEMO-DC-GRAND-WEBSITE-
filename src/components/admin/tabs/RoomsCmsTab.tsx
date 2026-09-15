import React, { useState } from 'react';
import { Plus, X, Trash2, Edit, Check, Eye, EyeOff, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Room } from '../../../types/hotel';
import { MediaUploadInput } from '../MediaUploadInput';

interface RoomsCmsTabProps {
  rooms: Room[];
  addRoom: (room: Omit<Room, 'id' | 'slug'>) => void;
  updateRoom: (room: Room) => void;
  deleteRoom: (id: string) => void;
  toggleRoomActive: (id: string) => void;
  triggerToast: (msg: string) => void;
}

export const RoomsCmsTab: React.FC<RoomsCmsTabProps> = ({
  rooms,
  addRoom,
  updateRoom,
  deleteRoom,
  toggleRoomActive,
  triggerToast
}) => {
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isAddingRoom, setIsAddingRoom] = useState<boolean>(false);

  // New room draft state
  const [newRoomData, setNewRoomData] = useState<Omit<Room, 'id' | 'slug'>>({
    name: '',
    size: '220 sq ft / 20 sq mt',
    maxGuests: 3,
    bed: '1 King Bed',
    bathrooms: 1,
    view: 'City & Garden View',
    description: 'Elegantly appointed guest chamber with handcrafted furnishings, premium linens, soundproofing, and a lavish en-suite bathroom.',
    amenities: ['High-speed Wi-Fi', 'Individual AC', 'In-Room Refrigerator', 'Electric Kettle', 'Power Backup'],
    features: ['Soundproof Windows', 'Writing Desk', 'Rain Shower'],
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80',
    isFeatured: true,
    isActive: true,
    displayOrder: rooms.length + 1
  });

  // Helper states for tags
  const [newAmenityInput, setNewAmenityInput] = useState('');
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [newGalleryPhotoUrl, setNewGalleryPhotoUrl] = useState('');

  const handleAddAmenityToEditing = (amenity: string) => {
    if (!editingRoom || !amenity.trim()) return;
    setEditingRoom({
      ...editingRoom,
      amenities: [...(editingRoom.amenities || []), amenity.trim()]
    });
    setNewAmenityInput('');
  };

  const handleRemoveAmenityFromEditing = (index: number) => {
    if (!editingRoom) return;
    setEditingRoom({
      ...editingRoom,
      amenities: editingRoom.amenities.filter((_, i) => i !== index)
    });
  };

  const handleAddPhotoToEditing = (photoUrl: string) => {
    if (!editingRoom || !photoUrl.trim()) return;
    setEditingRoom({
      ...editingRoom,
      images: [...(editingRoom.images || []), photoUrl.trim()]
    });
    setNewGalleryPhotoUrl('');
    triggerToast('Photo added to room gallery');
  };

  const handleRemovePhotoFromEditing = (index: number) => {
    if (!editingRoom) return;
    setEditingRoom({
      ...editingRoom,
      images: editingRoom.images.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#202330] pb-4">
        <div>
          <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
            Rooms & Accommodations CMS
          </h2>
          <p className="text-xs text-[#a09a8e]">
            Edit room categories, photos, sizes, bedding, virtual tour panoramas, and amenities.
          </p>
        </div>

        <button
          onClick={() => setIsAddingRoom(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bf9a] transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Room Category</span>
        </button>
      </div>

      {/* ADD ROOM MODAL */}
      {isAddingRoom && (
        <div className="p-6 rounded-2xl bg-[#141620] border border-[#c5a880]/40 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#242838] pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#f3e5d0] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c5a880]" />
              <span>Add New Room Category</span>
            </h3>
            <button
              onClick={() => setIsAddingRoom(false)}
              className="text-[#a09a8e] hover:text-[#f3e5d0]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block mb-1 text-[#a09a8e] font-medium">Room Name *</label>
              <input
                type="text"
                value={newRoomData.name}
                onChange={(e) => setNewRoomData({ ...newRoomData, name: e.target.value })}
                placeholder="e.g. Royal Heritage Suite"
                className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
              />
            </div>

            <div>
              <label className="block mb-1 text-[#a09a8e] font-medium">Dimensions (Size) *</label>
              <input
                type="text"
                value={newRoomData.size}
                onChange={(e) => setNewRoomData({ ...newRoomData, size: e.target.value })}
                placeholder="e.g. 240 sq ft / 22 sq mt"
                className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
              />
            </div>

            <div>
              <label className="block mb-1 text-[#a09a8e] font-medium">Bedding Type *</label>
              <input
                type="text"
                value={newRoomData.bed}
                onChange={(e) => setNewRoomData({ ...newRoomData, bed: e.target.value })}
                placeholder="e.g. 1 King Bed or 2 Twin Beds"
                className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
              />
            </div>

            <div>
              <label className="block mb-1 text-[#a09a8e] font-medium">Max Guests *</label>
              <input
                type="number"
                min={1}
                max={10}
                value={newRoomData.maxGuests}
                onChange={(e) =>
                  setNewRoomData({ ...newRoomData, maxGuests: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
              />
            </div>

            <div>
              <label className="block mb-1 text-[#a09a8e] font-medium">Bathrooms</label>
              <input
                type="number"
                min={1}
                max={4}
                value={newRoomData.bathrooms}
                onChange={(e) =>
                  setNewRoomData({ ...newRoomData, bathrooms: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
              />
            </div>

            <div>
              <label className="block mb-1 text-[#a09a8e] font-medium">Window View</label>
              <input
                type="text"
                value={newRoomData.view}
                onChange={(e) => setNewRoomData({ ...newRoomData, view: e.target.value })}
                placeholder="e.g. City & Courtyard View"
                className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-xs text-[#a09a8e] font-medium">Room Description</label>
            <textarea
              rows={3}
              value={newRoomData.description}
              onChange={(e) => setNewRoomData({ ...newRoomData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
            />
          </div>

          {/* Cover Photo Upload for New Room */}
          <MediaUploadInput
            label="Room Cover Photo (Main Card & Hero Banner)"
            value={newRoomData.coverImage}
            onChange={(url) =>
              setNewRoomData({
                ...newRoomData,
                coverImage: url,
                images: newRoomData.images?.length ? newRoomData.images : [url]
              })
            }
            previewHeightClass="h-36"
          />

          <div className="flex justify-end gap-3 pt-3 border-t border-[#242838]">
            <button
              onClick={() => setIsAddingRoom(false)}
              className="px-4 py-2 rounded-xl text-xs text-[#a09a8e] hover:text-[#f3e5d0]"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!newRoomData.name) {
                  alert('Please enter a room name');
                  return;
                }
                addRoom(newRoomData);
                setIsAddingRoom(false);
                triggerToast(`Room "${newRoomData.name}" created!`);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bf9a]"
            >
              Save New Room
            </button>
          </div>
        </div>
      )}

      {/* ROOMS LIST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`rounded-2xl overflow-hidden border transition-all ${
              room.isActive
                ? 'border-[#202330] bg-[#12141c]'
                : 'border-rose-900/30 bg-[#12141c]/50 opacity-70'
            }`}
          >
            <div className="relative h-48 bg-[#0c0d10] overflow-hidden">
              <img
                src={room.coverImage || room.images?.[0]}
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-[#c5a880] font-semibold uppercase tracking-wider border border-[#c5a880]/30">
                  {room.size}
                </span>
                {!room.isActive && (
                  <span className="px-2.5 py-1 rounded-full bg-rose-900/80 text-[10px] text-white font-semibold uppercase tracking-wider">
                    Hidden from guests
                  </span>
                )}
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1">
                <button
                  onClick={() => toggleRoomActive(room.id)}
                  className="p-2 rounded-xl bg-black/70 backdrop-blur-md text-[#f3e5d0] hover:text-[#c5a880]"
                  title={room.isActive ? 'Hide from public view' : 'Make active'}
                >
                  {room.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-rose-400" />}
                </button>
              </div>

              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-serif-luxury text-xl text-[#f3e5d0]">{room.name}</h3>
                <p className="text-xs text-[#a09a8e] truncate">{room.bed} • Max {room.maxGuests} Guests</p>
              </div>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <p className="text-[#a09a8e] line-clamp-2 leading-relaxed">{room.description}</p>

              {/* Amenity tags preview */}
              <div className="flex flex-wrap gap-1.5">
                {room.amenities?.slice(0, 4).map((a, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-[#0c0d10] text-[#c5a880] border border-[#202330] text-[10px]"
                  >
                    {a}
                  </span>
                ))}
                {(room.amenities?.length || 0) > 4 && (
                  <span className="text-[10px] text-[#716d64] self-center">
                    +{(room.amenities?.length || 0) - 4} more
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1c1e29]">
                <span className="text-[11px] text-[#716d64]">
                  {room.images?.length || 0} Gallery Photos
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingRoom(room)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#c5a880]/15 text-[#c5a880] hover:bg-[#c5a880] hover:text-[#0c0d10] font-semibold text-xs transition-all"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Everything</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete room category "${room.name}"?`)) {
                        deleteRoom(room.id);
                        triggerToast(`Room "${room.name}" removed`);
                      }
                    }}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40"
                    title="Delete Room"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULL EDITING MODAL */}
      {editingRoom && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-3xl my-auto p-6 sm:p-8 rounded-3xl bg-[#141620] border border-[#c5a880]/40 max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#26293a] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold block">
                  Editing Room Category
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#f3e5d0]">
                  {editingRoom.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingRoom(null)}
                className="p-2 rounded-xl bg-[#0c0d10] text-[#a09a8e] hover:text-[#f3e5d0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Room Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block mb-1 text-[#a09a8e] font-medium">Room Name</label>
                <input
                  type="text"
                  value={editingRoom.name}
                  onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                />
              </div>

              <div>
                <label className="block mb-1 text-[#a09a8e] font-medium">Dimensions / Size</label>
                <input
                  type="text"
                  value={editingRoom.size}
                  onChange={(e) => setEditingRoom({ ...editingRoom, size: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                />
              </div>

              <div>
                <label className="block mb-1 text-[#a09a8e] font-medium">Bedding Type</label>
                <input
                  type="text"
                  value={editingRoom.bed}
                  onChange={(e) => setEditingRoom({ ...editingRoom, bed: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                />
              </div>

              <div>
                <label className="block mb-1 text-[#a09a8e] font-medium">Max Guests</label>
                <input
                  type="number"
                  value={editingRoom.maxGuests}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, maxGuests: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                />
              </div>

              <div>
                <label className="block mb-1 text-[#a09a8e] font-medium">Bathrooms</label>
                <input
                  type="number"
                  value={editingRoom.bathrooms}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, bathrooms: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                />
              </div>

              <div>
                <label className="block mb-1 text-[#a09a8e] font-medium">Window View</label>
                <input
                  type="text"
                  value={editingRoom.view}
                  onChange={(e) => setEditingRoom({ ...editingRoom, view: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-xs text-[#a09a8e] font-medium">Full Description</label>
              <textarea
                rows={3}
                value={editingRoom.description}
                onChange={(e) =>
                  setEditingRoom({ ...editingRoom, description: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
              />
            </div>

            {/* Room Cover Photo */}
            <div className="p-4 rounded-xl bg-[#0c0d10] border border-[#202330]">
              <MediaUploadInput
                label="Primary Room Cover Photo"
                value={editingRoom.coverImage || ''}
                onChange={(url) => setEditingRoom({ ...editingRoom, coverImage: url })}
                helperText="Main featured photo for the room card and booking modals."
                previewHeightClass="h-40"
              />
            </div>

            {/* Room Photos Gallery */}
            <div className="p-4 rounded-xl bg-[#0c0d10] border border-[#202330] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#c5a880]">
                  Room Photo Gallery ({editingRoom.images?.length || 0} Photos)
                </span>
              </div>

              {/* Thumbnails list */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {editingRoom.images?.map((imgUrl, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden group border border-[#252838]">
                    <img src={imgUrl} alt={`Room photo ${i + 1}`} className="w-full h-20 object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhotoFromEditing(i)}
                      className="absolute top-1 right-1 p-1 rounded bg-black/80 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {editingRoom.coverImage === imgUrl && (
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-[#c5a880] text-[#0c0d10] text-[8px] font-bold uppercase">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Add photo to room */}
              <div className="pt-2 border-t border-[#1a1d28]">
                <MediaUploadInput
                  label="Add Another Photo to Room Gallery"
                  value={newGalleryPhotoUrl}
                  onChange={(url) => handleAddPhotoToEditing(url)}
                  placeholder="Paste URL, upload file, or choose curated photo"
                  previewHeightClass="h-28"
                />
              </div>
            </div>

            {/* 360 Virtual Tour Panorama */}
            <div className="p-4 rounded-xl bg-[#0c0d10] border border-[#202330]">
              <MediaUploadInput
                label="360° Virtual Tour Panorama Image URL"
                value={editingRoom.panoramaImage || ''}
                onChange={(url) => setEditingRoom({ ...editingRoom, panoramaImage: url })}
                placeholder="Equirectangular 360° panorama photo URL"
                helperText="Used by the interactive 3D virtual tour viewer for this room."
                previewHeightClass="h-28"
              />
            </div>

            {/* Amenities Tags Manager */}
            <div className="p-4 rounded-xl bg-[#0c0d10] border border-[#202330] space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#c5a880] block">
                Amenities & Features Tags
              </span>

              <div className="flex flex-wrap gap-2">
                {editingRoom.amenities?.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141620] border border-[#2a2e3f] text-xs text-[#f3e5d0]"
                  >
                    <span>{amenity}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAmenityFromEditing(idx)}
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
                  value={newAmenityInput}
                  onChange={(e) => setNewAmenityInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAmenityToEditing(newAmenityInput);
                    }
                  }}
                  placeholder="Add amenity (e.g. Smart Android TV, Hairdryer)..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#141620] border border-[#2a2723] text-xs text-[#f3e5d0]"
                />
                <button
                  type="button"
                  onClick={() => handleAddAmenityToEditing(newAmenityInput)}
                  className="px-3 py-1.5 rounded-lg bg-[#c5a880] text-[#0c0d10] font-bold text-xs"
                >
                  Add Tag
                </button>
              </div>
            </div>

            {/* Save & Cancel */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#26293a]">
              <button
                onClick={() => setEditingRoom(null)}
                className="px-5 py-2.5 rounded-xl text-xs text-[#a09a8e] hover:text-[#f3e5d0]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateRoom(editingRoom);
                  setEditingRoom(null);
                  triggerToast(`Room "${editingRoom.name}" updated successfully!`);
                }}
                className="px-7 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bf9a]"
              >
                Save Room Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

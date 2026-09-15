import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, Edit, X, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { GalleryItem } from '../../../types/hotel';
import { MediaUploadInput } from '../MediaUploadInput';

interface GalleryCmsTabProps {
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  triggerToast: (msg: string) => void;
}

export const GalleryCmsTab: React.FC<GalleryCmsTabProps> = ({
  gallery,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  triggerToast
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  // New photo state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<GalleryItem['category']>('HOTEL');
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');

  const filteredGallery = selectedCategory === 'ALL'
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  const handleCreatePhoto = () => {
    if (!newUrl || !newTitle) {
      alert('Please provide a title and an image URL/file.');
      return;
    }

    addGalleryItem({
      title: newTitle.trim(),
      category: newCategory,
      url: newUrl.trim(),
      caption: newCaption.trim(),
      displayOrder: gallery.length + 1
    });

    setNewTitle('');
    setNewUrl('');
    setNewCaption('');
    setIsAddingPhoto(false);
    triggerToast('New photograph added to hotel gallery!');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#202330] pb-4">
        <div>
          <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
            Photo Gallery & Media Manager
          </h2>
          <p className="text-xs text-[#a09a8e]">
            Upload real photos, select from curated architectural imagery, organize categories, and curate the 3D gallery.
          </p>
        </div>

        <button
          onClick={() => setIsAddingPhoto(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bf9a] transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo Asset</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[#716d64] flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5 text-[#c5a880]" /> Filter:
        </span>
        {['ALL', 'HOTEL', 'ROOMS', 'RESTAURANT', 'MEETINGS & EVENTS', 'ABOUT'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-[#c5a880] text-[#0c0d10] font-bold'
                : 'bg-[#12141c] text-[#a09a8e] hover:text-[#f3e5d0] border border-[#202330]'
            }`}
          >
            {cat} {cat === 'ALL' ? `(${gallery.length})` : `(${gallery.filter((g) => g.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* ADD PHOTO MODAL */}
      {isAddingPhoto && (
        <div className="p-6 rounded-2xl bg-[#141620] border border-[#c5a880]/40 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#242838] pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#f3e5d0] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c5a880]" />
              <span>Add New Photography Asset</span>
            </h3>
            <button
              onClick={() => setIsAddingPhoto(false)}
              className="text-[#a09a8e] hover:text-[#f3e5d0]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block mb-1 text-[#a09a8e]">Photo Title *</label>
              <input
                type="text"
                placeholder="e.g. Ambient Grand Foyer at Dusk"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
              />
            </div>

            <div>
              <label className="block mb-1 text-[#a09a8e]">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as GalleryItem['category'])}
                className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
              >
                <option value="HOTEL">HOTEL</option>
                <option value="ROOMS">ROOMS</option>
                <option value="RESTAURANT">RESTAURANT</option>
                <option value="MEETINGS & EVENTS">MEETINGS & EVENTS</option>
                <option value="ABOUT">ABOUT</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-xs text-[#a09a8e]">Caption / Architectural Note</label>
            <input
              type="text"
              placeholder="e.g. Warm amber chandeliers and Italian marble detailing..."
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
            />
          </div>

          {/* Media Upload */}
          <MediaUploadInput
            label="Image Source (Upload, Paste URL, or Choose Curated)"
            value={newUrl}
            onChange={(url) => setNewUrl(url)}
            placeholder="Paste URL, upload photo from device, or pick curated hotel photo"
            previewHeightClass="h-44"
          />

          <div className="flex justify-end gap-3 pt-3 border-t border-[#242838]">
            <button
              onClick={() => setIsAddingPhoto(false)}
              className="px-4 py-2 rounded-xl text-xs text-[#a09a8e]"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePhoto}
              className="px-6 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase"
            >
              Upload / Add Photo
            </button>
          </div>
        </div>
      )}

      {/* GALLERY GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            className="relative rounded-2xl overflow-hidden border border-[#202330] bg-[#12141c] group flex flex-col justify-between"
          >
            <div className="relative h-44 bg-[#0c0d10] overflow-hidden">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[9px] uppercase tracking-wider text-[#c5a880] font-bold border border-[#c5a880]/30">
                  {item.category}
                </span>
              </div>

              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-1.5 rounded-lg bg-black/80 text-[#c5a880] hover:text-white"
                  title="Edit photo details"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete photo "${item.title}"?`)) {
                      deleteGalleryItem(item.id);
                      triggerToast('Photo deleted from gallery');
                    }
                  }}
                  className="p-1.5 rounded-lg bg-black/80 text-rose-400 hover:text-rose-300"
                  title="Delete photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3">
              <h4 className="text-xs font-semibold text-[#f3e5d0] truncate">{item.title}</h4>
              {item.caption && (
                <p className="text-[10px] text-[#a09a8e] line-clamp-1 mt-0.5">{item.caption}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* EDIT PHOTO MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-xl my-auto p-6 rounded-3xl bg-[#141620] border border-[#c5a880]/40 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#26293a] pb-3">
              <h3 className="font-serif-luxury text-xl text-[#f3e5d0]">
                Edit Photo Details
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-[#a09a8e] hover:text-[#f3e5d0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 text-[#a09a8e]">Photo Title</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                />
              </div>

              <div>
                <label className="block mb-1 text-[#a09a8e]">Category</label>
                <select
                  value={editingItem.category}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      category: e.target.value as GalleryItem['category']
                    })
                  }
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
                <label className="block mb-1 text-[#a09a8e]">Caption / Details</label>
                <input
                  type="text"
                  value={editingItem.caption || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                />
              </div>

              <MediaUploadInput
                label="Replace Image (URL, File Upload, or Curated)"
                value={editingItem.url}
                onChange={(url) => setEditingItem({ ...editingItem, url })}
                previewHeightClass="h-40"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#26293a]">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-xl text-xs text-[#a09a8e]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateGalleryItem(editingItem);
                  setEditingItem(null);
                  triggerToast(`Updated photo "${editingItem.title}"`);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase"
              >
                Save Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Check, Sparkles, X, ExternalLink } from 'lucide-react';

export const CURATED_HOTEL_PHOTOS = [
  {
    name: 'Luxury Hotel Facade',
    category: 'Hotel',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85'
  },
  {
    name: 'Grand Reception & Lobby',
    category: 'Lobby',
    url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Executive Deluxe Bedroom',
    category: 'Rooms',
    url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Presidential Family Suite',
    category: 'Rooms',
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Twin Deluxe Accommodation',
    category: 'Rooms',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Food Express Restaurant',
    category: 'Dining',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Fine Dining Buffet & Dishes',
    category: 'Dining',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Banquet & Celebrations Hall',
    category: 'Events',
    url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Executive Conference Boardroom',
    category: 'Events',
    url: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Sacred Ganga Ghats at Sunrise',
    category: 'Varanasi',
    url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Evening Ganga Aarti Celebration',
    category: 'Varanasi',
    url: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Kashi Heritage Architecture',
    category: 'Varanasi',
    url: 'https://images.unsplash.com/photo-1565018054866-192e44538804?auto=format&fit=crop&w=1200&q=80'
  }
];

interface MediaUploadInputProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helperText?: string;
  previewHeightClass?: string;
}

export const MediaUploadInput: React.FC<MediaUploadInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'https://example.com/photo.jpg or upload below',
  helperText,
  previewHeightClass = 'h-36'
}) => {
  const [showPresets, setShowPresets] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs uppercase tracking-wider text-[#a09a8e]">
            {label}
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-[11px] text-[#c5a880] hover:text-[#e8d7be] flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear Image
            </button>
          )}
        </div>
      )}

      {/* URL Input with Upload & Curated buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none pr-8"
          />
          {value && (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-2 top-2.5 text-[#a09a8e] hover:text-[#f3e5d0]"
              title="Open full image"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          {/* Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-2 rounded-lg bg-[#1a1d26] border border-[#303444] hover:border-[#c5a880]/60 text-[#f3e5d0] text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap"
            title="Upload photo from your computer or phone"
          >
            <Upload className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Upload File</span>
          </button>

          {/* Curated Presets Button */}
          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="px-3 py-2 rounded-lg bg-[#1a1d26] border border-[#303444] hover:border-[#c5a880]/60 text-[#c5a880] text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap"
            title="Choose from high-res curated hotel photos"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Photos</span>
          </button>
        </div>
      </div>

      {helperText && (
        <p className="text-[10px] text-[#716d64] leading-relaxed">
          {helperText}
        </p>
      )}

      {/* Preset Selector Dropdown Grid */}
      {showPresets && (
        <div className="p-3 rounded-xl bg-[#090a0d] border border-[#c5a880]/30 space-y-2 mt-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#c5a880]">
              Select Verified Luxury Hotel Photo
            </span>
            <button
              type="button"
              onClick={() => setShowPresets(false)}
              className="text-[#a09a8e] hover:text-[#f3e5d0] text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1">
            {CURATED_HOTEL_PHOTOS.map((photo, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  onChange(photo.url);
                  setShowPresets(false);
                }}
                className={`relative rounded-lg overflow-hidden border text-left group transition-all ${
                  value === photo.url
                    ? 'border-[#c5a880] ring-2 ring-[#c5a880]/40'
                    : 'border-[#222530] hover:border-[#c5a880]/60'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-16 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="p-1 bg-[#12141a]">
                  <span className="text-[9px] font-medium text-[#f3e5d0] block truncate">
                    {photo.name}
                  </span>
                  <span className="text-[8px] text-[#a09a8e] block uppercase">
                    {photo.category}
                  </span>
                </div>
                {value === photo.url && (
                  <div className="absolute top-1 right-1 p-0.5 rounded-full bg-[#c5a880] text-[#0c0d10]">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Live Image Preview */}
      {value ? (
        <div className={`relative rounded-xl overflow-hidden border border-[#2a2723] bg-[#0c0d10] ${previewHeightClass} group`}>
          <img
            src={value}
            alt="Media preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] text-[#f3e5d0] uppercase tracking-wider flex items-center gap-1">
            <ImageIcon className="w-2.5 h-2.5 text-[#c5a880]" />
            <span>Active Media Preview</span>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-lg border border-dashed border-[#2a2723] bg-[#0c0d10]/40 text-center">
          <p className="text-[11px] text-[#716d64]">
            No image currently assigned. Paste a URL, upload a file, or pick a curated hotel photo above.
          </p>
        </div>
      )}
    </div>
  );
};

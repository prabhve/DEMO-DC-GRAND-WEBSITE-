import React, { useState } from 'react';
import { UtensilsCrossed, Plus, Trash2, CheckCircle2, X } from 'lucide-react';
import { RestaurantData } from '../../../types/hotel';
import { MediaUploadInput } from '../MediaUploadInput';

interface RestaurantCmsTabProps {
  restaurant: RestaurantData;
  updateRestaurant: (data: Partial<RestaurantData>) => void;
  triggerToast: (msg: string) => void;
}

export const RestaurantCmsTab: React.FC<RestaurantCmsTabProps> = ({
  restaurant,
  updateRestaurant,
  triggerToast
}) => {
  const [newCuisine, setNewCuisine] = useState('');
  const [newFacility, setNewFacility] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const cuisines = restaurant.cuisines || [];
  const facilities = restaurant.facilities || [];
  const images = restaurant.images || [];

  const handleAddCuisine = () => {
    if (!newCuisine.trim()) return;
    updateRestaurant({ cuisines: [...cuisines, newCuisine.trim()] });
    setNewCuisine('');
    triggerToast('Added cuisine');
  };

  const handleRemoveCuisine = (index: number) => {
    updateRestaurant({ cuisines: cuisines.filter((_, i) => i !== index) });
    triggerToast('Removed cuisine');
  };

  const handleAddFacility = () => {
    if (!newFacility.trim()) return;
    updateRestaurant({ facilities: [...facilities, newFacility.trim()] });
    setNewFacility('');
    triggerToast('Added dining facility');
  };

  const handleRemoveFacility = (index: number) => {
    updateRestaurant({ facilities: facilities.filter((_, i) => i !== index) });
    triggerToast('Removed facility');
  };

  const handleAddPhoto = (url: string) => {
    if (!url.trim()) return;
    updateRestaurant({ images: [...images, url.trim()] });
    setNewPhotoUrl('');
    triggerToast('Added restaurant photo');
  };

  const handleRemovePhoto = (index: number) => {
    updateRestaurant({ images: images.filter((_, i) => i !== index) });
    triggerToast('Removed photo');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#202330] pb-4">
        <div>
          <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
            Food Express Restaurant CMS
          </h2>
          <p className="text-xs text-[#a09a8e]">
            Update dining hours, special culinary offerings, dining facilities, and restaurant photography.
          </p>
        </div>

        <button
          onClick={() => triggerToast('Restaurant details saved successfully!')}
          className="px-5 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bf9a] transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Restaurant</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
              Restaurant Name
            </label>
            <input
              type="text"
              value={restaurant.name}
              onChange={(e) => updateRestaurant({ name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-sm text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
              Tagline
            </label>
            <input
              type="text"
              value={restaurant.tagline}
              onChange={(e) => updateRestaurant({ tagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-sm text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
            Operating Timings
          </label>
          <input
            type="text"
            value={restaurant.timings}
            onChange={(e) => updateRestaurant({ timings: e.target.value })}
            placeholder="e.g. 7:00 AM – 10:30 PM Daily (Breakfast, Lunch & Dinner)"
            className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
            Full Description
          </label>
          <textarea
            rows={3}
            value={restaurant.description}
            onChange={(e) => updateRestaurant({ description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
          />
        </div>

        {/* Cuisines Manager */}
        <div className="p-4 rounded-xl bg-[#090a0e] border border-[#1f222e] space-y-3">
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#c5a880]">
            Cuisines Offered ({cuisines.length})
          </label>

          <div className="flex flex-wrap gap-2">
            {cuisines.map((cuisine, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141620] border border-[#2a2e3f] text-xs text-[#f3e5d0]"
              >
                <span>{cuisine}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCuisine(idx)}
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
              value={newCuisine}
              onChange={(e) => setNewCuisine(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCuisine();
                }
              }}
              placeholder="Add cuisine (e.g. Awadhi Delicacies, Chinese, South Indian Breakfast)..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-[#141620] border border-[#2a2723] text-xs text-[#f3e5d0]"
            />
            <button
              type="button"
              onClick={handleAddCuisine}
              className="px-3 py-1.5 rounded-lg bg-[#c5a880] text-[#0c0d10] font-bold text-xs"
            >
              Add Cuisine
            </button>
          </div>
        </div>

        {/* Facilities Manager */}
        <div className="p-4 rounded-xl bg-[#090a0e] border border-[#1f222e] space-y-3">
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#c5a880]">
            Dining Features & Facilities ({facilities.length})
          </label>

          <div className="flex flex-wrap gap-2">
            {facilities.map((fac, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141620] border border-[#2a2e3f] text-xs text-[#f3e5d0]"
              >
                <span>{fac}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFacility(idx)}
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
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddFacility();
                }
              }}
              placeholder="Add facility (e.g. Pure Vegetarian Section, Private Dining Booths)..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-[#141620] border border-[#2a2723] text-xs text-[#f3e5d0]"
            />
            <button
              type="button"
              onClick={handleAddFacility}
              className="px-3 py-1.5 rounded-lg bg-[#c5a880] text-[#0c0d10] font-bold text-xs"
            >
              Add Facility
            </button>
          </div>
        </div>

        {/* Photography Gallery */}
        <div className="p-4 rounded-xl bg-[#090a0e] border border-[#1f222e] space-y-4">
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#c5a880]">
            Dining & Culinary Photography ({images.length} Photos)
          </label>

          {/* Current images grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((imgUrl, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden group border border-[#202330] bg-[#0c0d10]">
                <img src={imgUrl} alt={`Dining photo ${i + 1}`} className="w-full h-28 object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(i)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add photo */}
          <div className="pt-2 border-t border-[#1a1d28]">
            <MediaUploadInput
              label="Add Photo to Food Express Gallery"
              value={newPhotoUrl}
              onChange={(url) => handleAddPhoto(url)}
              placeholder="Paste image URL, upload photo, or pick curated dining photo"
              previewHeightClass="h-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

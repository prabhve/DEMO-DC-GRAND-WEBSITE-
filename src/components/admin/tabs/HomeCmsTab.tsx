import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { HomeCmsData, AmenityHighlightItem } from '../../../types/hotel';
import { MediaUploadInput } from '../MediaUploadInput';

interface HomeCmsTabProps {
  homeCms: HomeCmsData;
  updateHomeCms: (data: Partial<HomeCmsData>) => void;
  triggerToast: (msg: string) => void;
}

export const HomeCmsTab: React.FC<HomeCmsTabProps> = ({
  homeCms,
  updateHomeCms,
  triggerToast
}) => {
  const [openSection, setOpenSection] = useState<'hero' | 'intro' | 'about' | 'highlights' | 'finalCta'>('hero');
  const [newFeatureText, setNewFeatureText] = useState('');

  const highlights: AmenityHighlightItem[] = homeCms.highlights || [];
  const aboutFeatures: string[] = homeCms.aboutFeatures || [
    '2 km from Sankat Mochan Temple',
    'Close to Assi Ghat & BHU',
    'Modern Elevator & Generator Backup',
    'In-House Food Express Dining'
  ];

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    const updated = [...aboutFeatures, newFeatureText.trim()];
    updateHomeCms({ aboutFeatures: updated });
    setNewFeatureText('');
    triggerToast('Added checklist highlight');
  };

  const handleRemoveFeature = (index: number) => {
    const updated = aboutFeatures.filter((_, i) => i !== index);
    updateHomeCms({ aboutFeatures: updated });
    triggerToast('Removed checklist highlight');
  };

  const handleUpdateHighlight = (index: number, updatedItem: AmenityHighlightItem) => {
    const list = [...highlights];
    list[index] = updatedItem;
    updateHomeCms({ highlights: list });
  };

  const handleAddHighlight = () => {
    const newItem: AmenityHighlightItem = {
      id: `hl-${Date.now()}`,
      title: 'New Amenity Highlight',
      subtitle: 'Premium Hospitality Feature',
      description: 'Detail explaining this facility for your guests.',
      tag: 'Convenience'
    };
    updateHomeCms({ highlights: [...highlights, newItem] });
    triggerToast('Added new property highlight');
  };

  const handleRemoveHighlight = (id: string) => {
    updateHomeCms({ highlights: highlights.filter((h) => h.id !== id) });
    triggerToast('Removed property highlight');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#202330] pb-4">
        <div>
          <h2 className="font-serif-luxury text-3xl text-[#f3e5d0] mb-1">
            Home Page & Visual CMS
          </h2>
          <p className="text-xs text-[#a09a8e]">
            Comprehensive control over imagery, headlines, storytelling, amenities, and calls to action.
          </p>
        </div>

        <button
          onClick={() => triggerToast('All Home Page content saved successfully!')}
          className="px-5 py-2.5 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#d8bf9a] transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Accordion Navigation for Clean Organization */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: 'hero', label: '1. Hero Section' },
            { id: 'intro', label: '2. The Sanctuary / Intro' },
            { id: 'about', label: '3. About & Philosophy' },
            { id: 'highlights', label: '4. Property Highlights (8 Amenities)' },
            { id: 'finalCta', label: '5. Final Call to Action' }
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setOpenSection(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              openSection === tab.id
                ? 'bg-[#c5a880] text-[#0c0d10] font-bold shadow-md'
                : 'bg-[#141620] text-[#a09a8e] hover:text-[#f3e5d0] border border-[#202330]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: HERO */}
      {openSection === 'hero' && (
        <div className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-6">
          <div className="border-b border-[#202330] pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#c5a880] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Hero Scene Configuration</span>
            </h3>
            <p className="text-xs text-[#a09a8e] mt-1">
              Controls the main full-screen greeting view of your hotel website.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Top Location Badge
              </label>
              <input
                type="text"
                value={homeCms.heroBadge || ''}
                placeholder="e.g. Bhelupur, Varanasi • Newly Opened Property"
                onChange={(e) => updateHomeCms({ heroBadge: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Monogram Eyebrow Text
              </label>
              <input
                type="text"
                value={homeCms.heroSubtitle || ''}
                placeholder="e.g. Welcome To D C Grand"
                onChange={(e) => updateHomeCms({ heroSubtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
              Hero Main Headline
            </label>
            <input
              type="text"
              value={homeCms.heroHeadline}
              onChange={(e) => updateHomeCms({ heroHeadline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-sm text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
              Hero Supporting Subtext
            </label>
            <textarea
              rows={2}
              value={homeCms.heroSupportingText}
              onChange={(e) => updateHomeCms({ heroSupportingText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
            />
          </div>

          {/* Hero Cover Image with File Upload and Curated Selector */}
          <MediaUploadInput
            label="Hero Cover Background Photography"
            value={homeCms.heroCoverImage}
            onChange={(url) => updateHomeCms({ heroCoverImage: url })}
            placeholder="https://images.unsplash.com/... or upload photo"
            helperText="Appears as the full-bleed background of your 3D Hero scene. We recommend a high-resolution hotel exterior, lobby, or architectural shot."
            previewHeightClass="h-48"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Primary Button Label
              </label>
              <input
                type="text"
                value={homeCms.heroExploreBtnText || 'Explore Rooms'}
                onChange={(e) => updateHomeCms({ heroExploreBtnText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Secondary Button Label
              </label>
              <input
                type="text"
                value={homeCms.heroBookingBtnText || 'Request Booking'}
                onChange={(e) => updateHomeCms({ heroBookingBtnText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: THE SANCTUARY / INTRO */}
      {openSection === 'intro' && (
        <div className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-6">
          <div className="border-b border-[#202330] pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#c5a880] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>The Sanctuary / Intro Section</span>
            </h3>
            <p className="text-xs text-[#a09a8e] mt-1">
              Controls the welcoming intro card, foyer imagery, and the two trust pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Section Eyebrow Badge
              </label>
              <input
                type="text"
                value={homeCms.introBadge || 'The Sanctuary'}
                onChange={(e) => updateHomeCms({ introBadge: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Main Heading
              </label>
              <input
                type="text"
                value={homeCms.introHeading}
                onChange={(e) => updateHomeCms({ introHeading: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
              Intro Narrative Story
            </label>
            <textarea
              rows={3}
              value={homeCms.introText}
              onChange={(e) => updateHomeCms({ introText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
            />
          </div>

          {/* Intro Media Upload */}
          <MediaUploadInput
            label="Intro Card Photography (Reception / Lobby Foyer)"
            value={homeCms.introImage || 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80'}
            onChange={(url) => updateHomeCms({ introImage: url })}
            helperText="The focal photo showcased on the left side of the sanctuary introduction."
            previewHeightClass="h-44"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Image Floating Badge Title
              </label>
              <input
                type="text"
                value={homeCms.introImageBadgeTitle || 'Grand Welcome'}
                onChange={(e) => updateHomeCms({ introImageBadgeTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Image Floating Badge Description
              </label>
              <input
                type="text"
                value={homeCms.introImageBadgeDesc || 'Double-height reception foyer with crystal chandeliers and warm hospitality.'}
                onChange={(e) => updateHomeCms({ introImageBadgeDesc: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0] focus:border-[#c5a880] focus:outline-none"
              />
            </div>
          </div>

          {/* Pillars */}
          <div className="p-4 rounded-xl bg-[#090a0e] border border-[#1f222e] space-y-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#c5a880] block">
              Key Pillars (Under Narrative)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[11px] text-[#a09a8e] font-medium">
                  Pillar 1 Title
                </label>
                <input
                  type="text"
                  value={homeCms.introPillar1Title || 'Peace of Mind'}
                  onChange={(e) => updateHomeCms({ introPillar1Title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
                />
                <label className="block text-[11px] text-[#a09a8e] font-medium">
                  Pillar 1 Description
                </label>
                <textarea
                  rows={2}
                  value={homeCms.introPillar1Desc || '24/7 dedicated security, CCTV surveillance, continuous power backup, and pristine hygiene protocols.'}
                  onChange={(e) => updateHomeCms({ introPillar1Desc: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] text-[#a09a8e] font-medium">
                  Pillar 2 Title
                </label>
                <input
                  type="text"
                  value={homeCms.introPillar2Title || 'Personalized Service'}
                  onChange={(e) => updateHomeCms({ introPillar2Title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
                />
                <label className="block text-[11px] text-[#a09a8e] font-medium">
                  Pillar 2 Description
                </label>
                <textarea
                  rows={2}
                  value={homeCms.introPillar2Desc || 'Warm, traditional Banarasi care paired with prompt attention for your spiritual itinerary and temple visits.'}
                  onChange={(e) => updateHomeCms({ introPillar2Desc: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: ABOUT & PHILOSOPHY */}
      {openSection === 'about' && (
        <div className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-6">
          <div className="border-b border-[#202330] pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#c5a880] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>About Us & Banarasi Heritage Section</span>
            </h3>
            <p className="text-xs text-[#a09a8e] mt-1">
              Manage the Varanasi heritage narrative, photography, and proximity checklist.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Philosophy Eyebrow Badge
              </label>
              <input
                type="text"
                value={homeCms.aboutBadge || 'Our Philosophy'}
                onChange={(e) => updateHomeCms({ aboutBadge: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Philosophy Heading
              </label>
              <input
                type="text"
                value={homeCms.aboutHeading || 'A Gracious Base in the Eternal City'}
                onChange={(e) => updateHomeCms({ aboutHeading: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
              Primary About Text
            </label>
            <textarea
              rows={3}
              value={homeCms.aboutText}
              onChange={(e) => updateHomeCms({ aboutText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
              Secondary Varanasi Narrative Text
            </label>
            <textarea
              rows={3}
              value={homeCms.aboutSecondaryText || 'Varanasi is a sacred convergence of time, devotion, and timeless ghats. Situated in the well-connected neighbourhood of Bhelupur, D C Grand is designed to be your serene oasis—where contemporary comforts, dedicated power backup, and authentic culinary hospitality meet the warmth of Banarasi traditions.'}
              onChange={(e) => updateHomeCms({ aboutSecondaryText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
            />
          </div>

          {/* About Image with Upload and Curated Selector */}
          <MediaUploadInput
            label="About Scene Photography (Ganga Ghats / Heritage)"
            value={homeCms.aboutImage || 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80'}
            onChange={(url) => updateHomeCms({ aboutImage: url })}
            helperText="The vertical visual collage picture shown in the philosophy section."
            previewHeightClass="h-44"
          />

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
              Image Caption / Floating Note
            </label>
            <input
              type="text"
              value={homeCms.aboutImageCaption || '22/24P, Kasmiganj Mohalla, Bhelupur, Varanasi, Uttar Pradesh, 221010, India'}
              onChange={(e) => updateHomeCms({ aboutImageCaption: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
            />
          </div>

          {/* Checklist Highlights Manager */}
          <div className="p-4 rounded-xl bg-[#090a0e] border border-[#1f222e] space-y-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#c5a880] block">
              Checklist Highlights (Under About Text)
            </span>

            <div className="space-y-2">
              {aboutFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => {
                      const updated = [...aboutFeatures];
                      updated[idx] = e.target.value;
                      updateHomeCms({ aboutFeatures: updated });
                    }}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Add new highlight (e.g. 10 mins from Assi Ghat)..."
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                className="flex-1 px-3 py-1.5 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-3 py-1.5 rounded-lg bg-[#c5a880] text-[#0c0d10] font-bold text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: PROPERTY HIGHLIGHTS (8 AMENITIES) */}
      {openSection === 'highlights' && (
        <div className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-6">
          <div className="flex items-center justify-between border-b border-[#202330] pb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#c5a880] flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Property Amenities & Modern Highlights</span>
              </h3>
              <p className="text-xs text-[#a09a8e] mt-1">
                Full editing for the 8 major facility cards displayed in the 3D amenities showcase.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddHighlight}
              className="px-3 py-1.5 rounded-lg bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Facility Card</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Section Headline
              </label>
              <input
                type="text"
                value={homeCms.highlightsHeading || 'Curated For Supreme Convenience'}
                onChange={(e) => updateHomeCms({ highlightsHeading: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Section Subtitle / Description
              </label>
              <input
                type="text"
                value={homeCms.highlightsSubtitle || 'Every modern facility thoughtfully provided at D C Grand ensures your pilgrimage or vacation in Varanasi is smooth, restful, and dignified.'}
                onChange={(e) => updateHomeCms({ highlightsSubtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
              />
            </div>
          </div>

          <div className="space-y-4">
            {highlights.map((item, index) => (
              <div
                key={item.id || index}
                className="p-4 rounded-xl bg-[#090a0e] border border-[#1f222e] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#c5a880]">
                    Card #{index + 1}: {item.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(item.id)}
                    className="text-rose-400 hover:text-rose-300 p-1"
                    title="Delete card"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[#a09a8e] mb-1">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        handleUpdateHighlight(index, { ...item, title: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#a09a8e] mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) =>
                        handleUpdateHighlight(index, { ...item, subtitle: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#a09a8e] mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={item.tag}
                      onChange={(e) =>
                        handleUpdateHighlight(index, { ...item, tag: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[#f3e5d0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#a09a8e] mb-1 text-xs">Description</label>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) =>
                      handleUpdateHighlight(index, { ...item, description: e.target.value })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: FINAL CTA */}
      {openSection === 'finalCta' && (
        <div className="p-6 rounded-2xl bg-[#12141c] border border-[#202330] space-y-6">
          <div className="border-b border-[#202330] pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#c5a880] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Final Call To Action Scene</span>
            </h3>
            <p className="text-xs text-[#a09a8e] mt-1">
              Customize the closing banner before the footer.
            </p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
              Closing Headline
            </label>
            <input
              type="text"
              value={homeCms.finalCtaHeading || 'Your Varanasi Stay Starts Here.'}
              onChange={(e) => updateHomeCms({ finalCtaHeading: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-sm text-[#f3e5d0]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
              Supporting Subtext
            </label>
            <textarea
              rows={2}
              value={homeCms.finalCtaSubtitle || 'D C Grand — Comfortable hospitality in Bhelupur, Varanasi.'}
              onChange={(e) => updateHomeCms({ finalCtaSubtitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Booking Button Text
              </label>
              <input
                type="text"
                value={homeCms.finalCtaBookingBtnText || 'Request Booking'}
                onChange={(e) => updateHomeCms({ finalCtaBookingBtnText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a09a8e] mb-1.5 font-medium">
                Front Desk Button Text
              </label>
              <input
                type="text"
                value={homeCms.finalCtaContactBtnText || 'Contact Front Desk'}
                onChange={(e) => updateHomeCms({ finalCtaContactBtnText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#2a2723] text-xs text-[#f3e5d0]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

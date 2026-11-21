import { ContactData, HomeCmsData, PolicyData } from '../types/hotel';
import { HOTEL_ASSETS } from './hotelAssets';
import { VERIFIED_HIGHLIGHTS } from './facilities';

/**
 * HOTEL D.C. GRAND — VARANASI
 * Official Identity, Verified Contact Details, Policies, Editorial Content & Trustindex Google Reviews
 * Source: https://hoteldcgrand.com/ | https://hoteldcgrand.com/about-us/ | https://hoteldcgrand.com/contact-us/
 */

export interface VerifiedGoogleReview {
  id: string;
  authorName: string;
  platform: 'Google';
  verifiedBy: 'Trustindex verifies that the original source of the review is Google.';
  rating: 5;
  originalLanguage: 'English' | 'Bengali';
  originalText: string;
  englishTranslation?: string;
  highlightTag: string;
}

export const OFFICIAL_GOOGLE_REVIEWS_METADATA = {
  businessName: 'Hotel D.C. Grand',
  totalGoogleReviewsCount: 572,
  googlePlaceId: 'ChIJ3wy7zOoxjjkRMzLVxS_1Ns4',
  writeReviewUrl: 'https://admin.trustindex.io/api/googleWriteReview?place-id=ChIJ3wy7zOoxjjkRMzLVxS_1Ns4',
  googleMapsListingUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ3wy7zOoxjjkRMzLVxS_1Ns4'
};

export const VERIFIED_GOOGLE_REVIEWS: VerifiedGoogleReview[] = [
  {
    id: 'google-rev-abhishek-singh',
    authorName: 'Abhishek Singh',
    platform: 'Google',
    verifiedBy: 'Trustindex verifies that the original source of the review is Google.',
    rating: 5,
    originalLanguage: 'English',
    originalText:
      'Host and staffs are excellent very humble and very politely professional they help you 24*7 excellent service i must say always stay with them.',
    highlightTag: '24/7 Humble & Courteous Staff'
  },
  {
    id: 'google-rev-gangesh-mukhopadhyay',
    authorName: 'GANGESH MUKHOPADHYAY',
    platform: 'Google',
    verifiedBy: 'Trustindex verifies that the original source of the review is Google.',
    rating: 5,
    originalLanguage: 'English',
    originalText:
      'It’s a nice place to be in and the behaviour of the staffs are very good and specially Vishal is a great person having a great sense of hospitality',
    highlightTag: 'Personal Hospitality & Warm Staff'
  },
  {
    id: 'google-rev-vishal-das',
    authorName: 'Vishal Das',
    platform: 'Google',
    verifiedBy: 'Trustindex verifies that the original source of the review is Google.',
    rating: 5,
    originalLanguage: 'Bengali',
    originalText:
      'আমি বারাণসীতে অনেক হোটেল খুঁজেছি, কিন্তু সব হোটেলের মধ্যে Hotel D.C Grand আমার সবচেয়ে ভালো লেগেছে। ❤️ এই হোটেলের মালিক অত্যন্ত ভালো মনের মানুষ। তিনি অতিথিদের সব সময় সাহায্য করেন এবং এমনভাবে যত্ন নেন যে, আপনার একবারও মনে হবে না যে আপনি বারাণসীতে একা রয়েছেন। মন্দির দর্শন, পুজো-অর্চনা থেকে শুরু করে বারাণসীর বিভিন্ন জায়গায় ঘোরাঘুরি অতিথিদের জন্য সবকিছুর ব্যবস্থা তিনি নিজেই আন্তরিকতার সঙ্গে করে দেন। হোটেলের কর্মীরাও অত্যন্ত ভালো ও সহযোগিতাপরায়ণ। রিসেপশন থেকে শুরু করে রান্নাঘরের কর্মী—সকলেই অতিথিদের সঙ্গে খুব সুন্দর ব্যবহার করেন। ❤️🙏',
    englishTranslation:
      'I searched many hotels in Varanasi, and among all of them I liked Hotel D.C. Grand the most. The owner is a very kind-hearted person who always helps guests and takes care of you so well that you never feel alone in Varanasi. From temple darshan and puja arrangements to local sightseeing, he personally coordinates everything with sincerity. From reception to the kitchen team, every staff member treats guests wonderfully.',
    highlightTag: 'Temple Darshan & Family-Like Care'
  }
];

export const AUTHENTIC_CONTACT: ContactData = {
  hotelName: 'Hotel D.C. Grand',
  tagline: 'Comfortable Stay & Warm Hospitality in Bhelupur, Varanasi',
  address:
    'B 24/22-P, near Shri Ram Janki Temple, Kashmiri Ganj, Gurudham, Bhelupur, Varanasi, Uttar Pradesh 221005',
  phone: '+91 70840 03000',
  whatsapp: '+91 70840 03000',
  email: 'hoteldcgrand@gmail.com',
  checkInTime: '12:00 PM',
  checkOutTime: '11:00 AM',
  mapUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ3wy7zOoxjjkRMzLVxS_1Ns4',
  googleReviewUrl: 'https://admin.trustindex.io/api/googleWriteReview?place-id=ChIJ3wy7zOoxjjkRMzLVxS_1Ns4',
  tripAdvisorUrl: '',
  landmarks: [
    {
      name: 'Durga Mandir & Durga Kund (Bhelupur)',
      distance: '0.9 km',
      desc: 'Historic 18th-century red-ochre temple and sacred kund in Gurudham / Bhelupur'
    },
    {
      name: 'Sankat Mochan Hanuman Temple',
      distance: '1.8 km',
      desc: 'Revered shrine founded by saint-poet Goswami Tulsidas, a short drive from Bhelupur'
    },
    {
      name: 'Assi Ghat & Subah-e-Banaras',
      distance: '1.9 km',
      desc: 'Sacred riverfront ghat famous for dawn Vedic chanting, yoga, and Ganga boat rides'
    },
    {
      name: 'Banaras Hindu University (BHU) & New Vishwanath Mandir',
      distance: '2.8 km',
      desc: 'Historic university campus and marble Birla Vishwanath Temple'
    },
    {
      name: 'Shri Kashi Vishwanath Dham & Dashashwamedh Ghat',
      distance: '3.2 km',
      desc: '15–20 minute drive to the golden jyotirlinga spire and evening Ganga Aarti'
    }
  ]
};

export const OFFICIAL_CONTACT = AUTHENTIC_CONTACT;

export const AUTHENTIC_POLICIES: PolicyData = {
  cancellation:
    'For reservation modifications or cancellations, please contact our front desk directly at +91 70840 03000 or hoteldcgrand@gmail.com. Cancellation terms depend on your booking dates and peak festival periods in Varanasi.',
  childPolicy:
    'Families traveling with children are warmly welcomed. Please inform our reception desk at the time of reservation if you require our triple-bed Family Room (1 Double Bed + 1 Separate Single Bed) or extra bedding assistance.',
  hotelPolicy:
    'As posted at the Hotel D.C. Grand reception desk: (1) Valid government-issued outstation photo ID is required at check-in (Local ID is not allowed). (2) Outside visitors are not permitted inside guest rooms. (3) Smoking and consumption of intoxicating/toxic drinks are strictly prohibited on the premises. (4) Outside food is not allowed; our in-house restaurant is open daily from 7:00 AM to 11:00 PM.',
  privacyPolicy:
    'Hotel D.C. Grand respects your privacy. Guest contact details, identification records, and booking enquiries are used exclusively to coordinate your stay and hospitality services in Varanasi.',
  termsAndConditions:
    'All booking inquiries submitted via this website are handled directly by the Hotel D.C. Grand front desk (+91 70840 03000). Room rates and availability are confirmed directly upon inquiry.'
};

export const AUTHENTIC_HOME_CMS: HomeCmsData = {
  // Hero (Phase 10 — Real Property First)
  heroBadge: 'Gurudham · Bhelupur, Varanasi · Official Property',
  heroSubtitle: 'Hotel D.C. Grand · Varanasi',
  heroHeadline: 'Your Stay in Varanasi, Thoughtfully Hosted.',
  heroSupportingText:
    'Discover comfortable rooms, warm hospitality and convenient access to the spiritual heart of Varanasi.',
  heroCoverImage: HOTEL_ASSETS.deluxeRoomWindowArmchair.optimizedPath,
  heroExploreBtnText: 'Explore the Hotel',
  heroBookingBtnText: 'Book Your Stay',

  // Intro / About D.C. Grand (Phase 6 & 9)
  introBadge: 'About Hotel D.C. Grand · Bhelupur',
  introHeading: 'Your Comfort, Our Commitment to Hospitality.',
  introText:
    'Welcome to Hotel D.C. Grand, your comfortable stay destination in Bhelupur, Varanasi. Located near Shri Ram Janki Temple in Kashmiri Ganj, Gurudham, we provide a welcoming atmosphere, well-maintained air-conditioned rooms, an in-house restaurant, and attentive 24/7 assistance—whether you are visiting with family, travelling for business, or exploring the sacred temples and ghats of Kashi.',
  introImage: HOTEL_ASSETS.receptionFrontDeskWide.optimizedPath,
  introImageBadgeTitle: '24/7 Front Desk · Bhelupur',
  introImageBadgeDesc:
    'Illuminated marble reception counter staffed round the clock for check-ins, temple darshan guidance, and local travel support.',
  introPillar1Title: 'Thoughtfully Appointed Rooms',
  introPillar1Desc:
    'Clean, climate-controlled Deluxe, Premium, Honeymoon, Super Deluxe, and triple-bed Family Rooms equipped with modern bathrooms and free fiber Wi-Fi.',
  introPillar2Title: 'Complete Pilgrimage & Travel Support',
  introPillar2Desc:
    'On-desk coordination for Ganga boat rides, local tour guides, car/taxi rentals, train & flight ticketing, luggage storage, and in-house dining from 7 AM to 11 PM.',

  // About / Varanasi Destination Experience
  aboutBadge: 'Varanasi Destination Experience',
  aboutHeading: 'Convenient Access to the Spiritual Heart of Kashi.',
  aboutText:
    'Situated in the accessible Gurudham / Bhelupur neighborhood away from congested inner-lane traffic, Hotel D.C. Grand allows your car or taxi to reach the hotel entrance directly while keeping you close to Varanasi’s most revered landmarks.',
  aboutSecondaryText:
    'From our doorstep near Shri Ram Janki Temple, you are just minutes from Durga Kund, Sankat Mochan Hanuman Temple, Assi Ghat, and Banaras Hindu University, and roughly a 15–20 minute drive from Shri Kashi Vishwanath Mandir and Dashashwamedh Ghat.',
  aboutImage: HOTEL_ASSETS.varanasiGhatsSunrise.optimizedPath,
  aboutImageCaption:
    'Morning light along the historic Ganga Ghats of Varanasi, easily accessible via cab, auto-rickshaw, or arranged boat ride from Hotel D.C. Grand.',
  aboutFeatures: [
    '0.9 km to Durga Mandir & Durga Kund (Bhelupur)',
    '1.8 km to Sankat Mochan Hanuman Temple',
    '1.9 km to Assi Ghat & Morning Ganga Aarti',
    '15–20 min drive to Kashi Vishwanath Mandir & Dashashwamedh Ghat'
  ],

  // Highlights / Facilities
  highlightsHeading: 'Everything You Need for a Comfortable Stay.',
  highlightsSubtitle:
    'Verified facilities and guest services available at Hotel D.C. Grand in Bhelupur, Varanasi—designed for families, pilgrims, and business travelers.',
  highlights: VERIFIED_HIGHLIGHTS,

  // Final CTA
  finalCtaHeading: 'Plan Your Stay at Hotel D.C. Grand, Varanasi.',
  finalCtaSubtitle:
    'B 24/22-P, near Shri Ram Janki Temple, Kashmiri Ganj, Gurudham, Bhelupur, Varanasi · +91 70840 03000',
  finalCtaBookingBtnText: 'Book Your Stay',
  finalCtaContactBtnText: 'Call +91 70840 03000'
};

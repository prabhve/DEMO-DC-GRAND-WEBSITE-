/**
 * HOTEL D.C. GRAND — VARANASI
 * Centralized Navigation Configuration
 */

export interface NavItem {
  id: string;
  label: string;
  sectionId: string;
}

export const PRIMARY_NAVIGATION: NavItem[] = [
  { id: 'nav-home', label: 'Home', sectionId: 'hero' },
  { id: 'nav-about', label: 'About', sectionId: 'intro' },
  { id: 'nav-rooms', label: 'Rooms & Suites', sectionId: 'rooms' },
  { id: 'nav-facilities', label: 'Facilities', sectionId: 'highlights' },
  { id: 'nav-dining', label: 'Dining', sectionId: 'restaurant' },
  { id: 'nav-gallery', label: 'Gallery', sectionId: 'gallery' },
  { id: 'nav-contact', label: 'Contact', sectionId: 'contact' }
];

import { ThreeDSettings } from '../types/hotel';
import { AUTHENTIC_ROOMS } from './rooms';
import { AUTHENTIC_GALLERY } from './gallery';
import { AUTHENTIC_RESTAURANT, AUTHENTIC_EVENTS } from './facilities';
import { AUTHENTIC_POLICIES, AUTHENTIC_CONTACT, AUTHENTIC_HOME_CMS } from './hotelContent';

/**
 * HOTEL D.C. GRAND — VARANASI
 * Unified Initial Data Re-Exports
 * All data is backed by verified hotel information and locally hosted authentic photographs from https://hoteldcgrand.com/
 */

export const INITIAL_ROOMS = AUTHENTIC_ROOMS;
export const INITIAL_GALLERY = AUTHENTIC_GALLERY;
export const INITIAL_RESTAURANT = AUTHENTIC_RESTAURANT;
export const INITIAL_EVENTS = AUTHENTIC_EVENTS;
export const INITIAL_POLICIES = AUTHENTIC_POLICIES;
export const INITIAL_CONTACT = AUTHENTIC_CONTACT;
export const INITIAL_HOME_CMS = AUTHENTIC_HOME_CMS;

export const INITIAL_3D_SETTINGS: ThreeDSettings = {
  heroAnimationEnabled: true,
  galleryAnimationEnabled: true,
  roomAnimationEnabled: true,
  parallaxIntensity: 3,
  threeIntensity: 3,
  animationSpeed: 1,
  lodMode: 'auto',
  autoLODEnabled: true
};

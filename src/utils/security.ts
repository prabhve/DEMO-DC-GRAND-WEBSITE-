/**
 * Security & Input Sanitization Utilities for Hotel D C Grand
 * Protects against XSS, injection attacks, PII exposure, and formats safe external action links.
 */

/**
 * Strips HTML tags, script injections, and javascript: protocols from user inputs.
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

/**
 * Strips any non-digit characters except leading plus, formats for tel: links.
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '').trim();
}

/**
 * Normalizes phone number into international WhatsApp format (e.g. 919415204991).
 * If 10 digits (standard Indian mobile), automatically prefixes with 91.
 */
export function normalizeWhatsAppNumber(phone: string): string {
  if (!phone) return '';
  // Remove all non-numeric characters
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length === 10) {
    return `91${digits}`;
  }
  if (digits.startsWith('0') && digits.length === 11) {
    return `91${digits.slice(1)}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits;
  }
  return digits;
}

/**
 * Validates an email address against standard format regex.
 */
export function validateEmail(email: string): boolean {
  if (!email) return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
}

/**
 * Generates an encoded direct WhatsApp URL.
 */
export function createWhatsAppLink(phone: string, message: string): string {
  const normalizedPhone = normalizeWhatsAppNumber(phone);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${normalizedPhone}?text=${encodedText}`;
}

/**
 * Generates an encoded mailto: URL.
 */
export function createMailtoLink(email: string, subject: string, body: string): string {
  const cleanEmail = email.trim();
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${cleanEmail}?subject=${encodedSubject}&body=${encodedBody}`;
}

/**
 * Masks Personally Identifiable Information (PII) to protect customer data
 * when receptionist or admin screens are visible to visitors.
 */
export function maskPhone(phone: string): string {
  if (!phone) return '';
  const clean = phone.trim();
  if (clean.length <= 5) return '••••••';
  const start = clean.slice(0, 4);
  const end = clean.slice(-2);
  return `${start} •••• ${end}`;
}

export function maskEmail(email: string): string {
  if (!email) return '';
  const parts = email.split('@');
  if (parts.length !== 2) return '••••@••••';
  const name = parts[0];
  const domain = parts[1];
  const maskedName = name.length > 2 ? `${name[0]}••••${name[name.length - 1]}` : '••••';
  return `${maskedName}@${domain}`;
}

/**
 * Cryptographically random token generator for session tracking.
 */
export function generateSecureToken(prefix: string = 'token'): string {
  try {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    const hex = Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
    return `${prefix}_${hex}`;
  } catch (err) {
    // Fallback if crypto not accessible
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}

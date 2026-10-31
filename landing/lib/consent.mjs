export const CONSENT_KEY = 'terranova.consent.v1';
export const CONSENT_VERSION = 1;
export const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
export const DENIED_PREFERENCES = Object.freeze({ analytics: false, maps: false, advertising: false });

export function createConsent(preferences, now = Date.now()) {
  return { version: CONSENT_VERSION, updatedAt: now, expiresAt: now + CONSENT_LIFETIME, preferences: {
    analytics: preferences.analytics === true,
    maps: preferences.maps === true,
    advertising: preferences.advertising === true,
  } };
}

export function parseConsent(raw, now = Date.now()) {
  if (!raw) return null;
  try {
    const record = JSON.parse(raw);
    if (record.version !== CONSENT_VERSION || !Number.isFinite(record.updatedAt)
      || !Number.isFinite(record.expiresAt) || record.updatedAt > now
      || record.expiresAt <= now || record.expiresAt !== record.updatedAt + CONSENT_LIFETIME
      || !['analytics', 'maps', 'advertising'].every(key => typeof record.preferences?.[key] === 'boolean')) return null;
    return record;
  } catch { return null; }
}

// A local banner is never treated as a Google-certified TCF consent string.
// Require affirmative consent for every Google advertising purpose used here.
export function hasGoogleAdvertisingConsent(data) {
  return data?.cmpStatus === 'loaded'
    && ['tcloaded', 'useractioncomplete'].includes(data.eventStatus)
    && Number.isInteger(data.cmpId) && data.cmpId > 0
    && typeof data.tcString === 'string' && data.tcString.length > 0
    && data.vendor?.consents?.[755] === true
    && [1, 3, 4].every(id => data.purpose?.consents?.[id] === true)
    && [2, 7, 9, 10].every(id => data.purpose?.consents?.[id] === true || data.purpose?.legitimateInterests?.[id] === true);
}

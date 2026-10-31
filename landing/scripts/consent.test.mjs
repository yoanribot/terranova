import test from 'node:test';
import assert from 'node:assert/strict';
import { CONSENT_LIFETIME, CONSENT_VERSION, createConsent, parseConsent, hasGoogleAdvertisingConsent } from '../lib/consent.mjs';

const now = 1_800_000_000_000;
const record = createConsent({ analytics: true, maps: false, advertising: false }, now);
test('stores only explicit booleans and expires without renewing on reads', () => {
  assert.equal(record.version, CONSENT_VERSION);
  assert.equal(record.expiresAt, now + CONSENT_LIFETIME);
  assert.deepEqual(parseConsent(JSON.stringify(record), now + 10), record);
  assert.equal(parseConsent(JSON.stringify(record), record.expiresAt), null);
  assert.equal(parseConsent(JSON.stringify(record), now - 1), null);
  assert.deepEqual(createConsent({ analytics: 'true', maps: 1 }, now).preferences, { analytics: false, maps: false, advertising: false });
});
test('invalid, outdated, tampered, and incomplete choices always fail closed', () => {
  for (const raw of [null, '', '{', 'null', '[]', '{}', JSON.stringify({ ...record, version: 0 }), JSON.stringify({ ...record, expiresAt: record.expiresAt + 1 }), JSON.stringify({ ...record, preferences: { analytics: true, maps: false } }), JSON.stringify({ ...record, preferences: { ...record.preferences, maps: 'false' } })]) {
    assert.equal(parseConsent(raw, now), null, raw);
  }
});
const tc = { cmpId: 300, cmpStatus: 'loaded', eventStatus: 'useractioncomplete', tcString: 'test-fixture-only', vendor: { consents: { 755: true } }, purpose: { consents: Object.fromEntries([1,2,3,4,7,9,10].map(id => [id, true])) } };
test('a local preference never substitutes for an affirmative Google TCF response', () => {
  assert.equal(hasGoogleAdvertisingConsent(record), false);
  assert.equal(hasGoogleAdvertisingConsent(tc), true);
  for (const value of [undefined, {}, { ...tc, cmpStatus: 'stub' }, { ...tc, eventStatus: 'cmpuishown' }, { ...tc, tcString: '' }, { ...tc, vendor: { consents: {} } }, { ...tc, purpose: { consents: { 1: true } } }]) assert.equal(hasGoogleAdvertisingConsent(value), false);
  assert.equal(hasGoogleAdvertisingConsent({ ...tc, purpose: { consents: { 1:true,3:true,4:true }, legitimateInterests: { 2:true,7:true,9:true,10:true } } }), true);
});

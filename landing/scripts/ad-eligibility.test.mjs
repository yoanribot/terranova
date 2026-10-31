import test from 'node:test';
import assert from 'node:assert/strict';
import { canLoadAds } from '../lib/ad-eligibility.mjs';

const configured = { enabled: 'true', cmpReady: 'true', client: 'ca-pub-1234567890123456', pathname: '/servicios/endodoncia', eligiblePaths: ['/', '/servicios/endodoncia'] };
test('requires explicit advertising and CMP deployment declarations and a valid publisher', () => {
  assert.equal(canLoadAds(configured), true);
  for (const enabled of [undefined, '', 'false', 'TRUE']) assert.equal(canLoadAds({ ...configured, enabled }), false);
  for (const cmpReady of [undefined, '', 'false', 'TRUE']) assert.equal(canLoadAds({ ...configured, cmpReady }), false);
  for (const client of [undefined, '', 'ca-pub-123', 'ca-pub-1234567890123456&other=true']) assert.equal(canLoadAds({ ...configured, client }), false);
});
test('known content routes only; utility, legal, error and unknown service routes stay excluded', () => {
  for (const pathname of ['/pacientes', '/informacion-editorial', '/servicios', '/servicios/aseguradora', '/terminos/politica-cookies', '/servicios/no-existe', '/servicios/endodoncia/extra', '/no-existe']) {
    assert.equal(canLoadAds({ ...configured, pathname }), false, pathname);
  }
  assert.equal(canLoadAds({ ...configured, pathname: '/' }), true);
});

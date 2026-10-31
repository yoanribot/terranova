import test from 'node:test';
import assert from 'node:assert/strict';
import { formatRelativeReviewDate } from '../lib/review-dates.mjs';

const now = Date.parse('2026-10-31T12:00:00Z');
test('Spanish review ages use familiar Google-style units', () => {
  assert.equal(formatRelativeReviewDate('2026-07-31', now), 'hace 3 meses');
  assert.equal(formatRelativeReviewDate('2026-10-17', now), 'hace 2 semanas');
  assert.equal(formatRelativeReviewDate('2025-10-31', now), 'hace un año');
  assert.equal(formatRelativeReviewDate('2026-10-30T12:00:00Z', now), 'hace un día');
  assert.equal(formatRelativeReviewDate('2026-10-31T10:00:00Z', now), 'hace 2 horas');
  assert.equal(formatRelativeReviewDate('2026-10-31T11:59:00Z', now), 'hace un minuto');
  assert.equal(formatRelativeReviewDate('2026-10-31T11:59:50Z', now), 'hace unos instantes');
});
test('ages update with time, without storing a stale relative string', () => {
  assert.equal(formatRelativeReviewDate('2026-07-31', Date.parse('2026-09-01')), 'hace un mes');
  assert.equal(formatRelativeReviewDate('2026-07-31', now), 'hace 3 meses');
});
test('months follow calendar anniversaries, including short months', () => {
  assert.equal(formatRelativeReviewDate('2026-07-03', now), 'hace 3 meses');
  assert.equal(formatRelativeReviewDate('2026-01-31', Date.parse('2026-02-28T12:00:00Z')), 'hace un mes');
  assert.equal(formatRelativeReviewDate('2024-02-29', Date.parse('2025-02-28T12:00:00Z')), 'hace un año');
});
test('missing, invalid and future dates do not fabricate a review age', () => {
  for (const value of [null, undefined, '', 'not-a-date', '31/10/2026', '2026-02-30', '2027-01-01']) assert.equal(formatRelativeReviewDate(value, now), null);
});

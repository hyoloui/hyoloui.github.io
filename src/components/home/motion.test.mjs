import test from 'node:test';
import assert from 'node:assert/strict';
import { yearsSince, parallaxOffset, tiltTransform } from './motion.ts';

test('yearsSince floors full years', () => {
  const start = new Date('2024-08-09');
  assert.equal(yearsSince(start, new Date('2026-10-22')), 2);
  assert.equal(yearsSince(start, new Date('2027-08-08')), 2);
  assert.equal(yearsSince(start, new Date('2027-08-09')), 3);
});
test('parallaxOffset scales by line index', () => {
  assert.deepEqual(parallaxOffset(0.5, -0.5, 0), { x: 3, y: -3 });
  assert.deepEqual(parallaxOffset(0.5, -0.5, 1), { x: 6, y: -6 });
});
test('tiltTransform', () => {
  assert.equal(tiltTransform(0.5, 0.5), 'perspective(1200px) rotateX(0deg) rotateY(0deg)');
  assert.equal(tiltTransform(1, 0), 'perspective(1200px) rotateX(4deg) rotateY(4deg)');
});

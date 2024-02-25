'use client';

export default function getStarScore(score: number) {
  if (score >= 0.9) return 5;
  if (score >= 0.8) return 4;
  if (score >= 0.6) return 3;
  if (score >= 0.4) return 2;
  return 1;
}

/** 만 연수(내림). UTC 기준으로 비교해 타임존에 따른 하루 오차를 피한다. */
export function yearsSince(start: Date, now: Date): number {
  let years = now.getUTCFullYear() - start.getUTCFullYear();
  const beforeAnniversary =
    now.getUTCMonth() < start.getUTCMonth() ||
    (now.getUTCMonth() === start.getUTCMonth() && now.getUTCDate() < start.getUTCDate());
  if (beforeAnniversary) years -= 1;
  return years;
}

/** 마우스 위치(px, py: -0.5~0.5)를 줄 번호에 비례한 이동 거리(px)로 바꾼다. */
export function parallaxOffset(px: number, py: number, index: number): { x: number; y: number } {
  const distance = (index + 1) * 6;
  return { x: px * distance, y: py * distance };
}

/** 카드 내 커서 위치(x, y: 0~1)를 3D 기울기 transform 문자열로 바꾼다. */
export function tiltTransform(x: number, y: number, max = 8): string {
  const rotateX = (0.5 - y) * max;
  const rotateY = (x - 0.5) * max;
  return `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

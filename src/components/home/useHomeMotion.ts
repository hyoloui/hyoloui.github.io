import { useEffect } from 'react';
import { parallaxOffset, tiltTransform } from './motion';

/**
 * 마우스가 있는 기기에서만 켜는 인터랙션: 제목 패럴랙스, 커서 글로우, 카드 3D 기울기.
 * 동작 줄이기 설정이거나 터치 기기이면 아무것도 등록하지 않는다.
 */
export default function useHomeMotion(rootRef: React.RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const lines = root.querySelectorAll<HTMLElement>('[data-parallax-line]');
    const glow = root.querySelector<HTMLElement>('[data-cursor-glow]');
    const cards = root.querySelectorAll<HTMLElement>('[data-tilt]');
    let raf = 0;
    let clientX = 0;
    let clientY = 0;

    const frame = () => {
      raf = 0;
      const px = clientX / window.innerWidth - 0.5;
      const py = clientY / window.innerHeight - 0.5;
      lines.forEach((el, i) => {
        const { x, y } = parallaxOffset(px, py, i);
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      if (glow) {
        // 글로우는 position: fixed라 뷰포트 좌표를 그대로 쓴다.
        glow.style.left = `${clientX}px`;
        glow.style.top = `${clientY}px`;
      }
    };

    const onMove = (e: PointerEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const cleanups: Array<() => void> = [];
    cards.forEach((card) => {
      const onCardMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.transform = tiltTransform(x, y);
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
      };
      const onCardLeave = () => {
        card.style.transform = tiltTransform(0.5, 0.5);
      };
      card.addEventListener('pointermove', onCardMove, { passive: true });
      card.addEventListener('pointerleave', onCardLeave);
      cleanups.push(() => {
        card.removeEventListener('pointermove', onCardMove);
        card.removeEventListener('pointerleave', onCardLeave);
        card.style.transform = '';
      });
    });

    return () => {
      window.removeEventListener('pointermove', onMove);
      cleanups.forEach((fn) => fn());
      if (raf) cancelAnimationFrame(raf);
      lines.forEach((el) => {
        el.style.transform = '';
      });
    };
  }, [rootRef]);
}

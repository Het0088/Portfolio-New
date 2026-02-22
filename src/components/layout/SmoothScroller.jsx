import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export default function SmoothScroller({ children }) {
  useSmoothScroll();
  return <>{children}</>;
}

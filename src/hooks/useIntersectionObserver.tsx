import { useEffect } from "react";

type ObserverOptions = {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
};

const useIntersectionObserver = (
  elements: (HTMLElement | null)[],
  onIntersect: (index: number) => void,
  shouldDisconnect?: boolean,
  options?: ObserverOptions,
) => {
  useEffect(() => {
    const targets = elements.filter((el): el is HTMLElement => el !== null); // null-safe 처리

    if (targets.length === 0 || shouldDisconnect) return; // 감시 중단 조건 추가

    const observerOptions = options || { threshold: 0.9 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = elements.indexOf(entry.target as HTMLElement);
          if (index !== -1) {
            onIntersect(index); // 요소가 보일 때 콜백 호출
          }
        }
      });
    }, observerOptions);

    elements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [elements, onIntersect, options, shouldDisconnect]);
};

export default useIntersectionObserver;

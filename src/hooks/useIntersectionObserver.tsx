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
    const targets = elements.filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0 || shouldDisconnect) return; // 감시 중단 조건

    const observerOptions = options || { threshold: 0.9 };
    // let initialRenderDone = false; // 초기 평가 상태 추적

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // if (!initialRenderDone) {
          //   initialRenderDone = true; // 첫 번째 평가 완료
          //   return; // 초기 호출 무시
          // }
          const index = elements.indexOf(entry.target as HTMLElement);
          if (index !== -1) {
            onIntersect(index);
          }
        }
      });
    }, observerOptions);

    targets.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [elements, onIntersect, options, shouldDisconnect]);
};

export default useIntersectionObserver;

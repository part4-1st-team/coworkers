import { useEffect, useRef, useState } from 'react';

function useVisibility() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // 요소가 보일 때 isVisible을 true로 설정
        } else {
          setIsVisible(false); // 요소가 보이지 않을 때 isVisible을 false로 설정
        }
      },
      { threshold: 0.5 }, // 요소의 50%가 보일 때 감지
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

export default useVisibility;

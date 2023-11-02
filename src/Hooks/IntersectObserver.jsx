import { useState, useEffect, useRef } from 'react';

function useIntersectionObserver(options, delay = 1000) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    let observer;
    const currentTargetRef = targetRef.current; // Make a copy of targetRef.current

    const timeout = setTimeout(() => {
      if (currentTargetRef) {
        observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            setIsIntersecting(entry.isIntersecting);
          },
          options
        );
        observer.observe(currentTargetRef);
      }
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (currentTargetRef && observer) {
        observer.unobserve(currentTargetRef);
      }
    };
  }, [options, delay]);

  return { targetRef, isIntersecting };
}

export default useIntersectionObserver;








// import { useState, useEffect, useRef } from 'react';

// function useIntersectionObserver(options) {
//   const [isIntersecting, setIsIntersecting] = useState(false);
//   const targetRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const [entry] = entries;
//         setIsIntersecting(entry.isIntersecting);
//       },
//       options
//     );

//     const currentTargetRef = targetRef.current; // Make a copy of targetRef.current

//     if (currentTargetRef) {
//       observer.observe(currentTargetRef);
//     }

//     return () => {
//       if (currentTargetRef) {
//         observer.unobserve(currentTargetRef);
//       }
//     };
//   }, [options]);

//   return { targetRef, isIntersecting };
// }

// export default useIntersectionObserver;
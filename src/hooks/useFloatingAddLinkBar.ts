import { MutableRefObject, SetStateAction, useEffect } from "react";

interface RefProps {
  setIsAddLinkShown: (value: SetStateAction<boolean>) => void;
  setIsFooterShown: (value: SetStateAction<boolean>) => void;
  addLinkRef: MutableRefObject<null>;
  footerRef: MutableRefObject<null>;
}

const useFloatingAddLinkBar = ({
  setIsAddLinkShown,
  setIsFooterShown,
  addLinkRef,
  footerRef,
}: RefProps) => {
  useEffect(() => {
    const addLinkObserver = new IntersectionObserver(
      ([entry]) => {
        setIsAddLinkShown(entry.isIntersecting);
      },
      { threshold: 0 },
    );
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsFooterShown(entry.isIntersecting);
      },
      { threshold: 0 },
    );
    if (addLinkRef.current) {
      addLinkObserver.observe(addLinkRef.current);
    }
    if (footerRef.current) {
      footerObserver.observe(footerRef.current);
    }

    return () => {
      if (addLinkRef.current) {
        addLinkObserver.unobserve(addLinkRef.current);
      }
      if (footerRef.current) {
        footerObserver.unobserve(footerRef.current);
      }
    };
  }, []);
};

export default useFloatingAddLinkBar;

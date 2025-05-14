
import * as React from "react";

type ViewportSize = {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: "portrait" | "landscape";
};

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useViewport(): ViewportSize {
  const [viewport, setViewport] = React.useState<ViewportSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isMobile: typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false,
    isTablet: typeof window !== "undefined" 
      ? window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT 
      : false,
    isDesktop: typeof window !== "undefined" ? window.innerWidth >= TABLET_BREAKPOINT : true,
    orientation: typeof window !== "undefined" 
      ? window.innerWidth > window.innerHeight ? "landscape" : "portrait" 
      : "landscape"
  });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewport({
        width,
        height,
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= TABLET_BREAKPOINT,
        orientation: width > height ? "landscape" : "portrait"
      });
    };

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return viewport;
}

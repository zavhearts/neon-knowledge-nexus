
import React from "react";
import FeaturedNotesSlider from "@/components/landing/FeaturedNotesSlider";
import LiveClassesSlider from "@/components/landing/LiveClassesSlider";

export const HomeContent = () => {
  return (
    <>
      <FeaturedNotesSlider />
      <LiveClassesSlider />
    </>
  );
};

export default HomeContent;

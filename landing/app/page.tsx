"use client";

import ContactForm from "@/components/ContactForm/ContactForm";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import OurServices from "@/components/OurServices/OurServices";
import OurTeam from "@/components/OurTeam/OurTeam";
import Testimonials from "@/components/Testimonials/Testimonials";
import { getHomepage } from "@/lib/strapi";
import { HomepageData } from "@/types/data";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("@/components/Map/Map"), {
  ssr: false,
});

export default function Home() {
  const [data, setData] = useState<HomepageData>({} as HomepageData);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getHomepage();

      if (response) {
        setData(response);
      }
    };

    fetchData();
  }, []);
  const heroData = data?.sections?.[0];

  return (
    <>
      <HeroBanner {...heroData} />
      <OurServices />
      <OurTeam />
      <Map />
      {/* <Testimonials />
      <ContactForm /> */}
    </>
  );
}

"use client";

import { LocationSection } from "@/types/data";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function MapWrapper({
  locationData,
}: {
  locationData: LocationSection;
}) {
  const { title, address, phoneMain, location, schedules } = locationData;

  console.log({ location, phoneMain, address, title });

  return (
    <Map
      title={title}
      location={location}
      phoneMain={phoneMain}
      address={address}
      schedules={schedules}
    />
  );
}

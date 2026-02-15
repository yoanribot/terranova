"use client";

import { LocationSection } from "@/types/data";
import Map from "./Map";
export default function MapWrapper({
  locationData,
}: {
  locationData: LocationSection;
}) {
  const {
    title,
    address,
    description,
    phoneMain,
    phoneSecondary,
    location,
    schedules,
  } = locationData;

  return (
    <section id="map">
      <Map
        title={title}
        location={location}
        phoneMain={phoneMain}
        phoneSecondary={phoneSecondary}
        address={address}
        description={description}
        schedules={schedules}
      />
    </section>
  );
}

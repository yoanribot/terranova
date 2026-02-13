"use client";

import { LocationSection } from "@/types/data";
import Map from "./Map";
export default function MapWrapper({
  locationData,
}: {
  locationData: LocationSection;
}) {
  const { title, address, phoneMain, location, schedules } = locationData;

  return (
    <section id="map">
      <Map
        title={title}
        location={location}
        phoneMain={phoneMain}
        address={address}
        schedules={schedules}
      />
    </section>
  );
}

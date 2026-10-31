import { LocationSection } from "@/types/data";
import Map from "./Map";

export default function MapWrapper({ locationData }: { locationData: LocationSection }) {
  return <div id="map"><Map {...locationData} /></div>;
}

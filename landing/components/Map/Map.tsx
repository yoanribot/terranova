import sharedStyles from "@/app/shared.module.css";
import SectionTitle from "../shared/SectionTitle/SectionTitle";
import { siteConfig } from "@/app/config/data";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import styles from "./Map.module.css";

// Fix Leaflet default marker icon issue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const config = {
  zoom: 30,
};

const Map = () => {
  const { title, location, phone, address } = siteConfig.teamMembers.contactUs;

  return (
    <section className={sharedStyles.container}>
      <SectionTitle title={title} />

      <section className="flex flex-col md:flex-row gap-12">
        <div className={styles.mapContainer}>
          <MapContainer
            center={location}
            zoom={config.zoom}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location}>
              <Popup>
                Direccion <br /> {address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="flex-2">
          <h2 className="text-2xl">Informacion: </h2>

          <ul>
            <li className="mt-4">
              <strong>Direccion:</strong> {address}
            </li>
            <li className="mt-4">
              <strong>Telefono:</strong> {phone}
            </li>
            <li className="mt-4">
              <strong>Horario de apertura:</strong>
            </li>
            <ul>
              {siteConfig.teamMembers.contactUs.openHours.map((slot) => (
                <li key={slot.day}>
                  <span className="font-semibold">{slot.day}:</span>{" "}
                  {slot.availability ?? (
                    <span className="text-orange-500"> Cerrado</span>
                  )}
                </li>
              ))}
            </ul>
          </ul>
        </div>
      </section>
    </section>
  );
};

export default Map;

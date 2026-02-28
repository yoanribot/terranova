import SectionTitle from "../shared/SectionTitle/SectionTitle";
import styles from "./Map.module.css";
import { LocationSection } from "@/types/data";

type MapSectionProps = Omit<LocationSection, "email">;

const Map = ({
  title,
  phoneMain,
  phoneSecondary,
  address,
  description,
  schedules,
}: MapSectionProps) => {
  return (
    <section className="container">
      <SectionTitle title={title} />

      <section className="flex flex-col md:flex-row gap-12 mb-10">
        <div className={styles.mapContainer}>
          <iframe
            name="Ubicacion Google Maps"
            title="Ubicacion Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1518.1917175293722!2d-3.6161087017516556!3d40.44464964424175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422fa5bf86a4dd%3A0x28c23634ca08de3f!2sC.%20Alcal%C3%A1%2C%20573%2C%20San%20Blas-Canillejas%2C%2028022%20Madrid%2C%20Spain!5e0!3m2!1sen!2sfr!4v1771016881177!5m2!1sen!2sfr"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="flex-2">
          <ul>
            <li className="">
              <p className="text-md sm:text-xl">
                <strong>Direccion:</strong> {address}
              </p>
            </li>
            <li className="mt-4">
              <p className="text-md text-black sm:text-xl">
                <strong>Informacion extra:</strong> {description}
              </p>
            </li>
            <li className="mt-4">
              <p className="text-md text-black sm:text-xl">
                <strong>Telefono:</strong> {phoneMain}
              </p>
            </li>
            <li className="mt-4">
              <p className="text-md text-black sm:text-xl">
                <strong>Telefono secundario:</strong> {phoneSecondary}
              </p>
            </li>
            <li className="mt-4">
              <p className="text-md text-black sm:text-xl">
                <strong>Horario de apertura:</strong>
              </p>
            </li>
            <li>
              <ul>
                {schedules?.map((slot) => (
                  <li key={slot.day} className="mb-0.5">
                    <span className="text-lg">{slot.day}:</span>
                    <span className="text-lg ml-2">
                      {slot.availability ?? (
                        <span className="text-orange-500"> Cerrado </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};

export default Map;

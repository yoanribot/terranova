"use client";

import clsx from "clsx";
import styles from "./HeroBanner.module.css";
import sharedStyles from "@/app/shared.module.css";
import { Button } from "../ui/button";
import { Hero } from "@/types/data";
import { getStrapiMedia } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";

const HeroBanner = (data: Hero) => {
  const router = useRouter();
  const { heading, subHeading, text, link, image } = data;
  const { label, href } = link || {};

  const backgroundImage = getStrapiMedia(image?.url);

  return (
    <section
      className={clsx(styles.heroBannerRoot)}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={sharedStyles.container}>
        <div className={clsx(styles.content)}>
          <h1 className="font-bold text-4xl sm:text-6xl max-w-3xl mt-16 mb-6 ">
            {heading}
          </h1>
          <h3 className="font-bold text-1xl sm:text-2xl  max-w-3xl mb-6">
            {subHeading}
          </h3>
          <p className="max-w-3xl mb-6">{text}</p>

          <div>
            {label && (
              <Button
                className="mt-10 cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:brightness-110"
                onClick={() => router.push(href)}
              >
                <Calendar className="mr-1" />
                {label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

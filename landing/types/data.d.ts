import { BlocksContent } from "@strapi/blocks-react-renderer";
import { RichTextDocument } from "./RichText";

export type Metadata = {
  title: string;
  description: string;
  sections: Array<SocialSection>;
};

export type HomepageData = {
  sections: Array<unknown>;
};

export type BlogData = {
  slug: string;
  title: string;
  content: BlocksContent;
  backgroundImage?: {
    url: string;
    alternativeText?: string;
  };
  images?: {
    url: string;
    alternativeText?: string;
  }[];
};

export type Hero = {
  heading: string;
  subHeading: string;
  text: string;
  link: Link;
  image?: {
    url: string;
    alternativeText?: string;
  };
};

export type Service = {
  title: string;
  text: string;
  slug: string;
  tags: {
    text: string;
  }[];
  image?: {
    url: string;
    alternativeText?: string;
  };
};

export type Member = {
  title: string;
  text: string;
  tags: {
    text: string;
  }[];
  image?: {
    url: string;
    alternativeText?: string;
  };
};

export type ServiceSection = {
  title: string;
  services: Service[];
};

export type TeamSection = {
  title: string;
  members: Member[];
};

export type AboutUsData = {
  title: string;
  text: RichTextDocument;
  image?: {
    url: string;
    alternativeText?: string;
  };
};

export type SocialSection = {
  socials: Link[];
};

export type LocationSection = {
  title: string;
  description: string;
  phoneMain: string;
  phoneSecondary?: string;
  address: string;
  email: string;
  location: {
    latitude: string;
    longitude: string;
  };
  schedules: Array<{
    day: string;
    availability: string;
  }>;
};

export type Link = {
  href: string;
  isExternal: boolean;
  label: string;
};

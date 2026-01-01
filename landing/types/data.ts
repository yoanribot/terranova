export type Metadata = {
  title: string;
  description: string;
  sections: Array<SocialSection>;
};

export type HomepageData = {
  sections: Array<unknown>;
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
  tags: Link;
  image?: {
    url: string;
    alternativeText?: string;
  };
};

export type Member = {
  title: string;
  text: string;
  tags: Link;
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

export type SocialSection = {
  socials: Link[];
};

export type LocationSection = {
  title: string;
  phoneMain: string;
  phoneSecondary?: string;
  address: string;
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

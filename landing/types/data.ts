export type Metadata = {
  title: string;
  description: string;
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

export type Link = {
  href: string;
  isExternal: boolean;
  label: string;
};

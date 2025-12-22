export type HomepageData = {
  sections: Array<any>;
};

export type Hero = {
  heading: string;
  subHeading: string;
  text: string;
  link: Link;
};

export type Link = {
  href: string;
  isExternal: boolean;
  label: string;
};

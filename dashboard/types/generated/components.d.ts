import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentCard extends Struct.ComponentSchema {
  collectionName: 'components_component_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    tags: Schema.Attribute.Component<'component.tags', true>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentLink extends Struct.ComponentSchema {
  collectionName: 'components_component_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    isExternal: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
  };
}

export interface ComponentLocation extends Struct.ComponentSchema {
  collectionName: 'components_component_locations';
  info: {
    displayName: 'location';
  };
  attributes: {
    latitude: Schema.Attribute.String;
    longitude: Schema.Attribute.String;
  };
}

export interface ComponentSchedules extends Struct.ComponentSchema {
  collectionName: 'components_component_schedules';
  info: {
    displayName: 'schedules';
  };
  attributes: {
    availability: Schema.Attribute.String;
    day: Schema.Attribute.String;
  };
}

export interface ComponentTags extends Struct.ComponentSchema {
  collectionName: 'components_component_tags';
  info: {
    displayName: 'Tag';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface LayoutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    link: Schema.Attribute.Component<'component.link', false>;
    subHeading: Schema.Attribute.String;
    text: Schema.Attribute.Text;
  };
}

export interface LayoutLocation extends Struct.ComponentSchema {
  collectionName: 'components_layout_locations';
  info: {
    displayName: 'Location';
  };
  attributes: {
    address: Schema.Attribute.String;
    email: Schema.Attribute.String;
    location: Schema.Attribute.Component<'component.location', false>;
    phoneMain: Schema.Attribute.String;
    phoneSecondary: Schema.Attribute.String;
    schedules: Schema.Attribute.Component<'component.schedules', true>;
    title: Schema.Attribute.String;
  };
}

export interface LayoutServices extends Struct.ComponentSchema {
  collectionName: 'components_layout_services';
  info: {
    displayName: 'Services';
  };
  attributes: {
    services: Schema.Attribute.Component<'component.card', true>;
    title: Schema.Attribute.String;
  };
}

export interface LayoutSocials extends Struct.ComponentSchema {
  collectionName: 'components_layout_socials';
  info: {
    displayName: 'Socials';
  };
  attributes: {
    socials: Schema.Attribute.Component<'component.link', true>;
  };
}

export interface LayoutTeam extends Struct.ComponentSchema {
  collectionName: 'components_layout_teams';
  info: {
    displayName: 'Team';
  };
  attributes: {
    members: Schema.Attribute.Component<'component.card', true>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'component.card': ComponentCard;
      'component.link': ComponentLink;
      'component.location': ComponentLocation;
      'component.schedules': ComponentSchedules;
      'component.tags': ComponentTags;
      'layout.hero-section': LayoutHeroSection;
      'layout.location': LayoutLocation;
      'layout.services': LayoutServices;
      'layout.socials': LayoutSocials;
      'layout.team': LayoutTeam;
    }
  }
}

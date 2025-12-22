import { LatLngExpression } from "leaflet";

export const siteConfig = {
  siteTitle: "Terranova clinica dental",
  siteDescription:
    "Clinica dental en Madrid especializada en cuidado oral y estética dental. Servicios de alta calidad para una sonrisa saludable y radiante.",
  heroBanner: {
    headline: "Bienvenidos a Terranova",
    subheadline: "Tu sonrisa, nuestra prioridad",
    text: "Atencion de calidad en el corazón de Madrid, ofrecemos una atención dental integral con un enfoque personalizado para cada paciente.",
    ctaText: "Reserva una cita",
    ctaLink: "#contact",
  },
  services: {
    title: "Nuestros Servicios",
    items: [
      {
        title: "Estética dental",
        description:
          "Mejora la apariencia de tu sonrisa con nuestros tratamientos de estética dental personalizados.",
        image: "/services/estetica-dental-servicio.jpg",
      },
      {
        title: "Implantes dentales",
        description:
          "Reemplaza dientes perdidos con implantes dentales duraderos y naturales para restaurar la función y estética de tu sonrisa.",
        image: "/services/estetica-dental-servicio.jpg",
      },
      {
        title: "Carillas dentales",
        description:
          "Transforma tu sonrisa con carillas dentales de alta calidad que corrigen imperfecciones y mejoran la apariencia de tus dientes.",
        image: "/services/estetica-dental-servicio.jpg",
      },
      {
        title: "Blanqueamiento dental",
        description:
          "Tratamientos especializados para aclarar y mejorar el color de tus dientes, logrando una sonrisa más brillante y atractiva.",
        image: "/services/estetica-dental-servicio.jpg",
      },
      {
        title: "Ortodoncia",
        description:
          "Tratamientos especializados para la salud de las encías y tejidos de soporte de los dientes, previniendo y tratando enfermedades periodontales.",
        image: "/services/estetica-dental-servicio.jpg",
      },
      {
        title: "Ortodoncia invisible",
        description:
          "Alineadores transparentes y removibles para corregir la posición de tus dientes de manera discreta y cómoda.",
        image: "/services/estetica-dental-servicio.jpg",
      },
      {
        title: "Diseño de sonrisa",
        description:
          "Análisis y planificación personalizada para crear la sonrisa que siempre has deseado, combinando estética y funcionalidad.",
        image: "/services/estetica-dental-servicio.jpg",
      },
    ],
  },
  teamMembers: {
    title: "Nuestro Equipo",
    items: [
      {
        title: "Dr. Juan Pérez",
        description:
          "Especialista en estética dental con más de 10 años de experiencia.",
        image: "/team/doctor1.jpeg",
      },
      {
        title: "Dra. María López",
        description:
          "Especialista en ortodoncia con más de 8 años de experiencia.",
        image: "/team/doctor2.jpeg",
      },
      {
        title: "Dr. Carlos García",
        description:
          "Especialista en ortodoncia con más de 8 años de experiencia.",
        image: "/team/doctor3.jpeg",
      },
    ],
    contactUs: {
      title: "Donde y como encontrarnos",
      location: [40.44483, -3.61544] as LatLngExpression,
      phone: "+34 659 376 232",
      address: "C. Alcalá, 573, San Blas-Canillejas, 28022 Madrid, Spain",
      openHours: [
        { day: "Lunes", availability: "10:00 - 14:00 / 16:30 - 20:30" },
        { day: "Martes", availability: "10:00 - 14:00 / 16:30 - 20:30" },
        { day: "Miércoles", availability: "10:00 - 14:00 / 16:30 - 20:30" },
        { day: "Jueves", availability: "10:00 - 14:00 / 16:30 - 20:30" },
        { day: "Viernes", availability: "10:00 - 14:00 / 16:30 - 20:30" },
        { day: "Sábado" },
        { day: "Domingo" },
      ],
    },
  },
};

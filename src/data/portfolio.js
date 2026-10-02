const projects = [
  {
    id: "01",
    title: "Courtyard House",
    category: "Residential",
    location: "Makassar, Indonesia",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    accent:
      "A calm domestic sequence shaped by light, shade and a planted court.",
  },
  {
    id: "02",
    title: "Coastal Office",
    category: "Commercial",
    location: "Bali, Indonesia",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
    accent:
      "A compact workplace conceived as a porous landscape between inside and out.",
  },
  {
    id: "03",
    title: "Atelier 17",
    category: "Interior",
    location: "Bandung, Indonesia",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
    accent:
      "Material restraint, warm tactility and framed views through a working studio.",
  },
  {
    id: "04",
    title: "Tropical Retreat",
    category: "Residential",
    location: "Lombok, Indonesia",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    accent:
      "Deep overhangs and breezeways tune the house to a warm, humid climate.",
  },
  {
    id: "05",
    title: "Gallery House",
    category: "Interior",
    location: "Jakarta, Indonesia",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
    accent:
      "A domestic interior edited like a sequence of small exhibitions.",
  },
  {
    id: "06",
    title: "Riverfront Commons",
    category: "Commercial",
    location: "Makassar, Indonesia",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    accent:
      "Public circulation becomes the social armature of a mixed-use block.",
  },
]

const services = [
  {
    number: "01",
    title: "Architecture",
    description:
      "Concept to construction documentation for residential, hospitality and commercial work.",
  },
  {
    number: "02",
    title: "Interior",
    description:
      "Spatial planning, material direction and atmosphere for considered everyday environments.",
  },
  {
    number: "03",
    title: "Visualization",
    description:
      "Photorealistic stills, diagrams and animation to communicate the design before it exists.",
  },
  {
    number: "04",
    title: "Strategy",
    description:
      "Early-stage feasibility, design direction and design systems for growing developments.",
  },
]

export const defaultData = {
  content: [
    {
      type: "HeroSection",
      props: {
        id: "hero-01",
        eyebrow: "Architecture / Visualization / Strategy",
        title: "Spaces with clarity, character & restraint.",
        description:
          "We design architecture as a sequence of decisions: calibrated to climate, context, material and the way people actually inhabit space.",
        cta: "View selected work",
        imageLabel: "Featured / Courtyard House",
        imageIndex: "01 — 06",
        image:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90",
      },
    },
    {
      type: "AboutSection",
      props: {
        id: "about-01",
        eyebrow: "About the studio",
        title:
          "We make architecture quieter, not quieter in ambition — quieter in excess.",
        bodyA:
          "Studio North is an independent architecture and visualization practice working across Indonesia. Our work moves between buildings, interiors and visual narratives, always looking for the clearest spatial idea.",
        bodyB:
          "Climate, proportion, daylight and material are treated as design tools rather than afterthoughts. The result is architecture that feels deliberate, contemporary and grounded.",
        meta: "Makassar · Bandung · Indonesia · Since 2018",
      },
    },
    {
      type: "PortfolioSection",
      props: {
        id: "portfolio-01",
        eyebrow: "Selected projects",
        title: "A small archive of recent work.",
        projects,
      },
    },
    {
      type: "ServicesSection",
      props: {
        id: "services-01",
        eyebrow: "Services",
        services,
      },
    },
    {
      type: "TestimonialSection",
      props: {
        id: "testimonial-01",
        eyebrow: "Client note",
        quote:
          "The process felt precise without ever feeling rigid. Every drawing had a reason, and the final spaces felt unmistakably ours.",
        client: "Nadia Rahman",
        project: "Private Residence / 2025",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      },
    },
    {
      type: "ContactSection",
      props: {
        id: "contact-01",
        eyebrow: "Contact",
        title: "Have a site, a brief or just a good question?",
        description:
          "Tell us what you are working on. For projects in Indonesia, we are available for concept design, visualization and design development.",
        studioLabel: "Studio",
        location: "Makassar, South Sulawesi",
        country: "Indonesia",
        emailLabel: "Email",
        email: "hello@studionorth.id",
        socialLabel: "Social",
        social: "@studionorth.id",
        button: "Send inquiry",
      },
    },
  ],
  root: {
    props: {
      title: "Studio North — Architecture Portfolio",
    },
  },
}

export { projects, services }

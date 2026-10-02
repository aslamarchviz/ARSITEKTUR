import { ArrowDownRight, ArrowUpRight, Instagram, Mail, MapPin } from "lucide-react"
import ImageUploadField from "./ImageUploadField"
import { useAssetSrc } from "./useAssetSrc"
import { useState } from "react"

function SectionLabel({ number, children, dark = false }) {
  return (
    <div
      className={`flex items-center gap-3 mono text-[11px] ${
        dark ? "text-white/45" : "text-[#77756b]"
      }`}
    >
      <span
        className={`w-8 h-px ${dark ? "bg-white/25" : "bg-black/20"}`}
        aria-hidden="true"
      />
      <span>{number}</span>
      <span>{children}</span>
    </div>
  )
}

function getSectionDomId(type, id) {
  const anchors = {
    HeroSection: { "hero-01": "top" },
    AboutSection: { "about-01": "about" },
    PortfolioSection: { "portfolio-01": "work" },
    ServicesSection: { "services-01": "services" },
    ContactSection: { "contact-01": "contact" },
  }

  return anchors[type]?.[id] || `section-${id || type.toLowerCase()}`
}

function MediaFrame({ src, alt }) {
  const resolvedSrc = useAssetSrc(src)

  return (
    <div className="media-frame">
      {resolvedSrc ? (
        <img src={resolvedSrc} alt={alt || "Project image"} />
      ) : (
        <div className="flex h-full min-h-48 items-center justify-center mono text-[10px] text-[#77756b]">
          IMAGE
        </div>
      )}
    </div>
  )
}

function PortfolioSectionView({ id, eyebrow, title, projects: projectItems = [] }) {
  const [filter, setFilter] = useState("All")
  const filters = ["All", "Residential", "Commercial", "Interior"]
  const visibleProjects =
    filter === "All"
      ? projectItems
      : projectItems.filter((project) => project.category === filter)

  return (
    <section id={getSectionDomId("PortfolioSection", id)} className="container-wide pb-28 md:pb-40">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-12">
        <div>
          <SectionLabel number="02">{eyebrow}</SectionLabel>
          <h2 className="section-title mt-5">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-2 md:pb-1">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full border px-4 py-2 mono text-[9px] transition-colors ${
                filter === item
                  ? "bg-black text-white border-black"
                  : "border-black/15 hover:border-black/35"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-x-5 gap-y-14 md:gap-y-20">
        {visibleProjects.map((project, index) => (
          <article
            key={project.id || `${project.title}-${index}`}
            className={`project-card ${index % 3 === 1 ? "md:pt-20" : ""}`}
          >
            <a href={`#project-${project.id || index + 1}`} className="block">
              <div className="media-frame aspect-[4/3]">
                <MediaFrame src={project.image} alt={project.title} />
                <div className="project-overlay absolute inset-0 flex items-end justify-between p-5 text-white bg-gradient-to-t from-black/70 via-black/0 to-transparent">
                  <span className="mono text-[9px]">Open project</span>
                  <span className="inline-flex items-center justify-center rounded-full border border-white/40 w-9 h-9">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-lg md:text-xl tracking-[-0.03em] font-medium">{project.title}</h3>
                  <p className="mt-1 text-sm text-[#77756b]">{project.location} · {project.year}</p>
                </div>
                <span className="mono text-[9px] pt-1 text-[#77756b]">{project.category}</span>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

const textField = (label, extra = {}) => ({
  type: "text",
  label,
  contentEditable: true,
  ...extra,
})

const textareaField = (label) => ({
  type: "textarea",
  label,
  contentEditable: true,
})

const imageField = {
  type: "custom",
  label: "Image",
  render: ImageUploadField,
}

export const config = {
  root: {
    fields: {
      title: {
        type: "text",
        label: "Page title",
      },
    },
    defaultProps: {
      title: "Studio North — Architecture Portfolio",
    },
    render: ({ children }) => <div>{children}</div>,
  },

  categories: {
    content: {
      title: "Sections",
      components: [
        "HeroSection",
        "AboutSection",
        "PortfolioSection",
        "ServicesSection",
        "TestimonialSection",
        "ContactSection",
      ],
      defaultExpanded: true,
    },
  },

  components: {
    HeroSection: {
      label: "Hero",
      defaultProps: {
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
      fields: {
        eyebrow: textField("Eyebrow"),
        title: textField("Title"),
        description: textareaField("Description"),
        cta: textField("CTA"),
        imageLabel: textField("Image label"),
        imageIndex: textField("Image index"),
        image: imageField,
      },
      render: ({ id, eyebrow, title, description, cta, imageLabel, imageIndex, image }) => (
        <section id={getSectionDomId("HeroSection", id)} className="min-h-[calc(100vh-72px)] flex items-end">
          <div className="container-wide w-full py-10 md:py-16 lg:py-20">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-end">
              <div>
                <SectionLabel number="00">{eyebrow}</SectionLabel>
                <h1 className="display hero-title reveal-up mt-7">{title}</h1>
              </div>

              <div className="lg:pb-2 reveal-up delay-2">
                <p className="body-copy max-w-md">{description}</p>
                <a href="#work" className="inline-flex items-center gap-3 mt-8 mono text-[11px]">
                  {cta}
                  <ArrowDownRight size={15} />
                </a>
              </div>
            </div>

            <div className="mt-12 md:mt-20 reveal-up delay-3">
              <div className="media-frame aspect-[16/8] md:aspect-[16/7]">
                <MediaFrame src={image} alt={imageLabel} />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/35 px-5 py-4 text-white backdrop-blur-md md:px-7">
                  <span className="mono text-[9px] md:text-[10px]">{imageLabel}</span>
                  <span className="mono text-[9px] md:text-[10px]">{imageIndex}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    },

    AboutSection: {
      label: "About",
      defaultProps: {
        eyebrow: "About the studio",
        title:
          "We make architecture quieter, not quieter in ambition — quieter in excess.",
        bodyA:
          "Studio North is an independent architecture and visualization practice working across Indonesia. Our work moves between buildings, interiors and visual narratives, always looking for the clearest spatial idea.",
        bodyB:
          "Climate, proportion, daylight and material are treated as design tools rather than afterthoughts. The result is architecture that feels deliberate, contemporary and grounded.",
        meta: "Makassar · Bandung · Indonesia · Since 2018",
      },
      fields: {
        eyebrow: textField("Eyebrow"),
        title: textField("Title"),
        bodyA: textareaField("Body — left"),
        bodyB: textareaField("Body — right"),
        meta: textField("Studio meta"),
      },
      render: ({ id, eyebrow, title, bodyA, bodyB, meta }) => (
        <section id={getSectionDomId("AboutSection", id)} className="container-wide py-24 md:py-36">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-12 lg:gap-24 items-start">
            <SectionLabel number="01">{eyebrow}</SectionLabel>
            <div>
              <h2 className="section-title max-w-5xl">{title}</h2>
              <div className="mt-10 grid md:grid-cols-2 gap-10 max-w-4xl">
                <p className="body-copy">{bodyA}</p>
                <p className="body-copy">{bodyB}</p>
              </div>
              <div className="mt-12 pt-8 grid-line flex flex-wrap gap-x-10 gap-y-5 mono text-[10px] text-[#77756b]">
                {meta?.split("·").map((item, index) => (
                  <span key={`${item}-${index}`}>{item.trim()}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ),
    },

    PortfolioSection: {
      label: "Portfolio",
      defaultProps: {
        eyebrow: "Selected projects",
        title: "A small archive of recent work.",
        projects: [
          {
            title: "New Project",
            category: "Residential",
            location: "Makassar, Indonesia",
            year: "2026",
            image:
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
            accent: "Project statement goes here.",
          },
        ],
      },
      fields: {
        eyebrow: textField("Eyebrow"),
        title: textField("Title"),
        projects: {
          type: "array",
          label: "Projects",
          arrayFields: {
            id: textField("ID"),
            title: textField("Title"),
            category: textField("Category"),
            location: textField("Location"),
            year: textField("Year"),
            image: imageField,
            accent: textareaField("Project statement"),
          },
          getItemSummary: (item) => item.title || "Project",
        },
      },
      render: (props) => <PortfolioSectionView {...props} />,
    },

    ServicesSection: {
      label: "Services",
      defaultProps: {
        eyebrow: "Services",
        services: [
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
        ],
      },
      fields: {
        eyebrow: textField("Eyebrow"),
        services: {
          type: "array",
          label: "Services",
          arrayFields: {
            number: textField("Number"),
            title: textField("Title"),
            description: textareaField("Description"),
          },
          getItemSummary: (item) => item.title || "Service",
        },
      },
      render: ({ id, eyebrow, services = [] }) => (
        <section id={getSectionDomId("ServicesSection", id)} className="soft-panel">
          <div className="container-wide py-24 md:py-36">
            <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-12 lg:gap-24">
              <SectionLabel number="03">{eyebrow}</SectionLabel>
              <div>
                <div className="grid-line" />
                {services.map((service, index) => (
                  <div key={`${service.number}-${index}`} className="grid-line py-8 md:py-10 grid md:grid-cols-[80px_0.55fr_1fr] gap-5 md:gap-8 items-start">
                    <span className="mono text-[10px] text-[#77756b]">{service.number}</span>
                    <h3 className="text-2xl md:text-3xl font-medium tracking-[-0.04em]">{service.title}</h3>
                    <p className="text-sm md:text-base leading-7 text-[#69685f] max-w-md">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ),
    },

    TestimonialSection: {
      label: "Testimonial",
      defaultProps: {
        eyebrow: "Client note",
        quote:
          "The process felt precise without ever feeling rigid. Every drawing had a reason, and the final spaces felt unmistakably ours.",
        client: "Client Name",
        project: "Project / 2026",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      },
      fields: {
        eyebrow: textField("Eyebrow"),
        quote: textareaField("Quote"),
        client: textField("Client"),
        project: textField("Project"),
        avatar: imageField,
      },
      render: ({ id, eyebrow, quote, client, project, avatar }) => (
        <section id={getSectionDomId("TestimonialSection", id)} className="container-wide py-24 md:py-36">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-12 lg:gap-24">
            <SectionLabel number="04">{eyebrow}</SectionLabel>
            <figure>
              <blockquote className="section-title max-w-5xl">“{quote}”</blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#d8d6cf]">
                  <MediaFrame src={avatar} alt={client} />
                </div>
                <div>
                  <div className="text-sm font-medium">{client}</div>
                  <div className="text-xs text-[#77756b]">{project}</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>
      ),
    },

    ContactSection: {
      label: "Contact",
      defaultProps: {
        eyebrow: "Contact",
        title: "Have a site, a brief or just a good question?",
        description:
          "Tell us what you are working on. For projects in Indonesia, we are available for concept design, visualization and design development.",
        studioLabel: "Studio",
        location: "Makassar, South Sulawesi",
        country: "Indonesia",
        emailLabel: "Email label",
        email: "hello@studionorth.id",
        socialLabel: "Social",
        social: "@studionorth.id",
        button: "Send inquiry",
      },
      fields: {
        eyebrow: textField("Eyebrow"),
        title: textField("Title"),
        description: textareaField("Description"),
        studioLabel: textField("Studio label"),
        location: textField("Location"),
        country: textField("Country"),
        emailLabel: textField("Email label"),
        email: textField("Email"),
        socialLabel: textField("Social label"),
        social: textField("Social handle"),
        button: textField("Button"),
      },
      render: ({ id, eyebrow, title, description, studioLabel, location, country, emailLabel, email, socialLabel, social, button }) => (
        <section id={getSectionDomId("ContactSection", id)} className="bg-[#171714] text-[#f4f3ef]">
          <div className="container-wide py-24 md:py-36">
            <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-12 lg:gap-24">
              <SectionLabel number="05" dark>{eyebrow}</SectionLabel>
              <div>
                <h2 className="section-title max-w-5xl">{title}</h2>
                <p className="mt-8 body-copy !text-white/55 max-w-xl">{description}</p>

                <form className="mt-14 max-w-2xl grid gap-1">
                  <input className="form-control !border-white/15 text-white placeholder:text-white/30" placeholder="Name" aria-label="Name" />
                  <input className="form-control !border-white/15 text-white placeholder:text-white/30" placeholder="Email" type="email" aria-label="Email" />
                  <input className="form-control !border-white/15 text-white placeholder:text-white/30" placeholder="Project type" aria-label="Project type" />
                  <textarea className="form-control !border-white/15 text-white placeholder:text-white/30 min-h-28 resize-y" placeholder="Tell us a little about the project" aria-label="Project description" />
                  <button type="button" className="mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f3ef] text-[#171714] px-5 py-3 mono text-[10px] hover:opacity-85 transition-opacity">
                    {button}
                    <ArrowUpRight size={14} />
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-20 md:mt-28 pt-8 border-t border-white/10 grid md:grid-cols-3 gap-10">
              <div>
                <div className="mono text-[10px] text-white/35 mb-4">{studioLabel}</div>
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin size={15} className="mt-0.5" />
                  <span>{location}<br />{country}</span>
                </div>
              </div>

              <div>
                <div className="mono text-[10px] text-white/35 mb-4">{emailLabel}</div>
                <a href={`mailto:${email}`} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
                  <Mail size={15} />
                  {email}
                </a>
              </div>

              <div>
                <div className="mono text-[10px] text-white/35 mb-4">{socialLabel}</div>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
                  <Instagram size={15} />
                  {social}
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 marquee">
            <div className="marquee-track py-5 mono text-[9px] text-white/35">
              <span>Architecture</span>
              <span>Interior</span>
              <span>Visualization</span>
              <span>Strategy</span>
              <span>Makassar</span>
              <span>Indonesia</span>
              <span>Architecture</span>
              <span>Interior</span>
              <span>Visualization</span>
              <span>Strategy</span>
              <span>Makassar</span>
              <span>Indonesia</span>
            </div>
          </div>
        </section>
      ),
    },
  },
}

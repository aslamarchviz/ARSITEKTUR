import { useAssetSrc } from "../editor/useAssetSrc"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

function getPortfolioProjects(data) {
  const portfolio = data?.content?.find((item) => item.type === "PortfolioSection")
  return portfolio?.props?.projects || []
}

function getProjectId(value) {
  return String(value || "").padStart(2, "0")
}

function ProjectImage({ src, alt, className = "" }) {
  const resolvedSrc = useAssetSrc(src)

  if (!resolvedSrc) {
    return <div className={`media-frame ${className}`} aria-label={alt || "Project image"} />
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt || "Project image"}
      className={className}
    />
  )
}

export default function ProjectDetail({ projectId, data }) {
  const projects = getPortfolioProjects(data)
  const project = projects.find((item) => getProjectId(item.id) === getProjectId(projectId))

  if (!project) {
    return (
      <main className="container-wide py-32">
        <a href="#" className="inline-flex items-center gap-2 mono text-[10px]">
          <ArrowLeft size={14} />
          Back to work
        </a>
        <h1 className="section-title mt-8">Project not found.</h1>
      </main>
    )
  }

  const related = projects.filter((item) => item.id !== project.id)

  return (
    <main>
      <section className="container-wide py-16 md:py-24">
        <a href="#" className="inline-flex items-center gap-2 mono text-[10px] text-[#77756b] hover:text-black">
          <ArrowLeft size={14} />
          Back to selected work
        </a>

        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-20 items-end mt-14">
          <div>
            <div className="flex items-center gap-3 mono text-[11px] text-[#77756b]">
              <span className="w-8 h-px bg-black/20" />
              <span>{project.id}</span>
              <span>{project.category}</span>
            </div>
            <h1 className="section-title mt-5">{project.title}</h1>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-5">
            <div>
              <div className="mono text-[9px] text-[#77756b]">Location</div>
              <div className="mt-2 text-sm">{project.location}</div>
            </div>
            <div>
              <div className="mono text-[9px] text-[#77756b]">Year</div>
              <div className="mt-2 text-sm">{project.year}</div>
            </div>
          </div>
        </div>

        <div className="media-frame aspect-[16/9] mt-12 md:mt-16">
          <ProjectImage src={project.image} alt={project.title} />
        </div>

        <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-12 lg:gap-24 mt-14 md:mt-20">
          <div className="mono text-[10px] text-[#77756b]">Project statement</div>
          <div>
            <p className="text-2xl md:text-4xl leading-[1.25] tracking-[-0.045em] max-w-4xl">
              {project.accent}
            </p>
            <div className="mt-10 grid md:grid-cols-2 gap-8 body-copy">
              <p>
                Designed as a sequence rather than a single image, the project balances enclosure and openness through carefully scaled thresholds, planted edges and framed views.
              </p>
              <p>
                The visual language is intentionally restrained so that material, daylight and everyday occupation become the primary character of the architecture.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-14 md:mt-20">
          {related.slice(0, 2).map((item) => (
            <div key={item.id} className="media-frame aspect-[4/3]">
              <ProjectImage src={item.image} alt={item.title} className="lazy-image" />
            </div>
          ))}
        </div>

        <a href="#contact" className="mt-14 md:mt-20 inline-flex items-center gap-3 rounded-full border border-black/15 px-5 py-3 mono text-[10px] hover:bg-black hover:text-white transition-colors">
          Discuss a similar project
          <ArrowUpRight size={14} />
        </a>
      </section>
    </main>
  )
}

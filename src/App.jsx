import { useEffect, useState } from "react"
import { Render } from "@puckeditor/core"
import "@puckeditor/core/puck.css"
import { config } from "./editor/config"
import EditorPage from "./editor/EditorPage"
import { defaultData } from "./data/portfolio"
import { loadPortfolioData } from "./editor/storage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProjectDetail from "./components/ProjectDetail"

function getRoute() {
  const hash = window.location.hash

  if (hash === "#edit") return { mode: "editor" }

  const projectMatch = hash.match(/^#project-(.+)$/)
  if (projectMatch) return { mode: "project", id: projectMatch[1] }

  return { mode: "public" }
}

function PublicPage() {
  const data = loadPortfolioData(defaultData)

  return (
    <>
      <Header />
      <Render config={config} data={data} />
      <Footer />
    </>
  )
}

export default function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    window.__PORTFOLIO_DEFAULT_DATA__ = defaultData

    const onHashChange = () => setRoute(getRoute())
    window.addEventListener("hashchange", onHashChange)

    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  if (route.mode === "editor") {
    return <EditorPage />
  }

  if (route.mode === "project") {
    const data = loadPortfolioData(defaultData)
    return <ProjectDetail projectId={route.id} data={data} />
  }

  return <PublicPage />
}

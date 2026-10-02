import { useEffect, useMemo, useRef, useState } from "react"
import { Puck } from "@puckeditor/core"
import { config } from "./config"
import { defaultData } from "../data/portfolio"
import { clearPortfolioData, formatSavedTime, loadPortfolioData, savePortfolioData } from "./storage"
import { garbageCollectUnusedImages } from "./assets"

const AUTOSAVE_DELAY = 350

let latestCleanupData = null
let cleanupQueue = Promise.resolve()

function queueAssetCleanup(data) {
  latestCleanupData = data
  cleanupQueue = cleanupQueue
    .catch(() => undefined)
    .then(() => garbageCollectUnusedImages(latestCleanupData))
    .catch((error) => {
      console.warn("Could not clean unused local images.", error)
    })
}

export default function EditorPage() {
  const initialData = useMemo(() => loadPortfolioData(defaultData), [])
  const [savedAt, setSavedAt] = useState(() => {
    try {
      return window.localStorage.getItem("architecture-portfolio:last-saved") || ""
    } catch {
      return ""
    }
  })
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const persist = (data) => {
    if (timerRef.current) window.clearTimeout(timerRef.current)

    timerRef.current = window.setTimeout(() => {
      const ok = savePortfolioData(data)
      if (ok) {
        queueAssetCleanup(data)
        const time = formatSavedTime()
        setSavedAt(time)
        window.localStorage.setItem("architecture-portfolio:last-saved", time)
      }
    }, AUTOSAVE_DELAY)
  }

  const handleReset = () => {
    const confirmed = window.confirm(
      "Reset semua perubahan lokal dan kembali ke konten awal?",
    )

    if (!confirmed) return

    clearPortfolioData()
    window.localStorage.removeItem("architecture-portfolio:last-saved")
    window.location.reload()
  }

  return (
    <div className="stage3-editor-shell">
      <div className="stage3-editor-tools">
        <a href="#" className="stage3-view-link">
          View site
        </a>
        <span className="stage3-editor-status">
          Stage 4 · Visual section editor
          {savedAt ? ` · autosaved ${savedAt}` : ""}
        </span>
        <button type="button" onClick={handleReset} className="stage3-reset">
          Reset local changes
        </button>
      </div>

      <Puck
        config={config}
        data={initialData}
        onChange={persist}
        onPublish={async (data) => {
          if (timerRef.current) window.clearTimeout(timerRef.current)
          savePortfolioData(data)
          queueAssetCleanup(data)
          const time = formatSavedTime()
          setSavedAt(time)
          window.localStorage.setItem("architecture-portfolio:last-saved", time)
        }}
        permissions={{
          drag: true,
          insert: true,
          delete: true,
          duplicate: true,
        }}
        dnd={{
          behavior: "auto",
          disableOutlineDrag: false,
          disableAutoScroll: false,
        }}
        headerTitle="Studio North"
        headerPath="Stage 4 · Insert / Delete / Duplicate"
        dictionary={{
          "header-publish": "Simpan",
        }}
        viewports={[
          { width: 1440, label: "Desktop" },
          { width: 1024, label: "Tablet landscape" },
          { width: 768, label: "Tablet" },
          { width: 390, label: "Mobile" },
        ]}
        iframe={{
          enabled: true,
          syncHostStyles: true,
        }}
      />
    </div>
  )
}

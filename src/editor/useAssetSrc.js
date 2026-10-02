import { useEffect, useState } from "react"
import { loadImage } from "./assets"

export function useAssetSrc(ref) {
  const [src, setSrc] = useState(() =>
    ref?.startsWith("idb-image:") ? "" : ref || "",
  )

  useEffect(() => {
    let cancelled = false
    let objectUrl = ""

    if (!ref?.startsWith("idb-image:")) {
      setSrc(ref || "")
      return () => {}
    }

    setSrc("")

    loadImage(ref)
      .then((resolved) => {
        if (cancelled) return
        objectUrl = resolved
        setSrc(resolved)
      })
      .catch(() => {
        if (!cancelled) setSrc("")
      })

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [ref])

  return src
}

import { useRef, useState } from "react"
import { FieldLabel } from "@puckeditor/core"
import { saveImage } from "./assets"
import { useAssetSrc } from "./useAssetSrc"

export default function ImageUploadField({
  name,
  value,
  onChange,
}) {
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState("")
  const previewSrc = useAssetSrc(value)

  const handleFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ""

    if (!file) return

    if (!file.type.startsWith("image/")) {
      setMessage("Pilih file gambar.")
      return
    }

    setBusy(true)
    setMessage("Menyimpan gambar lokal…")

    try {
      const ref = await saveImage(file)
      onChange(ref)
      setMessage("Gambar siap disimpan.")
    } catch (error) {
      console.error(error)
      setMessage("Gagal menyimpan gambar lokal.")
    } finally {
      setBusy(false)
    }
  }

  const handleClear = async () => {
    onChange("")
    setMessage("")
  }

  return (
    <FieldLabel label="Image">
      <div className="stage3-image-field">
        {previewSrc ? (
          <div className="stage3-image-preview">
            <img src={previewSrc} alt="Selected" />
          </div>
        ) : (
          <div className="stage3-image-empty">No image selected</div>
        )}

        <div className="stage3-image-actions">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
          >
            {busy ? "Saving…" : "Upload image"}
          </button>

          {value ? (
            <button
              type="button"
              className="stage3-image-clear"
              onClick={handleClear}
              disabled={busy}
            >
              Clear
            </button>
          ) : null}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFile}
          aria-label={name}
        />

        <input
          type="url"
          value={value?.startsWith("idb-image:") ? "" : value || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Or paste an image URL…"
          className="stage3-image-url"
          disabled={busy}
        />

        <div className="stage3-image-hint">
          Local files are stored in IndexedDB; page content stays in localStorage.
        </div>

        {message ? <div className="stage3-image-message">{message}</div> : null}
      </div>
    </FieldLabel>
  )
}

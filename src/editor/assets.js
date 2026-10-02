const DB_NAME = "architecture-portfolio-assets"
const STORE_NAME = "images"
const DB_VERSION = 1

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function saveImage(file) {
  const db = await openDb()
  const id = crypto.randomUUID()

  await new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite")
    transaction.objectStore(STORE_NAME).put(file, id)
    transaction.oncomplete = resolve
    transaction.onerror = () => reject(transaction.error)
  })

  db.close()
  return `idb-image:${id}`
}

export async function loadImage(ref) {
  if (!ref?.startsWith("idb-image:")) return ref || ""

  const id = ref.slice("idb-image:".length)
  const db = await openDb()

  const blob = await new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly")
    const request = transaction.objectStore(STORE_NAME).get(id)
    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => reject(request.error)
  })

  db.close()

  if (!blob) return ""
  return URL.createObjectURL(blob)
}

/**
 * Remove local images that are no longer referenced by the current page data.
 * This is intentionally data-driven so duplicated sections can safely share
 * the same image reference without one copy deleting the other's asset.
 */
export async function garbageCollectUnusedImages(data) {
  const referenced = new Set()

  const collect = (value) => {
    if (typeof value === "string" && value.startsWith("idb-image:")) {
      referenced.add(value.slice("idb-image:".length))
      return
    }

    if (Array.isArray(value)) {
      value.forEach(collect)
      return
    }

    if (value && typeof value === "object") {
      Object.values(value).forEach(collect)
    }
  }

  collect(data)

  const db = await openDb()

  await new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAllKeys()

    request.onsuccess = () => {
      for (const key of request.result) {
        if (!referenced.has(String(key))) {
          store.delete(key)
        }
      }
    }

    request.onerror = () => reject(request.error)
    transaction.oncomplete = resolve
    transaction.onerror = () => reject(transaction.error)
  })

  db.close()
}

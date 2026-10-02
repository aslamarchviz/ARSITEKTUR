const STORAGE_KEY = "architecture-portfolio:puck-data:v1"

export function loadPortfolioData(fallback) {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return fallback

    const parsed = JSON.parse(stored)
    if (!parsed || !Array.isArray(parsed.content) || !parsed.root) {
      return fallback
    }

    return parsed
  } catch (error) {
    console.warn("Could not load saved portfolio data.", error)
    return fallback
  }
}

export function savePortfolioData(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("Could not save portfolio data.", error)
    return false
  }
}

export function clearPortfolioData() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error("Could not clear portfolio data.", error)
    return false
  }
}

export function formatSavedTime(date = new Date()) {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export { STORAGE_KEY }

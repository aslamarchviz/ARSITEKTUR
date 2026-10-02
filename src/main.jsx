import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { defaultData } from "./data/portfolio"

window.__PORTFOLIO_DEFAULT_DATA__ = defaultData

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

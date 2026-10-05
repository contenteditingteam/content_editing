import { createRoot } from "react-dom/client"
import "./index.css"
import Demo from "./demo"

const el = document.getElementById("skyline-root")
if (el) createRoot(el).render(<Demo />)

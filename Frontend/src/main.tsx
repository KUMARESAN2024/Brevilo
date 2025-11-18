import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RoutesHandle from "./routes/RoutesHandle.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RoutesHandle />
  </StrictMode>
);

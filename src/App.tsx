import "@/global.css";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

import { router } from "./pages/routes";

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Entrepreneur Dashboard" />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

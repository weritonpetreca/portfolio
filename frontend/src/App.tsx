import { BrowserRouter } from "react-router";
import { AppRouter } from "./router.tsx";
import { ScrollToTop } from "./components/layout/ScrollToTop.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  );
}

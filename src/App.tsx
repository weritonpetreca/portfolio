import { BrowserRouter } from "react-router";
import { AppRouter } from "./router.tsx";
import { ScrollToTop } from "./components/ui/ScrollToTop.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <ScrollToTop />
    </BrowserRouter>
  );
}

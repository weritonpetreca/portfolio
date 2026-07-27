import { BrowserRouter } from "react-router";
import { AppRouter } from "./router.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

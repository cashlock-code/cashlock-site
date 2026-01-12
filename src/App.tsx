import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import WorkIndex from "./pages/WorkIndex";
import WorkDetail from "./pages/WorkDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<WorkIndex />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Safety: redirect anything unknown */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

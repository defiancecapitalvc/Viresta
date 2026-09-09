import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppShell } from "./components/layout/AppShell";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Property3D from "./pages/Property3D";
import PropertyAR from "./pages/PropertyAR";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

function AppLayout() {
  const { pathname } = useLocation();
  const isImmersive =
    pathname === "/property-3d" || pathname === "/property-ar" || pathname.endsWith("/ar") || pathname.endsWith("/3d");

  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:id" element={<PropertyDetail />} />
      <Route path="/properties/:id/3d" element={<Property3D />} />
      <Route path="/property-3d" element={<Property3D />} />
      <Route path="/property-ar" element={<PropertyAR />} />
      <Route path="/properties/:id/ar" element={<PropertyAR />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  if (isImmersive) {
    return routes;
  }

  return <AppShell>{routes}</AppShell>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;

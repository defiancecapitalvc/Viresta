import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FiBox,
  FiFileText,
  FiHelpCircle,
  FiHome,
  FiInfo,
  FiMenu,
  FiSearch,
  FiSmartphone,
  FiStar,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { AuthModal } from "./AuthModal";
import { SearchModal } from "./SearchModal";

const nav = [
  { name: "Home", href: "/", icon: FiHome },
  { name: "Marketplace", href: "/properties", icon: FiStar },
  { name: "3D Tour", href: "/properties/1/3d", icon: FiBox },
  { name: "AR Preview", href: "/properties/1/ar", icon: FiSmartphone },
  { name: "Insights", href: "/blog", icon: FiFileText },
  { name: "About", href: "/about", icon: FiInfo },
  { name: "FAQ", href: "/faq", icon: FiHelpCircle },
];

const soon = [
  { name: "Compare" },
  { name: "Favorites" },
  { name: "Leaderboard" },
];

function SidebarLink({ item, onClick }) {
  return (
    <NavLink
      to={item.href}
      end={item.href === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
          isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
        }`
      }
    >
      <item.icon className="text-lg" />
      {item.name}
    </NavLink>
  );
}

export function AppShell({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-ink-950 text-white">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-white/5 bg-ink-900 transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-primary-500">
              <span className="h-3 w-3 rounded-full bg-primary-500" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Viresta</span>
          </Link>
          <button type="button" className="rounded-lg p-2 text-zinc-400 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <FiX />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {nav.map((item) => (
            <SidebarLink key={item.name} item={item} onClick={() => setSidebarOpen(false)} />
          ))}
          <p className="px-3 pb-1 pt-5 text-[11px] uppercase tracking-[0.2em] text-zinc-600">Coming soon</p>
          {soon.map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-zinc-600">
              <span>{item.name}</span>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide">Soon</span>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/5 p-4 text-xs text-zinc-500">
          <Link to="/privacy" className="hover:text-zinc-300">
            Privacy
          </Link>
          <span className="mx-2">·</span>
          <span>© {new Date().getFullYear()} Viresta</span>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-white/5 bg-ink-950/90 px-4 backdrop-blur">
          <button
            type="button"
            className="rounded-lg p-2 text-zinc-300 hover:bg-white/5 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-white/10 bg-ink-800 px-4 py-2 text-left text-sm text-zinc-500 hover:border-white/20"
          >
            <FiSearch />
            <span className="truncate">Search homes by name, city, 3D…</span>
            <kbd className="ml-auto hidden rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-zinc-400 sm:inline">
              ⌘K
            </kbd>
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden max-w-[140px] truncate text-sm text-zinc-300 sm:inline">{user.name}</span>
              <button type="button" className="btn-secondary" onClick={() => logout()}>
                Log out
              </button>
            </div>
          ) : (
            <button type="button" className="btn" onClick={() => setAuthOpen(true)}>
              <FiUser className="mr-2" />
              Log in
            </button>
          )}
        </header>

        <div className="border-b border-white/5 bg-ink-800/80 px-4 py-2 text-center text-xs text-zinc-400 sm:text-sm">
          <span className="mr-2 rounded-full bg-primary-600 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
            New
          </span>
          Viresta is in open beta — walk homes in 3D and AR from any browser.
        </div>

        <main className="min-h-[calc(100vh-7.5rem)]">{children}</main>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

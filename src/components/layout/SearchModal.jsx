import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { getProperties as localProperties } from "../../data/properties";
import { blogPosts as localPosts } from "../../data/blogPosts";

export function SearchModal({ open, onClose, properties = [], posts = [] }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const listings = properties.length ? properties : localProperties();
  const articles = posts.length ? posts : localPosts;
  const term = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!term) {
      return {
        properties: listings.slice(0, 5),
        posts: articles.slice(0, 3),
      };
    }
    return {
      properties: listings.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.location.toLowerCase().includes(term) ||
          item.type.toLowerCase().includes(term)
      ),
      posts: articles.filter(
        (item) => item.title.toLowerCase().includes(term) || item.excerpt.toLowerCase().includes(term)
      ),
    };
  }, [term, listings, articles]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-4 pt-[12vh]">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-ink-800 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/5 px-4">
          <FiSearch className="text-zinc-500" />
          <input
            autoFocus
            className="w-full bg-transparent py-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            placeholder="Search homes, cities, 3D, AR…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="button" className="rounded-full p-2 text-zinc-400 hover:bg-white/5" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-3">
          <p className="px-2 pb-2 text-xs uppercase tracking-widest text-zinc-500">Properties</p>
          {matches.properties.length === 0 && <p className="px-2 py-3 text-sm text-zinc-500">No listings match.</p>}
          {matches.properties.map((property) => (
            <Link
              key={property.id}
              to={`/properties/${property.id}`}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/5"
            >
              <img src={property.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="truncate font-medium">{property.title}</p>
                <p className="truncate text-xs text-zinc-500">{property.location}</p>
              </div>
              <p className="ml-auto text-sm text-zinc-300">${property.price.toLocaleString()}</p>
            </Link>
          ))}
          <p className="mt-4 px-2 pb-2 text-xs uppercase tracking-widest text-zinc-500">Insights</p>
          {matches.posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              onClick={onClose}
              className="block rounded-xl px-2 py-2 hover:bg-white/5"
            >
              <p className="font-medium">{post.title}</p>
              <p className="truncate text-xs text-zinc-500">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

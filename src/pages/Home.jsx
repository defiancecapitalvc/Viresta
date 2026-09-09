import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getProperties as fetchProperties, getPosts } from "../api/client";
import { getProperties as localProperties } from "../data/properties";
import { blogPosts as localPosts } from "../data/blogPosts";

const ACTIVITIES = [
  { type: "TOUR", title: "3D walkthrough opened", property: "Modern Villa with Pool", price: "$850,000", when: "2m ago", change: "" },
  { type: "INQUIRY", title: "Walkthrough requested", property: "Luxury Downtown Apartment", price: "$1,200,000", when: "8m ago", change: "" },
  { type: "TOUR", title: "AR preview started", property: "Waterfront Estate", price: "$2,100,000", when: "14m ago", change: "+4.2%" },
  { type: "LISTED", title: "New digital listing", property: "Modern Villa with Pool", price: "$850,000", when: "1h ago", change: "" },
  { type: "TOUR", title: "Room jump: Kitchen", property: "Luxury Downtown Apartment", price: "$1,200,000", when: "1h ago", change: "" },
  { type: "INQUIRY", title: "Agent follow-up", property: "Waterfront Estate", price: "$2,100,000", when: "3h ago", change: "+1.8%" },
];

function FeaturedCard({ property }) {
  const extras = property.images?.slice(1, 5) || [];
  return (
    <article className="relative w-[86vw] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/5 bg-ink-800 sm:w-[420px] lg:w-[460px]">
      <div className="relative h-[280px] overflow-hidden sm:h-[320px]">
        <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-transparent to-black/20" />
        <div className="absolute right-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold backdrop-blur">
          TOP LISTING
          <span className="ml-2 text-primary-300">${property.price.toLocaleString()}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-hidden">
          {extras.map((image) => (
            <img key={image} src={image} alt="" className="h-16 w-12 rounded-lg border border-white/20 object-cover shadow-lg" />
          ))}
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">By {property.agent?.name || "Viresta"}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">{property.title}</h2>
          <p className="text-sm text-zinc-400">{property.location} · {property.status}</p>
        </div>
        <p className="line-clamp-4 text-sm leading-6 text-zinc-400">{property.description}</p>
        <div className="flex flex-wrap gap-2">
          {(property.experiences || []).map((item) => (
            <span key={item} className="chip">{item}</span>
          ))}
        </div>
        <div className="flex gap-2">
          <Link to={`/properties/${property.id}/3d`} className="btn flex-1">
            Open 3D tour
          </Link>
          <Link to={`/properties/${property.id}`} className="btn-secondary flex-1">
            View listing
          </Link>
        </div>
      </div>
    </article>
  );
}

function Home() {
  const scroller = useRef(null);
  const [properties, setProperties] = useState(localProperties());
  const [posts, setPosts] = useState(localPosts);

  useEffect(() => {
    fetchProperties()
      .then((data) => setProperties(data.properties || []))
      .catch(() => {});
    getPosts()
      .then((data) => setPosts(data.posts || []))
      .catch(() => {});
  }, []);

  const scrollBy = (dir) => {
    scroller.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  const trending = [...properties].sort((a, b) => b.price - a.price);

  return (
    <div className="pb-16">
      <section className="relative">
        <div className="flex items-center justify-between px-4 pb-3 pt-6 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Featured experiences</p>
            <h1 className="text-2xl font-semibold">Walk a home before you visit</h1>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button type="button" className="btn-secondary !px-3" onClick={() => scrollBy(-1)} aria-label="Previous">
              <FiChevronLeft />
            </button>
            <button type="button" className="btn-secondary !px-3" onClick={() => scrollBy(1)} aria-label="Next">
              <FiChevronRight />
            </button>
          </div>
        </div>
        <div ref={scroller} className="hide-scroll flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory sm:px-6">
          {properties.map((property) => (
            <FeaturedCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="px-4 pt-10 sm:px-6">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-semibold">Latest activities</h2>
          <Link to="/properties" className="text-sm text-zinc-400 hover:text-white">
            View marketplace
          </Link>
        </div>
        <div className="surface divide-y divide-white/5">
          {ACTIVITIES.map((item, index) => (
            <div key={`${item.title}-${index}`} className="flex items-center gap-3 px-4 py-3 text-sm">
              <span className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-primary-300">
                {item.type}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-zinc-200">{item.property}</p>
                <p className="truncate text-xs text-zinc-500">{item.title} · {item.when}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{item.price}</p>
                {item.change && <p className="text-xs text-emerald-400">{item.change}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pt-10 sm:px-6">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-semibold">Trending listings</h2>
          <Link to="/properties" className="text-sm text-zinc-400 hover:text-white">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {trending.map((property) => (
            <Link key={property.id} to={`/properties/${property.id}`} className="card group">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={property.image} alt={property.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-[11px] uppercase tracking-wide text-zinc-300">{property.status}</p>
                  <p className="font-semibold leading-tight">{property.title}</p>
                </div>
              </div>
              <div className="space-y-2 p-3">
                <p className="truncate text-xs text-zinc-500">{property.location}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[11px] text-zinc-500">Listed</p>
                    <p className="font-semibold">${property.price.toLocaleString()}</p>
                  </div>
                  <p className="text-[11px] text-zinc-500">{property.beds} bd · {property.baths} ba</p>
                </div>
                <span className="btn w-full !py-1.5 text-xs">Tour now</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {posts.length > 0 && (
        <section className="px-4 pt-10 sm:px-6">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-lg font-semibold">Insights</h2>
            <Link to="/blog" className="text-sm text-zinc-400 hover:text-white">
              All articles
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card">
                <img src={post.image} alt="" className="h-36 w-full object-cover" />
                <div className="p-4">
                  <p className="font-medium">{post.title}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;

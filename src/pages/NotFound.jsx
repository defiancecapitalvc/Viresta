import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">404</p>
      <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 max-w-md text-zinc-400">This route is not in the marketplace. Head back to listings or open a tour.</p>
      <div className="mt-6 flex gap-3">
        <Link to="/" className="btn">Home</Link>
        <Link to="/properties" className="btn-secondary">Marketplace</Link>
      </div>
    </div>
  );
}

export default NotFound;

import { Link } from "react-router-dom";
import { FiArrowLeft, FiBox, FiMap, FiMousePointer, FiNavigation, FiSmartphone } from "react-icons/fi";
import { getRoom } from "../../data/tours";

export function TourHUD({ property, tour, roomId, mode, onRoom, onMode }) {
  const room = getRoom(tour, roomId);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between text-white">
      <div className="pointer-events-auto flex items-start justify-between gap-4 px-4 py-4 md:px-6">
        <Link
          to={`/properties/${property.id}`}
          className="inline-flex items-center rounded-md bg-black/45 px-3 py-2 text-sm font-medium hover:bg-black/60"
        >
          <FiArrowLeft className="mr-2" />
          Back to listing
        </Link>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-primary-200">3D tour</p>
          <p className="font-semibold">{property.title}</p>
          <p className="text-xs text-secondary-200">{property.location}</p>
        </div>
      </div>

      <div className="pointer-events-auto mx-4 mb-4 grid gap-3 md:mx-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-end">
        <div className="rounded-xl bg-black/55 p-4 backdrop-blur-sm">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-primary-200">Now in</p>
              <h1 className="text-xl font-semibold md:text-2xl">{room.name}</h1>
              <p className="mt-1 max-w-xl text-sm text-secondary-200">{room.summary}</p>
            </div>
            <div className="flex rounded-md bg-white/10 p-1">
              <button
                type="button"
                className={`inline-flex items-center rounded px-3 py-1.5 text-sm ${mode === "look" ? "bg-white text-secondary-900" : ""}`}
                onClick={() => onMode("look")}
              >
                <FiMousePointer className="mr-2" />
                Look
              </button>
              <button
                type="button"
                className={`inline-flex items-center rounded px-3 py-1.5 text-sm ${mode === "walk" ? "bg-white text-secondary-900" : ""}`}
                onClick={() => onMode("walk")}
              >
                <FiNavigation className="mr-2" />
                Walk
              </button>
            </div>
          </div>

          <div className="mb-3 flex flex-wrap gap-2">
            {tour.rooms.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onRoom(item.id)}
                className={`rounded-full px-3 py-1 text-sm ${
                  item.id === roomId ? "bg-primary-600 text-white" : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-secondary-200">
            <p>
              {mode === "walk"
                ? "Click the scene to look around, then use WASD or arrow keys. Shift to move faster. Keys 1–5 jump rooms."
                : "Drag to look around. Click a blue marker, a room name, or the floor plan. Keys 1–5 jump rooms."}
            </p>
            <div className="flex gap-2">
              <Link to={`/properties/${property.id}/ar`} className="btn bg-primary-800 hover:bg-primary-900">
                <FiSmartphone className="mr-2" />
                AR Preview
              </Link>
              <Link to={`/properties/${property.id}`} className="btn-secondary text-primary-800">
                <FiBox className="mr-2" />
                Listing
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-black/55 p-3 backdrop-blur-sm">
          <p className="mb-2 flex items-center text-xs uppercase tracking-wide text-primary-200">
            <FiMap className="mr-2" />
            Floor plan
          </p>
          <svg viewBox="0 0 100 100" className="h-40 w-full">
            <rect width="100" height="100" rx="4" fill="#0f172a" />
            {tour.rooms.map((item) => (
              <g key={item.id} onClick={() => onRoom(item.id)} className="cursor-pointer">
                <rect
                  x={item.plan.x}
                  y={item.plan.y}
                  width={item.plan.w}
                  height={item.plan.h}
                  rx="2"
                  fill={item.id === roomId ? "#0682ff" : "#334155"}
                  stroke="#94a3b8"
                  strokeWidth="0.6"
                />
                <text
                  x={item.plan.x + item.plan.w / 2}
                  y={item.plan.y + item.plan.h / 2 + 1.2}
                  textAnchor="middle"
                  fill="white"
                  fontSize="4"
                >
                  {item.name.split(" ")[0]}
                </text>
              </g>
            ))}
          </svg>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs text-secondary-200">
            <div>
              <p className="text-base font-semibold text-white">{property.beds}</p>
              <p>Beds</p>
            </div>
            <div>
              <p className="text-base font-semibold text-white">{property.baths}</p>
              <p>Baths</p>
            </div>
            <div>
              <p className="text-base font-semibold text-white">{property.sqft?.toLocaleString()}</p>
              <p>Sqft</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

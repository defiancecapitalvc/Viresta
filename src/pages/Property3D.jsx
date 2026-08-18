import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { getProperty, recordTour } from "../api/client";
import { getPropertyById } from "../data/properties";
import { getTour } from "../data/tours";
import { TourExperience } from "../components/property/TourExperience";
import { TourHUD } from "../components/property/TourHUD";

function Property3D() {
  const { id } = useParams();
  const listingId = id || 1;
  const [property, setProperty] = useState(() => getPropertyById(listingId));
  const [roomId, setRoomId] = useState("entry");
  const [mode, setMode] = useState("look");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getProperty(listingId)
      .then((data) => setProperty(data.property))
      .catch(() => setProperty(getPropertyById(listingId)));
    recordTour({ propertyId: Number(listingId), experience: "3D" }).catch(() => {});
    const timer = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(timer);
  }, [listingId]);

  const tour = useMemo(() => getTour(property?.type), [property]);

  useEffect(() => {
    setRoomId("entry");
    setMode("look");
  }, [tour.id]);

  useEffect(() => {
    const onKey = (event) => {
      const index = Number(event.key) - 1;
      if (tour.rooms[index]) setRoomId(tour.rooms[index].id);
      if (event.key.toLowerCase() === "l") setMode("look");
      if (event.key.toLowerCase() === "k") setMode("walk");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tour]);

  if (!property) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-secondary-900 text-white">
        <div className="text-center">
          <p className="mb-4">This 3D tour is not available.</p>
          <Link to="/properties" className="btn">Back to properties</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-secondary-900">
      {!ready && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-secondary-900 text-xl font-semibold text-white">
          Opening the {property.title} tour…
        </div>
      )}
      <TourHUD
        property={property}
        tour={tour}
        roomId={roomId}
        mode={mode}
        onRoom={setRoomId}
        onMode={setMode}
      />
      <Canvas shadows camera={{ fov: 62, near: 0.1, far: 80, position: tour.rooms[0].position }}>
        <TourExperience tour={tour} roomId={roomId} mode={mode} onSelectRoom={setRoomId} />
      </Canvas>
    </div>
  );
}

export default Property3D;

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { FiArrowLeft, FiBox, FiCamera, FiMaximize2, FiRefreshCw, FiRotateCw } from "react-icons/fi";
import { getProperty, recordTour } from "../api/client";
import { getPropertyById } from "../data/properties";
import { getRoom, getTour } from "../data/tours";
import { ARScene } from "../components/property/ARScene";

const PRESETS = [
  { id: "table", label: "Table", view: "home", scale: 0.11 },
  { id: "floor", label: "Floor", view: "home", scale: 0.28 },
  { id: "room", label: "Room 1:1", view: "room", scale: 0.85 },
];

function PropertyAR() {
  const { id } = useParams();
  const listingId = id || 1;
  const [property, setProperty] = useState(() => getPropertyById(listingId));
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [cameraError, setCameraError] = useState("");
  const [view, setView] = useState("home");
  const [roomId, setRoomId] = useState("living");
  const [scale, setScale] = useState(0.14);
  const [rotation, setRotation] = useState(0.4);
  const [lift, setLift] = useState(0);
  const [placed, setPlaced] = useState({ x: 0, z: 0 });
  const [showMeasures, setShowMeasures] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);

  useEffect(() => {
    getProperty(listingId)
      .then((data) => setProperty(data.property))
      .catch(() => setProperty(getPropertyById(listingId)));
    recordTour({ propertyId: Number(listingId), experience: "AR" }).catch(() => {});
  }, [listingId]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const tour = useMemo(() => getTour(property?.type), [property]);
  const room = getRoom(tour, roomId);
  const measure = view === "room" && room.size ? room.size : tour.footprint;
  const percent = Math.round(scale * 100);

  const openCamera = async (facing) => {
    setCameraError("");
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("This browser cannot open a camera. Use Chrome or Edge on localhost or HTTPS.");
      return;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facing } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setFacingMode(facing);
      setCameraOn(true);
    } catch (_error) {
      setCameraError("Allow camera access to place the home in your space.");
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
  };

  const applyPreset = (preset) => {
    setView(preset.view);
    setScale(preset.scale);
    if (preset.view === "room") setRoomId((current) => (current === "entry" ? "living" : current));
  };

  const resetPlacement = () => {
    setPlaced({ x: 0, z: 0 });
    setRotation(0.4);
    setLift(0);
    setScale(view === "room" ? 0.85 : 0.14);
  };

  if (!property) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-secondary-900 text-white">
        <div className="text-center">
          <p className="mb-4">This property is not available for AR.</p>
          <Link to="/properties" className="btn">Back to properties</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-secondary-900 text-white">
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover ${cameraOn ? "block" : "hidden"}`}
        playsInline
        muted
      />
      {!cameraOn && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b,transparent_55%),linear-gradient(180deg,#0f172a,#111827)]" />
      )}

      <Canvas
        className="absolute inset-0"
        shadows
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [4.6, 3.4, 6.2], fov: 42, near: 0.1, far: 80 }}
      >
        <ARScene
          tour={tour}
          roomId={roomId}
          view={view}
          scale={scale}
          rotation={rotation}
          lift={lift}
          placed={placed}
          cameraOn={cameraOn}
          showMeasures={showMeasures}
          autoRotate={autoRotate}
          onPlace={setPlaced}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
        <div className="pointer-events-auto flex items-start justify-between gap-3 px-4 py-4 md:px-6">
          <Link
            to={`/properties/${property.id}`}
            className="inline-flex items-center rounded-md bg-black/45 px-3 py-2 text-sm font-medium hover:bg-black/60"
          >
            <FiArrowLeft className="mr-2" />
            Back to listing
          </Link>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-primary-200">AR Preview</p>
            <p className="font-semibold">{property.title}</p>
            <p className="text-xs text-secondary-200">{property.location}</p>
          </div>
        </div>

        <div className="pointer-events-auto bg-gradient-to-t from-black/90 via-black/65 to-transparent px-4 pb-5 pt-16 md:px-6">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-center text-sm text-secondary-200">
              {cameraOn
                ? "Tap the floor in the scene to place the model. Rotate and scale it against the room."
                : "Start the camera to drop this property into your space, or preview it here first."}
            </p>
            {cameraError && <p className="mb-3 text-center text-sm text-red-300">{cameraError}</p>}

            <div className="mb-3 flex flex-wrap justify-center gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={`rounded-full px-3 py-1 text-sm ${
                    (preset.view === view && Math.abs(preset.scale - scale) < 0.04)
                      ? "bg-primary-600"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  onClick={() => applyPreset(preset)}
                >
                  {preset.label}
                </button>
              ))}
              <button
                type="button"
                className={`rounded-full px-3 py-1 text-sm ${view === "shell" ? "bg-primary-600" : "bg-white/10 hover:bg-white/20"}`}
                onClick={() => setView("shell")}
              >
                Exterior
              </button>
            </div>

            <div className="mb-3 flex flex-wrap justify-center gap-2">
              {tour.rooms.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`rounded-full px-3 py-1 text-sm ${
                    roomId === item.id && view === "room" ? "bg-white text-secondary-900" : "bg-white/10 hover:bg-white/20"
                  }`}
                  onClick={() => {
                    setRoomId(item.id);
                    setView("room");
                    if (scale < 0.4) setScale(0.7);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="mb-4 grid gap-3 md:grid-cols-3">
              <label className="text-xs text-secondary-300">
                Scale · {percent}% of real size
                <input
                  type="range"
                  min="0.06"
                  max="1.2"
                  step="0.01"
                  value={scale}
                  onChange={(event) => setScale(Number(event.target.value))}
                  className="mt-2 w-full"
                />
              </label>
              <label className="text-xs text-secondary-300">
                Rotate
                <input
                  type="range"
                  min="0"
                  max={Math.PI * 2}
                  step="0.01"
                  value={rotation}
                  onChange={(event) => setRotation(Number(event.target.value))}
                  className="mt-2 w-full"
                />
              </label>
              <label className="text-xs text-secondary-300">
                Lift
                <input
                  type="range"
                  min="0"
                  max="1.4"
                  step="0.01"
                  value={lift}
                  onChange={(event) => setLift(Number(event.target.value))}
                  className="mt-2 w-full"
                />
              </label>
            </div>

            <div className="mb-4 flex flex-col justify-center gap-3 sm:flex-row">
              {cameraOn ? (
                <>
                  <button type="button" className="btn bg-white text-primary-700 hover:bg-primary-50" onClick={stopCamera}>
                    Stop camera
                  </button>
                  <button
                    type="button"
                    className="btn-secondary justify-center"
                    onClick={() => openCamera(facingMode === "environment" ? "user" : "environment")}
                  >
                    <FiRefreshCw className="mr-2" />
                    Flip camera
                  </button>
                </>
              ) : (
                <button type="button" className="btn" onClick={() => openCamera("environment")}>
                  <FiCamera className="mr-2" />
                  Start AR Preview
                </button>
              )}
              <button type="button" className="btn-secondary justify-center" onClick={resetPlacement}>
                <FiRotateCw className="mr-2" />
                Reset place
              </button>
              <button
                type="button"
                className="btn-secondary justify-center"
                onClick={() => setShowMeasures((value) => !value)}
              >
                <FiMaximize2 className="mr-2" />
                {showMeasures ? "Hide size" : "Show size"}
              </button>
              <button type="button" className="btn-secondary justify-center" onClick={() => setAutoRotate((value) => !value)}>
                {autoRotate ? "Stop spin" : "Auto spin"}
              </button>
              <Link to={`/properties/${property.id}/3d`} className="btn-secondary justify-center">
                <FiBox className="mr-2" />
                Open 3D tour
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center text-sm md:grid-cols-4">
              <div>
                <p className="text-lg font-semibold">{measure.width.toFixed(1)} × {measure.depth.toFixed(1)} m</p>
                <p className="text-secondary-300">{view === "room" ? room.name : "Footprint"}</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{(measure.width * scale).toFixed(1)} m</p>
                <p className="text-secondary-300">Width in view</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{property.beds} / {property.baths}</p>
                <p className="text-secondary-300">Beds / baths</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{property.sqft.toLocaleString()}</p>
                <p className="text-secondary-300">Sqft</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyAR;

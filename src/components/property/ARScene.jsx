import { ContactShadows, Environment, Grid, Html, OrbitControls } from "@react-three/drei";
import { getRoom } from "../../data/tours";
import { Interior } from "./Interior";

function DimensionMarks({ width, depth, visible }) {
  if (!visible) return null;
  return (
    <group>
      <Html position={[0, 0.15, depth / 2 + 0.35]} center>
        <div className="rounded bg-black/70 px-2 py-0.5 text-[11px] text-white whitespace-nowrap">
          {width.toFixed(1)} m
        </div>
      </Html>
      <Html position={[width / 2 + 0.35, 0.15, 0]} center>
        <div className="rounded bg-black/70 px-2 py-0.5 text-[11px] text-white whitespace-nowrap">
          {depth.toFixed(1)} m
        </div>
      </Html>
    </group>
  );
}

function ExteriorShell({ type }) {
  if (type === "apartment") {
    return (
      <group>
        <mesh position={[0, 3.05, 0.2]} castShadow>
          <boxGeometry args={[12.8, 0.18, 9]} />
          <meshStandardMaterial color="#3d4f5f" roughness={0.55} />
        </mesh>
        <mesh position={[0, 3.35, -3.4]} castShadow>
          <boxGeometry args={[8.4, 0.7, 0.12]} />
          <meshStandardMaterial color="#d7dde3" />
        </mesh>
      </group>
    );
  }
  if (type === "house") {
    return (
      <group>
        <mesh position={[0, 3.55, 1.2]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[11.4, 1.4, 4]} />
          <meshStandardMaterial color="#7f5539" roughness={0.5} />
        </mesh>
      </group>
    );
  }
  return (
    <group>
      <mesh position={[0, 3.45, 1.15]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[10.2, 1.2, 4]} />
        <meshStandardMaterial color="#6b4f3a" roughness={0.5} />
      </mesh>
    </group>
  );
}

export function ARScene({
  tour,
  roomId,
  view,
  scale,
  rotation,
  lift,
  placed,
  cameraOn,
  showMeasures,
  autoRotate,
  onPlace,
}) {
  const room = getRoom(tour, roomId);
  const offset = view === "room" ? [-room.position[0], 0, -room.position[2]] : [0, 0, 0];
  const measure = view === "room" && room.size ? room.size : tour.footprint;

  return (
    <>
      {!cameraOn && <color attach="background" args={["#0f172a"]} />}
      <ambientLight intensity={cameraOn ? 1.05 : 0.55} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={cameraOn ? 1.6 : 1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, 4, -3]} intensity={0.35} />
      {!cameraOn && <Environment preset="sunset" />}

      <OrbitControls
        makeDefault
        target={[placed.x, lift + 0.8, placed.z]}
        enablePan
        autoRotate={autoRotate}
        autoRotateSpeed={0.6}
        minDistance={1.2}
        maxDistance={22}
      />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, 0]}
        onPointerDown={(event) => {
          event.stopPropagation();
          onPlace({ x: event.point.x, z: event.point.z });
        }}
      >
        <planeGeometry args={[48, 48]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {cameraOn ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[placed.x, 0, placed.z]} receiveShadow>
          <planeGeometry args={[18, 18]} />
          <shadowMaterial opacity={0.32} />
        </mesh>
      ) : (
        <>
          <Grid
            position={[placed.x, 0.01, placed.z]}
            args={[16, 16]}
            cellSize={0.5}
            cellThickness={0.6}
            cellColor="#334155"
            sectionSize={2}
            sectionThickness={1.1}
            sectionColor="#0682ff"
            fadeDistance={18}
          />
          <ContactShadows position={[placed.x, 0.02, placed.z]} opacity={0.45} scale={16} blur={2.2} />
        </>
      )}

      <group position={[placed.x, lift, placed.z]} rotation={[0, rotation, 0]} scale={scale}>
        <group position={offset}>
          <Interior type={tour.id} cutaway={view !== "shell"} />
          {view === "shell" && <ExteriorShell type={tour.id} />}
        </group>
        <DimensionMarks width={measure.width} depth={measure.depth} visible={showMeasures} />
      </group>
    </>
  );
}

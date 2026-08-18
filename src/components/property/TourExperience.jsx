import { useEffect, useRef } from "react";
import { CameraControls, Environment, Html, PointerLockControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { getRoom, isWalkable } from "../../data/tours";
import { Interior } from "./Interior";

function LookCamera({ tour, roomId }) {
  const controls = useRef();
  const room = getRoom(tour, roomId);

  useEffect(() => {
    if (!controls.current || !room) return;
    const [px, py, pz] = room.position;
    const [tx, ty, tz] = room.lookAt;
    controls.current.setLookAt(px, py, pz, tx, ty, tz, true);
  }, [room]);

  return (
    <CameraControls
      ref={controls}
      makeDefault
      smoothTime={0.55}
      minDistance={0.4}
      maxDistance={7}
      truckSpeed={0}
      polarRotateSpeed={0.55}
      azimuthRotateSpeed={0.7}
    />
  );
}

function WalkRig({ enabled, tour, roomId }) {
  const { camera } = useThree();
  const keys = useRef({});
  const room = getRoom(tour, roomId);

  useEffect(() => {
    if (!enabled || !room) return;
    camera.position.set(...room.position);
    camera.lookAt(...room.lookAt);
  }, [enabled, room, camera]);

  useEffect(() => {
    if (!enabled) return undefined;
    const down = (event) => {
      keys.current[event.code] = true;
    };
    const up = (event) => {
      keys.current[event.code] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [enabled]);

  useFrame((state, delta) => {
    if (!enabled) return;
    const speed = keys.current.ShiftLeft ? 5.4 : 3.1;
    const forward = new Vector3();
    state.camera.getWorldDirection(forward);
    forward.y = 0;
    if (forward.lengthSq() > 0) forward.normalize();
    const right = new Vector3().crossVectors(forward, new Vector3(0, 1, 0)).normalize();

    const move = new Vector3();
    if (keys.current.KeyW || keys.current.ArrowUp) move.add(forward);
    if (keys.current.KeyS || keys.current.ArrowDown) move.sub(forward);
    if (keys.current.KeyD || keys.current.ArrowRight) move.add(right);
    if (keys.current.KeyA || keys.current.ArrowLeft) move.sub(right);

    if (move.lengthSq() === 0) {
      state.camera.position.y = 1.65;
      return;
    }

    move.normalize().multiplyScalar(speed * delta);
    const next = state.camera.position.clone().add(move);
    if (isWalkable(next.x, next.z, tour.walkable)) {
      state.camera.position.copy(next);
    }
    state.camera.position.y = 1.65;
  });

  if (!enabled) return null;
  return <PointerLockControls />;
}

function Hotspots({ rooms, current, onSelect, visible }) {
  if (!visible) return null;
  return rooms
    .filter((room) => room.id !== current)
    .map((room) => (
      <group key={room.id} position={[room.position[0], 0.08, room.position[2]]}>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(room.id);
          }}
        >
          <circleGeometry args={[0.32, 24]} />
          <meshStandardMaterial color="#0682ff" emissive="#0682ff" emissiveIntensity={0.55} />
        </mesh>
        <Html center distanceFactor={10} style={{ pointerEvents: "none" }}>
          <div className="rounded-full bg-black/70 text-white text-[11px] px-2 py-1 whitespace-nowrap">
            {room.name}
          </div>
        </Html>
      </group>
    ));
}

export function TourExperience({ tour, roomId, mode, onSelectRoom }) {
  return (
    <>
      <color attach="background" args={["#9ec4dc"]} />
      <fog attach="fog" args={["#9ec4dc", 18, 42]} />
      <hemisphereLight args={["#fff4e0", "#8aa07a", 0.55]} />
      <directionalLight
        position={tour.sun}
        intensity={1.25}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight intensity={0.28} />
      <Environment preset="sunset" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#7f9b63" />
      </mesh>
      <Interior type={tour.id} />
      {mode === "look" ? <LookCamera tour={tour} roomId={roomId} /> : null}
      <WalkRig enabled={mode === "walk"} tour={tour} roomId={roomId} />
      <Hotspots rooms={tour.rooms} current={roomId} onSelect={onSelectRoom} visible={mode === "look"} />
    </>
  );
}

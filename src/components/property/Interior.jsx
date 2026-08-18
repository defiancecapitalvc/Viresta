function Box({ position, args, color, roughness = 0.78, metalness = 0, rotation }) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

function Floor({ position, args, color, roughness = 0.7 }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={args} />
      <meshStandardMaterial color={color} roughness={roughness} />
    </mesh>
  );
}

function Glass({ position, args, color = "#9ec9e8" }) {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} transparent opacity={0.28} roughness={0.05} metalness={0.15} />
    </mesh>
  );
}

function Sofa({ position = [0, 0, 0], rotation = [0, 0, 0], color = "#6d7a86" }) {
  return (
    <group position={position} rotation={rotation}>
      <Box position={[0, 0.28, 0]} args={[2.4, 0.28, 0.95]} color={color} roughness={0.9} />
      <Box position={[0, 0.62, -0.36]} args={[2.4, 0.5, 0.22]} color={color} roughness={0.9} />
      <Box position={[-1.08, 0.48, 0.04]} args={[0.22, 0.42, 0.9]} color={color} roughness={0.86} />
      <Box position={[1.08, 0.48, 0.04]} args={[0.22, 0.42, 0.9]} color={color} roughness={0.86} />
      <Box position={[-0.5, 0.46, 0.08]} args={[0.86, 0.1, 0.62]} color="#d7cfc4" roughness={0.95} />
      <Box position={[0.5, 0.46, 0.08]} args={[0.86, 0.1, 0.62]} color="#d7cfc4" roughness={0.95} />
    </group>
  );
}

function Table({ position, args = [1.3, 0.08, 0.7], color = "#c9b79a" }) {
  const [w, , d] = args;
  return (
    <group position={position}>
      <Box position={[0, 0.42, 0]} args={args} color={color} roughness={0.4} />
      <Box position={[-w / 2 + 0.08, 0.2, -d / 2 + 0.08]} args={[0.08, 0.4, 0.08]} color="#5c4634" />
      <Box position={[w / 2 - 0.08, 0.2, -d / 2 + 0.08]} args={[0.08, 0.4, 0.08]} color="#5c4634" />
      <Box position={[-w / 2 + 0.08, 0.2, d / 2 - 0.08]} args={[0.08, 0.4, 0.08]} color="#5c4634" />
      <Box position={[w / 2 - 0.08, 0.2, d / 2 - 0.08]} args={[0.08, 0.4, 0.08]} color="#5c4634" />
    </group>
  );
}

function DiningSet({ position }) {
  return (
    <group position={position}>
      <Table position={[0, 0, 0]} args={[1.7, 0.08, 0.9]} color="#b08968" />
      {[-0.5, 0.5].map((x) => (
        <Box key={`n-${x}`} position={[x, 0.28, -0.62]} args={[0.36, 0.08, 0.36]} color="#efe6da" />
      ))}
      {[-0.5, 0.5].map((x) => (
        <Box key={`s-${x}`} position={[x, 0.28, 0.62]} args={[0.36, 0.08, 0.36]} color="#efe6da" />
      ))}
    </group>
  );
}

function KitchenRun({ position, width = 3.4, color = "#ece7df" }) {
  return (
    <group position={position}>
      <Box position={[0, 0.45, 0]} args={[width, 0.9, 0.62]} color={color} />
      <Box position={[0, 0.92, 0]} args={[width, 0.06, 0.66]} color="#d8d4cf" metalness={0.25} roughness={0.28} />
      <Box position={[0, 2.15, -0.08]} args={[width, 0.7, 0.36]} color={color} />
    </group>
  );
}

function Island({ position }) {
  return (
    <group position={position}>
      <Box position={[0, 0.42, 0]} args={[2.1, 0.84, 0.95]} color="#3f4a52" />
      <Box position={[0, 0.86, 0]} args={[2.2, 0.07, 1.05]} color="#ececec" metalness={0.2} roughness={0.22} />
      <Box position={[0.7, 1.02, 0]} args={[0.28, 0.08, 0.28]} color="#d9d4cc" />
    </group>
  );
}

function Bed({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <Box position={[0, 0.28, 0]} args={[2.1, 0.28, 1.8]} color="#8b7355" />
      <Box position={[0, 0.5, 0.05]} args={[1.95, 0.18, 1.65]} color="#efe8de" roughness={0.95} />
      <Box position={[0, 0.78, -0.82]} args={[2.1, 0.82, 0.12]} color="#6b5344" />
      <Box position={[-0.48, 0.66, -0.55]} args={[0.7, 0.16, 0.38]} color="#f4f0ea" />
      <Box position={[0.48, 0.66, -0.55]} args={[0.7, 0.16, 0.38]} color="#f4f0ea" />
    </group>
  );
}

function Lamp({ position, color = "#f4e3c1" }) {
  return (
    <group position={position}>
      <Box position={[0, 0.55, 0]} args={[0.08, 1.1, 0.08]} color="#2f2f2f" />
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} />
      </mesh>
      <pointLight position={[0, 1.15, 0]} intensity={0.55} distance={6} color={color} />
    </group>
  );
}

function Pool({ position, args = [5.4, 0.22, 3.2], color = "#3d8ebd" }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[args[0], args[2]]} />
        <meshStandardMaterial color={color} transparent opacity={0.72} roughness={0.12} metalness={0.25} />
      </mesh>
      <Box position={[0, 0.08, args[2] / 2 + 0.08]} args={[args[0] + 0.3, 0.16, 0.16]} color="#d7d2cb" />
      <Box position={[0, 0.08, -args[2] / 2 - 0.08]} args={[args[0] + 0.3, 0.16, 0.16]} color="#d7d2cb" />
      <Box position={[args[0] / 2 + 0.08, 0.08, 0]} args={[0.16, 0.16, args[2]]} color="#d7d2cb" />
      <Box position={[-args[0] / 2 - 0.08, 0.08, 0]} args={[0.16, 0.16, args[2]]} color="#d7d2cb" />
    </group>
  );
}

function RoomLights({ points }) {
  return points.map((point) => (
    <pointLight key={point.join("-")} position={point} intensity={0.7} distance={8} color="#ffe9c7" />
  ));
}

function VillaInterior({ cutaway }) {
  return (
    <group>
      <Floor position={[0, 0, 1]} args={[16.4, 11.2]} color="#d8c7a8" />
      <Floor position={[0, 0, -7.2]} args={[16.4, 7.6]} color="#8fa36b" />
      <Floor position={[0, 0, 7.1]} args={[6.4, 3.2]} color="#cfc6b8" />
      {!cutaway && (
        <mesh position={[0, 3.08, 1.2]} receiveShadow>
          <boxGeometry args={[16.2, 0.12, 7.8]} />
          <meshStandardMaterial color="#f4f0e8" roughness={0.92} />
        </mesh>
      )}

      <Box position={[-4.6, 1.5, 5.05]} args={[7, 3, 0.16]} color="#f3efe6" />
      <Box position={[4.6, 1.5, 5.05]} args={[7, 3, 0.16]} color="#f3efe6" />
      <Box position={[-4.8, 1.5, -2.55]} args={[6.4, 3, 0.16]} color="#f3efe6" />
      <Box position={[4.8, 1.5, -2.55]} args={[6.4, 3, 0.16]} color="#f3efe6" />
      <Box position={[-8.05, 1.5, 1.25]} args={[0.16, 3, 7.8]} color="#efe8dc" />
      <Box position={[8.05, 1.5, 1.25]} args={[0.16, 3, 7.8]} color="#efe8dc" />
      <Box position={[-2.55, 1.5, -0.7]} args={[0.14, 3, 3.8]} color="#eee6d8" />
      <Box position={[-2.55, 1.5, 3.7]} args={[0.14, 3, 2.4]} color="#eee6d8" />
      <Box position={[2.55, 1.5, -0.7]} args={[0.14, 3, 3.8]} color="#eee6d8" />
      <Box position={[2.55, 1.5, 3.7]} args={[0.14, 3, 2.4]} color="#eee6d8" />

      <Glass position={[0, 1.45, 5.08]} args={[2.1, 2.2, 0.06]} />
      <Glass position={[0, 1.45, -2.52]} args={[2.4, 2.3, 0.06]} color="#8ec4e6" />
      <Glass position={[-5.4, 1.55, -2.52]} args={[1.6, 1.5, 0.05]} />
      <Glass position={[5.4, 1.55, -2.52]} args={[1.6, 1.5, 0.05]} />
      <Glass position={[-8.02, 1.55, 1.2]} args={[0.05, 1.5, 2.2]} />
      <Glass position={[8.02, 1.55, 1.2]} args={[0.05, 1.5, 2.2]} />

      <Sofa position={[0, 0, 0.1]} />
      <Table position={[0, 0, 1.15]} />
      <Box position={[0, 0.06, 0.7]} args={[2.6, 0.04, 2.1]} color="#8b4a3a" roughness={0.95} />
      <Lamp position={[-1.7, 0, 2.4]} />
      <Lamp position={[1.7, 0, 2.4]} />

      <KitchenRun position={[-5.4, 0, -1.7]} width={3.6} />
      <Island position={[-5.1, 0, 0.35]} />
      <DiningSet position={[-5.1, 0, 2.6]} />
      <Box position={[-7.5, 0.85, 2.8]} args={[0.7, 1.7, 0.62]} color="#cfd4d8" metalness={0.35} roughness={0.3} />

      <Bed position={[5.5, 0, -0.2]} />
      <Box position={[7.3, 0.32, -1.2]} args={[0.48, 0.46, 0.48]} color="#6b5344" />
      <Box position={[3.7, 0.32, -1.2]} args={[0.48, 0.46, 0.48]} color="#6b5344" />
      <Sofa position={[5.4, 0, 2.6]} rotation={[0, Math.PI, 0]} color="#9aa7b2" />

      <Pool position={[1.6, 0, -8.6]} />
      <Box position={[-3.4, 0.42, -7.8]} args={[2.4, 0.84, 0.7]} color="#4b5560" />
      <Sofa position={[-2.6, 0, -5.6]} rotation={[0, Math.PI / 2, 0]} color="#c2b6a6" />
      <Box position={[5.4, 0.18, -6.4]} args={[1.6, 0.36, 1.6]} color="#c9b79a" />

      <RoomLights points={[[0, 2.6, 1.2], [-5.1, 2.6, 0.8], [5.3, 2.6, 0.6], [0, 2.4, -6.4]]} />
    </group>
  );
}

function ApartmentInterior({ cutaway }) {
  return (
    <group>
      <Floor position={[0, 0, 0.2]} args={[12.6, 12.4]} color="#d5d7db" />
      <Floor position={[0, 0, -6.2]} args={[9.2, 3.8]} color="#8d8f94" />
      {!cutaway && (
        <mesh position={[0, 2.92, 0.4]} receiveShadow>
          <boxGeometry args={[12.2, 0.1, 8.4]} />
          <meshStandardMaterial color="#f2f4f6" />
        </mesh>
      )}

      <Box position={[-3.4, 1.45, 4.35]} args={[5.4, 2.9, 0.14]} color="#e8eef4" />
      <Box position={[3.4, 1.45, 4.35]} args={[5.4, 2.9, 0.14]} color="#e8eef4" />
      <Box position={[-6.05, 1.45, 0.4]} args={[0.14, 2.9, 8.1]} color="#e4ebf1" />
      <Box position={[6.05, 1.45, 0.4]} args={[0.14, 2.9, 8.1]} color="#e4ebf1" />
      <Box position={[-3.4, 1.45, -3.55]} args={[5.2, 2.9, 0.12]} color="#e8eef4" />
      <Box position={[3.4, 1.45, -3.55]} args={[5.2, 2.9, 0.12]} color="#e8eef4" />
      <Box position={[-3.45, 1.45, 0.3]} args={[0.12, 2.9, 4.4]} color="#dce4ec" />
      <Box position={[3.45, 1.45, -0.8]} args={[0.12, 2.9, 5.4]} color="#dce4ec" />

      <Glass position={[0, 1.4, 4.36]} args={[1.8, 2.2, 0.05]} />
      <Glass position={[0, 1.5, -3.52]} args={[2.6, 2.2, 0.05]} color="#9fd0ee" />
      <Glass position={[-6.02, 1.5, -0.6]} args={[0.05, 1.8, 3.4]} />

      <Sofa position={[0.4, 0, 0.2]} color="#4d5d6b" />
      <Table position={[0.4, 0, 1.2]} args={[1.2, 0.06, 0.6]} color="#9aa3ad" />
      <KitchenRun position={[-4.7, 0, -1.8]} width={2.2} color="#f3f6f8" />
      <Island position={[-4.4, 0, 0.2]} />
      <Bed position={[4.7, 0, -0.4]} />
      <Box position={[5.3, 0.7, 2.2]} args={[1.1, 1.4, 0.42]} color="#c5ccd3" />
      <Pool position={[0.2, 0, -6.6]} args={[4.2, 0.12, 1.6]} color="#5aa0c8" />
      <Box position={[-2.6, 0.2, -5.8]} args={[1.4, 0.4, 0.7]} color="#6b7280" />

      <RoomLights points={[[0, 2.5, 0.6], [-4.4, 2.5, 0.2], [4.6, 2.5, 0.4]]} />
    </group>
  );
}

function EstateInterior({ cutaway }) {
  return (
    <group>
      <Floor position={[0, 0, 1.4]} args={[18.4, 12.6]} color="#cbb79a" />
      <Floor position={[0, 0, -7.6]} args={[18.4, 8]} color="#6f8a5c" />
      {!cutaway && (
        <mesh position={[0, 3.2, 1.2]} receiveShadow>
          <boxGeometry args={[18, 0.12, 9]} />
          <meshStandardMaterial color="#f6f0e6" />
        </mesh>
      )}

      <Box position={[-5.2, 1.6, 5.9]} args={[7.6, 3.2, 0.16]} color="#f7f1ea" />
      <Box position={[5.2, 1.6, 5.9]} args={[7.6, 3.2, 0.16]} color="#f7f1ea" />
      <Box position={[-5.6, 1.6, -2.9]} args={[6.8, 3.2, 0.16]} color="#f7f1ea" />
      <Box position={[5.6, 1.6, -2.9]} args={[6.8, 3.2, 0.16]} color="#f7f1ea" />
      <Box position={[-9.05, 1.6, 1.5]} args={[0.16, 3.2, 9]} color="#f3ebe0" />
      <Box position={[9.05, 1.6, 1.5]} args={[0.16, 3.2, 9]} color="#f3ebe0" />
      <Box position={[-4.15, 1.6, -0.6]} args={[0.14, 3.2, 4.6]} color="#efe4d4" />
      <Box position={[-4.15, 1.6, 4.2]} args={[0.14, 3.2, 2.6]} color="#efe4d4" />
      <Box position={[4.15, 1.6, -0.6]} args={[0.14, 3.2, 4.6]} color="#efe4d4" />
      <Box position={[4.15, 1.6, 4.2]} args={[0.14, 3.2, 2.6]} color="#efe4d4" />

      <Glass position={[0, 1.55, 5.92]} args={[2.6, 2.4, 0.06]} />
      <Glass position={[0, 1.55, -2.86]} args={[3.2, 2.5, 0.06]} color="#7fb8d8" />
      <Glass position={[-9.02, 1.6, 1.2]} args={[0.05, 1.8, 3]} />
      <Glass position={[9.02, 1.6, 1.2]} args={[0.05, 1.8, 3]} />

      <Sofa position={[-1.2, 0, 0.6]} color="#7a5c48" />
      <Sofa position={[1.4, 0, 0.6]} rotation={[0, 0.08, 0]} color="#7a5c48" />
      <Table position={[0.1, 0, 1.7]} args={[1.6, 0.08, 0.8]} color="#a67c52" />
      <Box position={[0, 0.7, -1.7]} args={[2.4, 1.4, 0.38]} color="#5b4636" />
      <KitchenRun position={[-6.5, 0, -1.6]} width={3.8} color="#efe6da" />
      <Island position={[-6.3, 0, 0.5]} />
      <DiningSet position={[-6.2, 0, 2.8]} />
      <Bed position={[6.4, 0, -0.1]} />
      <Sofa position={[6.3, 0, 2.8]} rotation={[0, Math.PI, 0]} color="#b8a48c" />
      <Pool position={[1.8, 0, -9.2]} args={[7.2, 0.2, 3.6]} color="#2f7ea8" />
      <Box position={[-4.8, 0.18, -7.2]} args={[2.2, 0.36, 2.2]} color="#d6c4a6" />
      <Lamp position={[-2.6, 0, 2.8]} />
      <Lamp position={[2.6, 0, 2.8]} />

      <RoomLights points={[[0, 2.8, 1.4], [-6.2, 2.7, 0.8], [6.3, 2.7, 0.6], [0, 2.5, -7]]} />
    </group>
  );
}

export function Interior({ type = "villa", cutaway = false }) {
  if (type === "apartment") return <ApartmentInterior cutaway={cutaway} />;
  if (type === "house") return <EstateInterior cutaway={cutaway} />;
  return <VillaInterior cutaway={cutaway} />;
}

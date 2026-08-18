const tours = {
  villa: {
    id: "villa",
    label: "Villa",
    sun: [8, 12, -10],
    footprint: { width: 16.4, depth: 18.8, height: 3.1 },
    rooms: [
      {
        id: "entry",
        name: "Entry",
        short: "Entry",
        summary: "Arrive through the courtyard into the double-height foyer.",
        position: [0, 1.65, 7.4],
        lookAt: [0, 1.35, 2.2],
        size: { width: 3.2, depth: 3.4 },
        plan: { x: 38, y: 78, w: 24, h: 16 },
      },
      {
        id: "living",
        name: "Living room",
        summary: "Open living space with a long sofa, stone table, and garden views.",
        position: [0.2, 1.65, 1.8],
        lookAt: [0, 1.2, -1.6],
        size: { width: 5.2, depth: 7.4 },
        plan: { x: 32, y: 34, w: 36, h: 44 },
      },
      {
        id: "kitchen",
        name: "Kitchen",
        summary: "Gourmet kitchen with an island, dining table, and service counters.",
        position: [-5.1, 1.65, 1.6],
        lookAt: [-5.2, 1.15, -1.4],
        size: { width: 5.4, depth: 7.4 },
        plan: { x: 4, y: 34, w: 28, h: 44 },
      },
      {
        id: "bedroom",
        name: "Primary bedroom",
        summary: "Quiet bedroom wing with a king bed and morning light.",
        position: [5.2, 1.65, 1.8],
        lookAt: [5.4, 1.15, -1.6],
        size: { width: 5.4, depth: 7.4 },
        plan: { x: 68, y: 34, w: 28, h: 44 },
      },
      {
        id: "terrace",
        name: "Pool terrace",
        summary: "Step outside to the pool, lounge deck, and outdoor kitchen.",
        position: [0, 1.65, -6.6],
        lookAt: [1.6, 0.8, -9.4],
        size: { width: 12.4, depth: 6.4 },
        plan: { x: 16, y: 4, w: 68, h: 28 },
      },
    ],
    walkable: [
      { x: 0, z: 6.6, w: 3.2, d: 3.4 },
      { x: 0, z: 1.1, w: 5.2, d: 7.4 },
      { x: -5.2, z: 1.1, w: 5.4, d: 7.4 },
      { x: 5.2, z: 1.1, w: 5.4, d: 7.4 },
      { x: 0, z: -6.4, w: 12.4, d: 6.4 },
      { x: -2.5, z: 1.2, w: 1.6, d: 2.4 },
      { x: 2.5, z: 1.2, w: 1.6, d: 2.4 },
      { x: 0, z: -2.6, w: 2.4, d: 1.8 },
    ],
  },
  apartment: {
    id: "apartment",
    label: "Penthouse",
    sun: [6, 10, 4],
    footprint: { width: 12.6, depth: 14.2, height: 2.95 },
    rooms: [
      {
        id: "entry",
        name: "Foyer",
        summary: "Private elevator lobby opening into the penthouse.",
        position: [0, 1.65, 5.6],
        lookAt: [0, 1.3, 1.4],
        size: { width: 2.8, depth: 2.6 },
        plan: { x: 38, y: 78, w: 24, h: 16 },
      },
      {
        id: "living",
        name: "Great room",
        summary: "Floor-to-ceiling glass, a long lounge, and the city beyond.",
        position: [-0.4, 1.65, 1.2],
        lookAt: [1.2, 1.2, -2.4],
        size: { width: 7.6, depth: 6.6 },
        plan: { x: 22, y: 30, w: 56, h: 48 },
      },
      {
        id: "kitchen",
        name: "Kitchen",
        summary: "Linear kitchen and breakfast bar facing the living room.",
        position: [-4.4, 1.65, 0.6],
        lookAt: [-4.6, 1.2, -1.8],
        size: { width: 2.2, depth: 6.6 },
        plan: { x: 4, y: 30, w: 18, h: 48 },
      },
      {
        id: "bedroom",
        name: "Suite",
        summary: "Primary suite set back from the living room.",
        position: [4.6, 1.65, 1.4],
        lookAt: [4.8, 1.15, -1.6],
        size: { width: 2.4, depth: 6.2 },
        plan: { x: 78, y: 30, w: 18, h: 48 },
      },
      {
        id: "terrace",
        name: "Terrace",
        summary: "Private terrace for evening views over the city.",
        position: [0.4, 1.65, -5.8],
        lookAt: [0, 1.2, -8],
        size: { width: 8.2, depth: 3.6 },
        plan: { x: 22, y: 4, w: 56, h: 24 },
      },
    ],
    walkable: [
      { x: 0, z: 5.2, w: 2.8, d: 2.6 },
      { x: 0, z: 0.4, w: 7.6, d: 6.6 },
      { x: -4.5, z: 0.4, w: 2.2, d: 6.6 },
      { x: 4.6, z: 0.6, w: 2.4, d: 6.2 },
      { x: 0, z: -5.6, w: 8.2, d: 3.6 },
      { x: 0, z: -3.2, w: 2.2, d: 1.6 },
    ],
  },
  house: {
    id: "house",
    label: "Estate",
    sun: [-8, 11, -8],
    footprint: { width: 18.4, depth: 20.6, height: 3.3 },
    rooms: [
      {
        id: "entry",
        name: "Foyer",
        summary: "A formal arrival hall that splits toward living and water.",
        position: [0, 1.65, 8.2],
        lookAt: [0, 1.4, 3],
        size: { width: 3.6, depth: 3.2 },
        plan: { x: 36, y: 78, w: 28, h: 16 },
      },
      {
        id: "living",
        name: "Great hall",
        summary: "Wide living hall with a stone hearth and water views.",
        position: [0, 1.65, 2.2],
        lookAt: [0, 1.2, -2],
        size: { width: 8.4, depth: 8.2 },
        plan: { x: 24, y: 32, w: 52, h: 46 },
      },
      {
        id: "kitchen",
        name: "Kitchen wing",
        summary: "Chef kitchen and informal dining along the west wing.",
        position: [-6.2, 1.65, 1.4],
        lookAt: [-6.4, 1.15, -1.8],
        size: { width: 4.2, depth: 7.6 },
        plan: { x: 2, y: 32, w: 22, h: 46 },
      },
      {
        id: "bedroom",
        name: "Owner suite",
        summary: "East-wing suite with a sitting area and garden light.",
        position: [6.2, 1.65, 1.6],
        lookAt: [6.4, 1.15, -1.6],
        size: { width: 4.2, depth: 7.6 },
        plan: { x: 76, y: 32, w: 22, h: 46 },
      },
      {
        id: "terrace",
        name: "Waterfront deck",
        summary: "Infinity edge, dock steps, and the open water.",
        position: [0, 1.65, -7.2],
        lookAt: [2.2, 0.7, -10.4],
        size: { width: 13, depth: 6.2 },
        plan: { x: 14, y: 2, w: 72, h: 28 },
      },
    ],
    walkable: [
      { x: 0, z: 7.4, w: 3.6, d: 3.2 },
      { x: 0, z: 1.4, w: 8.4, d: 8.2 },
      { x: -6.2, z: 1.2, w: 4.2, d: 7.6 },
      { x: 6.2, z: 1.2, w: 4.2, d: 7.6 },
      { x: 0, z: -7, w: 13, d: 6.2 },
      { x: -4.2, z: 1.2, w: 1.6, d: 2.2 },
      { x: 4.2, z: 1.2, w: 1.6, d: 2.2 },
      { x: 0, z: -3, w: 2.6, d: 2 },
    ],
  },
};

export function getTour(type = "villa") {
  return tours[type] || tours.villa;
}

export function getRoom(tour, roomId) {
  return tour.rooms.find((room) => room.id === roomId) || tour.rooms[0];
}

export function isWalkable(x, z, rects, radius = 0.28) {
  return rects.some(
    (rect) =>
      x > rect.x - rect.w / 2 + radius &&
      x < rect.x + rect.w / 2 - radius &&
      z > rect.z - rect.d / 2 + radius &&
      z < rect.z + rect.d / 2 - radius
  );
}

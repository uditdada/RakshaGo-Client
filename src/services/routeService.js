// src/services/routeService.js
// Returns a simple straight-line route (array of points) unless you set REACT_APP_USE_GOOGLE=1 & a server URL
// This keeps the MVP zero-cost. Later you can replace with Google Directions or server.

export function straightLineRoute(origin, destination, steps = 40) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lat = origin.lat + (destination.lat - origin.lat) * t;
    const lng = origin.lng + (destination.lng - origin.lng) * t;
    points.push({ lat, lng });
  }
  // approximate distance using haversine (meters)
  function haversine(a, b) {
    const R = 6371000;
    const toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const aa = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
    return R * c;
  }
  const distance = haversine(origin, destination);
  return { points, distanceMeters: distance, durationSeconds: Math.round(distance / 1000 * 60) };
}

// If you later set up a server/Cloud Function and configure REACT_APP_FUNCTIONS_BASE_URL,
// you can implement a fetch there. For now, return straightLineRoute.
export async function getRouteFallback(origin, destination) {
  return straightLineRoute(origin, destination, 60);
}

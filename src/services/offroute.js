// src/services/offroute.js
import * as turf from "@turf/turf";

/**
 * Accepts either:
 * - points: [{lat,lng}, ...]
 * - or already a turf lineString
 */
export function buildLineStringFromPoints(points) {
  const coords = points.map((p) => [p.lng, p.lat]);
  return turf.lineString(coords);
}

/**
 * Distance in meters from a position {lat,lng} to the LineString
 */
export function distanceFromRouteMeters(position, lineString) {
  const p = turf.point([position.lng, position.lat]);
  return turf.pointToLineDistance(p, lineString, { units: "meters" });
}

export function isOffRoute(distanceM, corridorM = 120) {
  return distanceM > corridorM;
}

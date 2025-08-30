// src/hooks/useOffRouteWatcher.js
import { useEffect, useRef, useState } from "react";
import { buildLineStringFromPoints, distanceFromRouteMeters, isOffRoute } from "../services/offroute";
import { playAlarm, stopAlarm } from "../services/alarm";

/**
 * encodedPoints = array of {lat,lng}
 */
export default function useOffRouteWatcher({ points, corridorMeters = 120, dwellMs = 30000, onOffRoute, onBackOnRoute }) {
  const lineRef = useRef(null);
  const offStartRef = useRef(null);
  const [distanceM, setDistanceM] = useState(null);
  const [offRoute, setOffRoute] = useState(false);

  useEffect(() => {
    if (points && points.length) {
      lineRef.current = buildLineStringFromPoints(points);
    }
  }, [points]);

  useEffect(() => {
    if (!lineRef.current) return;
    if (!navigator.geolocation) {
      console.warn("No geolocation available");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const d = distanceFromRouteMeters({ lat, lng }, lineRef.current);
        setDistanceM(d);
        const off = isOffRoute(d, corridorMeters);
        if (off) {
          if (!offStartRef.current) offStartRef.current = Date.now();
          const elapsed = Date.now() - offStartRef.current;
          if (elapsed >= dwellMs && !offRoute) {
            setOffRoute(true);
            playAlarm();
            onOffRoute?.({ lat, lng, distanceM: d });
          }
        } else {
          offStartRef.current = null;
          if (offRoute) {
            setOffRoute(false);
            stopAlarm();
            onBackOnRoute?.();
          }
        }
      },
      (err) => console.warn("geolocation error:", err),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );

    return () => {
      if (watchId != null) navigator.geolocation.clearWatch(watchId);
      stopAlarm();
    };
  }, [points, corridorMeters, dwellMs, onOffRoute, onBackOnRoute, offRoute]);

  return { distanceM, offRoute };
}

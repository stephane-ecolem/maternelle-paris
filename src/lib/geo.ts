export type Position = [lon: number, lat: number];
type Anneau = Position[];
type Polygone = Anneau[];

export interface Geometrie {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: Polygone | Polygone[];
}

/** Distance à vol d'oiseau en mètres (formule de haversine). */
export function distanceMetres([lon1, lat1]: Position, [lon2, lat2]: Position): number {
  const R = 6371008.8;
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function dansAnneau([x, y]: Position, anneau: Anneau): boolean {
  let dedans = false;
  for (let i = 0, j = anneau.length - 1; i < anneau.length; j = i++) {
    const [xi, yi] = anneau[i];
    const [xj, yj] = anneau[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) dedans = !dedans;
  }
  return dedans;
}

function dansPolygone(p: Position, poly: Polygone): boolean {
  if (!poly.length || !dansAnneau(p, poly[0])) return false;
  return !poly.slice(1).some((trou) => dansAnneau(p, trou));
}

export function contient(g: Geometrie, p: Position): boolean {
  if (g.type === 'Polygon') return dansPolygone(p, g.coordinates as Polygone);
  return (g.coordinates as Polygone[]).some((poly) => dansPolygone(p, poly));
}

export function formaterDistance(m: number): string {
  if (m < 1000) return `${Math.round(m / 10) * 10} m`;
  return `${(m / 1000).toFixed(1).replace('.', ',')} km`;
}

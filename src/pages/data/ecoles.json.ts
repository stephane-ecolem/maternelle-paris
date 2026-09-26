import type { APIRoute } from 'astro';
import { ECOLES } from '../../lib/donnees';

/** Copie statique des données pour la page de résultat, générée au build. */
export const GET: APIRoute = () =>
  new Response(JSON.stringify(ECOLES), { headers: { 'Content-Type': 'application/json' } });

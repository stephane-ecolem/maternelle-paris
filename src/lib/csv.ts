/** Lecteur CSV minimal (RFC 4180) : guillemets, virgules et retours à la ligne échappés. */
export function lireCsv(texte: string, separateur = ','): Record<string, string>[] {
  const lignes: string[][] = [];
  let champ = '';
  let ligne: string[] = [];
  let guillemets = false;
  const t = texte.replace(/^﻿/, '');
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (guillemets) {
      if (c === '"' && t[i + 1] === '"') { champ += '"'; i++; }
      else if (c === '"') guillemets = false;
      else champ += c;
    } else if (c === '"') guillemets = true;
    else if (c === separateur) { ligne.push(champ); champ = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && t[i + 1] === '\n') i++;
      ligne.push(champ); champ = '';
      if (ligne.some((v) => v !== '')) lignes.push(ligne);
      ligne = [];
    } else champ += c;
  }
  ligne.push(champ);
  if (ligne.some((v) => v !== '')) lignes.push(ligne);
  const [entete, ...corps] = lignes;
  if (!entete) return [];
  const cles = entete.map((h) => h.trim());
  return corps.map((l) => Object.fromEntries(cles.map((k, i) => [k, (l[i] ?? '').trim()])));
}

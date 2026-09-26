# Schémas relevés le 26 septembre 2026

Relevé par `scripts/sonder.ts`. Aucun mapping n'est écrit sans cette lecture.

## fr-en-annuaire-education (data.education.gouv.fr)

Licence Ouverte 2.0. Mise à jour quotidienne. 68 572 lignes au total.

Filtre retenu : `code_departement='075' and ecole_maternelle=1` → **540 établissements**, tous `etat = OUVERT`.

| Besoin | Champ source | Remarque |
|---|---|---|
| identifiant | `identifiant_de_l_etablissement` | UAI |
| nom | `nom_etablissement` | abrégé et suivi de l'adresse (« E.M.PU COURONNES 94 rue des Couronnes ») |
| adresse | `adresse_1` (`adresse_2` : 1 ligne) | |
| code postal | `code_postal` | 75001 à 75020 uniquement, aucun 75116 |
| arrondissement | `code_commune` | 75101 à 75120 |
| statut | `statut_public_prive` | Public 348, Privé 192 |
| contrat | `type_contrat_prive` | association toutes classes 91, association partie des classes 6, simple 2, hors contrat 93, SANS OBJET (public) |
| type | `libelle_nature` | ECOLE MATERNELLE (+ D APPLICATION) 312, ECOLE DE NIVEAU ELEMENTAIRE (+ variantes) 228 = primaires avec classes maternelles |
| téléphone | `telephone` | 537 sur 540 |
| site | `web` | **0 sur 540** |
| coordonnées | `position` (lon/lat) | 537 sur 540 ; précision « Numéro de rue » 530, « Rue » 7 |

## secteurs-scolaires-maternelles (opendata.paris.fr)

ODbL. Dernière modification : 3 mars 2026. Toutes les années depuis 2020-2021 (2 683 lignes).

Année la plus récente : **2026-2027, 390 secteurs**, dont 58 en `zone_commune = 1` (secteur partagé entre 2 à 4 écoles, `lib_etab_1` à `lib_etab_4`).
Aucun UAI. Dans l'extrait 2026-2027, `adr_etab_n` contient le libellé et non l'adresse.
Géométries : Polygon et MultiPolygon, 275 600 sommets, 10,9 Mo en GeoJSON brut.

## etablissements-scolaires-maternelles (opendata.paris.fr)

ODbL. 2026/2027 : 359 écoles publiques (267 maternelles, 92 polyvalentes), avec `libelle`, `adresse`, `arr_insee`, point.
Tous les libellés de secteur (470 références) s'y retrouvent. Sert de pont entre secteurs et annuaire.

## arrondissements (opendata.paris.fr)

ODbL. 20 polygones, `c_ar` (numéro), `c_arinsee`. Sert au calcul de l'adjacence.

## Géocodage

`api-adresse.data.gouv.fr` ne répond plus (connexion coupée). `data.geopf.fr/geocodage/search` répond au même format,
CORS ouvert, limite 50 requêtes par seconde.

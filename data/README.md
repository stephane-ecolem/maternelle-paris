# Données

Les pages sont générées à partir de fichiers JSON versionnés dans `src/data/`.
Aucun appel API à l'exécution pour les données des écoles. Seul le géocodage de
l'adresse saisie passe par l'API Adresse, depuis le navigateur.

## Niveau 1 : open data (automatique)

- Annuaire de l'éducation, `fr-en-annuaire-education` (data.education.gouv.fr)
- Secteurs scolaires des écoles maternelles (opendata.paris.fr)
- Polygones des arrondissements, pour calculer la table d'adjacence

Le mapping champ source vers modèle interne (`src/lib/types.ts`) n'est écrit
qu'après lecture du schéma réel : `node --experimental-strip-types scripts/sonder.ts`.

## Niveau 2 : `data/enrichissement.csv` (manuel)

Encodage UTF-8, séparateur virgule, une ligne par école.

| Colonne | Obligatoire | Contenu |
|---|---|---|
| `id` | oui | UAI de l'annuaire. Pour une école absente de l'annuaire : `MAN-` suivi d'un suffixe libre et stable |
| `origine` | oui | `annuaire` ou `manuelle` |
| `nom`, `adresse`, `code_postal`, `statut`, `contrat` | si `manuelle` | Identité de l'école. Ignorés pour `annuaire` (l'open data fait foi) |
| `langues` | non | Langues d'enseignement séparées par `;` (ex. `français; anglais`) |
| `pedagogie` | non | Libellé court (ex. `Montessori`) |
| `age_min_mois` | non | Entier, âge minimum d'accueil en mois (24 = 2 ans) |
| `admissions_continues` | non | `oui` ou `non` |
| `source_url` | oui | URL de la source. Pour `manuelle` : source officielle obligatoire |
| `date_releve` | oui | AAAA-MM-JJ |
| `confiance` | oui | `explicite` ou `à vérifier` |

Une cellule vide s'affiche « non renseigné ». Aucune valeur par défaut.
Une ligne `annuaire` dont l'UAI est introuvable dans l'annuaire est signalée au build.

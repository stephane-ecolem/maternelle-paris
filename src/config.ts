/**
 * Configuration centrale. Les valeurs entre crochets sont en attente et
 * s'affichent telles quelles pour rester visibles en relecture.
 */
export const SITE = {
  url: 'https://maternelle.paris',
  nom: 'maternelle.paris',
  accroche: 'Annuaire des écoles maternelles de Paris',
  editeur: {
    nom: 'École M',
    raisonSociale: 'M Education',
    url: 'https://www.ecolem.fr',
    formeEtCapital: '[FORME JURIDIQUE ET CAPITAL]',
    siege: '9 rue Bernoulli, 75008 Paris',
    siren: '819 497 140',
    directeurPublication: '[NOM DU DIRECTEUR DE PUBLICATION]',
    contactRgpd: '[EMAIL DE CONTACT RGPD]',
  },
  hebergeur: '[COORDONNÉES NETLIFY TELLES QUE PUBLIÉES]',
  auteurDossier: {
    nom: 'Joséphine Vigouroux',
    fonction: 'Responsable Admissions et Développement',
    bio: '[BIOGRAPHIE, TROIS LIGNES]',
    photo: null as string | null,
  },
  liensEcoleM: {
    prix: '[URL GUIDE PRIX ECOLEM.FR]',
    choix: '[URL GUIDE CHOIX ECOLEM.FR]',
    demenagement: '[URL GUIDE DÉMÉNAGEMENT ECOLEM.FR]',
  },
  parisFrSecteur: '[URL PARIS.FR SECTEUR SCOLAIRE]',
  rentree: 2027,
  conservationEmails: '3 ans après le dernier contact',
} as const;

export const HUBSPOT = {
  portalId: import.meta.env.PUBLIC_HUBSPOT_PORTAL_ID || '',
  formId: import.meta.env.PUBLIC_HUBSPOT_FORM_ID || '',
  /** Noms internes des propriétés HubSpot, à confirmer. */
  proprietes: {
    email: 'email',
    codePostal: '[PROPRIÉTÉ CODE POSTAL]',
    anneeNaissance: '[PROPRIÉTÉ ANNÉE DE NAISSANCE]',
    source: '[PROPRIÉTÉ SOURCE]',
    shortlist: '[PROPRIÉTÉ LISTE UAI]',
  },
  valeurSource: 'maternelle-paris',
};

export const hubspotActif = () => Boolean(HUBSPOT.portalId && HUBSPOT.formId);

export const GA4_ID: string = import.meta.env.PUBLIC_GA4_ID || '';

export const ANNEES_NAISSANCE = [
  { valeur: '2023', libelle: '2023 (moyenne section)' },
  { valeur: '2024', libelle: '2024 (petite section)' },
  { valeur: '2025', libelle: '2025 (toute petite section, sous conditions)' },
  { valeur: 'autre', libelle: 'Autre année' },
] as const;

export const CRITERES = [
  { valeur: 'bilingue', libelle: 'Bilingue anglais' },
  { valeur: 'montessori', libelle: 'Montessori' },
  { valeur: '2ans', libelle: 'Accueil dès 2 ans' },
  { valeur: 'proximite', libelle: 'Proximité' },
  { valeur: 'indifferent', libelle: 'Peu importe' },
] as const;

/**
 * Géocodage : API Adresse. À vérifier à l'ouverture du réseau : l'API a été
 * annoncée comme migrée vers la Géoplateforme de l'IGN (data.geopf.fr).
 */
export const GEOCODEUR = 'https://api-adresse.data.gouv.fr/search/';
/** Score minimal accepté avant de retomber sur le code postal. */
export const SCORE_MIN_GEOCODAGE = 0.6;

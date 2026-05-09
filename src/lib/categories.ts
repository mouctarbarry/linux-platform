export const CATEGORIES = {
  fichiers: { label: 'Fichiers & Repertoires', icon: '📁' },
  recherche: { label: 'Recherche & Texte', icon: '🔍' },
  reseau: { label: 'Reseau', icon: '🌐' },
  processus: { label: 'Processus & Services', icon: '⚙️' },
  archivage: { label: 'Archivage & Compression', icon: '📦' },
  systeme: { label: 'Systeme', icon: '🖥️' },
  permissions: { label: 'Permissions & Utilisateurs', icon: '🔐' },
  editeurs: { label: 'Editeurs & Outils', icon: '🛠️' },
} as const;

export type Category = keyof typeof CATEGORIES;

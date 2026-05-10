export const CATEGORIES = {
  fichiers: { label: "Fichiers & Repertoires", color: "bg-blue-500" },
  recherche: { label: "Recherche & Texte", color: "bg-amber-500" },
  reseau: { label: "Réseau", color: "bg-green-500" },
  processus: { label: "Processus & Services", color: "bg-purple-500" },
  archivage: { label: "Archivage & Compression", color: "bg-cyan-500" },
  systeme: { label: "System", color: "bg-rose-500" },
  permissions: { label: "Permissions & Utilisateurs", color: "bg-orange-500" },
  editeurs: { label: "Éditeurs & Outils", color: "bg-teal-500" },
} as const;

export type Category = keyof typeof CATEGORIES;

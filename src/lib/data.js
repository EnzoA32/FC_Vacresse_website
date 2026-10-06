// Toutes les pages lisent ce fichier. Avec Sanity, seul ce fichier change.
export const club = { name: 'FC Vacresse', full: 'Royal Football Club Vacresse', season: '2026-2027', email: '[email du club]', address: '[adresse du stade]', rbfa: 'https://www.rbfa.be/fr/club/2396/equipes' };
const names = [['Équipe première A','premiere-a'],['Équipe première B','premiere-b'],['Réserve','reserve'],['U17 A','u17-a'],['U17 B','u17-b'],['U15','u15'],['U14','u14'],['U12','u12'],['U11','u11'],['U10','u10'],['U9','u9'],['U8 A','u8-a'],['U8 B','u8-b'],['U7','u7'],['U6','u6']];
export const teams = names.map(([name, slug]) => ({ name, slug, staff: '[Entraîneur / délégué à compléter]', trainings: [{ day: '[Jour]', time: '[Heure]', place: '[Lieu]' }] }));
// type: 'match' | 'entrainement'. Exemples à remplacer.
export const events = [
 { date: '2026-10-10T15:00', type: 'match', team: 'premiere-a', title: 'FC Vacresse — [Adversaire]', place: '[Stade]', score: null },
 { date: '2026-10-03T15:00', type: 'match', team: 'u17-a', title: 'FC Vacresse — [Adversaire]', place: '[Stade]', score: '3 – 1' },
 { date: '2026-10-07T18:00', type: 'entrainement', team: 'u15', title: 'Entraînement U15', place: '[Terrain]', score: null }
];
export const faq = [
 { q: 'Comment inscrire mon enfant ?', a: '[À compléter : démarches, documents, période, personne de contact]' },
 { q: 'Quel est le montant de la cotisation ?', a: '[À compléter]' },
 { q: 'Où et quand ont lieu les entraînements ?', a: 'Voir la page de chaque équipe et le calendrier.' },
 { q: 'Que faire en cas de match reporté ?', a: '[À compléter]' },
 { q: 'Les photos de mon enfant seront-elles publiées ?', a: 'Seulement avec l\'accord des parents, demandé en début de saison.' }
];
export const albums = [{ title: '[Titre de l\'album]', team: 'u17-a', date: '2026-09-12', photos: [] }];
export const contactSubjects = ['Question générale','École des jeunes','Inscription joueur','Équipe première','Sponsoring','Organisation / événement','Presse / communication','Autre'];
export const nav = [['/','Accueil'],['/equipes','Équipes'],['/calendrier','Calendrier'],['/resultats','Résultats'],['/galerie','Galerie'],['/faq','FAQ'],['/contact','Contact']];
export const teamName = (slug) => teams.find(t => t.slug === slug)?.name ?? slug;
export const fmt = (d) => new Date(d).toLocaleDateString('fr-BE', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
export const news = [
 { title: "[Titre de l'article à la une]", cat: 'Vie du club', img: '/ballon.jpg', date: '2026-10-05' },
 { title: '[Résumé de match]', cat: 'Résumé de match', img: '/terrain.jpg', date: '2026-10-04' },
 { title: '[Annonce importante]', cat: 'Annonce', img: '/stade.jpg', date: '2026-10-02' }
];

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
// Toutes les pages lisent ce fichier. Avec Sanity, seul ce fichier change.
export const club = { name: 'FC Vacresse', full: 'Royal Football Club Vacresse', season: '2026-2027', email: '[email du club]', address: '[adresse du stade]', rbfa: 'https://www.rbfa.be/fr/club/2396/equipes' };
const names = [['Équipe première A','premiere-a'],['Équipe première B','premiere-b'],['Réserve','reserve'],['U17 A','u17-a'],['U17 B','u17-b'],['U15','u15'],['U14','u14'],['U12','u12'],['U11','u11'],['U10','u10'],['U9','u9'],['U8 A','u8-a'],['U8 B','u8-b'],['U7','u7'],['U6','u6']];
const localTeams = names.map(([name, slug]) => ({ name, slug, staff: '[Entraîneur / délégué à compléter]', trainings: [{ day: '[Jour]', time: '[Heure]', place: '[Lieu]' }] }));
// type: 'match' | 'entrainement'. Exemples à remplacer.
const localEvents = [
 { date: '2026-10-10T15:00', type: 'match', team: 'premiere-a', title: 'FC Vacresse — [Adversaire]', place: '[Stade]', score: null },
 { date: '2026-10-03T15:00', type: 'match', team: 'u17-a', title: 'FC Vacresse — [Adversaire]', place: '[Stade]', score: '3 – 1' },
 { date: '2026-10-07T18:00', type: 'entrainement', team: 'u15', title: 'Entraînement U15', place: '[Terrain]', score: null }
];
const localFaq = [
 { q: 'Comment inscrire mon enfant ?', a: '[À compléter : démarches, documents, période, personne de contact]' },
 { q: 'Quel est le montant de la cotisation ?', a: '[À compléter]' },
 { q: 'Où et quand ont lieu les entraînements ?', a: 'Voir la page de chaque équipe et le calendrier.' },
 { q: 'Que faire en cas de match reporté ?', a: '[À compléter]' },
 { q: 'Les photos de mon enfant seront-elles publiées ?', a: 'Seulement avec l\'accord des parents, demandé en début de saison.' }
];
const localAlbums = [{ title: '[Titre de l\'album]', team: 'u17-a', date: '2026-09-12', photos: [] }];
export const contactSubjects = ['Question générale','École des jeunes','Inscription joueur','Équipe première','Sponsoring','Organisation / événement','Presse / communication','Autre'];
export const nav = [['/#accueil','Accueil'],['/#matchs','Matchs'],['/#annonces','Le club'],['/#sponsors','Sponsors'],['/equipes','Équipes'],['/calendrier','Agenda'],['/contact','Contact']];
export const teamName = (slug) => teams.find(t => t.slug === slug)?.name ?? slug;
export const fmt = (d) => new Date(d).toLocaleDateString('fr-BE', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
const localNews = [
 { title: "[Titre de l'article à la une]", cat: 'Vie du club', img: '/ballon.jpg', date: '2026-10-05' },
 { title: '[Résumé de match]', cat: 'Résumé de match', img: '/terrain.jpg', date: '2026-10-04' },
 { title: '[Annonce importante]', cat: 'Annonce', img: '/stade.jpg', date: '2026-10-02' }
];
// Bandeau d'accueil : 3 à 5 diapositives. Idéal : photos de 1920 px de large minimum.
const localSlides = [
 { img: '/equipe.jpg', title: 'Royal Football Club Vacresse', text: 'Un club familial et local.', link: '/equipes', cta: 'Nos équipes' },
 { img: '/terrain.jpg', title: 'Prochains matchs', text: 'Toutes les équipes, tous les week-ends.', link: '/calendrier', cta: 'Voir le calendrier' },
 { img: '/enfant.jpg', title: 'École des jeunes', text: 'Viens jouer avec nous.', link: '/contact', cta: 'Nous contacter' },
 { img: '/ballon.jpg', title: 'Saison 2026-2027', text: 'Suivez toute l\'actualité du club.', link: '/galerie', cta: 'Voir les photos' }
];

// ---- Lecture de Sanity (si indisponible ou vide : on garde les données locales ci-dessus) ----
const client = createClient({ projectId: 'upze23ba', dataset: 'production', apiVersion: '2024-10-01', useCdn: true });
const img = (src, w = 1600) => (src ? imageUrlBuilder(client).image(src).width(w).auto('format').url() : '');
const get = async (query) => { try { return await client.fetch(query); } catch (e) { console.warn('Sanity indisponible :', e.message); return []; } };
const pick = (remote, local) => (remote && remote.length ? remote : local);
const [rTeams, rEvents, rNews, rFaq, rAlbums, rSlides, rSponsors] = await Promise.all([
  get(`*[_type=="team" && season->current==true]|order(order asc){name,"slug":slug.current,staff,trainings}`),
  get(`*[_type=="event"]|order(date asc){date,type,title,place,score,"team":team->slug.current}`),
  get(`*[_type=="article" && defined(publishedAt)]|order(publishedAt desc)[0..8]{title,"cat":category,image,"date":publishedAt}`),
  get(`*[_type=="faqItem"]|order(order asc){"q":question,"a":answer}`),
  get(`*[_type=="album"]|order(date desc){title,date,"team":team->slug.current,photos}`),
  get(`*[_type=="slide"]|order(order asc){title,text,link,cta,image}`),
  get(`*[_type=="sponsor"]|order(order asc){name,url,logo}`)
]);
export const teams = pick(rTeams.map(t => ({ ...t, staff: t.staff || '', trainings: t.trainings || [] })), localTeams);
export const events = pick(rEvents.map(e => ({ ...e, score: e.score || null, place: e.place || '' })), localEvents);
export const news = pick(rNews.map(n => ({ ...n, img: img(n.image, 800) })), localNews);
export const faq = pick(rFaq, localFaq);
export const albums = pick(rAlbums.map(a => ({ ...a, photos: (a.photos || []).map(p => img(p, 1200)) })), localAlbums);
export const slides = pick(rSlides.map(x => ({ ...x, img: img(x.image, 2400) })), localSlides);
const localSponsors = ['Sponsor 1','Sponsor 2','Sponsor 3','Sponsor 4','Sponsor 5','Sponsor 6'].map(name => ({ name, url: '', img: '' }));
export const sponsors = pick(rSponsors.map(x => ({ ...x, img: img(x.logo, 400) })), localSponsors);

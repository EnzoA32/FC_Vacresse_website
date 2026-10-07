# FC Vacresse — site
Astro (statique). Les données sont dans `src/lib/data.js` (équipes, calendrier, FAQ, albums). Les valeurs entre [crochets] sont à compléter.

## Publier sur Vercel
1. Mettre ce dossier dans un dépôt GitHub (ou `npx vercel` dans le dossier).
2. Vercel : Add New > Project > importer le dépôt. Astro est détecté tout seul. Deploy.
3. Formulaire : créer une clé gratuite sur web3forms.com et la mettre dans `src/pages/contact.astro` (`VOTRE_CLE_WEB3FORMS`).

## Sanity (projet upze23ba, dataset production)
- Le site lit Sanity au moment de la construction (`src/lib/data.js`). Si Sanity est vide ou injoignable, il utilise les données locales.
- Studio (interface des dirigeants) : dans `studio/`. `cd studio && npm install && npx sanity login && npx sanity deploy` publie l'interface sur une adresse en `.sanity.studio`.
- Mise à jour automatique : Vercel > Settings > Git > Deploy Hooks (créer un hook), puis sanity.io/manage > API > Webhooks : coller l'URL du hook, déclenchement sur création/modification/suppression, dataset production.

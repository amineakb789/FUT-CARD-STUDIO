# ⚡ FUT Card Studio — EA FC & Ultimate Team Card Generator

Application web moderne et interactive permettant de concevoir, personnaliser et télécharger des cartes de football personnalisées inspirées d'EA FC et de FIFA Ultimate Team.

---

## 👥 Auteurs
* **Albouchi Med Amine**
* **Ahmed Hlehli**

---

## 🚀 Fonctionnalités Principales

* **Page d'Accueil Riche & Immersive :** Section hero avec compteurs de la communauté, modèles de légendes prêts à l'emploi (Mbappé, Messi, Haaland, Zidane) et carte holographique interactive en 3D.
* **Studio de Création en Temps Réel :** 
  * Personnalisation du nom, du poste (ST, CM, CB, GK, etc.) et de la note générale (OVR).
  * Calcul automatique intelligent de la note générale (OVR) selon le poste et les statistiques (désactivable manuellement).
  * Inversion dynamique des attributs pour le poste de Gardien de but (DIV, HAN, KIC, REF, SPD, POS).
* **Studio Photo Avancé :** Importation d'images, zoom et réglages précis de la position (axes X et Y).
* **Variantes de Cartes Multiples :** Choix entre les designs phares (TOTY, Gold Rare, TOTS, Icon, TOTW, Heroes, UCL, FUTTIES).
* **Exportation HD :** Génération et téléchargement direct de la carte au format image PNG haute résolution grâce à `html2canvas`.
* **Collection Personnelle :** Sauvegarde locale des cartes créées via le `localStorage` du navigateur.

---

## 🛠️ Technologies Utilisées

* **HTML5** (Structure sémantique)
* **CSS3** (Design responsive, effets verres fumés / glassmorphism, animations 3D et reflets holographiques)
* **JavaScript Vanilla** (Logique interactive, gestion du stockage local et rendu dynamique)
* **Bibliothèques externes :** Font Awesome (icônes) et html2canvas (export d'images).

---

## 📂 Structure du Projet
├── index.html         # Page unique principale (Landing page & Studio)
├── style.css          # Styles visuels, thèmes FUT et responsive design
└── script.js          # Logique interactive, calculs OVR, 3D et LocalStorage

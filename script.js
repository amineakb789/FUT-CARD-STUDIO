document.addEventListener('DOMContentLoaded', () => {

    // 1. DÉPLACEMENT 3D INTERACTIF DE LA CARTE HERO DE L'ACCUEIL
    const heroWrapper = document.getElementById('hero-3d-wrapper');
    const heroCard = document.getElementById('hero-interactive-card');

    if (heroWrapper && heroCard) {
        heroWrapper.addEventListener('mousemove', (e) => {
            const rect = heroWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = (-y / rect.height) * 30;
            const rotateY = (x / rect.width) * 30;

            heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        heroWrapper.addEventListener('mouseleave', () => {
            heroCard.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    }

    // 2. FORMULAIRE DE PERSONNALISATION ET MAJ EN TEMPS RÉEL
    const inputName = document.getElementById('input-name');
    const previewName = document.getElementById('preview-name');
    const inputOvr = document.getElementById('input-ovr');
    const previewOvr = document.getElementById('preview-ovr');
    const previewPos = document.getElementById('preview-pos');
    const positionButtons = document.querySelectorAll('.pos-btn');
    const inputNation = document.getElementById('input-nation');
    const previewNation = document.getElementById('preview-nation');
    const inputClub = document.getElementById('input-club');
    const previewClub = document.getElementById('preview-club-crest');
    const inputPhoto = document.getElementById('input-photo');
    const previewImg = document.getElementById('preview-img');
    const toggleAutoCalc = document.getElementById('toggle-autocalc');

    // Réglages Photo
    const photoZoom = document.getElementById('photo-zoom');
    const photoPosX = document.getElementById('photo-pos-x');
    const photoPosY = document.getElementById('photo-pos-y');

    function updatePhotoTransform() {
        const zoom = photoZoom.value / 100;
        const posX = photoPosX.value;
        const posY = photoPosY.value;
        previewImg.style.transform = `scale(${zoom}) translate(${posX}px, ${posY}px)`;
    }

    photoZoom.addEventListener('input', updatePhotoTransform);
    photoPosX.addEventListener('input', updatePhotoTransform);
    photoPosY.addEventListener('input', updatePhotoTransform);

    // Mises à jour textuelles
    inputName.addEventListener('input', e => previewName.textContent = e.target.value || 'JOUEUR');
    inputOvr.addEventListener('input', e => previewOvr.textContent = e.target.value || '90');
    inputNation.addEventListener('change', e => previewNation.textContent = e.target.value);
    inputClub.addEventListener('input', e => previewClub.textContent = e.target.value.substring(0, 3).toUpperCase() || 'FC');

    // Gestion de la sélection du poste & inversion des stats Gardien
    let currentPosition = 'ST';
    positionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            positionButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPosition = btn.getAttribute('data-pos');
            previewPos.textContent = currentPosition;

            if (currentPosition === 'GK') {
                document.getElementById('lbl-stat1').textContent = 'DIV';
                document.getElementById('lbl-stat2').textContent = 'HAN';
                document.getElementById('lbl-stat3').textContent = 'KIC';
                document.getElementById('lbl-stat4').textContent = 'REF';
                document.getElementById('lbl-stat5').textContent = 'SPD';
                document.getElementById('lbl-stat6').textContent = 'POS';
                
                document.getElementById('label-stat1').textContent = 'DIV';
                document.getElementById('label-stat2').textContent = 'HAN';
                document.getElementById('label-stat3').textContent = 'KIC';
                document.getElementById('label-stat4').textContent = 'REF';
                document.getElementById('label-stat5').textContent = 'SPD';
                document.getElementById('label-stat6').textContent = 'POS';
            } else {
                document.getElementById('lbl-stat1').textContent = 'PAC';
                document.getElementById('lbl-stat2').textContent = 'SHO';
                document.getElementById('lbl-stat3').textContent = 'PAS';
                document.getElementById('lbl-stat4').textContent = 'DRI';
                document.getElementById('lbl-stat5').textContent = 'DEF';
                document.getElementById('lbl-stat6').textContent = 'PHY';

                document.getElementById('label-stat1').textContent = 'PAC';
                document.getElementById('label-stat2').textContent = 'SHO';
                document.getElementById('label-stat3').textContent = 'PAS';
                document.getElementById('label-stat4').textContent = 'DRI';
                document.getElementById('label-stat5').textContent = 'DEF';
                document.getElementById('label-stat6').textContent = 'PHY';
            }
            calculateAutomaticOVR();
        });
    });

    // Importation de photo
    inputPhoto.addEventListener('change', e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = event => previewImg.src = event.target.result;
            reader.readAsDataURL(file);
        }
    });

    // Calcul automatique de la Note Générale (OVR) selon le poste
    function calculateAutomaticOVR() {
        if (!toggleAutoCalc.checked) return;

        const stats = [
            parseInt(document.getElementById('stat-1').value) || 50,
            parseInt(document.getElementById('stat-2').value) || 50,
            parseInt(document.getElementById('stat-3').value) || 50,
            parseInt(document.getElementById('stat-4').value) || 50,
            parseInt(document.getElementById('stat-5').value) || 50,
            parseInt(document.getElementById('stat-6').value) || 50
        ];

        let calculatedOvr = 50;

        if (['ST', 'CF', 'LW', 'RW'].includes(currentPosition)) {
            calculatedOvr = Math.round(stats[0] * 0.2 + stats[1] * 0.4 + stats[3] * 0.3 + stats[2] * 0.1);
        } else if (['CAM', 'CM', 'CDM'].includes(currentPosition)) {
            calculatedOvr = Math.round(stats[2] * 0.35 + stats[3] * 0.35 + stats[0] * 0.15 + stats[5] * 0.15);
        } else if (['CB', 'LB', 'RB'].includes(currentPosition)) {
            calculatedOvr = Math.round(stats[4] * 0.45 + stats[5] * 0.35 + stats[0] * 0.2);
        } else if (currentPosition === 'GK') {
            calculatedOvr = Math.round(stats[0] * 0.25 + stats[1] * 0.25 + stats[3] * 0.25 + stats[5] * 0.25);
        }

        inputOvr.value = calculatedOvr;
        previewOvr.textContent = calculatedOvr;
    }

    // Statistiques dynamiques (1 à 6)
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`stat-${i}`).addEventListener('input', e => {
            document.getElementById(`val-stat${i}`).textContent = e.target.value || '50';
            calculateAutomaticOVR();
        });
    }

    // 3. SÉLECTION DES MODÈLES DE CARTES
    const templateCards = document.querySelectorAll('.template-card');
    const activeFutCard = document.getElementById('active-fut-card');

    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            templateCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            activeFutCard.className = `fut-card ${card.getAttribute('data-template')}`;
        });
    });

    // 4. PRESETS LÉGENDES
    window.loadPreset = function(presetKey) {
        const presets = {
            mbappe: { name: 'K. MBAPPÉ', ovr: 97, pos: 'ST', nation: '🇫🇷', club: 'RMA', photo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300', stats: [99, 96, 88, 95, 45, 88], template: 'toty' },
            messi: { name: 'L. MESSI', ovr: 98, pos: 'RW', nation: '🇦🇷', club: 'MIA', photo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=300', stats: [89, 97, 98, 99, 38, 72], template: 'icon' },
            haaland: { name: 'E. HAALAND', ovr: 96, pos: 'ST', nation: '🇳🇬', club: 'MCI', photo: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=300', stats: [96, 98, 75, 82, 55, 96], template: 'tots' },
            zidane: { name: 'Z. ZIDANE', ovr: 96, pos: 'CAM', nation: '🇫🇷', club: 'ICO', photo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300', stats: [85, 92, 97, 96, 75, 86], template: 'icon' }
        };

        const data = presets[presetKey];
        if (!data) return;

        inputName.value = data.name;
        previewName.textContent = data.name;
        inputOvr.value = data.ovr;
        previewOvr.textContent = data.ovr;
        inputNation.value = data.nation;
        previewNation.textContent = data.nation;
        previewImg.src = data.photo;

        for (let i = 1; i <= 6; i++) {
            document.getElementById(`stat-${i}`).value = data.stats[i-1];
            document.getElementById(`val-stat${i}`).textContent = data.stats[i-1];
        }

        activeFutCard.className = `fut-card ${data.template}`;
        document.querySelector(`[data-target="creator"]`)?.click();
        window.location.hash = '#creator';
    };

    // 5. TÉLÉCHARGEMENT PNG HD (html2canvas)
    document.getElementById('btn-download').addEventListener('click', () => {
        const targetElement = document.getElementById('card-export-target');
        html2canvas(targetElement, { backgroundColor: null, scale: 2.5 }).then(canvas => {
            const link = document.createElement('a');
            link.download = `${inputName.value.trim() || 'fut-card'}-card.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });

    // 6. GESTION DE LA COLLECTION LOCALE (LocalStorage)
    let userCollection = JSON.parse(localStorage.getItem('fut_collection')) || [];

    function updateCollection() {
        document.getElementById('collection-count').textContent = userCollection.length;
        const grid = document.getElementById('collection-grid-container');
        grid.innerHTML = '';

        if (userCollection.length === 0) {
            grid.innerHTML = `<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1;">Aucune carte enregistrée dans votre collection pour le moment.</p>`;
            return;
        }

        userCollection.forEach((cardHtml, index) => {
            const item = document.createElement('div');
            item.className = 'collection-item';
            item.innerHTML = `
                <div style="transform: scale(0.72); transform-origin: top center; height: 330px;">${cardHtml}</div>
                <button class="btn-danger" onclick="deleteCard(${index})"><i class="fa-solid fa-trash"></i> Supprimer</button>
            `;
            grid.appendChild(item);
        });
    }

    document.getElementById('btn-generate').addEventListener('click', () => {
        userCollection.push(activeFutCard.outerHTML);
        localStorage.setItem('fut_collection', JSON.stringify(userCollection));
        updateCollection();
        alert('Carte sauvegardée avec succès dans votre collection !');
    });

    window.deleteCard = index => {
        userCollection.splice(index, 1);
        localStorage.setItem('fut_collection', JSON.stringify(userCollection));
        updateCollection();
    };

    // 7. FAQ ACCORDION
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            parent.classList.toggle('active');
        });
    });

    updateCollection();
});
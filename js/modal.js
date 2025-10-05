(function () { // IIFE : fonction anonyme -> pour éxécuter la fonction immédiatement , sans appels 

  //déclaration Constantes
  // Sélectionne tous les boutons ayant l'attribut data-modal-target
  const triggers = document.querySelectorAll('[data-modal-target]');

  triggers.forEach(trigger => {
    const modalId = trigger.getAttribute('data-modal-target');
    const modal = document.getElementById(modalId);

  if (!modal) return;

    const closeBtns = modal.querySelectorAll('[data-modal-close]');
    const overlay = modal.querySelector('[data-modal-overlay]');
  

  //Fonction fléchée d'ouverture de la modale
  const openModal = () => { 
    if (!modal) return; // si pas de modale , arrete la fonction
    modal.classList.remove('hidden'); // enlève hidden de la classe pour afficher la modale
    modal.setAttribute('aria-hidden', 'false'); //accessibilité : indique que la modale est visible

    modal._lastFocus = document.activeElement; // sauvegarde l'élément qui avait le focus avant l'ouverture de la modale

    const focus = modal.querySelector('title'); // met le focus sur le titre de la modale
    if (focus) focus.focus(); // focus sur le titre si il existe
    document.body.style.overflow = 'hidden'; // empêche le scroll de la page en arrière plan

    const escHandler = (event) => {
      if (event.key === 'Escape') closeModal(modal); // Ferme la modale avec la touche Echap
      document.body.style.overflow = ''; // rétablit le scroll de la page en arrière plan en appuyant sur Echap
    };
    
    modal._escHandler = escHandler; // stoche la fonction dans la modale pour pouvoir la retirer plus tard
    window.addEventListener('keydown', escHandler); //ferme la modale quand Echap pressé 
  };

  // Fonction fléchée de fermeture de la modale
  const closeModal = () => {
    if (!modal) return; // si pas de modale , arrete la fonction
    modal.classList.add('hidden'); // ajoute hidden à la classe pour cacher la modale
    modal.setAttribute('aria-hidden', 'true'); //accessibilité : indique que la modale est cachée
    document.body.style.overflow = ''; // rétablit le scroll de la page en arrière plan en fermant la modale

    if (modal._lastFocus) modal._lastFocus.focus(); // rétablit le focus sur l'élément qui l'avait avant l'ouverture de la modale
    if (modal._escHandler) window.removeEventListener('keydown', modal._escHandler); // retire l'event listener pour fermer la modale avec Echap
  };

  // Event listeners
    trigger.addEventListener('click', () => openModal()); // Ouvre la modale au clic sur le bouton
    
    closeBtns.forEach(btn => btn.addEventListener('click', closeModal)); // Ferme la modale au clic sur le bouton de fermeture

    if (overlay) overlay.addEventListener('click', () => closeModal()); // Ferme la modale au clic de l'arrière plan (overlay)

  // Regarder les images en grand (zoom) dans une modale séparée
  //Récupère les éléments de la modale de visualisation des images
  const viewer = document.getElementById('img-viewer'); //Image Intiale
  const viewerImg = document.getElementById('img-viewer-img'); //Image Zommée
  const viewerClose = document.getElementById('img-viewer-close'); //Bouton de fermeture pour les images zoomées

  // Récupère toutes les images de la modale
  const modalImgs = modal ? modal.querySelectorAll('img') : [];

  // Fonction d'ouverture de visualisation des images (zoom)
  const openViewer = (src, alt) => { 
    if (!viewer) return; // si pas d'image initiale , arrete la fonction
    viewerImg.src = src; // Change la source de l'image zoomée en fonction de l'image cliquée
    viewerImg.alt = alt || ''; // Définit l'attribut alt par défaut vide 
    viewer.classList.remove('hidden'); // enlève hidden de la classe pour afficher l'image zoomée
    document.body.style.overflow = 'hidden'; // empêche le scroll de la page en arrière plan
  };
  const closeViewer = () => {
    if (!viewer) return; // si pas d'image initiale , arrete la fonction
    viewer.classList.add('hidden'); // ajoute hidden à la classe pour cacher l'image zoomée
    viewerImg.src = '';  // réinitialise la source de l'image zoomée
    viewerImg.alt = 'Apercu Agrandi';  // réinitialise l'attribut alt de l'image zoomée
  };

  // Active le zoom au clic sur chaque image de la modale
  modalImgs.forEach(img => {
    img.style.cursor = 'zoom-in'; // change le curseur pour indiquer que l'image est cliquable
    img.addEventListener('click', (event) => { 
      event.stopPropagation(); // empêche la propagation du clic pour éviter de fermer la modale
      openViewer(img.src, img.alt); // ouvre l'image zoomée avec la source et l'alt correspondants
    });
  });

  if (viewer) {
    viewer.addEventListener('click', (event) => { 
      if (event.target === viewer || event.target === viewerClose) closeViewer(); // ferme l'image zoomée si on clique sur l'arrière plan
    });
    viewerClose.addEventListener('click', closeViewer); // ferme l'image zoomée au clic sur le bouton de fermeture
    window.addEventListener('keydown', (event) => { 
      if (event.key === 'Escape' && !viewer.classList.contains('hidden')) closeViewer(); }); // ferme l'image zoomée avec la touche Echap
    }
  });
})();
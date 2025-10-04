(function () { // pour executer la fonction imédiatement sans appels
      const scroller = document.getElementById('projects-scroller');  // récupére l'element qui contient les projets
      const btns = document.querySelectorAll('.project-scroll-btn'); // récupère les 2 boutons droite/gauche
      if (!scroller) return; // arrete le script si le conteneur n'existe pas ou n'est pas trouvé 
      const scrollByPage = (dir) => { // scroll en pas en fonction de dir (1 , -1)
        const card = scroller.querySelector('.project-card'); // récupére le premier projet comme référence (premier enfant de la classe .projet-card)
        const step = (card ? card.offsetWidth : scroller.clientWidth) ; // distance à scroller card.offsetwidth(largeur du container du projets)
        scroller.scrollBy({ left: dir * step, behavior: 'smooth' }); //deplace scroll horizontalement step , DIR (1 pour scroll droit et -1 pour scoll gauche) ,smooth(défilemnent fluide)
      };

      btns.forEach(b => b.addEventListener('click', () => scrollByPage(Number(b.dataset.dir)))); // listener pour chaque bouton qui appelle scrollBypage()avec la valeur de dir correspondante(1 pour btn droit et -1 pour btn gauche)
      // optionnel : clavier ← → pour accessibility
      window.addEventListener('keydown', (e) => { // listener pour touche de clavier
        if (e.key === 'ArrowLeft') scrollByPage(-1); //scroll gauche pour fleche gauche
        if (e.key === 'ArrowRight') scrollByPage(1); //scroll droit pour fleche droite
      });
    })();
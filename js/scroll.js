(function () {
      const scroller = document.getElementById('projects-scroller');
      const btns = document.querySelectorAll('.project-scroll-btn');
      if (!scroller) return;
      const scrollByPage = (dir) => {
        const card = scroller.querySelector('.project-card');
        const gap = parseInt(getComputedStyle(scroller).gap) || 16;
        const step = (card ? card.offsetWidth : scroller.clientWidth) + gap;
        scroller.scrollBy({ left: dir * step, behavior: 'smooth' });
      };
      btns.forEach(b => b.addEventListener('click', () => scrollByPage(Number(b.dataset.dir))));
      // optionnel : clavier ← → pour accessibility
      window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') scrollByPage(-1);
        if (e.key === 'ArrowRight') scrollByPage(1);
      });
    })();
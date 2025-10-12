document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault(); // Empêche le rechargement de la page
  
  const form = e.target; // Le formulaire contact-form
  const data = new FormData(form); // Récupère les données du formulaire
  const msgDiv = document.getElementById('contact-message'); // Div pour le message

  // Envoi des données
  try {
    // Utilise fetch pour envoyer les données
    const response = await fetch(form.action, {
      method: 'POST',
      body: data 
    });
    const text = await response.text();
    // Affiche la réponse 
    msgDiv.classList.remove('hidden');
    msgDiv.innerHTML = text.includes("succès") ? 
      "<span style='color:#4ade80 ; font-size:1.25rem;'>Message envoyé avec succès !</span>" : 
      "<span style='color:#f87171 ; font-size:1.25rem;'>" + text + "</span>";
    form.reset(); // Réinitialise le formulaire
  } catch (err) {
    // En cas d'erreur
    msgDiv.innerHTML = "<span style='color:#f87171; font-size:1.25rem;'>Erreur lors de l'envoi.</span>";
  }
});

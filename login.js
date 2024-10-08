document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les valeurs des champs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Vérifier les informations de connexion (exemple simple)
    if (username === 'sage' && password === '123biogaz') {
        // Rediriger vers la page de tableau de bord
        window.location.href = './dashbord.html'; // Utiliser un chemin relatif
    } else {
        document.getElementById('errorMessage').innerText = 'Nom d\'utilisateur ou mot de passe incorrect';
    }
});

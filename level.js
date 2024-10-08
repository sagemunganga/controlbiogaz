// Niveau du fluide en pourcentage (0 à 100)
let fluidLevel = 72; // Modifiez cette valeur selon vos besoins

// Mettre à jour le niveau du fluide
function updateFluidLevel() {
    const fluid = document.getElementById('fluid');
    const fluidLevelText = document.getElementById('fluidLevelText');

    fluid.style.height = fluidLevel + '%';
    fluidLevelText.textContent = fluidLevel + '%';
}

// Mettre à jour le fluide au chargement de la page
window.onload = function() {
    updateFluidLevel();
};

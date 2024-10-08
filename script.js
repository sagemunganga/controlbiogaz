
const firebaseConfig = {
    apiKey: "AIzaSyD5XSLO1-0mW_z2X8Dn1swzXR4F70FtlXw",
    authDomain: "controlbio-c753a.firebaseapp.com",
    databaseURL: "https://controlbio-c753a-default-rtdb.firebaseio.com",
    projectId: "controlbio-c753a",
    storageBucket: "controlbio-c753a.appspot.com",
    messagingSenderId: "42759197152",
    appId: "1:42759197152:web:c4df60e10ea9c6c042db85",
    measurementId: "G-N730HCNKE1"
  };


  firebase.initializeApp(firebaseConfig); 
  
const body =document.body;
const openSidebar = document.querySelector('#opensidebar');
const closeSidebar = document.querySelector('#closeSidebar ');
const toggleTheme = document.querySelector('.toggle-theme');
const sidebar = document.querySelector('.main-sidebar');
const light = toggleTheme.children[0];
const dark = toggleTheme.children[1];
const temperature = document.querySelectorAll('.temperature p');
const potentielh = document.querySelectorAll('.potentiel p');
const percentage = document.querySelectorAll('.percentage p');


const database = firebase.database();
// Référence au groupe de valeurs "paramètres" dans la base de données
const parametresRef = database.ref('parametres');

// Lire la valeur de température en temps réel à partir du groupe de valeurs "paramètres"
parametresRef.child('temperature').on('value', (snapshot) => {
    const temperature = snapshot.val();
    const progress1 = (temperature * 100)/45 ;
    const interprogress1 = parseInt(progress1);
    document.getElementById('temp').innerText = temperature + " °C";
    document.getElementById('tempro').innerText = interprogress1 + "%";
});
parametresRef.child('ph').on('value', (snapshot) => {
   const phm = snapshot.val();
   document.getElementById('phm').innerText = phm ;
 });
 parametresRef.child('humidity').on('value', (snapshot) => {
   const humidite = snapshot.val();
   document.getElementById('humidite').innerText = humidite + "%";
 });
 parametresRef.child('tempssejour').on('value', (snapshot) => {
   const ts = snapshot.val();
   document.getElementById('trh').innerText = ts +"jours" ;
 });
 parametresRef.child('agitation').on('value', (snapshot) => {
   const agit = snapshot.val();
   document.getElementById('brass').innerText = agit +"tr/min" ;
 });
 parametresRef.child('pression').on('value', (snapshot) => {
   const press = snapshot.val();
   document.getElementById('pressure').innerText = press + "Pa" ;
 });
 parametresRef.child('debitalimentation').on('value', (snapshot) => {
   const DA = snapshot.val();
   document.getElementById('debitalit').innerText = DA + "kg/jrs" ;
 });

openSidebar.addEventListener('click' , ()=> {
    sidebar.style.left ='0%';
});
closeSidebar.addEventListener('click', () =>{
    sidebar.style.left ='-100%';
});

toggleTheme.addEventListener('click' , changeTheme)

function changeTheme(){
    if (body.classList.contains('dark-mode')) {
        lightMode();   
    }else if (!body.classList.contains('dark-mode')) {
        darkMode()
    }
}
if (window.matchMedia('(prefers-colors-scheme: dark)').matches ){
    darkMode();
}

function lightMode(){
    body.classList.remove('dark-mode')
    light.classList.add('active')
    dark.classList.remove('active')
}

function darkMode(){
    body.classList.add('dark-mode')
    light.classList.remove('active')
    dark.classList.add('active')
}



document.addEventListener("DOMContentLoaded", function() {
    function initializeCircle(circleId) {
        const circle = document.getElementById(circleId);
        if (!circle) {
            console.error(`Element with id ${circleId} not found.`);
            return null;
        }
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        return { circle, circumference };
    }

    function setProgress(circle, circumference, percent) {
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }

    function animateProgress(circle, circumference, targetPercent, textElementId) {
        let currentPercent = 0;
        const increment = targetPercent > currentPercent ? 1 : -1;
        const interval = setInterval(() => {
            currentPercent += increment;
            setProgress(circle, circumference, currentPercent);
            document.getElementById(textElementId).textContent = `${currentPercent}%`;
            if (currentPercent === targetPercent) {
                clearInterval(interval);
            }
        }, 20);
    }

    // Référence à la base de données Firebase
    const parametresRef = database.ref('parametres');

    // Écoute des changements de la température dans Firebase
    parametresRef.child('temperature').on('value', (snapshot) => {
        const temperature = snapshot.val();
        const progress1 = (temperature * 100) / 45;
        const interprogress1 = parseInt(progress1);
        document.getElementById('tempro').innerText = interprogress1 + "%";

        // Animation du cercle de température avec la valeur de interprogress1
        const targetPercent = interprogress1;
        animateProgress(circle_temperature.circle, circle_temperature.circumference, targetPercent, 'tempro');
    });

    // Écoute des changements de l'humidité dans Firebase
    parametresRef.child('humidity').on('value', (snapshot) => {
        const humidite= snapshot.val();
        const interprogress2 = parseInt(humidite);
        document.getElementById('percentage').innerText = interprogress2 + "%";

        // Animation du cercle d'humidité avec la valeur de interprogress2
        const targetPercent = interprogress2;
        animateProgress(circle_humidity.circle, circle_humidity.circumference, targetPercent, 'percentage');
    });

    // Écoute des changements du pH dans Firebase
    parametresRef.child('ph').on('value', (snapshot) => {
        const phm = snapshot.val();
        const progress3 = (phm* 100) / 14;
        const interprogress3 = parseInt(progress3);
        document.getElementById('phpro').innerText = interprogress3 + "%";

        // Animation du cercle de pH avec la valeur de interprogress3
        const targetPercent = interprogress3;
        animateProgress(circle_ph.circle, circle_ph.circumference, targetPercent, 'phpro');
    });

    // Initialisation des cercles
    const circle_temperature = initializeCircle('circle1');
    const circle_humidity = initializeCircle('circle2');
    const circle_ph = initializeCircle('circle3');
});
//bouton de commandes 

// Sélection des boutons
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const button5 = document.getElementById('button5');

// Ajout d'un écouteur d'événement au premier bouton
button1.addEventListener('change', function() {
    // Si le premier bouton est coché
    if (this.checked) {
        // Désactiver les autres boutons
        button2.disabled = true;
        button3.disabled = true;
        button4.disabled = true;
        button5.disabled = true;
    } else {
        // Activer les autres boutons
        button2.disabled = false;
        button3.disabled = false;
        button4.disabled = false;
        button5.disabled = false;
    }
});

// Ajout d'un écouteur d'événement pour les autres boutons
button2.addEventListener('change', function() {
    // Vérifier si le premier bouton est activé
    if (button1.checked) {
        // Si oui, empêcher le changement de l'état du bouton
        this.checked = false;
    }
});

button3.addEventListener('change', function() {
    if (button1.checked) {
        this.checked = false;
    }
});

button4.addEventListener('change', function() {
    if (button1.checked) {
        this.checked = false;
    }
});

button5.addEventListener('change', function() {
    if (button1.checked) {
        this.checked = false;
    }
});

//graphiques 

// Récupération du canvas pour le graphique
const ctx = document.getElementById('biogasChart').getContext('2d');
const ctx1 = document.getElementById('temperatureChart').getContext('2d');
const ctx2 = document.getElementById('humidityChart').getContext('2d');

// Initialisation du graphique
const biogasChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1 ,2 ,3 ,4,5 ,6, 7 ,8, 9], // Les étiquettes pour l'axe X (débit d'alimentation en kg)
        datasets: [{
            label: 'Production de Biogaz (m³)',
            borderColor: 'rgb(75, 192, 192)',
            data: [10 ,20 ,34,54,6,34], // Les données de production de biogaz en fonction du débit
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, // Pour que le graphique s'adapte à tous les écrans
        title: {
            display: true,
            text: 'Production de Biogaz en fonction du Débit d\'Alimentation'
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Débit d\'Alimentation (kg)'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Production de Biogaz (m³)'
                }
            }]
        }
    }
});

// Fonction pour ajouter des données au graphique
function addData(chart, label, biogasProduction) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(biogasProduction);
    chart.update();
}

// Simulation de données de production de biogaz
// (Vous pouvez remplacer cette partie par la logique de récupération de données réelles)
setInterval(() => {
    // Génération de données de production de biogaz aléatoires (entre 0 et 100 m³)
    const biogasProduction = Math.random() * 100;

    // Génération de données de débit d'alimentation aléatoires (entre 0 et 50 kg)
    const feedRate = Math.random() * 50;

    // Ajout des données au graphique
    addData(biogasChart, feedRate.toFixed(2), biogasProduction.toFixed(2));
}, 300000); // Mise à jour toutes les 5 minutes (5 * 60 * 1000 millisecondes)



// Initialisation du graphique
const temperatureChart = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: [1, 2,3,4,5,6,7,8,9,10,11,12], // Les étiquettes pour l'axe X (temps)
        datasets: [
            {
                label: 'Température Intérieure (°C)',
                borderColor: 'rgb(255, 99, 132)',
                backgroundcolor:'rgb(255, 99, 132)',
                data: [35,36,35,35,35,37], // Les données de température intérieure
                fill: true
            },
            {
                label: 'Température Extérieure (°C)',
                borderColor: 'rgba(54, 162, 235, 1 )',
                backgroundcolor:'rgba(54, 165, 235 ,1 )',
                data: [20,30,25,32,54,45], // Les données de température extérieure
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, // Pour que le graphique s'adapte à tous les écrans
        title: {
            display: true,
            text: 'Température du Digesteur en fonction du Temps'
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Temps'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Température (°C)'
                }
            }]
        }
    }
});

// Fonction pour ajouter des données au graphique
function addData(chart, label, tempInt, tempExt) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(tempInt);
    chart.data.datasets[1].data.push(tempExt);
    chart.update();
}

// Simulation de données de température
// (Vous pouvez remplacer cette partie par la logique de récupération de données réelles)
setInterval(() => {
    // Génération de données de température intérieure aléatoire (entre 0 et 50°C)
    const tempInt = Math.random() * 50;

    // Génération de données de température extérieure aléatoire (entre -20 et 40°C)
    const tempExt = Math.random() * 60 - 20;

    // Ajout des données au graphique
    const now = new Date();
    const label = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    addData(temperatureChart, label, tempInt.toFixed(2), tempExt.toFixed(2));
}, 900000); // Mise à jour toutes les 15 minutes (15 * 60 * 1000 millisecondes)


//graphique TRH

document.addEventListener('DOMContentLoaded', function () {
    const ctx3 = document.getElementById('trhChart').getContext('2d');

    // Données de l'exemple
    const temperatures = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]; 
    const TRH_base = 5;
    const theta = 1.07; // Coefficient de température
    const T_opt = 37; // Température optimale en °C

    // Calculer TRH ajusté pour chaque température
    const TRH_ajuste = temperatures.map(temperature => TRH_base * Math.pow(theta, (T_opt - temperature)));

    // Configuration du graphique
    const data = {
        labels: temperatures,
        datasets: [{
            label: 'TRH ajusté (jours)',
            data: TRH_ajuste,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'TRH (jours)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Température (°C)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw.toFixed(2)} jours`;
                        }
                    }
                }
            }
        }
    };

    // Créer le graphique
    const trhChart = new Chart(ctx3, config);
});
// graphique humidite 
const ctx4 = document.getElementById('humidityChart').getContext('2d');

    // Données de l'exemple
    const labels = ['Jour 1', 'Jour 2', 'Jour 3', 'Jour 4', 'Jour 5', 'Jour 6'];
    const humidityData = [60, 65, 62, 58, 78]; // Exemple d'humidité en pourcentage

    // Configuration du graphique
    const data = {
        labels: labels,
        datasets: [{
            label: 'Humidité (%)',
            data: humidityData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Couleur de fond des barres
            borderColor: 'rgba(54, 162, 235, 1)', // Couleur de bordure des barres
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Humidité (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Temps'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Humidité: ${context.raw.toFixed(2)} %`;
                        }
                    }
                }
            }
        }
    };

    // Créer le graphique en barres
    const humidityChart = new Chart(ctx4, config);





// const firebaseConfig = {
//     apiKey: "AIzaSyD5XSLO1-0mW_z2X8Dn1swzXR4F70FtlXw",
//     authDomain: "controlbio-c753a.firebaseapp.com",
//     databaseURL: "https://controlbio-c753a-default-rtdb.firebaseio.com",
//     projectId: "controlbio-c753a",
//     storageBucket: "controlbio-c753a.appspot.com",
//     messagingSenderId: "42759197152",
//     appId: "1:42759197152:web:c4df60e10ea9c6c042db85",
//     measurementId: "G-N730HCNKE1"
//   };


//   firebase.initializeApp(firebaseConfig); 
//   const database = firebase.database();

  
// const body =document.body;
// const openSidebar = document.querySelector('#opensidebar');
// const closeSidebar = document.querySelector('#closeSidebar ');
// const toggleTheme = document.querySelector('.toggle-theme');
// const sidebar = document.querySelector('.main-sidebar');
// const light = toggleTheme.children[0];
// const dark = toggleTheme.children[1];
// const temperature = document.querySelectorAll('.temperature p');
// const potentielh = document.querySelectorAll('.potentiel p');
// const percentage = document.querySelectorAll('.percentage p');

// openSidebar.addEventListener('click' , ()=> {
//     sidebar.style.left ='0%';
// });
// closeSidebar.addEventListener('click', () =>{
//     sidebar.style.left ='-100%';
// });

// toggleTheme.addEventListener('click' , changeTheme)

// function changeTheme(){
//     if (body.classList.contains('dark-mode')) {
//         lightMode();   
//     }else if (!body.classList.contains('dark-mode')) {
//         darkMode()
//     }
// }
// if (window.matchMedia('(prefers-colors-scheme: dark)').matches ){
//     darkMode();
// }

// function lightMode(){
//     body.classList.remove('dark-mode')
//     light.classList.add('active')
//     dark.classList.remove('active')
// }

// function darkMode(){
//     body.classList.add('dark-mode')
//     light.classList.remove('active')
//     dark.classList.add('active')
// }

// percentage.forEach((e, i) => {
//     let val = parseInt(e.textContent);
//     let circle = document.getElementById(`circle2`); // Utilisation de backticks pour les templates de chaînes
//     let r = circle.getAttribute('r');
//     let circ = Math.PI * 2 * r; 
//     let counter = 0;
//     let fillvalue = (circ * (170 - val)) / 170;
//     let intervalID = setInterval(() => {
//         if (counter == val) {
//             clearInterval(intervalID); // Utilisation de clearInterval avec l'identifiant de l'intervalle
//         } else {
//             counter += 1;
//             e.innerText = counter + '%';
//             circle.style.strokeDashoffset = fillvalue * (170 - counter) / 170; // Mise à jour de strokeDashoffset
//         }
//     }, 1000 / val);
// });
// temperature.forEach((e, i) => {
//     let val = parseInt(e.textContent);
//     let circle = document.getElementById(`circle1`); // Utilisation de backticks pour les templates de chaînes
//     let r = circle.getAttribute('r');
//     let circ = Math.PI * 2 * r; 
//     let counter = 0;
//     let fillvalue = (circ * (45 - val)) / 45;
//     let intervalID = setInterval(() => {
//         if (counter == val) {
//             clearInterval(intervalID); // Utilisation de clearInterval avec l'identifiant de l'intervalle
//         } else {
//             counter += 1;
//             e.innerText = counter + '%';
//             circle.style.strokeDashoffset = fillvalue * (45 - counter) / 45; // Mise à jour de strokeDashoffset
//         }
//     }, 1000 / val);
// });
// potentielh.forEach((e, i) => {
//     let val = parseInt(e.textContent);
//     let circle = document.getElementById(`circle3`); // Utilisation de backticks pour les templates de chaînes
//     let r = circle.getAttribute('r');
//     let circ = Math.PI * 2 * r; 
//     let counter = 0;
//     let fillvalue = (circ * (13 - val)) / 13;
//     let intervalID = setInterval(() => {
//         if (counter == val) {
//             clearInterval(intervalID); // Utilisation de clearInterval avec l'identifiant de l'intervalle
//         } else {
//             counter += 1;
//             e.innerText = counter + '%';
//             circle.style.strokeDashoffset = fillvalue * (13 - counter) / 13 ; // Mise à jour de strokeDashoffset
//         }
//     }, 1000 / val);
// });

// //bouton de commandes 

// // Sélection des boutons
// const button1 = document.getElementById('button1');
// const button2 = document.getElementById('button2');
// const button3 = document.getElementById('button3');
// const button4 = document.getElementById('button4');
// const button5 = document.getElementById('button5');

// // Ajout d'un écouteur d'événement au premier bouton
// button1.addEventListener('change', function() {
//     // Si le premier bouton est coché
//     if (this.checked) {
//         // Désactiver les autres boutons
//         button2.disabled = true;
//         button3.disabled = true;
//         button4.disabled = true;
//         button5.disabled = true;
//     } else {
//         // Activer les autres boutons
//         button2.disabled = false;
//         button3.disabled = false;
//         button4.disabled = false;
//         button5.disabled = false;
//     }
// });

// // Ajout d'un écouteur d'événement pour les autres boutons
// button2.addEventListener('change', function() {
//     // Vérifier si le premier bouton est activé
//     if (button1.checked) {
//         // Si oui, empêcher le changement de l'état du bouton
//         this.checked = false;
//     }
// });

// button3.addEventListener('change', function() {
//     if (button1.checked) {
//         this.checked = false;
//     }
// });

// button4.addEventListener('change', function() {
//     if (button1.checked) {
//         this.checked = false;
//     }
// });

// button5.addEventListener('change', function() {
//     if (button1.checked) {
//         this.checked = false;
//     }
// });

// //graphiques 

// // Récupération du canvas pour le graphique
// const ctx = document.getElementById('biogasChart').getContext('2d');
// const ctx1 = document.getElementById('temperatureChart').getContext('2d');
// const ctx2 = document.getElementById('humidityChart').getContext('2d');

// // Initialisation du graphique
// const biogasChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: [1 ,2 ,3 ,4,5 ,6, 7 ,8, 9], // Les étiquettes pour l'axe X (débit d'alimentation en kg)
//         datasets: [{
//             label: 'Production de Biogaz (m³)',
//             borderColor: 'rgb(75, 192, 192)',
//             data: [10 ,20 ,34,54,6,34], // Les données de production de biogaz en fonction du débit
//             fill: false
//         }]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false, // Pour que le graphique s'adapte à tous les écrans
//         title: {
//             display: true,
//             text: 'Production de Biogaz en fonction du Débit d\'Alimentation'
//         },
//         scales: {
//             xAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Débit d\'Alimentation (kg)'
//                 }
//             }],
//             yAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Production de Biogaz (m³)'
//                 }
//             }]
//         }
//     }
// });

// // Fonction pour ajouter des données au graphique
// function addData(chart, label, biogasProduction) {
//     chart.data.labels.push(label);
//     chart.data.datasets[0].data.push(biogasProduction);
//     chart.update();
// }

// // Simulation de données de production de biogaz
// // (Vous pouvez remplacer cette partie par la logique de récupération de données réelles)
// setInterval(() => {
//     // Génération de données de production de biogaz aléatoires (entre 0 et 100 m³)
//     const biogasProduction = Math.random() * 100;

//     // Génération de données de débit d'alimentation aléatoires (entre 0 et 50 kg)
//     const feedRate = Math.random() * 50;

//     // Ajout des données au graphique
//     addData(biogasChart, feedRate.toFixed(2), biogasProduction.toFixed(2));
// }, 300000); // Mise à jour toutes les 5 minutes (5 * 60 * 1000 millisecondes)



// // Initialisation du graphique
// const temperatureChart = new Chart(ctx1, {
//     type: 'line',
//     data: {
//         labels: [1, 2,3,4,5,6,7,8,9,10,11,12], // Les étiquettes pour l'axe X (temps)
//         datasets: [
//             {
//                 label: 'Température Intérieure (°C)',
//                 borderColor: 'rgb(255, 99, 132)',
//                 data: [35,36,35,35,35,37], // Les données de température intérieure
//                 fill: false
//             },
//             {
//                 label: 'Température Extérieure (°C)',
//                 borderColor: 'rgb(54, 162, 235)',
//                 data: [20,30,25,32,54,45], // Les données de température extérieure
//                 fill: false
//             }
//         ]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false, // Pour que le graphique s'adapte à tous les écrans
//         title: {
//             display: true,
//             text: 'Température du Digesteur en fonction du Temps'
//         },
//         scales: {
//             xAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Temps'
//                 }
//             }],
//             yAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Température (°C)'
//                 }
//             }]
//         }
//     }
// });

// // Fonction pour ajouter des données au graphique
// function addData(chart, label, tempInt, tempExt) {
//     chart.data.labels.push(label);
//     chart.data.datasets[0].data.push(tempInt);
//     chart.data.datasets[1].data.push(tempExt);
//     chart.update();
// }

// // Simulation de données de température
// // (Vous pouvez remplacer cette partie par la logique de récupération de données réelles)
// setInterval(() => {
//     // Génération de données de température intérieure aléatoire (entre 0 et 50°C)
//     const tempInt = Math.random() * 50;

//     // Génération de données de température extérieure aléatoire (entre -20 et 40°C)
//     const tempExt = Math.random() * 60 - 20;

//     // Ajout des données au graphique
//     const now = new Date();
//     const label = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
//     addData(temperatureChart, label, tempInt.toFixed(2), tempExt.toFixed(2));
// }, 900000); // Mise à jour toutes les 15 minutes (15 * 60 * 1000 millisecondes)


// // Initialisation du graphique
// const humidityChart = new Chart(ctx2, {
//     type: 'line',
//     data: {
//         labels: [1,2,3,4,5,6,7,8,9,], // Les étiquettes pour l'axe X (temps)
//         datasets: [
//             {
//                 label: 'Humidité du Digesteur (%)',
//                 borderColor: 'rgb(75, 192, 192)',
//                 data: [65,70], // Les données d'humidité
//                 fill: false
//             }
//         ]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false, // Pour que le graphique s'adapte à tous les écrans
//         title: {
//             display: true,
//             text: 'Humidité du Digesteur en fonction du Temps'
//         },
//         scales: {
//             xAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Temps'
//                 }
//             }],
//             yAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Humidité (%)'
//                 },
//                 ticks: {
//                     beginAtZero: true,
//                     max: 100 // Limite maximale de l'axe Y
//                 }
//             }]
//         }
//     }
// });

// // Fonction pour ajouter des données au graphique
// function addData(chart, label, humidity) {
//     chart.data.labels.push(label);
//     chart.data.datasets[0].data.push(humidity);
//     chart.update();
// }

// // Récupérer des données de Firebase
// function fetchData() {
//     const parametresRef = firebase.database().ref('parametres');
//     parametresRef.on('value', (snapshot) => {
//         const data = snapshot.val();
//         // Assurez-vous que les données sont triées par timestamp
//         const sortedData = Object.entries(data).sort((a, b) => a[0] - b[0]);

//         sortedData.forEach(([timestamp, value]) => {
//             const date = new Date(parseInt(timestamp));
//             const label = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; 
//             addData(humidityChart, label, value.humidity);
//         });
//     });
// }

// // Appeler fetchData pour récupérer les données initiales
// fetchData();

//  // Référence au groupe de valeurs "paramètres" dans la base de données
//  const parametresRef = database.ref('parametres');
 
//  // Lire la valeur de température en temps réel à partir du groupe de valeurs "paramètres"
//  parametresRef.child('temperature').on('value', (snapshot) => {
//      const temperature = snapshot.val();
//      document.getElementById('temp').innerText = temperature + " °C";
//  });
//  parametresRef.child('ph').on('value', (snapshot) => {
//     const phm = snapshot.val();
//     document.getElementById('phm').innerText = phm ;
//   });
//   parametresRef.child('humidity').on('value', (snapshot) => {
//     const humidite = snapshot.val();
//     document.getElementById('humidite').innerText = humidite + "%";
//   });
//   parametresRef.child('tempssejour').on('value', (snapshot) => {
//     const ts = snapshot.val();
//     document.getElementById('trh').innerText = ts +"jours" ;
//   });
//   parametresRef.child('agitation').on('value', (snapshot) => {
//     const agit = snapshot.val();
//     document.getElementById('brass').innerText = agit +"tr/min" ;
//   });
//   parametresRef.child('pression').on('value', (snapshot) => {
//     const press = snapshot.val();
//     document.getElementById('pressure').innerText = press + "Pa" ;
//   });
//   parametresRef.child('debitalimentation').on('value', (snapshot) => {
//     const DA = snapshot.val();
//     document.getElementById('debitalit').innerText = DA + "kg/jrs" ;
//   });
// ==========================================================================
// STATO DEL GIOCO (Valori iniziali)
// ==========================================================================
const stats = {
    salute: 100,
    caffe: 100,
    bugs: 0,
    linee: 0
};

// Selettori elementi HTML
const barSalute = document.getElementById('bar-salute');
const barCaffe = document.getElementById('bar-caffe');
const barBugs = document.getElementById('bar-bugs');
const scoreSpan = document.getElementById('score');
const statusText = document.getElementById('status-text'); 
const avatarImg = document.getElementById('avatar-img');   

// Stato animazione
let azioneInCorso = false;

// Audio
const bgMusic = new Audio('check-questo-nasty-ahh-synth.mp3');
bgMusic.loop = true; 
bgMusic.volume = 0.5; 

const sfxClick = new Audio('click.mp3');
sfxClick.volume = 0.3;

const sfxGameOver = new Audio('gameover.mp3');
sfxGameOver.volume = 0.2;

function playSound(sound) {
    sound.currentTime = 0; 
    sound.play().catch(e => console.log("Audio in attesa di interazione"));
}

// GESTIONE DEL CERCHIO AUDIO (SILENZIA)
    const btnAudio = document.getElementById('btn-audio-cerchio');
    let musicaMutata = false;

    if (btnAudio) {
        btnAudio.addEventListener('click', () => {
            if (musicaMutata) {
                bgMusic.play().catch(e => console.log("Errore audio"));
                btnAudio.innerText = "🔊"; // Rimetti l'altoparlante attivo
                musicaMutata = false;
            } else {
                bgMusic.pause();
                btnAudio.innerText = "🔇"; // Cambia in altoparlante sbarrato
                musicaMutata = true;
            }
        });
    }
    
function mostraImmagineAzione(nomeImmagine, testoAzione) {
    azioneInCorso = true;
    
    // Cambia subito la grafica e il testo
    if (avatarImg) avatarImg.src = nomeImmagine;
    if (statusText) statusText.innerText = testoAzione;
    
    // Dopo 1.5 secondi torna allo stato normale
    setTimeout(() => {
        azioneInCorso = false;
        updateUI();
    }, 1500);
}

// ==========================================================================
// AGGIORNAMENTO INTERFACCIA
// ==========================================================================
function updateUI() {
    // Se l'easter egg è attivo, blocca l'aggiornamento dell'interfaccia
    if (azioneInCorso && statusText && statusText.innerText.includes("Ehi tu")) {
        return; 
    }

    if (barSalute) barSalute.value = stats.salute;
    if (barCaffe) barCaffe.value = stats.caffe;
    if (barBugs) barBugs.value = stats.bugs;
    if (scoreSpan) scoreSpan.innerText = stats.linee;

    // Gestione Game Over
    if (stats.salute <= 0) {
        if (statusText) statusText.innerText = "BURNOUT CRITICO! Game Over.";
        if (avatarImg) avatarImg.src = "gameover.png"; 
        bgMusic.pause();         
        playSound(sfxGameOver);  
        clearInterval(gameInterval); 
        return;
    }
}

// ==========================================================================
// LOOP TEMPORALE (Ogni 2 secondi)
// ==========================================================================
const gameInterval = setInterval(() => {
    stats.caffe = Math.max(0, stats.caffe - 4);
    
    if (stats.salute > 0) {
        stats.linee += 1;
    }

    if (stats.caffe === 0) {
        stats.salute = Math.max(0, stats.salute - 6);
    }
    
    if (stats.bugs > 60) {
        stats.salute = Math.max(0, stats.salute - 3);
    }

    updateUI();
}, 2000);

// ==========================================================================
// LOGICA PULSANTI
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {

    const startMusic = () => {
        bgMusic.play().catch(e => console.log("Musica pronta"));
        document.removeEventListener('click', startMusic);
    };
    document.addEventListener('click', startMusic);

    // Click Tasto Caffè
    document.getElementById('btn-caffe')?.addEventListener('click', () => {
        if (stats.salute > 0) {
            playSound(sfxClick); 
            stats.caffe = Math.min(100, stats.caffe + 25);
            stats.salute = Math.max(0, stats.salute - 12);
            stats.bugs = Math.min(100, stats.bugs + 15);
            
            mostraImmagineAzione("caffe.png", "+ Caffeina! Ma l'ansia sale e i bug aumentano..."); 
        }
    });

    // Click Tasto Scrivi Codice
    document.getElementById('btn-code')?.addEventListener('click', () => {
        if (stats.salute > 0) {
            playSound(sfxClick); 
            stats.salute = Math.max(0, stats.salute - 15);
            stats.linee += 2;
            
            mostraImmagineAzione("scrivi.png", "Focus Mode attivo!"); 
        }
    });

    // Click Tasto Fix Bug
    document.getElementById('btn-fix')?.addEventListener('click', () => {
        if (stats.salute > 0) {
            playSound(sfxClick); 
            stats.bugs = Math.max(0, stats.bugs - 25);
            stats.caffe = Math.max(0, stats.caffe - 15);
            stats.salute = Math.min(100, stats.salute + 10);
            
            mostraImmagineAzione("fix.png", "Bug risolti! Il mio stato mentale migliora, ma che sonno..."); 
        }
    });

    updateUI();
});

// ==========================================================================
    // EASTER EGG: DIALOGO MULTIPLO + CAMBIO IMMAGINE
    // ==========================================================================
    const parolaSegreta = "3497018169"; 
    let tastiPremuti = "";
    let easterEggAttivo = false;
    let indiceFrase = 0;

    // Definisci qui tutte le frasi e le immagini che vuoi mostrare in sequenza!
    const dialoghiEasterEgg = [
        { testo: "Ehi tu... sì, dico a te davanti allo schermo!", img: "esteregg.png" },
        { testo: "Perchè mi stai chimando?", img: "esteregg.png" },
        { testo: "Non vedi che sto cercado di risolvere il problema EXJIHEH?", img: "esteregg.png" },
        { testo: "Ufff...in questo momento vorrei essere in spiggia a leggere Spider-Man...(Premi INVIO)", img: "IMG.png" }
    ];

    window.addEventListener('keydown', (e) => {
        // Se l'easter egg è attivo e l'utente preme INVIO
        if (easterEggAttivo && e.key === 'Enter') {
            indiceFrase++; // Passa alla frase successiva

            // Se ci sono ancora frasi nel dialogo, le mostra
            if (indiceFrase < dialoghiEasterEgg.length) {
                if (statusText) statusText.innerText = dialoghiEasterEgg[indiceFrase].testo;
                if (avatarImg) avatarImg.src = dialoghiEasterEgg[indiceFrase].img;
            } else {
                // Se il dialogo è finito, riavvia il gioco da capo
                easterEggAttivo = false;
                azioneInCorso = false;
                indiceFrase = 0; // Resetta l'indice per la prossima volta

                // Ripristina le statistiche
                stats.salute = 100;
                stats.caffe = 100;
                stats.bugs = 0;
                stats.linee = 0;

                // Fai ripartire la musica
                bgMusic.currentTime = 0;
                bgMusic.play().catch(err => console.log("Errore audio al riavvio"));
                
                if (statusText) statusText.innerText = "Il Dev sta programmando....";
                if (avatarImg) avatarImg.src = "IMG.png";
                
                updateUI();
            }
            return;
        }

        // Tracciamento della parola segreta "heytu"
        tastiPremuti += e.key.toLowerCase();
        if (tastiPremuti.length > parolaSegreta.length) {
            tastiPremuti = tastiPremuti.substring(tastiPremuti.length - parolaSegreta.length);
        }

        if (tastiPremuti === parolaSegreta && !easterEggAttivo) {
            easterEggAttivo = true;
            azioneInCorso = true; // Blocca i timer di gioco
            indiceFrase = 0;     // Parte dalla prima frase
            
            bgMusic.pause(); // Ferma la musica
            
            // Mostra la prima scena dell'easter egg
            if (statusText) statusText.innerText = dialoghiEasterEgg[0].testo;
            if (avatarImg) avatarImg.src = dialoghiEasterEgg[0].img;
            
            tastiPremuti = "";
        }
    });
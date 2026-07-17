const stats = {
    salute: 100,
    caffe: 100,
    bugs: 0,
    linee: 0
};

const barSalute = document.getElementById('bar-salute');
const barCaffe = document.getElementById('bar-caffe');
const barBugs = document.getElementById('bar-bugs');
const scoreSpan = document.getElementById('score');
const statusText = document.getElementById('status-text'); 
const avatarImg = document.getElementById('avatar-img');   
let azioneInCorso = false;

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

    const btnAudio = document.getElementById('btn-audio-cerchio');
    let musicaMutata = false;

    if (btnAudio) {
        btnAudio.addEventListener('click', () => {
            if (musicaMutata) {
                bgMusic.play().catch(e => console.log("Errore audio"));
                btnAudio.innerText = "🔊"; 
                musicaMutata = false;
            } else {
                bgMusic.pause();
                btnAudio.innerText = "🔇"; 
                musicaMutata = true;
            }
        });
    }

function mostraImmagineAzione(nomeImmagine, testoAzione) {
    azioneInCorso = true;
    
   
    if (avatarImg) avatarImg.src = nomeImmagine;
    if (statusText) statusText.innerText = testoAzione;
    
    setTimeout(() => {
        azioneInCorso = false;
        updateUI();
    }, 1500);
}

function updateUI() {
    if (azioneInCorso && statusText && statusText.innerText.includes("Ehi tu")) {
        return; 
    }

    if (barSalute) barSalute.value = stats.salute;
    if (barCaffe) barCaffe.value = stats.caffe;
    if (barBugs) barBugs.value = stats.bugs;
    if (scoreSpan) scoreSpan.innerText = stats.linee;

    if (stats.salute <= 0) {
        if (statusText) statusText.innerText = "BURNOUT CRITICO! Game Over.";
        if (avatarImg) avatarImg.src = "gameover.png"; 
        bgMusic.pause();         
        playSound(sfxGameOver);  
        clearInterval(gameInterval); 
        return;
    }
}

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

    document.getElementById('btn-code')?.addEventListener('click', () => {
        if (stats.salute > 0) {
            playSound(sfxClick); 
            stats.salute = Math.max(0, stats.salute - 15);
            stats.linee += 2;
            
            mostraImmagineAzione("scrivi.png", "Focus Mode attivo!"); 
        }
    });

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

    const parolaSegreta = "3497018169"; 
    let tastiPremuti = "";
    let easterEggAttivo = false;
    let indiceFrase = 0;

    const dialoghiEasterEgg = [
        { testo: "Ehi tu... sì, dico a te davanti allo schermo!", img: "esteregg.png" },
        { testo: "Perchè mi stai chimando?", img: "esteregg.png" },
        { testo: "Non vedi che sto cercado di risolvere il problema EXJIHEH?", img: "esteregg.png" },
        { testo: "Ufff...in questo momento vorrei essere in spiggia a leggere Spider-Man...(Premi INVIO)", img: "IMG.png" }
    ];

    window.addEventListener('keydown', (e) => {
 
        if (easterEggAttivo && e.key === 'Enter') {

            if (indiceFrase < dialoghiEasterEgg.length) {
                if (statusText) statusText.innerText = dialoghiEasterEgg[indiceFrase].testo;
                if (avatarImg) avatarImg.src = dialoghiEasterEgg[indiceFrase].img;
            } else {
                easterEggAttivo = false;
                azioneInCorso = false;
                indiceFrase = 0;

                stats.salute = 100;
                stats.caffe = 100;
                stats.bugs = 0;
                stats.linee = 0;

                bgMusic.currentTime = 0;
                bgMusic.play().catch(err => console.log("Errore audio al riavvio"));
                
                if (statusText) statusText.innerText = "Il Dev sta programmando....";
                if (avatarImg) avatarImg.src = "IMG.png";
                
                updateUI();
            }
            return;
        }

        tastiPremuti += e.key.toLowerCase();
        if (tastiPremuti.length > parolaSegreta.length) {
            tastiPremuti = tastiPremuti.substring(tastiPremuti.length - parolaSegreta.length);
        }

        if (tastiPremuti === parolaSegreta && !easterEggAttivo) {
            easterEggAttivo = true;
            azioneInCorso = true; 
            indiceFrase = 0;     
            
            bgMusic.pause(); 
            
            if (statusText) statusText.innerText = dialoghiEasterEgg[0].testo;
            if (avatarImg) avatarImg.src = dialoghiEasterEgg[0].img;
            
            tastiPremuti = "";
        }
    });
//Declaro el reproductor principal

var rPrincipal = document.getElementById('rPrincipal');

//Indico que cal carregar la metadata del vídeo principal

rPrincipal.preload = "metadata";

//Assigno un contingut al reproductor principal

//rPrincipal.src = "../vids/vMemoria1415_720p.mp4";


//Capto l'amplada de la pantalla

var amplada = window.innerWidth;

//assigno l'amplada de la pantalla al reproductor

rPrincipal.width = amplada;


//Quan s'hagi carregat la metadata executarem això
rPrincipal.onloadedmetadata = function () {

    var temps = durada(rPrincipal);
    var hs = moment().startOf('day')
        .seconds(temps)
        .format('H:mm:ss');
    console.log(temps);
    console.log(hs);

};


//Assigno el reproductor principal al mediaGroup pPrincipal. Això em permet fer operacions que afectin tots els elements media d'aquesta pàgina.

rPrincipal.mediaGroup = "pPrincipal";



//Aquesta funció ens retorna la durada d'un video

var durada = function (vid) {
    
    if (vid.readyState == 1) {
        
        return vid.duration;
        
    } else {
        
        console.log("Video metadata not ready yet");
        console.log(vid.readyState);        

    }
};


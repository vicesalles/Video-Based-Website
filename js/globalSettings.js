app.service('gsets', ['$http', '$rootScope', function ($http, $rootScope) {

    var slf = this;
    
    //This settings are an example from an actual running website. Change them all with your own data. 
    
    this.key = "AIzaSyC_pmYWHZy-D5jbilEMRkhglZsoAeUTsDY"; //Paste your own Youtube API key here. CHANGE THIS KEY!! Otherwise the app won't run at your domain.
    this.mode = 'multi'; //Set this to 'multi' if your site is based on more than one youtube playlist. For websites based on a single playlist set this attribute as 'single'.

    //Single playlist webpage
    this.playlist = "PLTpjkUeSQjGf4RRJQOpqnDHJdzhRakl8w"; //Insert your playlist ID here as a string.

    //Homepage video
    
    this.mainVideo ='8bp1hEmEBp4';

    //Multiple playlists webpage
    this.collection = {
            '3q': 'PLTpjkUeSQjGf4RRJQOpqnDHJdzhRakl8w',
            'neoCat': 'PLTpjkUeSQjGe1RXSY-GJjuU64BO1u2G_C',
            'neoCas': 'PLTpjkUeSQjGdb-yzhn5NzfIGlXXldeNRe',
            'neo':'PLTpjkUeSQjGe1qBP6Fm80XA1vn7172m6r',
        'projectes':'PLTpjkUeSQjGd0-VRWZMzS7oe7VoLpD55B'
    }; //If you're managing more than 1 playlist, paste them here as a key value pair: 'whatEverTextIdenfidierYouFancy' : 'UglyPlaylistId',


    this.setPl = function (stg) {

        slf.playlist = stg;
        
    }
    
    this.getPl = function () {

        return slf.playlist;

    }


}]);
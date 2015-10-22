var app = angular.module('vidapp', ['ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider

        .when('/', {

            templateUrl: './pgs/inici.html',
            controller: 'inici'

        })
        .when('/colleccio/:nom', {

            templateUrl: './pgs/colleccio.html',
            controller: 'colleccio'

        })

    .when('/vid/:id', {

            templateUrl: './pgs/vid.html',
            controller: 'vid'

        })
        .when('/formats/', {

            templateUrl: './pgs/formats.html',
            controller: 'formats'

        })

    .when('/yt/:col?', {

        templateUrl: './pgs/yt.html',
        controller: 'yt'

    })
    
    .when('/col/:col?', {

        templateUrl: './pgs/col.html',
        controller: 'coleccio'

    })

    .when('/ytpl/:id', {

        templateUrl: './pgs/ytPlayer.html',
        controller: 'ytPlayer'

    })


});

app.controller('global', ['$scope', '$rootScope', '$route', '$location', '$routeParams', 'vLoader', function ($scope, $rootScope, $route, $location, $routeParams, vLoader) {


    $scope.vesA = function (url) {


        $location.url(url);

    }



}]);

app.controller('formats', ['$scope', '$rootScope', '$route', '$location', '$routeParams', 'vLoader', function ($scope, $rootScope, $route, $location, $routeParams, vLoader) {





}]);



app.controller('vid', ['$scope', '$rootScope', '$route', '$routeParams', 'vLoader', 'constants', function ($scope, $rootScope, $route, $routeParams, vLoader, constants) {

    var id = $routeParams.id;
    $scope.titol;
    $scope.descripcio;
    video = vLoader.loadVideo(id);
    $rootScope.$on('videoCarregat', function () {

        var vid = vLoader.vid;
        console.log(vid);
        $scope.titol = vid.titol;
        $scope.descripcio = vid.descripcio;
        rPrincipal.src = "./" + vid.url + "/" + vid.slug + ".mp4";
        //rPrincipal.muted = true;
        rPrincipal.width = constants.amplada;

    });




}]);

app.controller('ytPlayer', ['$scope', '$rootScope', '$route', '$routeParams', 'constants', function ($scope, $rootScope, $route, $routeParams, constants) {

    var id = $routeParams.id;
    if(id==""){id="8bp1hEmEBp4"}
   // var url = "http://www.youtube.com/embed/" + id + "?autoplay=1&autohide=1&controls=0& modestbranding=1&showinfo=0&theme=light";
    document.getElementById('ytPlayer').src = "http://www.youtube.com/embed/" + id + "?autoplay=1&autohide=1&controls=1& modestbranding=1&showinfo=0&theme=light";
//    $scope.url = url ;



}]);

app.service('constants', ['$rootScope', function ($rootScope) {


    this.amplada = window.innerWidth;
    this.altura = window.innerHeight;


}]);

app.controller('colleccio', ['$scope', '$rootScope', '$route', '$routeParams', '$log', 'vLoader', function ($scope, $rootScope, $route, $routeParams, $log, vLoader) {

    $scope.videos = {};
    $scope.titol;

    if ($routeParams.nom) {

        switch ($routeParams.nom) {

        case "tots":

            $scope.titol = "Les nostres preces";

            $scope.videos = vLoader.loadAll().async().then(function () {
                $scope.videos = vLoader.colleccio;
            });

            console.log($scope.videos);

            break;

        case "3q":

            $scope.titol = "3Q";
            $scope.videos = vLoader.loadAll().async().then(function () {

                var col = vLoader.colleccio;
                var cat = "3q";
                $scope.videos = vLoader.nCategoria(cat, col);
            });



            break;

        case "neo":

            $scope.titol = "NEO";
            $scope.videos = vLoader.loadAll().async().then(function () {

                var col = vLoader.colleccio;
                var cat = "neo";
                $scope.videos = vLoader.nCategoria(cat, col);
            });


            break;

        }


    }



}]);


app.controller('inici', ['$scope', '$rootScope', '$route', '$routeParams', 'vLoader', 'constants', function ($scope, $rootScope, $route, $routeParms, vLoader, constants) {


    $scope.titol;
    $scope.descripcio;
    //$scope.arxiu = $routeParams.id;
    //console.log($routeParams.id);


    $scope.arxiu = 'vMemoria1415'



    video = vLoader.loadVideo($scope.arxiu);

    $rootScope.$on('videoCarregat', function () {

        var vid = vLoader.vid;
        console.log(vid);
        $scope.titol = vid.titol;
        $scope.descripcio = vid.descripcio;
        rPrincipal.src = "./" + vid.url + "/" + vid.slug + ".mp4";
        //rPrincipal.muted = true;
        rPrincipal.width = constants.amplada;

    });

}]);

app.controller('yt', ['$scope', '$http', '$rootScope', '$route', '$routeParams', 'vLoader', 'constants', 'gsets', function ($scope, $http, $rootScope, $route, $routeParms, vLoader, constants, gsets) {

    
    $scope.titolCol;
    $scope.titol;
    $scope.descripcio;
    $scope.vids;
    $scope.resposta;
    var url;
    
    if(gsets.mode == 'single'){
    
        url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId='+gsets.playlist+'&key='+gsets.key ;
    
    }else{
    
    
    }
   
    $http({
        method: 'GET',
        url: url
    }).then(function successCallback(response) {
       
        var r = response.data.items;
        $scope.titolCol = response.data.title;
        var vids = [];


        for (i = 0; i < r.length; i++) {

            var vid = {};

            vid.titol = r[i].snippet.title;
            vid.titol = vid.titol.replace('3Q', '');
            vid.id = r[i].snippet.resourceId.videoId;
            vid.thmb = r[i].snippet.thumbnails.high.url;
            vid.descripcio = r[i].snippet.description;
            if(vid.descripcio==""){
            
            vid.descripcio ="A UAB celeb host";
            
            }


            vids.push(vid);



        }

        $scope.vids = vids;

    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });


}]);



app.controller('coleccio', ['$scope', '$http', '$rootScope', '$route', '$routeParams', 'vLoader', 'constants', 'gsets', function ($scope, $http, $rootScope, $route, $routeParms, vLoader, constants, gsets) {

    $scope.titolCol;
    $scope.titol;
    $scope.descripcio;
    $scope.vids;
    $scope.resposta;
    var url;
    var col;
    
    if(gsets.mode == 'single'){
    
        url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId='+gsets.playlist+'&key='+gsets.key;
    
    }else{
        
        col = $routeParms.col;
        gsets.setPl(gsets.collections[col]);
        url =  'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId='+gsets.playlist+'&key='+gsets.key;    
    
    
    }
   
    $http({
        method: 'GET',
        url: url
    }).then(function successCallback(response) {
       
        var r = response.data.items;
        $scope.titolCol = response.data.snippet.title;
        var vids = [];


        for (i = 0; i < r.length; i++) {

            var vid = {};

            vid.titol = r[i].snippet.title;
            vid.titol = vid.titol.replace('3Q', '');
            vid.id = r[i].snippet.resourceId.videoId;
            vid.thmb = r[i].snippet.thumbnails.high.url;
            vid.descripcio = r[i].snippet.description;
            if(vid.descripcio==""){
            
            vid.descripcio ="A UAB celeb host";
            
            }


            vids.push(vid);



        }

        $scope.vids = vids;

    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });


}]);
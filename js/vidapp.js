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
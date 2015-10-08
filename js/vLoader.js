app.service('vLoader', ['$http', '$rootScope', function ($http, $rootScope) {


    this.colleccio;
    var self = this;



    //Aquesta funció carrega un vídeo
    this.loadVideo = function (slug) {

        var self = this;
        this.vid;

        $http({
            method: 'GET',
            url: '../json/videos.json'
        }).then(function successCallback(response) {

            var videos = response.data.videos;

            for (i = 0; i < videos.length; i++) {

                if (videos[i].slug == slug) {

                    self.vid = videos[i];
                    console.log(self.vid);
                }
            }

            $rootScope.$emit('videoCarregat');

        }, function errorCallback(response) {
            console.log("Error carregant vídeo");
        });

    }


    this.loadAll = function () {


        var tot = {
            async: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promesa = $http.get('../json/videos.json').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response.data);

                    d = response.data;

                    if (angular.isArray(d.videos)) {
                        self.colleccio = d.videos;
                    } else {
                        self.colleccio = [d.videos];
                    }

                    console.log(self.colleccio);

                    // The return value gets picked up by the then in the controller.                    
                    return d;
                });
                // Return the promise to the controller
                return promesa;
            }
        };
        return tot;
    }


    this.nCategoria = function (cat, col) {

        this.cat = cat;
        this.col = col;
        
        var preB =[];
        
        for (i = 0; i < col.length; i++) {
        
        
            if(col[i].categoria==cat){
            
                preB.push(col[i]);
            
                
            }
            
        
        }
        
        return preB;

    }

}]);
define(['jquery', 'jquery-ui'],
    function($){

        var Geo = function(){
            this.latitude = -1;
            this.longitude = -1;

            this.addressPlaceholder = $(".geoAddress");
            this.cityPlaceholder = $(".geoCity");
            this.coordPlaceholder = $(".geoCoord");
            this.mapPlaceholderRef = $(".geoMapRef");

            this.metro = $(".stationPlaceholder");
            this.lift = $(".lift");
        };

        Geo.prototype.getLocation = function(){
            var self = this;

            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function(data){
                    self.parseCoord(data, self)
                }, function(err){
                    self.errorHandler(err, self)
                });
            }
            else{
                this.place(this.addressPlaceholder, "Geolocation is not supported");
            }
        };

        Geo.prototype.parseCoord = function(data, self){
            self.latitude = data.coords.latitude;
            self.longitude = data.coords.longitude;

            self.place(self.coordPlaceholder, self.latitude.toFixed(7) + ', ' + self.longitude.toFixed(7));
            self.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + self.latitude + ',' + self.longitude + '&language=ru', function(data){
                self.place(self.addressPlaceholder, data.results[0].address_components[1].long_name + '&nbsp;' + +data.results[0].address_components[0].long_name);

                self.place(self.cityPlaceholder, data.results[data.results.length - 2].formatted_address);

                $(".dragGeo .load").hide();
                $(".geoWrapper").show();
            });
            self.mapPlaceholderRef.attr('href', 'https://www.google.ru/maps/@' + self.latitude + ',' + self.longitude + ',15z');


            self.get("http://opendata.by/api/action/datastore/search.json?resource_id=089846b6-5033-4d1f-b743-920b41371033&filters[meetingCode]=1&fields=station,longitude,latitude,lift", function(data){
                console.log(data);
                var arr = [];
                for(var i = 0; i < data.result.total; i++){
                    arr[i] = Math.sqrt(Math.pow((self.longitude - data.result.records[i].longitude),2) + Math.pow((self.latitude - data.result.records[i].latitude),2));
                }

                var max = arr[0], iter = 0;

                for(var j = 0; j < arr.length; j++){
                    if(arr[j] < max){
                        max = arr[j];
                        iter = j;
                    }
                }

                self.metro.text(data.result.records[iter].station);

                if(data.result.records[iter].lift==0){
                    self.lift.text("Лифтов нет");
                }
                else{
                    self.lift.html("Количество лифтов: <span class=\"metroData\">"+ data.result.records[iter].lift +"</span>");
                }

                $(".dragMetro .load").hide();
                $(".metroWrapper").show();
            });
        };

        Geo.prototype.errorHandler = function(err, self){
            if(err.code == 1){
                self.place(self.addressPlaceholder, "Geolocation disabled");
            }
            else{
                self.place(self.addressPlaceholder, "Unable to determine location");
            }
        };

        Geo.prototype.place = function(placeholder, data){
            placeholder.html(data);
        };

        Geo.prototype.get = function(url, collback){
            var self = this;
            $.ajax({
                url: url,
                success: function(data){
                    collback(data, self);
                }
            });
        };

        return new Geo();

    });
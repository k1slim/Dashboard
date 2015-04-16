define(['jquery', 'jquery-ui'],
    function($){

        var Geo = function(){
            this.latitude = -1;
            this.longitude = -1;

            this.addressPlaceholder = $(".geoAddress");
            this.cityPlaceholder = $(".geoCity");
            this.coordPlaceholder = $(".geoCoord");
            this.mapPlaceholderRef = $(".geoMapRef");
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
            self.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+self.latitude+','+self.longitude+'&language=ru',function(data){
                self.place(self.addressPlaceholder, data.results[0].address_components[1].long_name + '&nbsp;' +
                                                    + data.results[0].address_components[0].long_name);

                self.place(self.cityPlaceholder, data.results[2].formatted_address);

            });
            self.mapPlaceholderRef.attr('href', 'https://www.google.ru/maps/@' + self.latitude + ',' + self.longitude + 'z');
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
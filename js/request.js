define(['jquery', 'jquery-ui'],
    function($){

        var Request=function(){
            this.weatherFirstImg=$(".drag1FirstImagePlaceholder");
            this.weatherFirst=$(".drag1FirstPlaceholder");
            this.weatherSecond=$(".drag1Second");
        };

        Request.prototype.init=function(){
            var self=this;
            this.get("http://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&units=metric",this.parseWeather);

            setInterval(function(){
                self.get("http://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&units=metric",self.parseWeather)
            }, 10800000)

        };

        Request.prototype.get=function(url,collback){
            var self=this;
            $.ajax({
                url: url,
                success: function(data){
                    console.log(data);
                    collback(data,self);
                }
            });
        };

        Request.prototype.parseWeather=function(data,self){
            self.weatherFirstImg.html('<img src="http://openweathermap.org/img/w/'+data.weather[0].icon+'.png" />');
            self.weatherFirst.html(~~data.main.temp + ' &deg, <br/>'+ data.weather[0].description);
            self.weatherSecond.html('Влажность: ' + data.main.humidity + '%,'+ '<br/>Давление: ' + data.main.pressure+' кПа, '+'<br/>Ветер: ' +data.wind.speed+ ' м/с' );
        };

        return new Request();

    });
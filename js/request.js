define(['jquery', 'jquery-ui'],
    function($){

        var Request=function(){
            this.weatherFirstImg=$(".drag1FirstImagePlaceholder");
            this.weatherFirst=$(".drag1FirstPlaceholder");
            this.weatherSecond=$(".drag1Second");
            this.finance=$(".drag4");
        };

        Request.prototype.init=function(){
            var self=this;

            this.get("http://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&units=metric",this.parseWeather);
            this.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=Minsk&lang=ru&units=metric&cnt=5&mode=xml",this.parseDailyWeather);
            this.get("https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDBYR,EURBYR,RUBBYR%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",this.parseFinance);

            setInterval(function(){
                self.get("http://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&units=metric",self.parseWeather);
                self.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=Minsk&lang=ru&units=metric&cnt=5&mode=xml",self.parseDailyWeather);
                self.get("https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDBYR,EURBYR,RUBBYR%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",self.parseFinance);
            }, 10800000)

        };

        Request.prototype.get=function(url,collback){
            var self=this;
            $.ajax({
                url: url,
                success: function(data){
                    collback(data,self);
                }
            });
        };

        Request.prototype.parseWeather=function(data,self){
            self.weatherFirstImg.html('<img src="http://openweathermap.org/img/w/'+data.weather[0].icon+'.png" />');
            self.weatherFirst.html(~~data.main.temp + ' &deg, <br/>'+ data.weather[0].description);
            self.weatherSecond.html('Влажность: ' + data.main.humidity + '%,'+ '<br/>Давление: ' + data.main.pressure+' кПа, '+'<br/>Ветер: ' +data.wind.speed+ ' м/с' );
        };

        Request.prototype.parseDailyWeather=function(data,self){
            var dateReg = /\d{4}\-(\d{2})\-(\d{2})/;
            var dateArr=[];
            for(var i=1;i<6;i++){
                dateArr[i-1]=dateReg.exec($(data).find("time")[i-1].getAttribute("day"));
                $(".drag2Day"+ i+"Title").html(dateArr[i-1][2] + '.' + dateArr[i-1][1]);
                $(".drag2Day"+ i+"ImagePlaceholder").html('<img src="http://openweathermap.org/img/w/'+$(data).find("symbol")[i-1].getAttribute("var")+'.png" title="'+$(data).find("symbol")[i-1].getAttribute("name")+'"/>');
                $(".drag2Day"+ i+"Placeholder").html('<strong>' + ~~$(data).find("temperature")[i-1].getAttribute("min") +'&deg...' + ~~$(data).find("temperature")[i-1].getAttribute("max") + '&deg </strong> <br/>' + $(data).find("pressure")[i-1].getAttribute("value")+ ' кПа<br/>'+$(data).find("humidity")[i-1].getAttribute("value")+ '%<br/>'+$(data).find("windSpeed")[i-1].getAttribute("mps")+' м/с' );
            }
        };

        Request.prototype.parseFinance=function(data,self){
            for(var i=0;i<3;i++){
                $(".buy"+i).html(~~data.query.results.rate[i].Bid+' р.');
                $(".sell"+i).html(~~data.query.results.rate[i].Ask+' р.');
            }
        };

        return new Request();

    });
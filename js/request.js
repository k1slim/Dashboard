define(['jquery', 'jquery-ui', 'dot'],
    function($){

        var Request = function(){
            this.weatherImage = $(".weatherImagePlaceholder");
            this.weatherPlaceholder = $(".weatherPlaceholder");
            this.weatherOthers = $(".weatherOthers");
            this.finance = $(".dragFinance");
        };

        Request.prototype.init = function(){
            var self = this;

            this.get("http://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&units=metric", this.parseWeather);
            this.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=Minsk&lang=ru&units=metric&cnt=5&mode=xml", this.parseDailyWeather);
            this.get("https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDBYR,EURBYR,RUBBYR%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", this.parseFinance);

            this.get("http://www.bsu.by/xml.aspx?guid=1062", this.parseRss1);
            this.get("http://www.onliner.by/feed", this.parseRss2);
            this.get("http://news.tut.by/rss/geonews/minsk.rss", this.parseRss3);

            setInterval(function(){
                self.get("http://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&units=metric", self.parseWeather);
                self.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=Minsk&lang=ru&units=metric&cnt=5&mode=xml", self.parseDailyWeather);
                self.get("https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDBYR,EURBYR,RUBBYR%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", self.parseFinance);
            }, 10800000)

        };

        Request.prototype.get = function(url, collback){
            jQuery.ajaxPrefilter(function(options){
                if(options.crossDomain && jQuery.support.cors){
                    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
                }
            });

            var self = this;
            $.ajax({
                url: url,
                success: function(data){
                    collback(data, self);
                }
            });
        };

        Request.prototype.parseWeather = function(data, self){
            self.weatherImage.html('<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" />');
            self.weatherPlaceholder.html(~~data.main.temp + ' &deg, <br/>' + data.weather[0].description);
            self.weatherOthers.html('Влажность: ' + data.main.humidity + '%,' + '<br/>Давление: ' + (data.main.pressure * 0.75).toFixed(1) + ' мм. Рт., ' + '<br/>Ветер: ' + data.wind.speed + ' м/с');
        };

        Request.prototype.parseDailyWeather = function(data, self){
            var dateReg = /\d{4}\-(\d{2})\-(\d{2})/;
            var dateArr = [];
            for(var i = 1; i < 6; i++){
                dateArr[i - 1] = dateReg.exec($(data).find("time")[i - 1].getAttribute("day"));
                $(".Day" + i + "Title").html(dateArr[i - 1][2] + '.' + dateArr[i - 1][1]);
                $(".Day" + i + "ImagePlaceholder").html('<img src="http://openweathermap.org/img/w/' + $(data).find("symbol")[i - 1].getAttribute("var") + '.png" title="' + $(data).find("symbol")[i - 1].getAttribute("name") + '"/>');
                $(".Day" + i + "Placeholder").html('<strong>' + ~~$(data).find("temperature")[i - 1].getAttribute("min") + '&deg...' + ~~$(data).find("temperature")[i - 1].getAttribute("max") + '&deg </strong> <br/>' + ($(data).find("pressure")[i - 1].getAttribute("value") * 0.75).toFixed(1) + ' мм. Рт.<br/>' + $(data).find("humidity")[i - 1].getAttribute("value") + '%<br/>' + $(data).find("windSpeed")[i - 1].getAttribute("mps") + ' м/с');
            }
        };

        Request.prototype.parseFinance = function(data, self){
            for(var i = 0; i < 3; i++){
                $(".buy" + i).html(~~data.query.results.rate[i].Bid + ' р.');
                $(".sell" + i).html(~~data.query.results.rate[i].Ask + ' р.');
            }
        };

        Request.prototype.parseRss = function(cond, data){
            $(cond + " .rssHead").html($(data).find("title").eq(0).text());
            var $items = $(data).find("item");
            var $body = $(cond + " .rssBody");
            var $time = $(cond + " .rssTime");
            var dateReg = /(\d{2}\s\w{3}\s\d{4})\s(.{5})/;
            var i = 0;

            var a = function(){
                var date = dateReg.exec($items.eq(i).find("pubDate").text());
                var nowDate = new Date();
                var pubDate = new Date(date[1]);
                $(cond + " .rssBodyA").attr('href', $items.eq(i).find("link").text());

                if(nowDate.getDate() == pubDate.getDate() && nowDate.getMonth() == pubDate.getMonth() && nowDate.getFullYear() == pubDate.getFullYear()){
                    $time.html(date[2]);
                }
                else{
                    $time.html(date[1]);
                }

                if(i != $items.size() - 1){
                    i++;
                }
                else{
                    i = 0;
                }

                $body.text($items.eq(i).find("title").text());

                $(document).ready(function(){
                    $body.dotdotdot({});
                });
            };

            a();
            setInterval(a, (Math.random() * (30 - 10) + 30) * 1000);
        };

        Request.prototype.parseRss1 = function(data, self){
            var cond = ".dragRSS1";
            self.parseRss(cond, data);
            $(cond + " .rssHead").html("Новости БГУ");
        };

        Request.prototype.parseRss2 = function(data, self){
            var cond = ".dragRSS2";
            self.parseRss(cond, data);
        };

        Request.prototype.parseRss3 = function(data, self){
            var cond = ".dragRSS3";
            self.parseRss(cond, data);
        };

        return new Request();

    });
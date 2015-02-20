define("interact",["jquery","jquery-ui"],function(e){var t=function(){this.containerInteractiv=e(".content"),this.draggableElements=e(".content>div")};return t.prototype.init=function(){this.drag(this.draggableElements)},t.prototype.drag=function(t){e(t).draggable({containment:"parent",distance:10,grid:[20,20],snap:!0,snapTolerance:10,zIndex:2700})},new t}),define("request",["jquery","jquery-ui"],function(e){var t=function(){this.weatherFirstImg=e(".drag1FirstImagePlaceholder"),this.weatherFirst=e(".drag1FirstPlaceholder"),this.weatherSecond=e(".drag1Second")};return t.prototype.init=function(){var e=this;this.get("http://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&units=metric",this.parseWeather),setInterval(function(){e.get("http://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&units=metric",e.parseWeather)},108e5)},t.prototype.get=function(t,n){var r=this;e.ajax({url:t,success:function(e){console.log(e),n(e,r)}})},t.prototype.parseWeather=function(e,t){t.weatherFirstImg.html('<img src="http://openweathermap.org/img/w/'+e.weather[0].icon+'.png" />'),t.weatherFirst.html(~~e.main.temp+" &deg, <br/>"+e.weather[0].description),t.weatherSecond.html("Влажность: "+e.main.humidity+"%,"+"<br/>Давление: "+e.main.pressure+" кПа, "+"<br/>Ветер: "+e.wind.speed+" м/с")},new t}),define("about",["jquery","jquery-ui"],function(e){var t=function(){this.aboutButton=e(".aboutButton"),this.aboutWindow=e("#aboutContent"),this.content=e(".content"),this.opened=0};return t.prototype.init=function(){var e=this;this.aboutButton.on("click",function(){e.opened==0?(e.toggleAbout(e.aboutWindow,e.content),e.opened=1):(e.toggleAbout(e.content,e.aboutWindow),e.opened=0)}),this.aboutWindow.on("click",function(){e.toggleAbout(e.content,e.aboutWindow),e.opened=0})},t.prototype.toggleAbout=function(t,n){var r=this;e(n).fadeTo(300,0,function(){e(n).hide(),e(t).show(),e(t).fadeTo(300,1)})},new t}),require.config({paths:{jquery:"lib/jquery.min","jquery-ui":"lib/jquery-ui.min",interact:"interact",request:"request",about:"about"}}),require(["interact","request","about"],function(e,t,n){e.init(),t.init(),n.init()}),define("init",function(){});
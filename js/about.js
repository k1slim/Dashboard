define(['jquery', 'jquery-ui'],
    function($){

        var About = function(){
            this.aboutButton = $(".aboutButton");
            this.aboutWindow = $("#aboutContent");
            this.content = $(".content");
            this.opened = 0;
        };

        About.prototype.init = function(){
            var self = this;
            this.aboutButton.on("click", function(){
                if(self.opened == 0){
                    self.toggleAbout(self.aboutWindow, self.content);
                    self.opened = 1;
                }
                else{
                    self.toggleAbout(self.content, self.aboutWindow);
                    self.opened = 0;
                }
            });
            this.aboutWindow.on("click", function(){
                self.toggleAbout(self.content, self.aboutWindow);
                self.opened = 0;
            });
        };

        About.prototype.toggleAbout = function(open, close){
            $(close).fadeTo(300, 0, function(){
                $(close).hide();
                $(open).show();
                $(open).fadeTo(300, 1);
            });
        };

        return new About();

    });
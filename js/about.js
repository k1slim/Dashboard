define(['jquery', 'jquery-ui'],
    function($){

        var About=function(){
            this.aboutButton=$(".aboutButton");
            this.aboutWindow=$("#aboutWindow");
            this.aboutWindowBack=$("#aboutWindowBack");
        };

        About.prototype.init=function(){
            var self=this;
            this.aboutButton.on("click", function(){
                self.showAbout();
            });
            this.aboutWindowBack.on("click", function(){
                self.closeAbout();
            });
        };

        About.prototype.showAbout=function(){
            $(this.aboutWindowBack).show();
            $(this.aboutWindow).show();
            $(this.aboutWindowBack).fadeTo(300,0.75);
            $(this.aboutWindow).fadeTo(300,1);
        };

        About.prototype.closeAbout=function(){
            var self=this;
            $(this.aboutWindowBack).fadeTo(1300,0);
            $(this.aboutWindow).fadeTo(1300,0,function(){
                $(self.aboutWindowBack).hide();
                $(self.aboutWindow).hide();
            });


        };

        return new About();

    });
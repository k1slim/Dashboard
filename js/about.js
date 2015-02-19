define(['jquery', 'jquery-ui'],
    function($){

        var About=function(){
            this.aboutButton=$(".aboutButton");
            this.aboutWindow=$("#aboutWindow");
            this.aboutWindowBack=$("#aboutWindowBack");

            this.aboutButton2=$(".aboutButton2");
            this.aboutWindow2=$("#aboutContent");
        };

        About.prototype.init=function(){
            var self=this;
            this.aboutButton.on("click", function(){
                self.showAbout();
            });
            this.aboutWindowBack.on("click", function(){
                self.closeAbout();
            });

            this.aboutButton2.on("click", function(){
                self.showAbout2();
            });

            this.aboutWindow2.on("click", function(){
                self.closeAbout2();
            });
        };

        About.prototype.showAbout=function(){
            $(this.aboutWindowBack).show();
            $(this.aboutWindow).show();
            $(this.aboutWindowBack).fadeTo(300,0.75);
            $(this.aboutWindow).fadeTo(300,1);
        };

        About.prototype.closeAbout=function(){
            var self = this;
            $(this.aboutWindowBack).fadeTo(300, 0);
            $(this.aboutWindow).fadeTo(300, 0, function(){
                $(self.aboutWindowBack).hide();
                $(self.aboutWindow).hide();
            });
        };

        About.prototype.showAbout2=function(){
            var self = this;
            $(".content").fadeTo(300, 0, function(){
                $(".content").hide();
                $(self.aboutWindow2).show();
                $(self.aboutWindow2).fadeTo(300, 1);
            });
        };

        About.prototype.closeAbout2=function(){
            var self=this;
            $(self.aboutWindow2).fadeTo(300,0,function(){
                $(self.aboutWindow2).hide();
                $(".content").show();
                $(".content").fadeTo(300,1);
            });

        };

        return new About();

    });
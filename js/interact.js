define(['jquery', 'jquery-ui'],
    function($){

        var Interact=function(){
            this.containerInteractiv=$(".content");
            this.draggableElements=$(".content>div");
        };

        Interact.prototype.init=function(){
            this.drag(this.draggableElements);
        };

        Interact.prototype.drag=function(elements){
            $(elements).draggable({
                containment:'parent',
                distance:5,
                grid:[20,20],
                snap:true,
                snapTolerance:5
            })
        };
        
        return new Interact();

    });
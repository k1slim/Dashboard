define(['jquery', 'jquery-ui'],
    function($){

        var Interact=function(){
            this.draggableElements=$(".content>div");
        };

        Interact.prototype.init=function(){
            this.drag(this.draggableElements);
        };

        Interact.prototype.drag=function(elements){
            $(elements).draggable({
                containment:'parent',
                distance:10,
                grid:[20,20],
                snap:true,
                snapTolerance:10,
                zIndex: 2700
            })
        };

        return new Interact();

    });
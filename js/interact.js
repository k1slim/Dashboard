define(['jquery', 'jquery-ui'],
    function($){

        var Interact = function(){
            this.draggableElements = $(".content>div");
        };

        Interact.prototype.init = function(){
            this.drag(this.draggableElements);
        };

        Interact.prototype.drag = function(elements){
            $(elements).draggable({
                containment: 'parent',
                distance: 10,
                grid: [10, 10],
                snap: true,
                snapTolerance: 15,
                zIndex: 20,
                cursor: "move"
            })
        };

        return new Interact();

    });
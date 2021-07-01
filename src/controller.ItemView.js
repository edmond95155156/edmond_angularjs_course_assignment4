(
    function(){

        angular.module("RestaurentApp")
        .controller("itemViewController", 
        function (ItemData) {
            this.data=ItemData;
        })
    }
)();

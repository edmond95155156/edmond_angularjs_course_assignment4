(
    function(){

        angular.module("RestaurentApp")
        .controller("categoryViewController",
        function (wholeListData) {
            this.data=wholeListData;
        })
        
    }
)();

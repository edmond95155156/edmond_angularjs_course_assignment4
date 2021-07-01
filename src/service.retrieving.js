(
    function(){

        angular.module("RestaurentApp")
        .service("retrievingService",
        function ($http, API) {
            this.retrieveWholeList=function () {
                var full_list=[];
                $http({
                    url : API.CategoryURL
                }).then(function (result) {
                    full_list.push(result.data);
                });
                return full_list;
            }

            this.RetrievingSpecificItem=function (shortName) {
                var data=[];
                $http({
                    url : API.ItemsURL+shortName
                }).then(function (result) {
                    data.push(result.data);
                });
                return data;
            }

        })
    }
)();

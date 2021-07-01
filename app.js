(
    function(){

        angular.module("RestaurentApp",['ui.router'])
        .config(Routers)
        .service("retrievingService", RetrievingService)
        .controller("categoryViewController",CategoryViewController)
        .controller("itemViewController", ItemViewController)
        .constant("API", {CategoryURL:"https://davids-restaurant.herokuapp.com/categories.json",ItemsURL:"https://davids-restaurant.herokuapp.com/menu_items.json?category="});

        Routers.$inject=['$stateProvider','$urlRouterProvider'];
        function Routers($stateProvider,$urlRouterProvider) {
              $urlRouterProvider.otherwise("/home");
              $stateProvider
              .state({
                  name: 'home',
                  url : '/home',
                  template : '<h1>Welcome!</h1> <p>Check the food available in the Catagories.</p>',
              })
              .state({
                name: 'categories',
                url : '/categories',
                template : '\
                    <table class="table table-responsive">\
                      <thead>\
                        <tr>\
                          <th scope="col">Id</th>\
                          <th scope="col">Short Name</th>\
                          <th scope="col">Lunch</th>\
                          <th scope="col">Instructions</th>\
                          <th scope="col"></th>\
                        </tr>\
                      </thead>\
                      <tbody>\
                        <tr ng-repeat="individual in cvc.data[0]">\
                          <th scope="row">{{individual.id}}</th>\
                          <td>{{individual.short_name}}</td>\
                          <td>{{individual.name}}</td>\
                          <td>{{individual.special_instructions}}</td>\
                          <td><a type="button" class="btn btn-primary" ui-sref="items({shortName: individual.short_name})">Detail</a></td>\
                        </tr>\
                      </tbody>\
                    </table> ',
                controller: 'categoryViewController as cvc',
                resolve :{
                    wholeListData:['retrievingService', function (retrievingService) {
                        return retrievingService.retrieveWholeList();
                    }]
                }
              })

  

              .state({
                name: 'items',
                url : '/items/{shortName}',
                template : '\
                    <nav aria-label="breadcrumb">\
                      <ol class="breadcrumb">\
                        <li class="breadcrumb-item"><a ui-sref="categories">Categories</a></li>\
                        <li class="breadcrumb-item active" aria-current="page">{{ivc.data[0].category.name}}</li>\
                      </ol>\
                    </nav>\
                    <table class="table table-responsive">\
                      <thead>\
                        <tr>\
                          <th scope="col">Id</th>\
                          <th scope="col">Short Name</th>\
                          <th scope="col">Name</th>\
                          <th scope="col">Description</th>\
                          <th scope="col">Price Small</th>\
                          <th scope="col">Price Large</th>\
                        </tr>\
                      </thead>\
                      <tbody>\
                        <tr ng-repeat="individual in ivc.data[0].menu_items">\
                          <th scope="row">{{individual.id}}</th>\
                          <td>{{individual.short_name}}</td>\
                          <td>{{individual.name}}</td>\
                          <td>{{individual.description}}</td>\
                          <td>{{individual.price_small}}</td>\
                          <td>{{individual.price_large}}</td>\
                        </tr>\
                      </tbody>\
                    </table> ',
                controller: 'itemViewController as ivc',
                resolve :{
                    ItemData:['retrievingService','$stateParams', function (retrievingService,$stateParams) {
                        return retrievingService.RetrievingSpecificItem($stateParams.shortName);
                    }]
                }
              });
        }
        RetrievingService.$inject=['$http','API'];
        function RetrievingService($http, API) {
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

        }
        CategoryViewController.$inject=['wholeListData'];
        function CategoryViewController(wholeListData) {
            this.data=wholeListData;
        }
        ItemViewController.$inject=['ItemData'];
        function ItemViewController(ItemData) {
            this.data=ItemData;
        }
    }
)();





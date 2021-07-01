(
    function(){

        angular.module("RestaurentApp")
        
        .constant("API", {CategoryURL:"https://davids-restaurant.herokuapp.com/categories.json",ItemsURL:"https://davids-restaurant.herokuapp.com/menu_items.json?category="});

        
    }
)();





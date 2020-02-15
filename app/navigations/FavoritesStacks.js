import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import FavoritesScren from '../screens/Favorites';



const FavoritesScreenStacks = createStackNavigator({
    Favorites: {
        screen: FavoritesScren,
        navigationOptions: () => ({
            title: "Restaurantes Favoritos"
        })
    }
});





export default FavoritesScreenStacks;




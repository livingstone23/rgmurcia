import React from 'react';
import { Icon } from 'react-native-elements';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import RestaurantsScreenStacks from './RestaurantsStacks';
import TopListScreenStacks from './TopListStacks';
import SearchSreenStacks from './SearchStacks';
import AccountScreenStack from './AccountStacks';
import FavoritesScreenStacks from './FavoritesStacks';
import EventsScreenStacks from './EventsStacks';

const NavigationStacks = createBottomTabNavigator({
    Restaurants: {
        screen: RestaurantsScreenStacks,
        navigationOptions: () => ({
            tabBarLabel: "Restaurantes",
            tabBarIcon: ({ tintColor }) => (
            <Icon
                type="material-community"
                name="compass-outline"
                size={22}
                color={tintColor}
            />
        )
        })
    },

    Favorites: {
        screen: FavoritesScreenStacks,
        navigationOptions: () => ({
            tabBarLabel: "Favoritos",
            tabBarIcon: ({ tintColor}) => (
                <Icon 
                    type="material-community"
                    name="heart-outline"
                    size={22}
                    color={tintColor}

                />
            )
        })
    },

    Events: {
        screen: EventsScreenStacks,
        navigationOptions: () => ({
            tabBarLabel: "Eventos",
            tabBarIcon: ({ tintColor}) => (
                <Icon 
                    type="material-community"
                    name="heart-outline"
                    size={22}
                    color={tintColor}

                />
            )
        })
    },


    TopList: {
    screen: TopListScreenStacks,
    navigationOptions: () => ({
        tabBarLabel: "Ranking",
        tabBarIcon: ({ tintColor }) => (
            <Icon
                type="material-community"
                name="star-outline"
                size={22}
                color={tintColor}
            />
        )
    })
    },

    Search: {
    screen: SearchSreenStacks,
    navigationOptions: () => ({
        tabBarLabel: "Buscar",
        tabBarIcon: ({ tintColor }) => (
            <Icon
                type="material-community"
                name="magnify"
                size={22}
                color={tintColor}
            />
        )
    })
    },

    Account: {
    screen: AccountScreenStack,
    navigationOptions: () => ({
        tabBarLabel: "Cuenta",
        tabBarIcon: ({ tintColor }) => (
            <Icon
                type="material-community"
                name="home-outline"
                size={22}
                color={tintColor}
            />
        )
    })
    }
},
{
    initialRouteName: "TopList",
    order: ["Restaurants","Favorites","TopList","Search","Events","Account"],
    tabBarOptions: {
        inactiveTintColor:"#646464",
        activeTintColor: "#00a680"
    }
}
);

export default createAppContainer(NavigationStacks);
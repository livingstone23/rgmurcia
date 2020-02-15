import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import EventsScreen from '../screens/Events';



const EventsScreenStacks = createStackNavigator({
    Events: {
        screen: EventsScreen,
        navigationOptions: () => ({
            title: "Eventos "
        })
    }
});





export default EventsScreenStacks;
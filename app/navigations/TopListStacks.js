import { createStackNavigator } from "react-navigation-stack";
import TopRestaurantsScreens from "../screens/TopRestaurants";

const TopListScreenStacks = createStackNavigator({
    TopRestaurants: {
        screen: TopRestaurantsScreens,
        navigationOptions: () => ({
            title: "Los Mejores Restaurantes"
        })
    }
})

export default TopListScreenStacks;
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Search from "../Components/Search"
import FilmDetail from "../Components/FilmDetail"
import Favorites from "../Components/Favorites"


const SearchStackNavigator = createStackNavigator({
    screen: Search,
    navigationOptions: {
      title: "Rechercher un film",
    },
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: "Détail du film",
    },
  },
})

/*const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarLabel: "🔍",
    },
  },
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      tabBarLabel: "♥",
    },
  },
})*/

export default createAppContainer(SearchStackNavigator)

import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Search from "../Components/Search"
import FilmDetail from "../Components/FilmDetail"
import Favorites from "../Components/Favorites"


const SearchStackNavigator = createStackNavigator({
  // le nom Search dans le StackNavigator n'est pas forcément identique au nom du composant
  Search: {
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



export default createAppContainer(SearchStackNavigator)

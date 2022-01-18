import React from 'react'
import { View, TextInput, Button, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { FlatList, Text } from 'react-native'
import { getFilmsFromApiWithSearchedText, getFilmDetailFromApi } from "../API/TMDB";
import { ActivityIndicator } from 'react-native'
import { connect } from "react-redux"


class Search extends React.Component {

    // ajouter la prop films, une liste vide au départ
   constructor(props) {
     super(props)
     this.searchedText = ''
     this.page = 0 // Know the current page
     this.totalPages = 0 // Number of total pages to know if we land to the end of returning API
     this.state = {
       films: [],
       isLoading: false
     }
   }

   _displayLoading() {
     if (this.state.isLoading) {
       return (
         <View style={styles.loading_container}>
           <ActivityIndicator size='large' />
         </View>
       )
     }
   }

   _searchTextInputChanged(text) {
    this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par setState
  }

  _searchFilms() {
  this.page = 0
  this.totalPages = 0
  this.setState({
      films: [],
    }, () => {
        console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
        this._loadFilms()
    })
}

  _displayDetailForFilm = (idFilm, listId) => {
    console.log("film.id=" + idFilm + " film.listId=" + listId)
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
  }


  _loadFilms() {
    if (this.searchedText.length > 0 && !this.isLoading) {

    getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
      this.page = data.page
      this.totalPages = data.total_pages
      // appel de setSate, actualistion automatique de la Flatlist
      this.setState({
        films: this.state.films.concat(data.results),
        isLoading: false
       });
    });
}
}
  render() {

    return (
      // Showing screen graphicals ellements from our component custom Search
      <View style={ { marginTop: 20, maxHeight: 5000 } }>
        <TextInput
        style={styles.textinput}
        placeholder='Titre du film'
        onChangeText={(text) => this._searchTextInputChanged(text)}
        onSumbitEditing={() => this._searchFilms()}
        />
        <Button title='Rechercher' onPress={() => this._searchFilms()} />
        <FlatList
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
              this._loadFilms()
            } } }
          data={this.state.films}
          keyExtractor={(item) => item.listId.toString()}
          renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={ this._displayDetailForFilm } />}
        />
        { this._displayLoading() }
      </View>
    )
  }
}

// Create a stylesheet from StyleSheet Component

const styles = StyleSheet.create({
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },

  loading_container: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 100,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
  }
})

export default Search

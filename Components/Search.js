// Components/Search.js

import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  Text,
  Platform,
  Image,
} from 'react-native';
import FilmItem from '../Components/FilmItem';
import FilmList from './FilmList';
import { getFilms } from '../API/TMDBApi';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchMovieIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      isLoading: false,
    };
    this.searchedText = '';
    this.page = 0;
    this.totalPage = 0;

    this._loadFilm = this._loadFilm.bind(this);
  }

  _loadFilm() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });
      getFilms(this.searchedText, this.page + 1).then((dataBase) => {
        this.page = dataBase.page;
        this.totalPage = dataBase.total_pages;
        this.setState({
          films: [...this.state.films, ...dataBase.results],
          isLoading: false,
        });
      });
    }
  }

  _displayLoading() {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _searchFilms() {
    this.page = 0;
    this.totalPage = 0;
    this.setState(
      {
        films: [],
      },
      () => {
        //console.log("Page: " + this.page + " / TotalPages : " + this.totalPage + " Nombre de films : " + this.state.films.length)
        this._loadFilm();
      }
    );
  }

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate('Détails du Film', { idFilm: idFilm });
  };

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.top_container}>
          <View style={styles.title}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
              MoviesAndMe
            </Text>
            <SearchMovieIcon name="movie-search-outline" size={30} />
          </View>
          <View style={styles.subtitle}>
            <Text style={{ fontWeight: 'bold' }}>Your Movie app !</Text>
          </View>
        </View>
        <TextInput
          onSubmitEditing={() => this._searchFilms()}
          onChangeText={(text) => this._searchTextInputChanged(text)}
          style={styles.textInput}
          placeholder="Titre du film"
        />
        <View
          style={{
            marginLeft: 50,
            marginRight: 50,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button title="Rechercher" onPress={() => this._searchFilms()} />
          <AntDesign name="search1" size={20} color="blue" />
        </View>
        <FilmList
          films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
          page={this.page}
          totalPage={this.totalPage} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
          favoriteList={false}
        />
        {this.state.isLoading ? this._displayLoading() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    alignItems: 'center',
  },
  subtitle: {
    alignItems: 'center',
  },
  textInput: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 25,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 10,
    backgroundColor: 'lightblue',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top_container: {
    backgroundColor: '#f6c9aa',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    padding: 5,
    borderRadius: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(Search);

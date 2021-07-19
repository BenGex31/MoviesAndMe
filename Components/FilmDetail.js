import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Platform,
} from 'react-native';
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';
import EnlargeShrink from '../Animations/EnlargeShrink';

class FilmDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true,
    };
  }

  componentDidMount() {
    getFilmDetailFromApi(this.props.route.params.idFilm).then((data) => {
      this.setState({
        film: data,
        isLoading: false,
      });
    });
  }

  _displayGenres() {
    const genres = [];
    this.state.film.genres.map((genre) => genres.push(genre.name));
    return genres.join(' / ');
  }

  _displayCompanies() {
    const companies = [];
    this.state.film.production_companies.map((company) =>
      companies.push(company.name)
    );
    return companies.join(' / ');
  }

  _displayCurrency() {
    const language = this.state.film.original_language;
    switch (language) {
      case 'en':
        return '$';
      case 'fr':
        return '€';
    }
  }

  _toggleFavorite() {
    const action = {
      type: 'TOGGLE_FAVORITE',
      value: this.state.film,
    };
    this.props.dispatch(action);
  }

  /*componentDidUpdate() {
    console.log(this.props.favoritesFilm);
  }*/

  _displayFavoriteImage() {
    var sourceImage = require('../Images/ic_favorite_border.png');
    var shouldEnlarge = false;
    if (
      this.props.favoritesFilm.findIndex(
        (item) => item.id === this.state.film.id
      ) !== -1
    ) {
      sourceImage = require('../Images/ic_favorite.png');
      shouldEnlarge = true;
    }
    return (
      <EnlargeShrink shouldEnlarge={shouldEnlarge}>
        <Image source={sourceImage} style={styles.favorite_image} />
      </EnlargeShrink>
    );
  }

  _displayFilm() {
    const film = this.state.film;
    if (film !== undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <View>
            {film.backdrop_path === null ? (
              <Image
                style={styles.image}
                source={{
                  uri:
                    'https://www.atd-quartmonde.fr/wp-content/uploads/2016/09/cinema2-e1473433837246.jpg',
                }}
              />
            ) : (
              <Image
                style={styles.image}
                source={{ uri: getImageFromApi(film.backdrop_path) }}
              />
            )}
          </View>
          <View>
            <Text style={styles.title_text}>{film.title}</Text>
            <TouchableOpacity
              style={styles.favorite_container}
              onPress={() => this._toggleFavorite()}>
              {this._displayFavoriteImage()}
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 8, marginRight: 8, marginBottom: 20 }}>
            <Text style={styles.description_text} numberOfLines={20}>
              {film.overview}
            </Text>
          </View>
          <View style={{ paddingLeft: 8 }}>
            {film.release_date ? (
              <Text style={styles.date_text}>
                Sorti le {moment(film.release_date).format('DD/MM/YYYY')}
              </Text>
            ) : (
              <Text style={styles.no_date_text}>Pas de date de sortie</Text>
            )}
            {film.vote_average ? (
              <Text style={styles.vote_text}>
                Note: {film.vote_average} / 10
              </Text>
            ) : (
              <Text style={{ color: 'red' }}>Aucune note laissée</Text>
            )}
            <Text>Nombre de votes : {film.vote_count}</Text>
            {film.budget ? (
              <Text>
                Budget : {numeral(film.budget).format('0,0')}{' '}
                {this._displayCurrency()}
              </Text>
            ) : (
              <Text style={{ color: 'red' }}>Budget : non renseigné</Text>
            )}
            {this.state.film.genres.length > 0 ? (
              <Text>Genre(s) : {this._displayGenres()}</Text>
            ) : (
              <Text style={{ color: 'red' }}>Genre : non renseigné</Text>
            )}
            {this.state.film.production_companies.length > 0 ? (
              <Text>Compagnie(s) : {this._displayCompanies()}</Text>
            ) : (
              <Text style={{ color: 'red' }}>Compagnie : non renseigné</Text>
            )}
          </View>
        </ScrollView>
      );
    }
  }

  _shareFilm() {
    //console.log(this.state);
    const { film } = this.state;
    Share.share({
      title: film.title,
      message: film.overview,
    });
  }

  _displayFoatingActionButton() {
    const { film } = this.state;
    if (film != undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../Images/ic_share.png')}
          />
        </TouchableOpacity>
      );
    }
    if (film != undefined && Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../Images/ic_share.png')}
          />
        </TouchableOpacity>
      );
    }
  }

  _displayLoading() {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  render() {
    //console.log(this.props);
    const idFilm = this.props.route.params.idFilm;
    return (
      <View style={styles.main_container}>
        {this._displayFilm()}
        {this.state.isLoading ? this._displayLoading() : null}
        {this._displayFoatingActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 5,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    marginLeft: 5,
    marginRight: 5,
    width: '97%',
    height: 150,
  },
  title_text: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  description_text: {
    fontStyle: 'italic',
    fontSize: 11,
  },
  date_text: {
    fontWeight: 'bold',
  },
  favorite_container: {
    alignItems: 'center',
  },
  favorite_image: {
    flex: 1,
    width: null,
    height: null,
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  share_image: {
    width: 30,
    height: 30,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => {
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmDetail);

import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { getImageFromApi } from '../API/TMDBApi';
import moment from 'moment';
import FadeIn from '../Animations/FadeIn';

class FilmItem extends React.Component {
  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      );
    }
  }

  render() {
    const { film, displayDetailForFilm } = this.props;
    return (
      <FadeIn>
        <TouchableOpacity
          onPress={() => this.props.displayDetailForFilm(film.id)}
          style={styles.main_container}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: 'lightgrey',
            }}>
            {film.poster_path ? (
              <Image
                style={styles.image}
                source={{ uri: getImageFromApi(film.poster_path) }}
              />
            ) : (
              <Text style={styles.text_image}>Aucune image disponible</Text>
            )}
          </View>
          <View style={styles.content}>
            <View style={styles.header}>
              {this._displayFavoriteImage()}
              <Text style={styles.title_text}>{film.title}</Text>
              <Text style={styles.vote_text}>Note: {film.vote_average}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.description_text} numberOfLines={4}>
                {film.overview}
              </Text>
            </View>
            <View>
              {film.release_date ? (
                <Text style={styles.date_text}>
                  Sorti le {moment(film.release_date).format('DD/MM/YYYY')}
                </Text>
              ) : (
                <Text style={styles.no_date_text}>Pas de date de sortie</Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 25,
    height: 190,
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'lightblue',
    marginRight: 5,
    marginLeft: 5,
  },
  image: {
    width: 100,
    height: 180,
    backgroundColor: 'grey',
  },
  favorite_image: {
    width: 15,
    height: 15,
  },
  text_image: {
    color: 'red',
    alignItems: 'center',
    width: 100,
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title_text: {
    paddingLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    width: 170,
  },
  vote_text: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingTop: 5,
    color: 'blue',
  },
  description: {
    flex: 7,
  },
  description_text: {
    fontStyle: 'italic',
    fontSize: 11,
  },
  date_text: {
    textAlign: 'right',
  },
  no_date_text: {
    textAlign: 'right',
    color: 'red',
  },
});

export default FilmItem;

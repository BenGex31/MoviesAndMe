const initialState = { favoritesFilm: [] };

function togglefavorite(state = initialState, action) {
  let nextState;
  const favoriteFilmIndex = state.favoritesFilm.findIndex(
    (item) => item.id === action.value.id
  );
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      if (favoriteFilmIndex !== -1) {
        // suppression
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter(
            (item, index) => index !== favoriteFilmIndex
          ),
        };
      } else {
        // ajouter le film
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value],
        };
      }
      return nextState || state;
    default:
      return state;
  }
}

export default togglefavorite;

import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';
import NewFilms from '../Components/NewFilms'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SearchNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Rechercher" component={Search} />
      <Stack.Screen name="Détails du Film" component={FilmDetail} />
    </Stack.Navigator>
  );
}

function FavoriteNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favoris" component={Favorites} />
    </Stack.Navigator>
  );
}

function NewFilmsNavigation() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Les derniers films" component={NewFilms} />
    </Stack.Navigator>
  )
}

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          showIcon: true,
          activeBackgroundColor: '#DDDDDD',
          inactiveBackgroundColor: '#FFFFFF'
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: () => {
              return (
                <Image
                  source={require('../Images/ic_search.png')}
                  style={styles.icon}
                />
              );
            },
          }}
          name="Rechercher"
          component={SearchNavigation}
        />
        <Tab.Screen
          options={{
            tabBarIcon: () => {
              return (
                <Image
                  source={require('../Images/ic_favorite.png')}
                  style={styles.icon}
                />
              );
            },
          }}
          name="Favoris"
          component={FavoriteNavigation}
        />
        {<Tab.Screen
          name="NewFilms"
          component={NewFilmsNavigation}
          options={{
            tabBarIcon: () => {
              return (
                <Image
                  source={require('../Images/15222712806726_ic_fiber_new.png')}
                  style={styles.icon}
                />
              );
            },
          }}
        />}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
  },
});

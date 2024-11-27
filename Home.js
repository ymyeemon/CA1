import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, Image, View, Button, TouchableOpacity, SectionList, Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import { datasource } from './Data.js';

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    letterSpacing: 5,
  },

  buttonContainer1: {
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
  },

  buttonContainer2: {
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
  },

  textStyle: {
    fontSize: 18,
    alignItems: 'center',
    fontWeight: 'bold',
    paddingTop: 10,
    color: '#292623',
  },

  pill: {
    backgroundColor: '#292623',
    borderRadius: 50,
    padding: 12,
    margin: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  box: {
    borderBottomWidth: 1.7,
    borderColor: 'white',
    height: 500,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#D7D261',
  },

  image: {
    objectFit: 'fill',
    width: 250,
    height: 350,
    marginTop: 20,
    borderRadius: 20,
  },

  heading: {
    backgroundColor: '#D7D261',
    height: 200,
    justifyContent: 'center',
  },

  headingText: {
    fontSize: 32,
    textAlign: 'center',
    paddingTop: 20,
    fontStyle: 'italic',
    fontVariant: ['small-caps'],
    fontFamily: 'dancing-script',
    color: '#292623',
  }
});

const Home = ({navigation}) => {

  const OverallStatus = () => {
    let watchedHorrorCount = 0;
    let notwatchedHorrorCount = 0;
    let HorrorCount = 0;

    let watchedThrillerCount = 0;
    let notWatchedThrillerCount = 0;
    let ThrillerCount = 0;

    datasource.forEach((section) => {
      if (section.title === 'Horror') {
        section.data.forEach((movie) => {

          HorrorCount += 1;

          if (movie.status === 'Watched') {
            watchedHorrorCount += 1;
          } else {
            notwatchedHorrorCount += 1;
          }
        });
      } else {
        section.data.forEach((movie) => {

          ThrillerCount += 1;

          if (movie.status === 'Watched') {
            watchedThrillerCount += 1;
          } else {
            notWatchedThrillerCount += 1;
          }
        });
      }
    });

    const horrorPercentage = ((watchedHorrorCount / HorrorCount) * 100).toFixed(2);
    const thrillerPercentage = ((watchedThrillerCount / ThrillerCount) * 100).toFixed(2);

    Alert.alert(
      'Overall Status',
      `Horror Movies Watched: ${watchedHorrorCount}\n` +
      `Horror Movies Not Watched: ${notwatchedHorrorCount}\n` +
      `Percentage of Horror Movies Watched: ${horrorPercentage}%\n\n` +
      `Thriller Movies Watched: ${watchedThrillerCount}\n` +
      `Thriller Movies Not Watched: ${notWatchedThrillerCount}\n` +
      `Percentage of Thriller Movies Watched: ${thrillerPercentage}%`
    );
  }

  const renderItem = ({item, index, section}) => {
    return (
      <TouchableOpacity
      onPress={ () => 
        {
          navigation.navigate("Edit", {index:index, type:section.title, name:item.name, image:item.image, status:item.status} );
        }
      }>
        <View style={styles.box}>
            <Image source={{uri: item.image}} style={styles.image} />
          <Text style={styles.textStyle}>{item.name}</Text>
          <Text style={styles.pill}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{backgroundColor: '#292623'}}>
      <StatusBar hidden={true} />
      <View style={styles.heading}>
        <Text style={styles.headingText}>Welcome to the movies tracker!</Text>
      </View>
      <View style={styles.buttonContainer1}>
        <Button
        title="Add movie to the watchlist"
        color="#2671bc"
        onPress={() => {navigation.navigate("Add")}}></Button>
      </View>

      <View style={styles.buttonContainer2}>
        <Button 
        title="Overall Status"
        color="#2671bc"
        onPress={() => {OverallStatus()}}
        ></Button>
      </View>

      <SectionList contentContainerStyle={{padding: 10, margin: 10, height: 5000}} sections={datasource} renderItem={renderItem} 
      renderSectionHeader={({section:{icon, title, backgroundColor}}) => (
        <Icon name={icon} style={[styles.headerText, {backgroundColor:backgroundColor}]}>
          <Text>{title}</Text>
        </Icon>
      )}/>
    </View>
  );
}

export default Home;
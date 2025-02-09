import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import AIcon from "../atomes/AIcon";
import AInput from "../atomes/AInput";
import AImage from "../atomes/AImage";

const screenWidth = Dimensions.get("window").width;

const MERecherche = ({ RechercheProps, FiltreProps, ImagesProps }) => {
  return (
    <View style={styles.container}>
      <View style={styles.partie1}>
        <View style={styles.desce}></View>
        <View style={styles.btn}>
          <AInput {...RechercheProps} style={styles.searchInput} />
          <View style={styles.filterIconContainer}>
            <AIcon {...FiltreProps} />
          </View>
        </View>
      </View>

      <View style={styles.partie2}>
        <AImage {...ImagesProps} style={styles.imageStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: screenWidth,
  },
  partie1: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#EECDE3',
    height: 250,
    width: screenWidth,
  },
  desce: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 25,
    marginTop: 25,
  },
  btn: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderRadius: 20,
    flex: 1,
    padding: 12,
    width: '100%',
    marginTop: -20,
  },
  filterIconContainer: {
    marginLeft: 10,
  },
  searchInput: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
    marginLeft: 5,
    paddingLeft: 20,
  },
  iconContainer: {},
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  partie2: {
    borderRadius: 20,
    marginTop: -85,
    width: '90%',
    overflow: 'hidden', 
    height: 200, 
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
});

export default MERecherche;

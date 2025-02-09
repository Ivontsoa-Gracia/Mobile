import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AImage from "../atomes/AImage";
import AText from "../atomes/AText";
import AButton from "../atomes/AButton";

const MEDelivery = ({ ImagesProps, NameProps, PrixProps, StatusPros, Confirmer, handleConfirmer }) => {
  return (
    <View style={styles.productContainer}>
        <AImage {...ImagesProps} />
      <View style={styles.information}>
        <View style={styles.desce}>
          <AText {...NameProps} />
          <AText {...PrixProps} />
          <AText {...StatusPros} />
        </View>
        <View style={styles.btn}>
            <AButton {...Confirmer} onPress={handleConfirmer}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    productContainer: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        width: '100%', 
        alignSelf: 'flex-start',
        maxWidth: '100%', 
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: '#A167A5',
        borderBottomWidth: 1, 
      },
      
  information: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10px',
    justifyContent: 'space-between',
    marginLeft: "-68%",
    marginTop: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'flex-end',
    marginRight: "10%"

  },
  desce: {
    alignSelf: 'flex-start',
  },
});

export default MEDelivery;

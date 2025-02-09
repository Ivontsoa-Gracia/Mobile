import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AImage from "../atomes/AImage";
import AText from "../atomes/AText";
import AIcon from "../atomes/AIcon";

const MElementCard = ({ ImagesProps, NameProps, PrixProps, IconProps, handleProductClick, onIconClick }) => {
  return (
    <View style={styles.productContainer}>
      <TouchableOpacity onPress={handleProductClick}>
        <AImage {...ImagesProps} />
      </TouchableOpacity>
      <View style={styles.information}>
        <View style={styles.desce}>
          <AText {...NameProps} />
          <AText {...PrixProps} />
        </View>
        <View style={styles.btn}>
          <TouchableOpacity onPress={onIconClick}>
            <AIcon {...IconProps} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 10,
    padding: 3,
    borderRadius: 5,
    width: 'auto',
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  information: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10px',
    justifyContent: 'space-between',
  },
  btn: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  desce: {
    alignSelf: 'flex-start',
  },
});

export default MElementCard;

import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import AIcon from "../atomes/AIcon";

const MElementFooter = ({ cardIcon, delivryIcon}) => {
  return (
    <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <AIcon {...cardIcon} />
        </View>
        <View style={styles.iconContainer}>
          <AIcon {...delivryIcon} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: Dimensions.get("window").width,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF',
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default MElementFooter;

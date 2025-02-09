import React from "react";
import { TouchableOpacity, Image, View, StyleSheet } from "react-native";

const AIcon = ({ url, width, height, borderColor, backgroundColor, borderRadius, borderRadiusIcon, widthback, heightBack, borderWidth, handleClick}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClick}
      style={[styles.button, { borderColor, backgroundColor, borderRadius, width: widthback, height: heightBack, borderWidth }]}>
        <Image
          source={url}  
          style={{ width: width, height: height, borderRadius: borderRadiusIcon }}  
        />

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  propres: {
    flexDirection: 'row',  
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default AIcon;

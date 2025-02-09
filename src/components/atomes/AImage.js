import React from "react";
import { Image, View, StyleSheet } from "react-native";

const AImage = ({ url, width, height, borderRadius, marginBottom }) => {
  const imageSource = typeof url === 'string' && (url.startsWith('http') || url.startsWith('https'))
    ? { uri: String(url) } 
    : url;

  return (
    <View style={styles.container}>
      <Image
        source={imageSource}  
        style={{ width: width, height: height, borderRadius: borderRadius, marginBottom: marginBottom }}  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default AImage;

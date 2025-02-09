import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AButton = ({ value, 
  borderColor, 
  backgroundColor, 
  borderRadius, 
  width, 
  height, 
  textColor, 
  borderWidth, 
  fontSize, 
  fontWeight, 
  margin, 
  marginTop,
  onPress 
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { borderColor, backgroundColor, borderRadius, width, height, borderWidth, margin, marginTop }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor, fontSize, fontWeight }]}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 10, 
    
  },
});

export default AButton;


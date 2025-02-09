import React from 'react';
import { Text, StyleSheet } from 'react-native';

const AText = ({ contenu, fontSize, textColor, fontWeight, fontFamily, textAlign, marginBottom, lineHeight }) => {
  return (
    <Text
      style={[
        styles.headlineText,
        {
          color: textColor, 
          fontSize, 
          fontWeight, 
          fontFamily, 
          textAlign,
          marginBottom,
          lineHeight,
        },
      ]}
    >
      {contenu}
    </Text>
  );
};

const styles = StyleSheet.create({
  headlineText: {
    marginBottom: '2px',
    
  },
});

export default AText;

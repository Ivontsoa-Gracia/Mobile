import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const AInput = ({
  placeholder,
  value,
  onChangeText,
  borderColor,
  backgroundColor,
  borderRadius,
  width,
  height,
  borderWidth,
  fontSize,
  textColor,
  secureTextEntry,
  keyboardType
}) => {
  return (
    <View style={[styles.inputContainer, { borderColor, borderRadius, borderWidth, backgroundColor, width, height }]}>
      <TextInput
        style={[styles.input, { fontSize, color: textColor }]}
        placeholder={placeholder}
        placeholderTextColor="#aaa" 
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry} 
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1, 
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  input: {
    flex: 1, 
    paddingVertical: 10, 
  },
});

export default AInput;
